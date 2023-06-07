import { FC, useCallback, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { useMediaQuery } from "usehooks-ts"
import { useRouter } from "next/router"
import { MdSend } from "react-icons/md"

import { useById, useDelete, useLike, useLikes } from "dto/hooks/Posts"
import { useAll as useAllComments, useCreate } from "dto/hooks/Comments"
import { useUser } from "dto/hooks/User"

import { Avatar, Button, Modal } from "@ui"
import { CommentsButton, LikeButton, QueryWrapper, Users } from "@container"
import PostSettings from "components/modules/PostSettings"

import { PostComment } from "dto/types/Comments"

import {
  Base,
  Comment,
  CommentData,
  Comments,
  CommentsBlock,
  Content,
  Controls,
  CreateComment,
  CreateCommentAvatar,
  CreateCommentButton,
  CreateCommentInput,
  Header,
  OpenLikesButton,
  OwnerControls,
  OwnerControlsDelete,
  OwnerControlsEdit,
  Status,
  Time,
  Title,
  UserControls
} from "./PostModal.styles"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const PostModal: FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()
  const { query, push, replace, pathname } = router
  const { post } = query

  const [isLike, setIsLike] = useState<boolean>()
  const [likeCount, setLikeCount] = useState<number>()
  const [renderType, setRenderType] = useState<"content" | "likes" | "edit">(
    "content"
  )

  const { data: postData, status: postStatus } = useById()
  const { data: userData } = useUser()
  const { data: comments, status: commentsStatus } = useAllComments()
  const { data: likes, status: likesStatus } = useLikes(renderType === "likes")
  const { mutateAsync: like } = useLike()
  const { mutateAsync: createComment } = useCreate()
  const { mutateAsync: deletePost } = useDelete()

  const onClose = () => {
    setRenderType("content")
    delete query.post

    return replace({ pathname, query }, undefined, { shallow: true })
  }

  const settingReducer = {
    open: () => setRenderType("edit"),
    close: () => setRenderType("content"),
    likes: () => setRenderType("likes")
  }

  const handleLike = () =>
    like().then((result) => {
      setIsLike(result.isMyLike)
      setLikeCount(result.count)
    })

  const handleDelete = () => deletePost().then(() => onClose())

  const handleCreateComment = (values: PostComment) => createComment(values)

  useEffect(() => {
    setIsLike(!!postData?.isMyLike)
    setLikeCount(postData?.likesCount || 0)
  }, [postData])

  const render = useCallback(() => {
    switch (renderType) {
      case "content":
        return (
          <QueryWrapper status={postStatus}>
            <Content isDetail>
              <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
                {postData?.content || ""}
              </ReactMarkdown>
            </Content>
            <Controls>
              {postData?.isCommunityOwner && (
                <OwnerControls>
                  <OwnerControlsEdit onClick={settingReducer.open} />
                  <OwnerControlsDelete onClick={handleDelete} />
                  <OpenLikesButton onClick={settingReducer.likes}>
                    Лайки
                  </OpenLikesButton>
                </OwnerControls>
              )}
              {!postData?.isCommunityOwner && (
                <UserControls>
                  <LikeButton
                    count={likeCount}
                    liked={isLike}
                    onLike={handleLike}
                    styleType="primary"
                  />
                  <CommentsButton
                    count={postData?.commentsCount}
                    styleType="primary"
                  />
                </UserControls>
              )}
            </Controls>
            <CommentsBlock>
              <QueryWrapper status={commentsStatus}>
                <Comments>
                  {comments?.map((item) => (
                    <Comment key={item.id}>
                      <Avatar
                        img={item.user.avatar || ""}
                        alt={item.user.username || ""}
                        size="small"
                        styleType="dark"
                      />
                      <CommentData>
                        <span>{item.user.username}</span>
                        <p>{item.content}</p>
                        <span className="date">
                          {item.createdAt &&
                            formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                              locale: ruLocale
                            })}
                        </span>
                      </CommentData>
                    </Comment>
                  ))}
                </Comments>
                <CreateComment onSubmit={handleCreateComment}>
                  <CreateCommentAvatar
                    img={userData?.avatar || ""}
                    alt={userData?.username || ""}
                    size="small"
                    styleType="dark"
                  />
                  <CreateComment.FormField name="content">
                    <CreateCommentInput
                      placeholder="Ваш комментарий"
                      styleType="dark"
                    />
                  </CreateComment.FormField>
                  <CreateCommentButton styleType="dark">
                    {isMobile && "Отправить"}
                    <MdSend />
                  </CreateCommentButton>
                </CreateComment>
              </QueryWrapper>
            </CommentsBlock>
          </QueryWrapper>
        )
      case "edit":
        return (
          <PostSettings
            open={renderType === "edit"}
            onClose={settingReducer.close}
          />
        )
      case "likes":
        return (
          <QueryWrapper status={likesStatus}>
            <Users users={likes} notFoundText="Нет лайков" />
          </QueryWrapper>
        )
      default:
        return <></>
    }
  }, [
    comments,
    commentsStatus,
    handleCreateComment,
    handleDelete,
    handleLike,
    isLike,
    isMobile,
    likeCount,
    likes,
    likesStatus,
    postData?.commentsCount,
    postData?.content,
    postData?.isCommunityOwner,
    postStatus,
    renderType,
    settingReducer.close,
    settingReducer.likes,
    settingReducer.open,
    userData?.avatar,
    userData?.username
  ])

  return (
    <>
      <Modal open={!!post} onClose={onClose}>
        <Base>
          <QueryWrapper status={postStatus}>
            <Header>
              <Status>
                <div></div>
                <Time>
                  {!!postData?.createdAt &&
                    formatDistanceToNow(new Date(postData?.createdAt), {
                      addSuffix: true,
                      locale: ruLocale
                    })}
                </Time>
              </Status>
              <Title>{postData?.title}</Title>
            </Header>
            {render()}
            {renderType !== "content" && (
              <Button onClick={settingReducer.close}>Назад</Button>
            )}
          </QueryWrapper>
        </Base>
      </Modal>
    </>
  )
}

export default PostModal

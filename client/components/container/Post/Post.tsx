import { FC, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import ruLocale from "date-fns/locale/ru"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { useLike } from "dto/hooks/Posts"

import { CommentsButton, LikeButton } from "@container"

import { PostProps } from "./Post.interface"

import {
  Base,
  Content,
  Controls,
  Header,
  OpenAllButton,
  Status,
  Time,
  Title,
  UserControls
} from "./Post.styles"

const Post: FC<PostProps> = ({ post, styleType = "light", ref }) => {
  const router = useRouter()
  const { replace, query, pathname } = router

  const { mutateAsync: like, status: likeStatus } = useLike(post.id)

  const [isLike, setIsLike] = useState<boolean>(!!post.isMyLike)
  const [likeCount, setLikeCount] = useState<number>(post.likesCount)

  const handleOpenDetail = () => {
    const _query = {
      ...query,
      post: post.id
    }

    return replace({ pathname, query: _query }, undefined, { shallow: true })
  }

  const handleLike = () =>
    like().then((result) => {
      setIsLike(result.isMyLike)
      setLikeCount(result.count)
    })

  return (
    <Base styleType={styleType} ref={ref}>
      <Header>
        <Status>
          <div></div>
          <Time>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: ruLocale
            })}
          </Time>
        </Status>
        <Title>{post.title}</Title>
      </Header>
      <Content>
        <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {post.content}
        </ReactMarkdown>
      </Content>
      <Controls>
        <OpenAllButton onClick={handleOpenDetail} styleType="primary">
          Открыть полностью
        </OpenAllButton>
        <UserControls>
          <LikeButton
            count={likeCount}
            liked={isLike}
            onLike={handleLike}
            styleType="primary"
            loading={likeStatus === "loading"}
          />
          <CommentsButton
            count={post.commentsCount}
            styleType="primary"
            onClick={handleOpenDetail}
          />
        </UserControls>
      </Controls>
    </Base>
  )
}

export default Post

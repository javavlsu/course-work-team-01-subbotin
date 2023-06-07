import {FC} from 'react';
import { useRouter } from "next/router"

import {useCommunity} from 'dto/hooks/Communities';

import {Community, QueryWrapper} from '@container';
import {Pagination} from '@ui';
import Filter from './Filter';

import {Cards, Container, Title} from './Communities.styles';

const Communities: FC = () => {
    const { push } = useRouter()

    const {data, status} = useCommunity();

    const handleChangePage = (page: number) => {
        return push(`/communities?page=${page}`)
    };

    return (
        <Container>
            <Title>Сообщества</Title>
            <Filter onSearch={() => console.log(123)}/>
            <QueryWrapper status={status}>
                {!!data && <>
                  <Cards>
                      {data?.count
                          ? data?.items?.map((item) => (
                              <Community key={item.id} {...item} />
                          ))
                          : 'Пока не созданно ни одного сообщества'}
                  </Cards>
                  <Pagination currentPage={data.page} total={data.count}
                              pageSize={data.limit}
                              onChange={handleChangePage}/>
                </>}
            </QueryWrapper>
        </Container>
    );
};

export default Communities;

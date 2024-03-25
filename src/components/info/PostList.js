import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Flex } from "Routes/Home";

import { categoryState } from "recoils/atoms";
import styled, { useTheme } from "styled-components";




function PostList({ postList }) {
    const theme = useTheme();
    const category = useRecoilValue(categoryState);

    return (
        <ListBoard>
            <MainBoard>
                {postList?.map((item, index) =>
                    <PostElement
                        key={index}
                        to={`/post/${item.id}`}
                        fontColor={theme.colors.fontColor}>
                        <Flex style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-start'
                        }}>
                            <h3>{item.subtitle}</h3>
                            <h1>{item.title}</h1>
                            <h2>
                                {
                                    item.time.slice(0, 10) +
                                    ' ' +
                                    item.time.slice(11, 19)
                                }
                            </h2>
                        </Flex>
                        <img src={item.thumbnail}></img>
                    </PostElement>
                )
                }
            </MainBoard>
        </ListBoard>
    )
}

export default PostList;

export const ListBoard = styled.div`
    width:100%;
    @media screen and (min-width: 450px){
        width:390px;
    }

    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`;


export const MainBoard = styled.div`
    width:100%;

    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`;

export const PostElement = styled(Link)`
width:100%;
background-color:#111;

border-bottom: 1px solid #555;
background: #222;
padding:16px;

display:flex;
justify-content:space-between;
align-items:center;

cursor:pointer;
    h3{
        width:100%;
        text-align:left;
        color: ${props => props.fontColor};
        font-family: 'Pretendard';
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 146.667% */
    }
    h1{
        width:100%;
        text-align:left;
        color: white;
        /* body1 */
        font-family: 'Pretendard';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 150% */
    }
    h2{
        width:100%;
        text-align:left;
        color: #999999;
        /* body3 */
        font-family: 'Pretendard';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
    img{
        width:68px;
        height:68px;
        object-fit:fill;
        object-position:center;

        border-radius:8px;
    }
`;
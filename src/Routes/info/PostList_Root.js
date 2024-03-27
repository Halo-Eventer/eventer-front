import { Link, Outlet } from "react-router-dom";
import { BoardSet_Width, Wrapper, festivalId } from "Routes/Home";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";

import sampleThumbnail from 'asset/images/Logo.svg'
import { TopFixedBar_Blank } from "components/info/TopFixedBar";
import TopFixedBar_PostList from "components/info/TopFixedBar_PostList";
import { useQuery } from "react-query";
import { getAll } from "apis/apis_GET";




function PostList_Root() {
    const theme = useTheme();
    const [dataList, setDataList] = useState({});

    const {isLoading : noticeListLoading, data:noticeListData} 
    = useQuery("noticeList",()=>getAll(festivalId,'notice','NOTICE'));
    const {isLoading : eventListLoading, data:eventListData} 
    = useQuery("eventList",()=>getAll(festivalId,'notice','EVENT'));

    // const [noticeList, setNoticeList] = useState([
    //     {
    //         id: 1,
    //         title: '2023 LACAUS 청진낭만 축제 일정 안내',
    //         index: '축제 일정',
    //         time: '축제기획단 2024.02.13 16:00',
    //         thumbnail: sampleThumbnail
    //     },
    //     {
    //         id: 2,
    //         title: '2023 LACAUS 청진낭만 축제 일정 안내',
    //         index: '축제 일정',
    //         time: '축제기획단 2024.02.13 16:00',
    //         thumbnail: sampleThumbnail
    //     }
    // ]);
    //포스트에서 필요한 api

    useEffect(()=>{window.scrollTo(0, 0);},[]);
    //스크롤 오류 때문에 일단 이렇게 강제로 올려놈
    useEffect(()=>{
        setDataList(
            {
                noticeList : noticeListData?.data, 
                eventList : eventListData?.data
            }
        )
    },[noticeListData, eventListData])

    console.log('Lists', noticeListData?.data,eventListData?.data);
    console.log('dataList',dataList);
    return (
        <Wrapper>
            <BoardSet_Width>

                <TopFixedBar_PostList/>
                <TopFixedBar_Blank />
                <TopFixedBar_Blank />

                {/* <TitleBoard>
                    {noticeListData?.data.map((item, index) =>
                        <TitleElement 
                        key={index} 
                        to = {`${item.id}`}
                        lineColor={theme.colors.lineColor}>
                            <button>공지사항</button>
                            <h1>{item.title}</h1>
                        </TitleElement>
                    )}
                </TitleBoard> */}
                {/* only 공지사항 리스트(였던 것) */}

                <Outlet context={dataList}></Outlet> {/* 게시글 목록 */}

            </BoardSet_Width>
        </Wrapper>
    )
}

export default PostList_Root;


export const TitleBoard = styled.div`
    width:100%;
    @media screen and (min-width:450px){
        width:390px;
    }
   
    margin-bottom:8px;

    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
`;
export const TitleElement = styled(Link)`
    width:100%;
    background-color:#222222;

    border-top: 1px solid #555;
    background: #222;

    display:flex;
    justify-content:flex-start;
    align-items:center;

    padding:12px 16px;
    cursor:pointer;

    button{
        border-radius: 4px;
        background-color: #555555;

        color: white;
        font-family: 'Pretendard';
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px; /* 133.333% */

        margin-right:12px;
        
        display: flex;
        padding: 4px 6px;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    h1{
        color: white;
        font-family: 'Pretendard';
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 146.667% */
    }
`;


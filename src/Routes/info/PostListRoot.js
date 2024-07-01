import { Link, Outlet } from "react-router-dom";
import { BoardSetWidth, Wrapper, festivalId } from "Routes/Home";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";

import { TopFixedBarBlank } from "components/info/TopFixedBar";
import TopFixedBarPostList from "components/info/TopFixedBarPostList";
import { useQuery } from "react-query";
import { getAll } from "apis/apis_get";

function PostListRoot() {
  const theme = useTheme();
  const [dataList, setDataList] = useState({});

  const { isLoading: noticeListLoading, data: noticeListData } = useQuery(
    "noticeList",
    () => getAll(festivalId, "notice", "NOTICE")
  );
  const { isLoading: eventListLoading, data: eventListData } = useQuery(
    "eventList",
    () => getAll(festivalId, "notice", "EVENT")
  );

  useEffect(() => {
    window.scrollTo(0, -200);
  }, []);
  //스크롤 오류 때문에 일단 이렇게 강제로 올려놈
  useEffect(() => {
    setDataList({
      noticeList: noticeListData?.data.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      }),
      eventList: eventListData?.data.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      }),
    });
  }, [noticeListData, eventListData]);

  // console.log('Lists', noticeListData?.data, eventListData?.data);
  // console.log('dataList', dataList);
  return (
    <Wrapper>
      <BoardSetWidth>
        <TopFixedBarPostList />
        <TopFixedBarBlank />
        <TopFixedBarBlank />
        <Outlet context={dataList}></Outlet> {/* 게시글 목록 */}
      </BoardSetWidth>
    </Wrapper>
  );
}

export default PostListRoot;

export const TitleBoard = styled.div`
  width: 100%;
  @media screen and (min-width: 450px) {
    width: 390px;
  }

  margin-bottom: 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const TitleElement = styled(Link)`
  width: 100%;
  background-color: #222222;

  border-top: 1px solid #555;
  background: #222;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 12px 16px;
  cursor: pointer;

  button {
    border-radius: 4px;
    background-color: #555555;

    color: white;

    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 133.333% */

    margin-right: 12px;

    display: flex;
    padding: 4px 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  h1 {
    color: white;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 146.667% */
  }
`;

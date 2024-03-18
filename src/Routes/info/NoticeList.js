import { useEffect, useState } from "react";
import PostList from "components/info/PostList";

import sampleThumbnail from 'asset/images/SampleThumbnail.png';
import { useSetRecoilState } from "recoil";
import { categoryState } from "recoils/atoms";

function NoticeList(){
    const setCategory = useSetRecoilState(categoryState);
    
    const [noticeList, setNoticeList] = useState([
        {
            id:1,
            title:'2023 LACAUS 청진낭만 축제 일정 안내',
            index:'축제 일정',
            time:'축제기획단 2024.02.13 16:00',
            thumbnail:sampleThumbnail
        },
        {
            id:1,
            title:'2023 LACAUS 청진낭만 축제 일정 안내',
            index:'축제 일정',
            time:'축제기획단 2024.02.13 16:00',
            thumbnail:sampleThumbnail
        }
    ]);

    useEffect(()=>{
        setCategory('notice')
    },[]);

    return(
        <PostList postList={noticeList}/>
    )
}

export default NoticeList;
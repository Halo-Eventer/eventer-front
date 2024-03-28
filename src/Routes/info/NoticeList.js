import { useEffect } from "react";
import PostList from "components/info/PostList";

import { useSetRecoilState } from "recoil";
import { categoryState } from "recoils/atoms";
import { useOutletContext } from "react-router-dom";

function NoticeList(){
    const setCategory = useSetRecoilState(categoryState);
    const {noticeList} = useOutletContext();

    useEffect(()=>{
        setCategory('notice')
    },[]);

    return <PostList postList={noticeList}/>
    
}

export default NoticeList;
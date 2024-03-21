import { useEffect } from "react";
import PostList from "components/info/PostList";

import { useSetRecoilState } from "recoil";
import { categoryState } from "recoils/atoms";
import { useOutletContext } from "react-router-dom";

function EventList(){
    const setCategory = useSetRecoilState(categoryState);
    const {eventList} = useOutletContext();
    
    useEffect(()=>{setCategory('event')},[]);


    return <PostList postList={eventList}/>
}

export default EventList;
import {useState, useEffect} from 'react';
import styled from 'styled-components'


import { dropDown2 } from 'Routes/AssignPage_Home';
import plus from 'images/Plus.svg';

function Assign_List(props){

    const [selectedDrop, setSelectedDrop]=useState("");
    const [showList, setShowList] = useState(false);
    const [numList, setNumList]=useState([]);

    const onClick_dropDown = () => {
        setShowList(prev=>!prev);
    }
    const onClick_li = (event) => {
        event.preventDefault();
        props.setCategory(event.currentTarget.textContent);
        setSelectedDrop(event.currentTarget.textContent);
        setShowList(false);
    }
    const onClick_add = (event) => {
        event.preventDefault();
        props.setMode('a');
    }
    const onClick_revise = (event) => {
        event.preventDefault();
        props.setMode('r');
        props.setItemId(event.currentTarget.value);
    }
    const onClick_delete = (event) => {
        event.preventDefault();
        props.setMode('d');
        props.setItemId(event.currentTarget.value);
    }

    const onClick_num = (event) => {
        event.preventDefault();
        props.setCurrentPage(event.currentTarget.value);
    }

    useEffect(()=>{
        let tmp=[];
        if(numList.length<props.totalPages)
            for(let i=1;i<=props.totalPages;i++)
                tmp.push(i);
        setNumList(tmp);
    },[])
    useEffect(()=>{
        setSelectedDrop(Object.values(props.categoryList)[0]);
      },[]);

    return (
        <Wrapper>
            <DropDown>
                <DropDownBar onClick={onClick_dropDown}>
                    <h1>{selectedDrop}</h1>
                    <img src={dropDown2}></img>
                </DropDownBar>
                {showList&&
                <DropDownlist>
                    {Object.values(props.categoryList).map((item,index)=>
                    {
                        if(item!=selectedDrop)
                            return <li key = {index} onClick={onClick_li}>{item}</li>
                    })}
                </DropDownlist>
                }       
            </DropDown>
            <AddBar onClick={onClick_add}>
                <img src={plus}/>
                <h1>{selectedDrop} 추가</h1>
            </AddBar>
            {props.boardList.length>0 &&
                <ListBoard pagenum={props.pageNum}>
                    {props.boardList.map((item,index)=>
                    <div key={index}>
                        <h1 onClick={onClick_revise}>{item}</h1>
                        <h2 onClick={onClick_delete}>삭제</h2>
                        </div>)}
                </ListBoard>
            }
            <NumList>
                {numList.map((item,index)=>{
                    if(item==props.currentPage)
                        return <Num 
                        key={index} bgColor="#4F33F6" color="#FFF" value={item}
                        fontWeight="bold" onClick={onClick_num}>{item}</Num>
                    else 
                        return <Num key={index} value={item}
                        onClick={onClick_num}>{item}</Num>
                })}
            </NumList>
        </Wrapper>
    )

}

export default Assign_List;

const Wrapper = styled.div`
position:relative;

height:100vh;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
gap:8px;
`;

const DropDown = styled.div`
width: 544px;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
`;
const DropDownBar = styled.div`
width:100%;
height: 48px;
flex-shrink: 0;

border-radius: 4px;
border: 1px solid #EEE;

cursor:pointer;

display:flex;
justify-content:space-between;
align-items:center;
padding:12px;
h1{
    height:24px;
    margin:0;
    padding:0;

    color: #111;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 160% */
}
img{
    width:24px;
    height:24px;
}
`;

const DropDownlist = styled.ol`
position:absolute;
top:48px;

width:100%;

cursor:pointer;

display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
li{
width:100%;
height: 48px;
flex-shrink: 0;

border-radius: 4px;
border: 1px solid #EEE;
background-color:white;

color: #111;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 600;

z-index:2;

display:flex;
justify-content:flex-start;
align-items:center;
padding:12px;
}
`;

const AddBar = styled.div`
width: 544px;
height: 48px;
flex-shrink: 0;

border-radius: 4px;
background: #F2F2F2;

display:flex;
justify-content:center;
align-items:center;

gap:4px;

cursor:pointer;


h1{
height:32px;

color: #111;
font-family: Pretendard;
font-size: 17px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 188.235% */
}

img{
    width:24px;
    height:24px;
}
`;

const ListBoard = styled.div`
height:${(n)=>48*n.pagenum}px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;

div{
width: 544px;
height: 48px;
flex-shrink: 0;

display:flex;
justify-content:space-between;
align-items:center;

padding:4px;
h1{
margin:0;
padding:0;

height:32px;

color: #111;
font-family: Pretendard;
font-size: 17px;
font-style: normal;
font-weight: 500;
line-height: 32px; /* 188.235% */

cursor:pointer;
}

h2{
margin:0;

height:32px;

color: #F00;
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 160% */

padding: 4px 8px;
justify-content: center;
align-items: center;

cursor:pointer;
}
}
`;

const Num = styled.button`
color: ${props=>props.color||'#333'};
font-weight: ${props=>props.fontWeight||'600'};
background-color:${props=>props.bgColor||'transparent'};
`;
const NumList = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap : 28px;

${Num}{
width:24px;
height:24px;
border-radius:50%;
border:none;

font-family: Pretendard;
font-size: 16px;
font-style: normal;

transition:background-color 0.2s ease-out;
cursor:pointer;
}
`;
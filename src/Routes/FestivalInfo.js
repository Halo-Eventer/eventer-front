import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import {
    GlobalStyles, Wrapper, TopFixedDiv,
    UpperBar, Title, BkBtn, HomeBtn
} from './Info';

import info from '../images/Info.svg';
import lineUp1 from '../images/LineUp1.svg';
import lineUp2 from '../images/LineUp2.svg';
import lineUp3 from '../images/LineUp3.svg';
import * as axios from 'axios';

function FestivalInfo() {
    const navigate = useNavigate();

    const redBtn = "#E63136";
    const [lineUp, setLineUp] = useState(lineUp1);
    const [background1, setBackground1] = useState(redBtn);
    const [background2, setBackground2] = useState("white");
    const [background3, setBackground3] = useState("white");
    const [color1, setColor1] = useState("white");
    const [color2, setColor2] = useState("black");
    const [color3, setColor3] = useState("black");

    const onClick_bkBtn = () => {
        navigate(-1);
        //그냥 뒤로가는 기능
    }
    const onClick_lineUp = (event) => {
        event.preventDefault();
        const value = Number(event.target.value);
        console.log("onClick_lineUp!! : ", value);
        switch (value) {
            case 1:
                setLineUp(lineUp1);

                setBackground1(redBtn);
                setBackground2("white");
                setBackground3("white");

                setColor1("white");
                setColor2("black");
                setColor3("black");
                break;
            case 2:
                setLineUp(lineUp2);

                setBackground1("white");
                setBackground2(redBtn);
                setBackground3("white");

                setColor1("black");
                setColor2("white");
                setColor3("black");
                break;
            case 3:
                setLineUp(lineUp3);

                setBackground1("white");
                setBackground2("white");
                setBackground3(redBtn);

                setColor1("black");
                setColor2("black");
                setColor3("white");
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <TopFixedDiv>
                <UpperBar>
                    <BkBtn onClick={onClick_bkBtn} />
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <HomeBtn />
                    </Link>
                    <Title>공연정보</Title>
                </UpperBar>
            </TopFixedDiv>
            <Wrapper>
                <GlobalStyles />
                <InfoBoard style={{marginTop:'52px'}}/>
                <div style={
                    {position: 'relative',
                    width: '350px',
                    marginTop:'48px',
                    marginBottom:'48px'}}>
                    <img src={lineUp} />
                    <LineBtnDiv>
                        <LineBtn onClick={onClick_lineUp}
                            color={color1}
                            background={background1}
                            value='1'>1일차</LineBtn>

                        <LineBtn onClick={onClick_lineUp}
                            color={color2}
                            background={background2}
                            value='2'>2일차</LineBtn>

                        <LineBtn onClick={onClick_lineUp}
                            color={color3}
                            background={background3}
                            value='3'>3일차</LineBtn>
                    </LineBtnDiv>
                </div>
            </Wrapper>
        </div>
    )

}

const InfoBoard = styled.div`
width: 350px;
height: 864px;
flex-shrink: 0;

margin-top:48px;

background-image : url(${info});
background-size:cover;
`;


const LineBtnDiv = styled.div`
position:absolute;
top:52px;
left:50%;
transform: translateX(-50%);    //absolute 가운데정렬하는 법

display:flex;
justify-content:center;
align-items:center;

gap:8px;
`;
const LineBtn = styled.button`
width: 100px;
height: 36px;
flex-shrink: 0;

border-radius: 8px;
border: 1px solid #B93234;
background-color: ${props => props.background};

color: ${props => props.color};
text-align: center;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: 24px; /* 160% */

z-index:10;
cursor:pointer;
`;

export default FestivalInfo;








import { BkBtn, Title, Wrapper } from "Routes/Home"
import { BoardSvg, ImgForSvg } from "components/info/For_Iframe";

import lineUp from 'asset/images/LineUp.svg'
import getImageSize from "utils/getImageSize";
import { useEffect, useState } from "react";
import { TopFixedBar, TopFixedBar_Blank } from "components/info/TopFixedBar";
import { Link, useNavigate } from "react-router-dom";

function ConcertInfo() {
    const navigate = useNavigate();

    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();

    useEffect(() => {
        getImageSize(lineUp)
            .then(response => {
                setImgWidth(response.width);
                setImgHeight(response.height);
            })
            .catch((error => {
                console.log(error);
            }))
    }, [])

    console.log(imgWidth, imgHeight);

    return (
        <Wrapper>
            <TopFixedBar>
                <BkBtn style={{ left: '20px' }} onClick={() => navigate(-1)} />
                <Title>오늘의 공연</Title>
            </TopFixedBar>
            <TopFixedBar_Blank />
            <BoardSvg>
                <ImgForSvg
                    src={lineUp}
                    imgWidth={imgWidth}
                    imgHeight={imgHeight}
                    scrolling="no">
                    해당 브라우저에서 지원하지 않는 이미지입니다.
                </ImgForSvg>
            </BoardSvg>
        </Wrapper>
    )

}

export default ConcertInfo;

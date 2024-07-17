import { BkBtn, Title, Wrapper } from 'Routes/Home';

import lineUp from 'asset/images/LineUp.webp';
import { TopFixedBar, TopFixedBarBlank } from 'components/info/TopFixedBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ConcertInfo() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <TopFixedBar>
                <BkBtn style={{ left: '20px' }} onClick={() => navigate(-1)} />
                <Title>오늘의 공연</Title>
            </TopFixedBar>
            <TopFixedBarBlank />

            {lineUp ? (
                <ImgBoard src={lineUp} />
            ) : (
                <TempText>이미지를 로딩 중입니다.</TempText>
            )}
        </Wrapper>
    );
}

export default ConcertInfo;

const ImgBoard = styled.img`
    width: 100%;
    @media screen and (min-width: 450px) {
        width: 390px;
    }
`;

const TempText = styled.div`
    color: white;
    margin-top: 10%;
`;

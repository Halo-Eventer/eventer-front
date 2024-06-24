import styled from "styled-components";

export const TopFixedBar = styled.div`
position:fixed;
width:100%;
@media screen and (min-width:450px){
    width:390px;
}
height:48px;
top:0;
z-index:3;

font-family:'NanumSquareNeo';

background-color:#111;

display:flex;
justify-content:space-between;
align-items:center;
`;

export const TopFixedBarBlank = styled(TopFixedBar)`
    position:relative;
    z-index:-10;
`;
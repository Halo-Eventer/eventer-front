import { Flex } from "Routes/Home";
import styled from "styled-components";

export const BoardSvg = styled(Flex)`
width:100%;

justify-content:center;
align-items:flex-start;
`;

export const ImgForSvg = styled.iframe`
border:none;

object-fit: cover;
object-position:50% 50%;

width:${props=>props.imgWidth}px;
height:${props=>props.imgHeight}px;
`;
//svg 모바일 흐림해결
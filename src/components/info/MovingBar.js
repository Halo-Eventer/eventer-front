import styled from "styled-components";

export const MovingBar = styled.div`
position:absolute;
left:${props=>props.left};
bottom:0;
transform:translate(-50%,-50%);
transition:left ease-in-out 0.2s;

width: 32px;
height: 4px;
flex-shrink: 0;

background-color: ${props=>props.fontColor};
`;
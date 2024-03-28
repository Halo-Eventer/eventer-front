import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
  background-color:${props=>props.inAssign 
  ? '#FFF'
  : '#000'
  };
  font-family:Pretendard; //폰트 이름이 공백이 없어서 따옴표없이도 가능
}

button{
  border:none;
  background-color:transparent;
  cursor:pointer;
}
input{
  outline: none;
}
a{
text-decoration:none;
color:inherit;
cursor:pointer;
}

`;
//스타일컴포넌트 전역스타일 (적용)

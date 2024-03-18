import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'CWDangamAsac-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

button{
  border:none;
  background-color:transparent;
  cursor:pointer;
}

a{
text-decoration:none;
color:inherit;
cursor:pointer;
}

`;
//스타일컴포넌트 전역스타일 (적용)

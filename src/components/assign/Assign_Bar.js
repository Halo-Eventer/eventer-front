import {StyledLink} from '../../Routes/Info';
import {UpperBar, MiddleBar, Logo, H1, next} from '../../Routes/AssignPage_Home';



export function UpperBar_Component()
{
  return <UpperBar>
    <StyledLink to = "/assign_home">
      <Logo>행사자</Logo>
    </StyledLink>
</UpperBar>
};
export function MiddleBar_Component1()
{
  return  <MiddleBar>
            <div>
              <StyledLink to = "/assign_home">
                <H1 color='#4F33F6' fontWeight='bold'>대학교선택</H1>
              </StyledLink>
            </div>
        </MiddleBar>
};
export function MiddleBar_Component2(props)
{
  return  <MiddleBar>
            <div>
              <StyledLink to = "/assign_home">
                <H1>대학교선택</H1>
              </StyledLink>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>페이지선택</H1>
            </div>
        </MiddleBar>
};
export function MiddleBar_Component3(props)
{
  return  <MiddleBar>
            <div>
              <StyledLink to = "/assign_home">
                <H1>대학교선택</H1>
              </StyledLink>
              <img src={next}/>
              <StyledLink to = {`/assign_select/${props.id_param}`}>
                <H1>페이지선택</H1>
              </StyledLink>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>{props.text}페이지</H1>
            </div>
        </MiddleBar>
};

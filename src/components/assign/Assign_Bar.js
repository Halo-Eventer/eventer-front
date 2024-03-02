import { Link } from 'react-router-dom';
import {UpperBar, MiddleBar, Logo, H1} from '../../Routes/AssignPage_Home';
import next from '../../images/Next.svg';



export function UpperBar_Component()
{
  return <UpperBar>
    <Link to = "/assign_home">
      <Logo>행사자</Logo>
    </Link>
</UpperBar>
};
export function MiddleBar_Component1()
{
  return  <MiddleBar>
            <div>
              <Link to = "/assign_home">
                <H1 color='#4F33F6' fontWeight='bold'>대학교선택</H1>
              </Link>
            </div>
        </MiddleBar>
};
export function MiddleBar_Component2(props)
{
  return  <MiddleBar>
            <div>
              <Link to = "/assign_home">
                <H1>대학교선택</H1>
              </Link>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>페이지선택</H1>
            </div>
        </MiddleBar>
};
export function MiddleBar_Component3(props)
{
  return  <MiddleBar>
            <div>
              <Link to = "/assign_home">
                <H1>대학교선택</H1>
              </Link>
              <img src={next}/>
              <Link to = {`/assign_select/${props.id_param}`}>
                <H1>페이지선택</H1>
              </Link>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>{props.text}페이지</H1>
            </div>
        </MiddleBar>
};

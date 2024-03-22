import { Link } from 'react-router-dom';
import {
  UpperBar,
  MiddleBar,
  Logo,
  H1,
} from '../../Routes/assign/AssignPage_Home';
import next from 'asset/images/Next.svg';



export function UpperBar_Component()
{
  return <UpperBar>
    <Link to = "/assign">
      <Logo>WABA</Logo>
    </Link>
</UpperBar>
};
export function MiddleBar_Component1()
{
  return  <MiddleBar>
            <div>
              <Link to = "/assign">
              <H1 color='#4F33F6' fontWeight='bold'>페이지 선택</H1>
              </Link>
            </div>
        </MiddleBar>
};
export function MiddleBar_Component2(props)
{
  return  <MiddleBar>
            <div>
              <Link to = "/assign">
                <H1>페이지 선택</H1>
              </Link>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>{props.text}</H1>
            </div>
        </MiddleBar>
};

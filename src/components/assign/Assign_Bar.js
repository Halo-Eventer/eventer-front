import { Link } from 'react-router-dom';
import {UpperBar, MiddleBar, Logo, H1} from '../../Routes/assign/AssignPage_Home';
import next from 'asset/images/Next.svg';

import logo from 'asset/images/Logo.svg';



export function UpperBar_Component()
{
  return <UpperBar>
    <Link to = "/assign">
      <Logo>목포해상 <span style={{color:'#4F33F6'}}>W</span>쇼</Logo>
    </Link>
</UpperBar>
};
export function MiddleBar_Component1(props)
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
                <H1>페이지선택</H1>
              </Link>
              <img src={next}/>
              <H1 color='#4F33F6' fontWeight='bold'>{props.text}페이지</H1>
            </div>
        </MiddleBar>
};

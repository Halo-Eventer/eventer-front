import {InputBox,Input,SemiTitle,
  Category,PlusImage,ImageBox,Image} from '../../Routes/AssignPage_Notice';

function AssignBasicInfo_Info(props) {
  let info = props.info;

  const handleInfo = (event) => {
    event.preventDefault();

    const {name, value} = event.target;
    //디스트럭쳐링은 무조건 {}로
    if (name == 'category') 
      props.setCategory(value);
    else
      props.setInfo({ ...info, [name]: value });
  };

  return (
    <div>
      <InputBox>
        <SemiTitle>글 제목</SemiTitle>
        <Input onChange={handleInfo} name="title" placeholder="글 제목"></Input>
      </InputBox>

      <InputBox>
        <SemiTitle>글 부제목</SemiTitle>
        <Input onChange={handleInfo} name="subtitle" placeholder="부제목"></Input>
      </InputBox>

      <InputBox>
        <SemiTitle>설명글</SemiTitle>
        <Input style={{
          width:'300px', 
          }}
          
          onChange={handleInfo} 
          name="simpleExplanation" 
          placeholder="설명글"></Input>
      </InputBox>

      <InputBox
      style={{flexDirection:'column'}}>
        <SemiTitle style={{width:'400px'}}>본문</SemiTitle>
        <Input 
        onChange={handleInfo} 
        name="content" 
        placeholder="본문"
        style={{
          width:'400px', 
          height:'400px',
          }}/>
      </InputBox>


    </div>
  );
}
export default AssignBasicInfo_Info;

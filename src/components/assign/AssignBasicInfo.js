import { Category, Input, InputBox, SemiTitle } from './Assign';

function AssignBasicInfo(props) {
  let info = props.info;
  let category = props.category;
  const deleteType = () => {
    const { type, ...rest } = info;
    props.setInfo({ ...rest });
  };
  const handleInfo = (e) => {
    const [value, id] = [e.target.value, e.target.id];
    if (id == 'category') {
      props.setCategory(value);
      if (value != 'store') {
        deleteType();
      } else {
        props.setInfo({ ...info, ['type']: '주점' });
      }
    } else {
      props.setInfo({ ...info, [id]: value });
    }
  };

  return (
    <div>
      <InputBox>
        <SemiTitle>이름</SemiTitle>
        <Input onChange={handleInfo} id="name" placeholder="이름"></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>요약설명</SemiTitle>
        <Input
          onChange={handleInfo}
          id="summary"
          placeholder="요약 설명"
        ></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>운영 시간</SemiTitle>
        <Input
          onChange={handleInfo}
          id="operationHours"
          placeholder="00:00 ~ 00:00"
        ></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>위도 / 경도</SemiTitle>
        <Input onChange={handleInfo} id="latitude" placeholder="위도"></Input>
        <Input onChange={handleInfo} id="longitude" placeholder="경도"></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>세부 위치</SemiTitle>
        <Input onChange={handleInfo} id="location" placeholder="위치"></Input>
      </InputBox>
      <InputBox>
        <SemiTitle>카테고리</SemiTitle>
        <Category id="category" onChange={handleInfo}>
          <option value="store">주점/푸드트럭</option>
          <option value="event">이벤트</option>
          <option value="booth">부스</option>
          <option value="amenity">편의시설</option>
        </Category>
      </InputBox>
      {category == 'store' ? (
        <InputBox>
          <SemiTitle>주점/푸드트럭</SemiTitle>
          <Category id="type" onChange={handleInfo}>
            <option value="주점">주점</option>
            <option value="푸드트럭">푸드트럭</option>
          </Category>
        </InputBox>
      ) : (
        ''
      )}
      <InputBox>
        <SemiTitle>세부 내용</SemiTitle>
        <Input
          style={{ width: '300px', height: '80px' }}
          onChange={handleInfo}
          id="content"
          placeholder="세부 사항 입력"
        ></Input>
      </InputBox>
    </div>
  );
}
export default AssignBasicInfo;

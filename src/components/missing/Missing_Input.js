import { imageUploadApi } from 'apis/apis';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import imgUpload from 'asset/missing/imageUpload.svg';
import { Flex } from 'asset/Style';
import { useRecoilState } from 'recoil';
import { missingInfoState } from 'recoils/atoms_missing';
function Missing_Input(props) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useRecoilState(missingInfoState);

  const handleClick = (e) => {
    setActive(e.target.id);
    const value = e.target.id;
    setInfo({ ...info, ['gender']: value });
  };
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setInfo({ ...info, [id]: value });
  };
  const [imagePreview, setImagePreview] = useState();
  const imagesInput = useRef(null);
  const handleImg = (e) => {
    setLoading(true);
    imageUploadApi(e.target.files[0])
      .then((res) => {
        props.setInfo({ ...props.info, iamge: res.data });
        setImagePreview(res.data);
        setLoading(false);
        setInfo({ ...info, ['image']: res.data });
      })
      .catch((err) => {
        alert(err.response.data.error);
        setImagePreview('');
        setLoading(false);
      });
  };

  return (
    <Container>
      <MissingSemiTitle>
        {props.title}
        <Require>{props.require ? '(필수)' : ''}</Require>
      </MissingSemiTitle>
      {props.btn ? (
        <BtnContainer>
          <GenderBtn active={active} id="1" onClick={handleClick}>
            남자
          </GenderBtn>
          <GenderBtn active={active} id="2" onClick={handleClick}>
            여자
          </GenderBtn>
        </BtnContainer>
      ) : props.img ? (
        <>
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="images"
            onChange={handleImg}
            type="file"
            ref={imagesInput}
          ></input>
          <Flex>
            <div>
              {loading ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '200px',
                    height: '200px',
                  }}
                >
                  <Loading />
                </div>
              ) : (
                ''
              )}
              {imagePreview ? <ImgPreview src={imagePreview} /> : ''}
              <AddPic
                onClick={() => {
                  imagesInput.current.click();
                }}
                loading={loading}
                imagePreview={imagePreview}
              >
                <img src={imgUpload}></img>

                <span style={{ marginLeft: '8px' }}>
                  {imagePreview ? '사진 변경' : '사진 추가'}
                </span>
              </AddPic>
            </div>

            <PicD>최대 업로드 파일 크기: 10MB (jpg, png만 가능)</PicD>
          </Flex>
        </>
      ) : (
        <Input
          id={props.id}
          onChange={handleChange}
          placeholder={props.placeholder}
        ></Input>
      )}
    </Container>
  );
}

export default Missing_Input;

const Container = styled.div`
  margin-top: 20px;
`;
const PicD = styled.div`
  color: var(--Font3, #888);
  padding: 4px 0;
  margin-left: 8px;
  width: 168px;
  /* body3 */
  font-family: Pretendard-Regular;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;
export const MissingSemiTitle = styled.div`
  color: #999;
  font-family: Pretendard-Regular;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  margin-bottom: 6px;
  display: flex;
`;
const Input = styled.input`
  width: 358px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #222;
  color: #fff;
  ::placeholder {
    color: #999;
  }

  padding-left: 12px;
  border: none;

  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const Require = styled.div`
  color: #53cddd;
`;

const GenderBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  ${(props) =>
    props.active == props.id
      ? 'background: #53CDDD; color:black;'
      : 'background: #222222;'}
  border-radius: 12px;
`;

const BtnContainer = styled.div`
  margin-top: 6px;
  width: 128px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #222;

  display: flex;

  padding: 4px;
`;

const ImgPreview = styled.img`
  width: 200px;
  height: 200px;
`;
const AddPic = styled.button`
  width: 128px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #fff;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;

  font-weight: 600;
  line-height: 24px; /* 150% */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border: 2px solid #f3f3f3; /* Light grey */
    }
    50% {
      transform: rotate(180deg);
      border: 2px solid #53cddd; /* Light grey */
    }
    100% {
      transform: rotate(360deg);
      border: 2px solid #f3f3f3; /* Light grey */
    }
  }
  margin: 0 auto;

  width: 20px;
  height: 20px;

  animation: spin 2s ease-in-out infinite;
`;

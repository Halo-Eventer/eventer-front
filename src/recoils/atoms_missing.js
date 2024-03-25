import { atom } from 'recoil';

export const missingInfoState = atom({
  key: 'info',
  default: {
    name: '',
    age: '',
    gender: '',
    image: '',
    missingLocation: '',
    missingTime: '',
    content: '',
    parentName: '',
    parentNo: '',
    popup: false,
  },
});

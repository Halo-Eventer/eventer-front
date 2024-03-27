import { atom } from 'recoil';

export const missingInfoState = atom({
  key: 'info',
  default: {
    name: '',
    age: '',
    gender: '',
    thumbnail: '',
    missingLocation: '',
    missingTime: '',
    content: '',
    parentName: '',
    parentNo: '',
    popup: false,
  },
});

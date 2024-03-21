import { atom } from 'recoil';

export const missingInfoState = atom({
  key: 'info',
  default: {
    age: '',
    another: '',
    gender: '',
    image: '',
    location: '',
    name: '',
    parentName: '',
    parentPhone: '',
    time: '',
  },
});

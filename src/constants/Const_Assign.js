import thumbnail_preview from 'asset/assign/thumbnail_preview.png';
import thumbnail_preview2 from 'asset/assign/thumbnail_preview2.png';
import thumbnail_preview_missing from 'asset/assign/thumbnail_preview_missing.png';

export const mapCategory = {
    concert: '콘서트',
    booth: '관광지',
    store: [
      '관리자',
      '관광안내소',
      '편의점',
      '화장실',
      '쓰레기통',
      '흡연장',
      '주차장',
    ],
}

export const postCategory = {
    notice : "공지사항",
    event : "이벤트"
}

export const lostCategory = {
    lost : "분실물"
}

export const missingCategory = {
    missing : "실종자",
}

export const wheelChairCategory = {
    wheelChair : "휠체어",
}

export const barrierFreeCategory = {
    barrierFree : "배리어프리존",
}

export const urgentCategory = {
    urgent : "긴급공지",
}


export const mapForm_blank = {
    tag: '',
    name: '',
    summary: '',
    subtitle: '',
    content: '',
    latitude: 0,
    longitude: 0,
    location: '',
    isOperation: true,
    operationHours: '',

    thumbnail: thumbnail_preview,
    images: [],
}

export const storeForm_blank = {
    id: '',
    name: '',
    summary: '',
    content: '',
    latitude: 0,
    longitude: 0,
    location: '',
    isOperation: true,
    operationHours: '',
    type: '',

    thumbnail: thumbnail_preview,
    menus: [],
}

export const postForm_blank = {
    title: '',
    simpleExplanation: '',
    subtitle: '',
    content: '',

    thumbnail: thumbnail_preview,
    images: [],
}




export const lostForm_blank = {
    title: '',
    simpleExplanation: '',
    subtitle: '',
    content: '',

    thumbnail: thumbnail_preview2,
    images: [],
}


export const missingForm_blank = {
    title: '',
    simpleExplanation: '',
    subtitle: '',
    content: '',

    thumbnail: thumbnail_preview_missing,
    images: [],
}


export const urgentForm_blank = {
    title: '',
    simpleExplanation: '',
    subtitle: '',
    content: '',

    thumbnail: thumbnail_preview,
    images: [],
}

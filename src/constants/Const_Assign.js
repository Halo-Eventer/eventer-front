import thumbnail_preview from 'asset/assign/input_thumbnail.png';

export const postCategory = {
    notice : "공지사항",
    event : "이벤트"
}

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

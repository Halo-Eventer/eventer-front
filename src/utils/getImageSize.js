function getImageSize(url){
    return new Promise((resolve, reject) => {
      const img = new Image();
    //이미지 객체 활용

      img.onload = function() {
        resolve({ width: img.width, height: img.height });
      };
  
      img.onerror = function() {
        reject(new Error(`Image load error for URL: ${url}`));
      };
  
      img.src = url; // 이미지 URL을 지정
    });
  }

  export default getImageSize
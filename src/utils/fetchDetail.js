import { getDetail } from "apis/apis_GET";
import thumbnail_preview from 'asset/assign/thumbnail_preview.png';
import thumbnail_preview2 from 'asset/assign/thumbnail_preview2.png';
import thumbnail_preview_missing from 'asset/assign/thumbnail_preview_missing.png';



function fetchDetail(festivalId, category, itemID, setInfo) {
    let tmp_thumbnail="";
    
    getDetail(festivalId, category, itemID)
        .then((response) => {
            if (typeof response.data === 'object') {
                console.log('fetch Detail success', response.data);
                if(response.data.thumbnail.length>0)
                    setInfo(response.data);
                else{
                    switch(category){
                        case 'lostItem':
                            tmp_thumbnail=thumbnail_preview2;
                            break;
                        case 'missing':
                            tmp_thumbnail = thumbnail_preview_missing;
                            break;
                        default:
                            tmp_thumbnail = thumbnail_preview;
                            break;
                    }
                    setInfo({...response.data, thumbnail:tmp_thumbnail})
                }
            } else {
                console.log('fetch Detail no data ;(', response);
            }
        })
        .catch((error) => {
            console.log('fetch Detail error', error);
        });
};

export default fetchDetail;
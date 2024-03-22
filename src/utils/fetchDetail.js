import { getDetail } from "apis/apis";

function fetchDetail(category, itemID, setInfo) {
    getDetail(category, itemID)
        .then((response) => {
            if (typeof response.data === 'object') {
                console.log('fetch Detail success', response.data);
                setInfo(response.data);
            } else {
                console.log('fetch Detail no data ;(', response);
            }
        })
        .catch((error) => {
            console.log('fetch Detail error', error);
        });
};

export default fetchDetail;
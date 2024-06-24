import { getAll } from "apis/apis_get";


function fetchList(festivalId, category, type, setBoardList){
    getAll(festivalId, category, type)
        .then((response) => {
            if (response.data.length > 0) {
                console.log('fetch List success', response.data);
                setBoardList(response.data);
            } else {
                console.log('fetch List no data ;(', response);
                setBoardList([]);
            }
        })
        .catch((error) => {
            console.log('fetch List error', error);
        });
};


export default fetchList;


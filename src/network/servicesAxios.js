import axios from 'axios';
export const BASE_URL = `http://dev3.xicom.us/xttest/`
export const endPoints = {
    getdata: "getdata.php",
    savedata: "savedata.php"

}

export const getAuthHeaders = async () => {
    return {
        'Content-Type': 'multipart/form-data'
    };
};

export const Instance = async (method, url, headers, data) => {
    try {
        const res = await axios({
            method: method,
            url: url,
            headers: headers,
            data: data,
        });
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return error;
        }
    }
}
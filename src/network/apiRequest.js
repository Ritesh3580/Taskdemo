import { BASE_URL, Instance, endPoints, getAuthHeaders } from "./servicesAxios";


export const getListData = async data => {
    const authHeaders = await getAuthHeaders();
console.log("----->Datat ",data);
    try {
        const result =  await Instance('POST', BASE_URL + endPoints?.getdata, data, authHeaders);
        console.log("result--->>", result.data);
        return result
    } catch (e) {
        return e;
    }
};



export const SaveUserData = async obj => {
    const authHeaders = await getAuthHeaders();
    try {
        const result = Instance('POST', BASE_URL + endPoints.savedata, authHeaders, obj);
        return result;
    } catch (e) {
        return e;   
    }
};

import { BASE_URL, Instance, endPoints, getAuthHeaders } from "./servicesAxios";



export const SaveUserData = async obj => {
    const authHeaders = await getAuthHeaders();
    try {
        const result = Instance('POST', BASE_URL + endPoints.savedata, authHeaders, obj);
        return result;
    } catch (e) {
        return e;   
    }
};

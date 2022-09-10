import Toast from "../../utils/Toast.tsx";

const {
    REACT_APP_API_BASE_URL: API_BASE_URL,
    REACT_APP_API_VERSION: API_VERSION,
} = process.env;


export const getFeeCollection = async () => {

    // console.log("aaa", REACT_APP_API_BASE_URL)
    const ENDPOINT = "/fee-collections"
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    console.log('response', response)
    const data= await response.json()
    return data
}
const {
    REACT_APP_API_BASE_URL: API_BASE_URL,
    REACT_APP_API_VERSION: API_VERSION,
} = process.env;


export const getFeeCollection = async (payload: any) => {

    const ENDPOINT = payload ? `/fee-collections${payload}` :"/fee-collections"
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}


export const feeCollectionInfo = async (payload) => {
    const ENDPOINT = "/fee-collections"
    const apiBody = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`, apiBody)
    const data= await response.json()
    return data
}

export const getPropertyDetails = async (payload) => {
    const ENDPOINT = `/properties/survey-details?ddn=${payload}`
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}

export const getAreaConstant = async (payload) => {
    const ENDPOINT = "/fee-collections/areas"
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}

export const updatePaymentCollectionStatus = async (payload) => {
    const {feeCollectionId, statusPayload} = payload
    const ENDPOINT = `/fee-collections/${feeCollectionId}`
    const apiBody = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusPayload)
    }
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`, apiBody)
    const data= await response.json()
    return data
}

export const getPropertyStatusConstant = async (payload) => {
    const ENDPOINT = "/fee-collections/property-statuses"
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}

export const getCollectionStatusConstant = async (payload) => {
    const ENDPOINT = "/fee-collections/collection-statuses"
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}

export const getReceiptsPdf = async (payload) => {
    const ENDPOINT = `/fee-collections/receipts/${payload}`
    const response= await fetch(`${API_BASE_URL}${API_VERSION}${ENDPOINT}`)
    const data= await response.json()
    return data
}



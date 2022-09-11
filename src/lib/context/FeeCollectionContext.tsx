import React, { createContext, useState } from "react"

export const FeeCollectionContext = createContext(null)

const FeeCollectionProvider = ({children}) => {

    const [ feeCollectionList, setFeeCollectionList ] = useState<any>([])
    const [ userInfo, setUserInfo ] = useState<any>({
        propertyCode: "",
        area: "",
        paymentMethod: ""
    })
    
    const updateUserInfo = (updatedObj: any) => {
        console.log('updatedObj', updatedObj)
        setUserInfo({...userInfo, ...updatedObj})
    }
    
    const updateFeeCollectionList = (newData: any) => {
        setFeeCollectionList(newData)
    }

    const contextValue: any = {feeCollectionList, updateFeeCollectionList, userInfo, updateUserInfo}

    
    
    return (
        <FeeCollectionContext.Provider value = {contextValue} >
            {children}
        </FeeCollectionContext.Provider>
    )
}

export default FeeCollectionProvider
import React, { createContext, useState } from "react"

export const FeeCollectionContext = createContext(null)

const FeeCollectionProvider = ({children}) => {

    const [ areaConstant, setAreaConstant ] = useState<any>([])

    const [isLoading, setIsLoading] = useState<any>(false)

    const handleLoader = (value) => {
        setIsLoading(value)
    }
    
    const [ feeCollectionList, setFeeCollectionList ] = useState<any>([])
    const [ userInfo, setUserInfo ] = useState<any>({
        propertyCode: "",
        area: "",
        paymentMethod: "",
        surveyKey: "",
        amount: null,
        upiQRCodeUrl: "",
        feeCollectionId: ""
    })
    
    const updateUserInfo = (updatedObj: any) => {
        console.log('updatedObj', updatedObj)
        setUserInfo({...userInfo, ...updatedObj})
    }
    
    const updateFeeCollectionList = (newData: any) => {
        setFeeCollectionList(newData)
    }

    const handleAreaConstant = (data) => {
        setAreaConstant(data)
    }

    const contextValue: any = { feeCollectionList, updateFeeCollectionList, userInfo, updateUserInfo, areaConstant, handleAreaConstant, isLoading, handleLoader }

    return (
        <FeeCollectionContext.Provider value = {contextValue}>
            {children}
        </FeeCollectionContext.Provider>
    )
}

export default FeeCollectionProvider
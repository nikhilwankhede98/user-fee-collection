import React, { createContext, useState } from "react"

export const FeeCollectionContext = createContext(null)

const FeeCollectionProvider = ({children}) => {

    const [ areaConstant, setAreaConstant ] = useState<any>([])

    const [isLoading, setIsLoading] = useState<any>(false)

    const handleLoader = (value) => {
        setIsLoading(value)
    }
    
    const [ feeCollectionList, setFeeCollectionList ] = useState<any>([])

    const [ collectionStatusConstant, setCollectionStatusConstant ] = useState<any>([])
    const [ propertyStatusConstant, setPropertyStatusConstant ] = useState<any>([])
    const [ areaListConstant, setAreaListConstant] = useState<any>([])

    const handleConstantsArray = (type: any, data: any) => {
        if(type === "PROPERTY") {
            setPropertyStatusConstant(data)
        }
        else if(type === "COLLECTION") setCollectionStatusConstant(data)
        else if(type === "AREA") setAreaListConstant(data)
    }

    const [ userInfo, setUserInfo ] = useState<any>({
        propertyCode: "",
        ownerName: "",
        contactNumber: "",
        area: "",
        paymentMethod: "",
        surveyKey: "",
        amount: null,
        upiQRCodeUrl: "",
        feeCollectionId: "",

    })
    
    const updateUserInfo = (updatedObj: any) => {
        setUserInfo({...userInfo, ...updatedObj})
    }
    
    const updateFeeCollectionList = (newData: any) => {
        setFeeCollectionList(newData)
    }

    const handleAreaConstant = (data) => {
        setAreaConstant(data)
    }

    const contextValue: any = { 
        feeCollectionList, 
        updateFeeCollectionList, 
        userInfo, 
        updateUserInfo, 
        areaConstant, 
        handleAreaConstant, 
        isLoading, 
        handleLoader,
        propertyStatusConstant,
        collectionStatusConstant,
        areaListConstant,
        handleConstantsArray
    }

    return (
        <FeeCollectionContext.Provider value = {contextValue}>
            {children}
        </FeeCollectionContext.Provider>
    )
}

export default FeeCollectionProvider
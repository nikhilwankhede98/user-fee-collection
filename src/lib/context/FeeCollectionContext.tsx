import React, { createContext, useState } from "react"

export const FeeCollectionContext = createContext(null)

const FeeCollectionProvider = ({children}) => {

    const [ feeCollectionList, setFeeCollectionList ] = useState<any>([])
    
    const updateFeeCollectionList = (newData: any) => {
        setFeeCollectionList(newData)
    }

    const contextValue: any = {feeCollectionList, updateFeeCollectionList}

    
    
    return (
        <FeeCollectionContext.Provider value = {contextValue} >
            {children}
        </FeeCollectionContext.Provider>
    )
}

export default FeeCollectionProvider
import React, {useEffect, useContext} from "react"
import { Typography, Box } from "@mui/material";
import { format} from 'date-fns'
import StyledTable from "../components/StyledTable.tsx"
import { getFeeCollection } from "../lib/apis/index.ts"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { ToastContainer, toast } from "react-toastify";

const FeeCollectPage = (props: any) => {

    const { feeCollectionList, updateFeeCollectionList }: any = useContext(FeeCollectionContext)

    const getCollection = async () => {
        const collectionList = await getFeeCollection()
        if(collectionList?.success){
            // if(data?.success) {
            //     // Toast.error("Fee collection list fetched");
            //     return data
            // }
            // toast("woww")
            updateFeeCollectionList(collectionList?.data?.feeCollections)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <Box width= {1} pt= {5} pb= {2}>
           <StyledTable dataList= {feeCollectionList} /> 
        </Box>
    )
}

export default FeeCollectPage
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
        console.log("collectionList", collectionList)
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
        // fetch('https://universal-code.recity.in/v1/fee-collections/areas')
        //     .then(response => response.json())
        //     .then(data => console.log('data', data));
        getCollection()
    }, [])

    console.log("feeCollectionList", feeCollectionList)

    return (
        <Box width= {1} pt= {5} pb= {2}>
           <StyledTable dataList= {feeCollectionList} /> 
        </Box>
    )
}

export default FeeCollectPage
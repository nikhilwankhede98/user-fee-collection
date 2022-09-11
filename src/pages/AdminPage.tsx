import React, {useEffect, useContext} from "react"
import { Typography, Box,} from "@mui/material";
import StyledTable from "../components/StyledTable.tsx"
import { getFeeCollection } from "../lib/apis/index.ts"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { ToastContainer, toast } from "react-toastify";

const AdminPage = (props: any) => {

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
        getCollection()
    }, [])

    return (
        <Box width= {1} pt= {7} pb= {4}>
           <StyledTable isAdmin dataList= {feeCollectionList}/> 
        </Box>
    )
}

export default AdminPage
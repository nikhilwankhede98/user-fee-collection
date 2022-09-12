import React, {useState, useEffect, useContext} from "react"
import { Typography, Box, Grid, OutlinedInput} from "@mui/material";
import StyledTable from "../components/StyledTable.tsx"
import { getFeeCollection, getPropertyStatusConstant, getCollectionStatusConstant, getAreaConstant } from "../lib/apis/index.ts"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { ToastContainer, toast } from "react-toastify";
import SelectInput from "../components/SelectInput.tsx"
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import _ from "lodash"

const TitleLabel = (props: any) => {
    return (
        <Box display= "flex" alignItems= "center">
            {props?.children}
            <Typography sx= {{marginLeft: 1, color: props?.textColor, fontWeight: 500, fontSize: "20px", fontFamily: "Montserrat"}}>
                {`${props?.text}`}
            </Typography>
        </Box>
    )
}

const AdminPage = (props: any) => {

    const [selectedPropertyType, setSelectedPropertyType] = useState<any>("")
    const [selectedCollectionType, setSelectedCollectionType] = useState<any>("")
    const [selectedArea, setSelectedArea] = useState<any>("")

    const [dataSet, setDataSet] = useState<any>([])

    const handleChangeFilter = (e: any, type: any) => {
        console.log("asd", type, e?.target)
        if(type === "PROPERTY") {
            setSelectedPropertyType(e?.target?.value)
        }
        else if(type === "COLLECTION") {
            setSelectedCollectionType(e?.target?.value)
        }
        else if(type === "AREA") {
            setSelectedArea(e?.target?.value)
        }
    }

    const { 
        feeCollectionList, 
        updateFeeCollectionList, 
        propertyStatusConstant,
        collectionStatusConstant,
        areaListConstant,
        handleConstantsArray 
    }: any = useContext(FeeCollectionContext)

    const fetchPropertyStatus = async () => {
        const propertyStatusListResponse = await getPropertyStatusConstant()
        console.log("check", propertyStatusListResponse)
        if(propertyStatusListResponse?.success) {
            handleConstantsArray("PROPERTY", propertyStatusListResponse?.data?.propertyStatuses)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    const fetchCollectionStatus = async () => {
        const collectionStatusListResponse = await getCollectionStatusConstant()
        console.log("check", collectionStatusListResponse)
        if(collectionStatusListResponse?.success) {
            handleConstantsArray("COLLECTION", collectionStatusListResponse?.data?.collectionStatuses
            )
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    const fetchAreaConstants = async () => {
        const areaResponse = await getAreaConstant()
        console.log("areaConstant", areaResponse)
        if(areaResponse?.success) {
            handleConstantsArray("AREA", areaResponse?.data?.areas)
        }
    }

    useEffect(() => {
        if(_.isEmpty(propertyStatusConstant)) {
            fetchPropertyStatus()
        }
        if(_.isEmpty(collectionStatusConstant)) {
            fetchCollectionStatus()
        }
        if(_.isEmpty(areaListConstant)) {
            fetchAreaConstants()
        }
    }, [])

    const getCollection = async () => {
        // propertyStatus=OPEN&collectionStatus=REFUSED_TO_PAY
        let payload: any = ""

        // filter condition
        if(selectedPropertyType!=="" || selectedCollectionType!=="" || selectedArea!=="") {
            if(selectedPropertyType) {
                if(selectedCollectionType) {
                    if(selectedArea) {
                        payload = `?propertyStatus=${selectedPropertyType}&collectionStatus=${selectedCollectionType}&area=${selectedArea}`
                    }
                    else payload = `?propertyStatus=${selectedPropertyType}&collectionStatus=${selectedCollectionType}`
                }
                else if(selectedArea) {
                    payload = `?propertyStatus=${selectedPropertyType}&area=${selectedArea}`
                }
                else payload = `?propertyStatus=${selectedPropertyType}`
            }
            else if (selectedCollectionType) {
                if(selectedArea) {
                    payload = `?collectionStatus=${selectedCollectionType}&area=${selectedArea}`
                }
                else payload = `?collectionStatus=${selectedCollectionType}`
            }
            else if (selectedArea) {
                payload = `?area=${selectedArea}`
            }
        }
        console.log("payload", payload)

        let collectionList: any = []
        if(payload !== "") {
            collectionList = await getFeeCollection(payload)
        }
        else collectionList = await getFeeCollection()
        // collectionList = await payload !== "" ? getFeeCollection(payload) : getFeeCollection()
        // console.log("collectionList", collectionList)
        if(collectionList?.success){
            console.log("222", payload, collectionList?.data?.feeCollections)
            updateFeeCollectionList(collectionList?.data?.feeCollections)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    useEffect(() => {
        // if(selectedCollectionType!=="" || selectedCollectionType!=="") {
        //     getCollection()
        // }
        getCollection()
    }, [selectedPropertyType, selectedCollectionType, selectedArea])

    useEffect(() => {
        getCollection()
    }, [])

    console.log("constant", areaListConstant)

    const handleClearClick = (type: any) => {
        switch (type) {
            case "AREA" : 
                setSelectedArea("")
                break;
            
            case "PROPERTY" : 
                setSelectedPropertyType("")
                break;
            
            case "COLLECTION" : 
                setSelectedCollectionType("")
                break;
            
        }
    }

    return (
        <Box width= {1} pt= {5} pb= {4}>
            <Box width= {1}>
                <TitleLabel text= "Collection Fee List" textColor= "#27878e">
                    <LabelImportantOutlinedIcon style= {{color: "#27878e"}} />
                </TitleLabel>
            </Box>
            <Grid container justifyContent= "flex-end">
                <Grid item xs= {2} sx= {{mr: 2}}>
                    <SelectInput 
                        options= {areaListConstant} 
                        // options={[
                        //     { label: "Active", value: true },
                        //     { label: "Inactive", value: false },
                        // ]}
                        name="area"
                        label="Area"
                        value= {selectedArea}
                        valueFormat={(obj: any) => `${obj?.value}`}
                        labelFormat={(obj: any) => `${obj?.displayName.slice(2)}`}
                        // labelFormat={(obj: any) => `${_.startCase(_.camelCase(obj?.value.replace(/_/, " ")))}`}
                        // valueFormat={(obj: any) => obj?.displayName}
                        onChange={(e) => handleChangeFilter(e, "AREA")}
                        required={true}
                        helperText=""
                        sx={{"& .MuiSelect-iconOutlined": {display: selectedArea? 'none': ''}, "&.Mui-focused .MuiIconButton-root": {color: 'primary.main'}}}
                        endAdornment={<IconButton sx={{visibility: selectedArea? "visible": "hidden"}} onClick={() => handleClearClick("AREA")}><ClearIcon/></IconButton>}
                    />
                </Grid>
                <Grid item xs= {2} sx= {{mr: 2}}>
                    <SelectInput 
                        options= {propertyStatusConstant} 
                        name="property-type"
                        label="Property Type"
                        value= {selectedPropertyType}
                        // labelFormat={(obj: any) => `${obj?.displayName}`}
                        // labelFormat={(obj: any) => `${obj?.displayName.slice(2)}`}
                        labelFormat={(obj: any) => `${_.startCase(_.camelCase(obj?.value.replace(/_/, " ")))}`}
                        valueFormat={(obj: any) => obj?.displayName}
                        onChange={(e) => handleChangeFilter(e, "PROPERTY")}
                        required={true}
                        helperText=""
                        sx={{"& .MuiSelect-iconOutlined": {display: selectedPropertyType? 'none': ''}, "&.Mui-focused .MuiIconButton-root": {color: 'primary.main'}}}
                        endAdornment={<IconButton sx={{visibility: selectedPropertyType? "visible": "hidden"}} onClick={() => handleClearClick("PROPERTY")}><ClearIcon/></IconButton>}
                    />
                </Grid>
                <Grid item xs= {2}>
                    <SelectInput 
                        options= {collectionStatusConstant} 
                        name="collection-type"
                        label="Collection Type"
                        value= {selectedCollectionType}
                        // labelFormat={(obj: any) => `${obj?.displayName}`}
                        labelFormat={(obj: any) => `${_.startCase(_.camelCase(obj?.value.replace(/_/, " ")))}`}
                        valueFormat={(obj: any) => obj?.displayName}
                        onChange={(e) => handleChangeFilter(e, "COLLECTION")}
                        required={true}
                        helperText=""
                        sx={{"& .MuiSelect-iconOutlined": {display: selectedCollectionType? 'none': ''}, "&.Mui-focused .MuiIconButton-root": {color: 'primary.main'}}}
                        endAdornment={<IconButton sx={{visibility: selectedCollectionType? "visible": "hidden"}} onClick={() => handleClearClick("COLLECTION")}><ClearIcon/></IconButton>}
                    />
                </Grid>
            </Grid>
           <StyledTable isAdmin dataList= {feeCollectionList}  /> 
        </Box>
    )
}

export default AdminPage
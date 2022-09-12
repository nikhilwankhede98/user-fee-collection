import React, {useState, useContext, useEffect} from "react"
import { Typography, Box, FormHelperText, Button, TextField, OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControl from "@mui/material/FormControl";
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo, getReceiptsPdf } from "../lib/apis/index.ts"
import SelectInput from "../components/SelectInput.tsx"
import { ToastContainer, toast } from "react-toastify";
import { MONTH_OPTIONS } from "../utils/AppConstants"
import moment from 'moment';
import _ from "lodash"

const CollectFees = (props: any) => {

    let navigate = useNavigate();
    
    const { userInfo, updateUserInfo, area }: any = useContext(FeeCollectionContext)

    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const [feeCollectionId, setFeeCollectionId] = useState<any>("")
    const [upiQRCodeUrl, setUpiQRCodeUrl] = useState<any>("")

    const [enteredAmount, setEnteredAmount] = useState<any>("")
    const [helperText, setHelperText] = useState<any>("")

    const [selectedMonths, setSelectedMonths] = useState<any>([])

    useEffect(() => {
        console.log("userInfo?.propertyCode", userInfo, userInfo?.propertyCode, userInfo?.surveyKey)
        if(!userInfo?.propertyCode || !userInfo?.surveyKey) {
            navigate("/fee-collection")
        }
        // navigate("/fee-collection")
    }, [])

    const handleSelectedMonths = (e: any) => {
        let selectedItems: any = [...selectedMonths]
        selectedItems.push(`${e.target.value}-2022`)
        setSelectedMonths(selectedMonths)
    }

    const handlePayment = async (paymentOption: any, redirectionRoute: any) => {
        // if(!enteredAmount || enteredAmount === "") {
        //     setHelperText("Please enter an amount") 
        // }
        if(!selectedMonths || _.isEmpty(selectedMonths)) {
            setHelperText("This field is required") 
        }
        else {
            const response = await feeCollectionInfo({
                ddn: userInfo?.propertyCode,
                propertyStatus: "OPEN",
                collectionStatus: "CURRENT",
                createdPlatform: "User-Services-Web",
                survey: userInfo?.surveyKey,
                // survey: "5f03f560f302935a63901f63",
                // amount:"30.00",
                area: userInfo?.area,
                amount: parseFloat(enteredAmount).toFixed(2).toString(),
                type:paymentOption,
                months: selectedMonths?.map(month => `${moment().month(month).format("MM")}-2022`)
            })
            console.log("hnh", response, response?.data?.feeCollection?._id)
            if(response?.data){
                if(response?.message) {
                    toast.success(response?.message)
                }
                // updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
                if(paymentOption === "UPI") {
                    setUpiQRCodeUrl(response?.data?.payment?.data?.url)
                    updateUserInfo({feeCollectionId: response?.data?.feeCollection?._id})
                }
                else {
                    window.open(`https://universal-code.recity.in/v1/fee-collections/receipts/${response?.data?.feeCollection?._id}`)
                    navigate(redirectionRoute)
                }
                // navigate(redirectionRoute)

            }
            else {
                toast.error("Unable to fetch data ~")
            }
        }
    }

    useEffect(() => {
        if(userInfo?.feeCollectionId) {
            console.log("xxx", userInfo?.feeCollectionId)
            updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
        }
    }, [userInfo?.feeCollectionId])
    
    useEffect(() => {
        if(userInfo?.amount) {
            if(upiQRCodeUrl) {
                console.log("xxx", userInfo?.amount, userInfo?.feeCollectionId, upiQRCodeUrl)
                updateUserInfo({upiQRCodeUrl: upiQRCodeUrl})
            }
        }
    }, [userInfo?.amount])
    
    useEffect(() => {
        if(userInfo?.amount && userInfo?.feeCollectionId && upiQRCodeUrl) {
            console.log("xxx", userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl)
            navigate("/upi-payment")
        }
    }, [userInfo?.upiQRCodeUrl])

    // useEffect(() => {
    //     if(upiQRCodeUrl) {
    //         console.log('upiQRCodeUrl', upiQRCodeUrl)
    //         updateUserInfo({upiQRCodeUrl: upiQRCodeUrl})
    //     }
    // }, [upiQRCodeUrl])

    // useEffect(() => {
    //     if(feeCollectionId) {
    //         console.log("hnh", feeCollectionId, userInfo?.feeCollectionId)
    //         updateUserInfo({feeCollectionId: feeCollectionId})
    //     }
    // }, [feeCollectionId])

    // useEffect(() => {
    //     console.log("hnh", userInfo?.upiQRCodeUrl, parseFloat(enteredAmount).toFixed(2).toString())
    //     if(enteredAmount) {
    //         updateUserInfo({amount: parseFloat(enteredAmount).toFixed(2).toString()})
    //     }
    // }, [userInfo?.upiQRCodeUrl, userInfo?.feeCollectionId])

    // useEffect(() => {
    //     console.log("hnh", userInfo?.upiQRCodeUrl)
    // }, [userInfo?.upiQRCodeUrl])

    // useEffect(() => {
    //     console.log("hnh", userInfo?.feeCollectionId, userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl, userInfo?.amount!== "", userInfo?.feeCollectionId!== "")
    //     if(userInfo?.amount!== "" && userInfo?.feeCollectionId!== "" && userInfo?.upiQRCodeUrl!== "") {
    //         alert("dfsdsf")
    //         console.log("hnh", userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl)
    //         navigate("/upi-payment")
    //     }
    // }, [userInfo?.amount, userInfo?.feeCollectionId, userInfo?.upiQRCodeUrl])

    // const handlePaymentButtonClick = (paymentOption: any) => {
    //     switch (paymentOption) {
    //         case "cash" :
    //             navigate("/fee-collection")
    //             return

    //         case "upi" :
    //             navigate("/upi-payment")
    //             return
    //     }
    // }

    const handleAmountChange = (e: any) => {
        console.log("amount", e)
        const {value, name} = e?.target
        setEnteredAmount(value)
        if(!value) {
            setHelperText("Please enter an amount") 
        }
        else setHelperText("") 
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            maxWidth: 250,
          },
        },
    };

    const handleChange = (event: any) => {
        const {
          target: { value },
        } = event;
        console.log('value', value)
        setSelectedMonths(value);
        setEnteredAmount(value?.length * 30)
      };

      const newArray = selectedMonths?.map(x => `${moment().month(x).format("MM")}-2022`)
      console.log("newArray", newArray)
    
    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`Property Code : ${userInfo?.propertyCode}`}>
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    {/* <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                        Pay: ₹ 100
                    </Typography> */}
                    {selectedMonths?.length > 0 && (
                        <Typography sx= {{mb: 3, fontWeight: 600}} align= "center">
                            {`Amount : ₹${parseFloat((selectedMonths?.length * 30).toFixed(2))}`}
                        </Typography>
                    )}
                    
                    <FormControl style={{width: 250}}>
                        {/* <Box mb= {3} width= {1}>
                            <TextField 
                                InputLabelProps={{
                                    style: { color: "#f2a17e" }
                                }}
                                fullWidth 
                                id="outlined-basic" 
                                label="Enter Amount" 
                                variant="outlined" 
                                size= "small" 
                                sx={{ input: { color: "#27878E" }}}
                                value= {enteredAmount}
                                onChange= {(e) =>handleAmountChange(e)}
                                type="number"
                                // helperText={helperText || ""}
                            />
                                {helperText && helperText!== "" && (
                                    // <Typography>
                                    //     {areaHelperText}
                                    // </Typography>
                                    <FormHelperText id="my-helper-text" error>{helperText}</FormHelperText>
                                )}
                        </Box> */}
                        <Box mb= {3} width= {1}>
                            <InputLabel
                                sx= {{
                                    color: "#f2a17e",
                                    fontSize: "1rem",
                                    // "& .Mui-focused": {
                                    //     color: "orange"
                                    // }
                                }}
                                // classes={{
                                //     focused: { color: "#27878E!important"},
                                //     root: {color: themeObj?.labelTextColor
                                //         ? themeObj?.labelTextColor
                                //         : "#f2a17e",
                                //     fontSize: "1rem"},
                                // }}
                                id={"months"}
                                // {...InputLabelProps}
                            >
                                {"Select Month(s)"}
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedMonths}
                                onChange={handleChange}
                                // input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                fullWidth
                                size= "small"
                                // label= "Select Month(s)"
                                placeholder= "Select Month(s)"
                            >
                                {/* {MONTH_OPTIONS.map((variant, index) => (
                                    <MenuItem key={index} value={variant?.name}>
                                        <Checkbox checked={selectedMonths.indexOf(variant) > -1} />
                                        <ListItemText primary={variant.name} />
                                    </MenuItem>
                                ))} */}
                                {MONTH_OPTIONS.map((month, index) => (
                                    <MenuItem key={index} value={month}>
                                    <Checkbox checked={selectedMonths?.indexOf(month) > -1} />
                                    <ListItemText primary={month} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {helperText && helperText!== "" && (
                                <FormHelperText id="my-helper-text" error>{helperText}</FormHelperText>
                            )}
                        </Box>
                    </FormControl>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="success" fullWidth onClick = {() => handlePayment("CASH", "/fee-collection")} >
                            Cash
                        </Button>
                    </Box>
                    <Box mb= {3} width= {1}>
                        <Button variant="contained" color="info" fullWidth onClick = {() => handlePayment("UPI", "/upi-payment")} >
                            UPI
                        </Button>
                    </Box>
                </Box>
            </BorderBox>
        </Box>
    )
}

export default CollectFees
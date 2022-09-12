import React, {useState, useContext} from "react"
import { Box, Button, TextField, Typography} from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import StyledDatePicker from "../components/StyledDatePicker.tsx"
import { useNavigate } from "react-router-dom";
// import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from 'react-datetime-picker';
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"
import { feeCollectionInfo } from "../lib/apis/index.ts"
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash"


const RevisitPage = (props: any) => {

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    let navigate = useNavigate();
    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const handleRevisitCollection = async (redirectionRoute) => {
        console.log("date", selectedDateTime, new Date(), "Sat Sep 15 2022 12:00:00 GMT+0530 (India Standard Time)")
        const response = await feeCollectionInfo({
            ddn: userInfo?.propertyCode,
            propertyStatus: "REVISIT",
            collectionStatus: "N.A",
            createdPlatform: "User-Services-Web",
            // need to send dynamically
            survey: userInfo?.surveyKey,
            // survey: "5f03f560f302935a63901f63",
            rescheduled: selectedDateTime
            // rescheduled: "Sat Sep 15 2022 12:00:00 GMT+0530 (India Standard Time)"
        })
        console.log("555", response, selectedDateTime)
        if(response?.data){
            if(response?.message) {
                toast.success(response?.message)
            }
            navigate(redirectionRoute)
        }
        else {
            toast.error("Unable to fetch data ~")
        }
    }

    console.log('selectedDateTime', selectedDateTime)

    return (
        <Box pt= {6}>
            {/* <BorderBox text= {`Property Code : ${userPropertyCode}`}> */}
            <BorderBox text= {`Property Code : ${userInfo?.propertyCode}`}>
                <Box width= {1} display= "flex" alignItems= "center" flexDirection= "column" mb= {2}>
                    <Typography color= "#27878e" sx= {{fontWeight: 600, fontFamily: "Montserrat", mb: 1}}>
                        {`Owner Name : ${userInfo?.ownerName}`}
                    </Typography>

                    <Typography color= "#27878e" sx= {{fontWeight: 600, fontFamily: "Montserrat"}}>
                        {`Contact Number : ${userInfo?.contactNumber}`}
                    </Typography>
                </Box>
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <Box mb= {3} width= {1}>
                        <TextField
                            id="outlined-name"
                            label="Selected Area"
                            // value={_.capitalize(_.lowerCase(userInfo?.area.slice(2).replace(/_/, " ")))}
                            value={_.startCase(_.camelCase(userInfo?.area.slice(2).replace(/_/, " ")))}
                            // value={userInfo?.area.replace(/_/," ")}
                            disabled
                            fullWidth
                            size="small"
                            InputLabelProps={{
                                style: { color: "#f2a17e" }
                            }}
                            sx={{ input: { color: "#f2a17e" }}}
                        />
                    </Box>
                    <Box mb= {3} width= {1}>
                        {/* <StyledDatePicker selectedDateTime= {selectedDateTime} setSelectedDateTime= {setSelectedDateTime} /> */}
                        <DateTimePicker onChange={setSelectedDateTime} value={selectedDateTime} />
                        {/* <DateTimePicker 
                            label= "Date Time Picker"
                            renderInput= { (params: any) => <TextField {...params} />}
                            value= {selectedDateTime}
                            onChange= {(newValue: any) => setSelectedDateTime(newValue)}
                        /> */}
                    </Box>
                    <Box  width= {1}>
                        <Button variant="contained" color="success" fullWidth onClick = {() => handleRevisitCollection("/fee-collection")} >
                            Schedule Revisit
                        </Button>
                    </Box>
                </Box>
            </BorderBox>
        </Box>
    )
}

export default RevisitPage
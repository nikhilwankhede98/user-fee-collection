import React, {useState} from "react"
import { Box, Button, TextField,} from "@mui/material";
import BorderBox from "../components/BorderBox.tsx"
import StyledDatePicker from "../components/StyledDatePicker.tsx"
import { useNavigate } from "react-router-dom";
// import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from 'react-datetime-picker';

const RevisitPage = (props: any) => {

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

    let navigate = useNavigate();
    const {userPropertyCode = "RC-UKMS-PT-10054"} = props

    const handlePaymentButtonClick = (paymentOption: any) => {
        switch (paymentOption) {
            case "cash" :
                navigate("/fee-collection")
                return

            case "upi" :
                navigate("/upi-payment")
                return
        }
    }

    console.log('selectedDateTime', selectedDateTime)

    return (
        <BorderBox text= {`User Property Code : ${userPropertyCode}`}>
            <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                <Box mb= {3} width= {1}>
                    <TextField
                        id="outlined-name"
                        label="Selected Area"
                        value={"Mumbai"}
                        disabled
                        fullWidth
                        size="small"
                        sx={{ input: { color: "#f2a17e", fontSize: "18px" }}}
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
                    <Button variant="contained" color="success" fullWidth onClick = {() => handlePaymentButtonClick("upi")} >
                        Schedule Revisit
                    </Button>
                </Box>
            </Box>
        </BorderBox>
    )
}

export default RevisitPage
import React, {useState} from "react"
import {DateTimePicker, LocalizationProvider} from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, TextField, ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";

const StyledDatePicker = (props: any) => {

    return (
        <DateTimePicker 
            label= "Date Time Picker"
            renderInput= { (params: any) => <TextField {...params} />}
            value= {props?.selectedDateTime}
            onChange= {(newValue: any) => props?.setSelectedDateTime(newValue)}
        />
    )
}

export default StyledDatePicker
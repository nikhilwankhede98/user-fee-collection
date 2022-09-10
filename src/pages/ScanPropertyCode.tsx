import React, {useState} from "react"
import { Typography, Box } from "@mui/material";
import QrReader from 'react-qr-scanner'
import BorderBox from "../components/BorderBox.tsx"
import { useNavigate } from "react-router-dom";

const ScanPropertyCode = (props: any) => {

    let navigate = useNavigate();

    const [delay, setDelay] = useState<any>(5000)
    const [result, setResult] = useState<any>('No result')

    const handleScan = (data: any) => {
        setResult(data)
        console.log("scanned", data)
        if(data) {
            navigate("/user-availablity-status")
        }
    }

    const handleError = (err) => {
        console.error(err)
    }

    const previewStyle = {
        height: 240,
        width: 320,
      }

    return (
        <Box width= {1} pt= {4}>
            <BorderBox >
                <Box sx={{ minWidth: 240 }} display= "flex" flexDirection= "column" justifyContent= "center">
                    <QrReader
                        delay={delay}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                    {result && (
                        <p>{result?.text}</p>
                    )}
                </Box>
            </BorderBox>
        </Box>
    )
}

export default ScanPropertyCode
import React, {useState, useContext} from "react"
import { Typography, Box } from "@mui/material";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
import AppLoader from "./AppLoader.tsx"
import Homepage from "../pages/HomePage.tsx"
import AdminPage from "../pages/AdminPage.tsx"
import FeeCollectPage from "../pages/FeeCollectPage.tsx"
import UserAvailabilityStatus from "../pages/UserAvailabilityStatus.tsx"
import UserAvailable from "../pages/UserAvailable.tsx"
import CollectFees from "../pages/CollectFees.tsx"
import RevisitPage from "../pages/RevisitPage.tsx"
import ScanPropertyCode from "../pages/ScanPropertyCode.tsx"
import UPIPaymentViaQr from "../pages/UPIPaymentViaQr.tsx"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"


const MainComponent = (props: any) => {

    const { isLoading, handleLoader }: any = useContext(FeeCollectionContext)

    return (
        <Box>
            {isLoading ? ( <AppLoader /> ) : 
                (
                    <Routes>
                        <Route path="/" element={ <Homepage /> } />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/fee-collection" element={<FeeCollectPage />} />
                        <Route path="/scan-property-code" element={<ScanPropertyCode />} />
                        <Route path="/user-availablity-status" element={<UserAvailabilityStatus />} />
                        <Route path="/user-available" element={<UserAvailable />} />
                        <Route path="/collect-fees" element={<CollectFees />} />
                        <Route path="/upi-payment" element={<UPIPaymentViaQr />} />
                        <Route path="/revisit" element={<RevisitPage />} />
                    </Routes>
                )
            }
        </Box>
    )
}

export default MainComponent
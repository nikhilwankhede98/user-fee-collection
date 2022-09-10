import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Box } from "@mui/material";

import MainAppbar from "./components/Appbar.tsx"
import Homepage from "./pages/HomePage.tsx"
import AdminPage from "./pages/AdminPage.tsx"
import FeeCollectPage from "./pages/FeeCollectPage.tsx"
import UserAvailabilityStatus from "./pages/UserAvailabilityStatus.tsx"
import UserAvailable from "./pages/UserAvailable.tsx"
import CollectFees from "./pages/CollectFees.tsx"
import RevisitPage from "./pages/RevisitPage.tsx"
import ScanPropertyCode from "./pages/ScanPropertyCode.tsx"
import UPIPaymentViaQr from "./pages/UPIPaymentViaQr.tsx"

import FeeCollectionProvider from "./lib/context/FeeCollectionContext.tsx"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <div>
        <FeeCollectionProvider>
          {/* <MainAppbar /> */}
          {/* <Box px= {{xs: "1rem", md: "2rem"}} py= {2}> */}
            <BrowserRouter>
              <MainAppbar />
              <Box px= {{xs: "1rem", md: "2rem"}} py= {2}>
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
              </Box>
            </BrowserRouter>
          {/* </Box> */}
          <ToastContainer />
        </FeeCollectionProvider>
      </div>
  );
}

export default App;

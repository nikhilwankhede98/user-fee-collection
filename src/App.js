import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainAppbar from "./components/Appbar.tsx"
import Homepage from "./pages/HomePage.tsx"
import AdminPage from "./pages/AdminPage.tsx"
import FeeCollectPage from "./pages/FeeCollectPage.tsx"
import UserAvailabilityStatus from "./pages/UserAvailabilityStatus.tsx"
import UserAvailable from "./pages/UserAvailable.tsx"
import CollectFees from "./pages/CollectFees.tsx"
import { Box } from "@mui/material";

function App() {
  return (
    <div>
      <MainAppbar />
      <Box px= {{xs: "1rem", md: "2rem"}} py= {2}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Homepage /> } />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/fee-collection" element={<FeeCollectPage />} />
            <Route path="/user-availablity-status" element={<UserAvailabilityStatus />} />
            <Route path="/user-available" element={<UserAvailable />} />
            <Route path="/collect-fees" element={<CollectFees />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;

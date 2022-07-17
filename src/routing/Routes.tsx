import { useColorMode } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/Auth";
import { AllBookingsHistory } from "../pages/history/AllBookingsHistory";
import { Home } from "../pages/Home";
import { UserContext } from "../providers/GAuthProvider";

const PageRoutes = () => {
  const { actualUser } = useContext(UserContext)
  const { setColorMode } = useColorMode()
  useEffect(() => setColorMode("dark"))
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={actualUser ? <Home /> : <Auth />}/>
        <Route path="/history" element={<AllBookingsHistory />}/>
      </Routes>
    </Router>
  )
}

export default PageRoutes;
import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Navbar } from "./components/Navbar";
import Baneo from "./components/Mascota/Baneo";
import Mantennimiento from "./components/Mascota/Mantennimiento";

export const AppRouter = () => {
    return(
        <>
        
        <Routes>

            <Route path="/" 
            element={
                !isUserAuthenticated() ? (
                    <Navbar></Navbar>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            ></Route>
            <Route path="/Baneo" element={<Baneo/>} />
            <Route path="/mantenimiento" element={<Mantennimiento/>} />

        </Routes>
        </>
    );
};

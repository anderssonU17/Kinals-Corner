import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Navbar } from "./components/Navbar";

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

        </Routes>
        </>
    );
};

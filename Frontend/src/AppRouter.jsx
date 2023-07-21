import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Navbar } from "./components/Navbar";
import { Login } from "./auth/pages/Login";
import { Teachers } from "./teachers/pages/Teachers";

export const AppRouter = () => {
    return(
        <>
        <Routes>
        <Route path="/" 
            element={isUserAuthenticated() ? <Navbar/> : <Navbar/>}
        />


            <Route path="/login" 
            element={
                !isUserAuthenticated() ? (
                    <Login></Login>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            ></Route>
            <Route path="/teachers" 
            element={
                isUserAuthenticated() ? (
                    <Teachers></Teachers>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            ></Route>

        </Routes>
        </>
    );
};

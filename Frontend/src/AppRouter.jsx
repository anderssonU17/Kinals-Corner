import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Login } from "./auth/pages/Login";
import { Teachers } from "./teachers/pages/Teachers";
import { HomePage } from "./home/pages/HomePage";

export const AppRouter = () => {
    return(
        <>
        <Routes>
        <Route path="/" 
            element={isUserAuthenticated() ? <HomePage/> : <HomePage/>}
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

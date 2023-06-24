import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Register } from "./register/pages/Register";
import { Login } from "./auth/pages/Login";
import { Foro } from "./foro/pages/Foro";

export const AppRouter = () => {
    return(
        <>
        
        <Routes>

            <Route  path="/" 
            element={
                isUserAuthenticated() ? (
                <UserTable />
                ) : (
                    <Navigate to="/login"></Navigate>
                    )
                }
            ></Route>

            <Route path="/login" 
            element={
                !isUserAuthenticated() ? (
                    <Login></Login>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            ></Route>

        </Routes>
        </>
    );
};

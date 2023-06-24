import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login/components/Login";
import { isUserAuthenticated } from "./Login/helpers/LoginHelper";
import { Register } from "./register/pages/Register";


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
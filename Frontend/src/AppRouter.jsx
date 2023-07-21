import { Navigate, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
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
=======
import { CreateHelpSocial } from "./helpSocial/pages/HelpSocial";
import { ListHelpSocial } from "./helpSocial/pages/ListHelpSocial";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<CreateHelpSocial style={{ backgroundColor: "#92aea6" }} />}
        />
        <Route
          path="/list-helpSocial"
          element={<ListHelpSocial style={{ backgroundColor: "#92aea6" }} />}
        />
      </Routes>
    </>
  );
>>>>>>> jcastro-2021416
};

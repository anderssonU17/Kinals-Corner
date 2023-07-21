import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
import { Register } from "./register/pages/Register";
import { Teachers } from "./teachers/pages/Teachers"
import { Login } from "./auth/pages/Login";
import { Foro } from "./foro/pages/Foro";
import { useEffect } from "react";

export const AppRouter = () => {
    const navigate = useNavigate() // para redirigir a un vista en especifico
    useEffect(() => {
    if (!isUserAuthenticated()) { // Redirigir al usuario a la página de inicio de sesión en caso de no haber iniciado sesion 
    navigate("/login");
    }
    }, [navigate]);

    return (
    <>
        <Routes> 
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teachers" element={<Teachers/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/foro" element={<Foro />} />
        </Routes>
    </>
    );
};
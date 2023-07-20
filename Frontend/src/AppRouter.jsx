import { Route, Routes } from "react-router-dom"
import { Teachers } from "./teachers/pages/Teachers"
import { Login } from "./auth/pages/Login"

export const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
    </Routes>
    </>
  )
}

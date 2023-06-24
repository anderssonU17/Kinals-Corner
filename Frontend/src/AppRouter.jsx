import { Route, Routes } from "react-router"
import { Register } from "./register/pages/Register"

export const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/"
        element={<Register></Register>}
        >
            
        </Route>
    </Routes>
    </>
  )
}

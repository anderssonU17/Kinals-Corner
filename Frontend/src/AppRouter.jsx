import { Route, Routes } from "react-router-dom"
import { Teachers } from "./teachers/pages/Teachers"

export const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Teachers/>}/>
    </Routes>
    </>
  )
}

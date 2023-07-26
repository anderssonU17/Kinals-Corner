import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { HelpSocials } from "./helpSocial/pages/HelpSocial";

export const AppRouter = () => {
    return (
      <>
        <Routes>
        <Route
            path="/create-helpSocial"
            element={<HelpSocials/>}
          />
        </Routes>
      </>
    );
  };

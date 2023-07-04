import { Navigate, Route, Routes } from "react-router-dom";
import { CreateHelpSocial } from "./helpSocial/pages/HelpSocial";
import { ListHelpSocial } from "./helpSocial/pages/ListHelpSocial";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/create-helpSocial"
          element={<CreateHelpSocial style={{ backgroundColor: "#92aea6" }} />}
        />
        <Route
          path="/list-helpSocial"
          element={<ListHelpSocial style={{ backgroundColor: "#92aea6" }} />}
        />
      </Routes>
    </>
  );
};

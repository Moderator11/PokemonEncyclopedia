import { BrowserRouter, Route, Routes } from "react-router-dom";
import Title from "../pages/Title";
import Dex from "../pages/Dex";
import Detail from "../pages/Detail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/dex" element={<Dex />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

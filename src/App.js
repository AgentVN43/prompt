import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateContent from "./components/CreateContent/Content";
import Home from "./pages/Home";
import DigitalMarketing from "./components/Business/DigitalMarketing";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<CreateContent />} />
          <Route path="/marketing" element={<DigitalMarketing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

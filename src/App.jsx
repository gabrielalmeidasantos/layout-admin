import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Funnel from "./pages/Funnel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/funnel" element={<Funnel />} />
      </Routes>
    </div>
  );
};

export default App;

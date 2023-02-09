import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import TemplateApp from "./TemplateApp";


const App = ({ signOut }) => {
  return <Routes>
    <Route path = "/" element = {<HomePage/>}></Route>
    <Route path = "/DocTemplater" element = {<TemplateApp/>}></Route>
  </Routes>
}

export default App;
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Personas from "./pages/Personas";
import PersonasDetalles from "./pages/PersonasDetalles";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Personas" component={Personas} />
        <Route exact path="/Personas/:id" component={PersonasDetalles} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

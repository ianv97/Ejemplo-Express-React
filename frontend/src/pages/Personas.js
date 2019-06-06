import React from "react";
import Grid from "@material-ui/core/Grid";
import TablaPersonas from "../components/TablaPersonas";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

class Personas extends React.Component {
  render() {
    return (
      <div className="mx-5 my-5">
        <Grid container spacing={2}>
          <Grid item>
            <h1>Personas</h1>
          </Grid>
          <Grid item>
            <Link to="/Personas/Añadir">
              <Fab color="primary" size="medium">
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
        </Grid>
        <TablaPersonas />
      </div>
    );
  }
}

export default Personas;

import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import post from "../methods/post.js";
import put from "../methods/put.js";
import del from "../methods/delete.js";

class PersonasDetalles extends React.Component {
  state = {
    add: false,
    edit: false,
    delete: false,
    form: { _id: null, name: "", dni: 0 }
  };

  componentDidMount() {
    if (this.props.match.params.id !== "Añadir") {
      this.getData();
    }
    this.changeMode();
  }

  componentDidUpdate() {
    this.changeMode();
  }

  changeMode() {
    if (this.props.match.params.id === "Añadir") {
      if (!this.state.add) {
        this.setState({ add: true });
      }
    } else {
      const params = new URLSearchParams(this.props.location.search);
      if (params.get("edit") && !this.state.edit) {
        this.setState({ edit: true });
      } else if (params.get("delete") && !this.state.delete) {
        this.setState({ delete: true });
      }
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  edit = e => {
    const params = new URLSearchParams(this.props.location.search);
    if (!params.get("edit")) {
      this.props.history.push(
        "/Personas/" + this.props.match.params.id + "?edit=true"
      );
    }
  };

  delete = e => {
    const params = new URLSearchParams(this.props.location.search);
    if (!params.get("delete")) {
      this.props.history.push(
        "/Personas/" + this.props.match.params.id + "?delete=true"
      );
    }
  };

  async getData() {
    const response = await fetch(
      "http://localhost:3001/api/personas/" + this.props.match.params.id
    );
    const data = await response.json();
    this.setState({
      form: {
        _id: data._id,
        name: data.name,
        dni: data.dni
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.add) {
      post("http://localhost:3001/api/personas", this.state.form);
      this.props.history.push("/Personas");
    } else if (this.state.edit) {
      put("http://localhost:3001/api/personas", this.state.form);
      this.setState({ edit: false });
      this.props.history.push("/Personas/" + this.props.match.params.id);
    } else if (this.state.delete) {
      del("http://localhost:3001/api/personas/" + this.props.match.params.id);
      this.props.history.push("/Personas");
    }
  };

  render() {
    return (
      <div className="mx-5 my-5">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link color="inherit" to="/">
            Gestión de personas
          </Link>
          <Link color="inherit" to="/Personas">
            Personas
          </Link>
          <Typography color="textPrimary">
            {this.props.match.params.id}
          </Typography>
        </Breadcrumbs>

        <Grid container direction="column">
          <Grid container direction="row" justify="center" className="mt-5">
            <Grid item>
              <h1>Personas</h1>
            </Grid>
          </Grid>
          <form onSubmit={this.handleSubmit}>
            {this.state.add ? null : (
              <Grid container direction="row" justify="center" className="mt-3">
                <Grid item>
                  <TextField
                    label="ID"
                    margin="normal"
                    variant="outlined"
                    name="_id"
                    value={this.state.form._id}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container direction="row" justify="center">
              <Grid item>
                <TextField
                  required
                  label="Nombre"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.form.name}
                  InputProps={{
                    readOnly: !this.state.edit && !this.state.add
                  }}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="DNI"
                  margin="normal"
                  variant="outlined"
                  name="dni"
                  onChange={this.handleChange}
                  value={this.state.form.dni}
                  InputProps={{
                    readOnly: !this.state.edit && !this.state.add
                  }}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" className="mt-3">
              {this.state.add || this.state.edit || this.state.delete ? (
                this.state.add || this.state.edit ? (
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-success"
                    >
                      Guardar
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button type="submit" variant="contained" color="secondary">
                      Confirmar eliminación
                    </Button>
                  </Grid>
                )
              ) : (
                <Grid item>
                  <Box component="div" display="none">
                    <Button type="submit" />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.delete}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-warning ml-4"
                    onClick={this.edit}
                  >
                    Editar
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }
}

export default PersonasDetalles;

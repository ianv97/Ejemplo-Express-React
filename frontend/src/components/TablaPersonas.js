import React from "react";
import MaterialTable from "./MaterialTable.js";

class TablaPersonas extends React.Component {
  state = {
    loading: true,
    error: null,
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (!this.state.error) {
      this.getData();
    }
  }

  async getData() {
    try {
      const response = await fetch("http://localhost:3001/api/personas");
      if (!response.ok) {
        throw Error(response.status + " " + response.statusText);
      }
      const data = await response.json();
      const displayData = [];
      data.forEach(function(person) {
        displayData.push([person._id, person.name, person.dni]);
      });
      this.setState({
        data: displayData
      });
    } catch (error) {
      this.setState({
        error: error
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <MaterialTable
        titles={["ID", "Nombre", "DNI"]}
        data={this.state.data}
        loading={this.state.loading}
        error={this.state.error}
      />
    );
  }
}

export default TablaPersonas;

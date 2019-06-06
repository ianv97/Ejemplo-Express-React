const express = require("express");
const app = express();
const port = "3001";
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/express-api";
const bodyParser = require("body-parser");
const apiRoutes = require("./api");

app.listen(port, () => {
  console.log(`[Express App] The app is listening on port: ${port}`);
});

mongoose.connect(mongoUri);

app.use(bodyParser.json()); // Convertirá el cuerpo en un objeto JSON.
app.use(cors());

app.get("/api/personas/", apiRoutes.loadPersons);
app.get("/api/personas/:id", apiRoutes.loadPerson);
app.post("/api/personas/", apiRoutes.newPerson);
app.put("/api/personas/", apiRoutes.updatePerson); // No lleva parámetro id, ya que lo mandamos en el body.
app.delete("/api/personas/:id", apiRoutes.deletePerson);

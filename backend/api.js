const Db = require("./dal");

module.exports = {
  loadPersons: async (req, res) => {
    const Entries = await Db.getPersons();
    res.status(200);
    res.json(Entries);
  },
  loadPerson: async (req, res) => {
    const Entry = await Db.getPerson(req.params.id);
    res.status(200);
    res.json(Entry);
  },
  newPerson: async (req, res) => {
    const newEntry = await Db.createOrUpdatePerson(req.body);
    res.status(201);
    res.json(newEntry);
  },
  updatePerson: async (req, res) => {
    const updatedEntry = await Db.createOrUpdatePerson(req.body);
    res.status(201);
    res.json(updatedEntry);
  },
  deletePerson: async (req, res) => {
    const deletedEntry = await Db.deletePerson(req.params.id);
    res.status(204);
    res.json(deletedEntry);
  }
};

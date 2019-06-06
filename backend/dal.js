const Person = require("./personSchema");

module.exports = {
  async getPersons() {
    const Persons = await Person.find({});
    return Persons;
  },
  async getPerson(id) {
    const currentPerson = await Person.findById(id);
    return currentPerson;
  },
  async createOrUpdatePerson(person) {
    if (person._id) {
      const updatedPerson = await Person.findByIdAndUpdate(person._id, person, {
        new: true
      });
      return updatedPerson;
    }

    const newPerson = await Person.create(person);
    return newPerson;
  },
  async deletePerson(id) {
    const deletedPerson = await Person.findByIdAndRemove(id);
    return deletedPerson;
  }
};

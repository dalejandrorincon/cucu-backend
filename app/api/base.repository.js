const cleanFields = (data = {}, fields) => {
  if (!fields.length) return data;
  let model = {};
  for (const i of fields) if (data[i]!=null || typeof data[i]==="boolean") model[i] = data[i];
  return model;
};

class baseRepository {
  constructor(fields = []) {
    this.model = this.getModel();
    this.fields = fields;
  }

  getModel() {
    throw new Error('You have to implement the method getModel!');
  }

  find() {
    return this.model.query();
  }

  findById(id) {
    return this.model.query().findById(id);
  }

  findOne(conditions = {}) {
    return this.model.query().findOne(conditions);
  }

  create(data) {
    let info = cleanFields(data, this.fields);
    return this.model.query().insert(info);
  }

  update(data = {}, where = {}) {
    let info = cleanFields(data, this.fields);
    return this.model
      .query()
      .patch(info)
      .where(where)
      .returning('*')
      .then(array => (array.length ? array[0] : null));
  }

  deleteById(id) {
    let del = {deleted: true}
    return (
      this.update({...del},{id: id})
    )
  }

  /* delete() {
    return this.model.query().delete();
  } */

  query() {
    return this.model.query();
  }
}

module.exports = baseRepository;

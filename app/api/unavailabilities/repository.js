const Base = require('../base.repository');
const Unavailability = require('./entity');

const fields = [
  'from',
  'to',
  'deleted',
  'translator_id',
  'deleted'
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Unavailability;
  }

  getAllUnavailabilities() {
    return this.model
      .query()
      .where("deleted", false);
  }

  getUserUnavailabilities(page, page_limit, userId, min_date, max_date, sort_by, sort_order){
    if(sort_by=="created_at_asc"){
      sort_by="created_at"
      sort_order="asc"
    }

    if(sort_by=="date_asc"){
      sort_by="date"
      sort_order="asc"
    }

    console.log(sort_by)
    return this.model
      .query()
      .where("deleted", false)
      .where("translator_id", userId)
      .page(page-1, page_limit)
      .andWhere(function () {
        if (min_date && max_date) {
          console.log(min_date)
          this.whereBetween("unavailabilities.from", [
            min_date,
            max_date
          ]);
          this.whereBetween("unavailabilities.to", [
            min_date,
            max_date
          ]);
        }
      })

      .orderBy("unavailabilities."+sort_by, sort_order)
  }

  getAllUserUnavailabilities(id){
    return this.model
    .query()
    .where("deleted", false)
    .where("translator_id", id)
    .orderBy("unavailabilities."+sort_by, sort_order)
  }

  getAllUserUnavailabilities(userId){
    return this.model
      .query()
      .where("deleted", false)
      .where("translator_id", userId)
      .orderBy('created_at')
  }

  getUnavailabilities(page, page_limit) {
    return this.model
      .query()
      .where("deleted", false)
      .orderBy('created_at')
      .page(page-1, page_limit)
  }
}

module.exports = new Repository(fields);

const { db } = require('./../models/dbInit')

module.exports = function getJurisdictionContactInfos(req, res, next) {
  let jurisdiction_id = req.query.jurisdiction_id
  let contact_infos = Object.create(null)

  //INSERT YOUR CODE HERE
  return res.json({ contact_infos })
}

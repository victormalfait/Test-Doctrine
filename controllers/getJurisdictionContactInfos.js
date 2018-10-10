const { db } = require('./../models/dbInit')
const contact_key = ['telephone', 'fax', 'email'];

module.exports = function getJurisdictionContactInfos(req, res, next) {
  let jurisdiction_id = req.query.jurisdiction_id
  let contact_infos = Object.create(null)
  getJuridiction(jurisdiction_id, (data, err) => {
    if (err) return next(err)
    contact_infos = data;

    getJuricictionVerifiedContactInfos(jurisdiction_id, (datas, err) => {
      if (err) return next(err)

      datas.forEach((data) => {
        contact_infos[data.type].push({ 'data': data.data, 'verified': true});
      })

      return res.json({ contact_infos })
    })
  })
}

function getJuridiction (jurisdiction_id, callback) {
  let tab = Object.create(null);
  db.get(`
    SELECT  *
    FROM jurisdictions
    WHERE jurisdiction_id = ?`
    , [jurisdiction_id], (err, row) => {
      if (err) return callback(null, err)

      if (row == null) return callback(null, new Error('Could not find jurisdiction'))

      Object.keys(row).forEach((key) => {
        if (contact_key.indexOf(key) > -1) {
          tab[key] = []
          if (row[key]) tab[key].push({'data': row[key], 'verified': false})
        }
      })
      callback(tab, null)
    })
}

function getJuricictionVerifiedContactInfos (jurisdiction_id, callback) {
  db.all(`
    SELECT *
    FROM jurisdictions_verified_contact_infos
    WHERE jurisdiction_id = ?`
    , [jurisdiction_id], (err, rows) => {
      if (err) callback(null, err)

      if (rows == null) return callback(null, new Error('Could not find jurisdiction verified'))
      callback(rows, null)
  })


}

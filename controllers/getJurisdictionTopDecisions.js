const { db } = require('./../models/dbInit')

module.exports = function getJurisdictionTopDecisions(req, res, next) {
  let decisions_top = []
  db.all(`
  SELECT title, doc_id
  FROM decisions
  WHERE formation = 'CHAMBRE_CRIMINELLE' 
  AND solution like '%cassation%'
  AND dec_date  > '1980-01-01'
  ORDER BY dec_date DESC
  LIMIT 10`
  , [], (err, rows) => {
    if(err) return next(err)

    if (rows === null) return next(new Error('Could not find decision'))

    rows.forEach((row) => {
      decisions_top.push({'title': row.title, 'url': '/jurisdiction/decision/' + row.doc_id})
    })

    return res.json(decisions_top)
  })
}
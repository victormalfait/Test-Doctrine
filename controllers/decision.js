const { db } = require('../models/dbInit')


module.exports = function(req, res, next) {
  let decision_id = req.params.decision_id

  db.get(`
    SELECT *
    FROM decisions
    WHERE doc_id = ?
    `
    , [decision_id], (err, row) => {
      if (err) return next(err)

      if (row == null) return next(new Error('Could not find jurisdiction'))
      res.locals.decision_infos = row
      res.render('decision')
    })
}
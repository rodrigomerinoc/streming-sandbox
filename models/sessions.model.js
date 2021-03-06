const con = require('./database')

const Session = function (session) {
  this.user_id = session.user_id
  this.video_id = session.video_id
  this.started = session.started 
  this.segments = session.segments 
}

Session.create = (newSession, result) => {
  con.query('INSERT INTO sessions set ?', newSession, function (error, results) {
    if (error) {
      console.error('error creating session', error)
      result(error, null)
      return
    }
    console.log('session creada exitosamente')
    result(null, { started: newSession.started })
    return
  })
}

Session.find = (user_id, video_id, result) => {
  const sql = 'select * from sessions where user_id = "' + user_id + '" and video_id = ' + video_id 
  con.query(sql, (err, res) => {
    if (err) {
      console.log('Error', err)
      result(null, err)
      return
    }
    console.log('Session recuperado')
    result(null, res[0])
  })
}

Session.destroy = (user_id, video_id, result) => {
    const sql = 'delete from sessions where user_id = "' + user_id + '" and video_id = ' + video_id 
    con.query(sql, (err, res) => {
      if (err) {
        console.log('Error', err)
        result(null, err)
        return
      }
      console.log('Session recuperado')
      result(null, res[0])
    })
  }

  Session.update = (session, result) => {
    const sql  = 'update sessions set user_id = ?, video_id = ?, started = ?, segments = ?  where id = ?'
    con.query(sql,[session.user_id, session.video_id, session.started, session.segments,  session.id ], function(error, results){
        if (error) {
            console.error('error updating session', error)
            result(error, null)
            return
        } else {
            console.log('session updated')
            result(null, results)
            return
        }
        
    })
  }

module.exports = Session
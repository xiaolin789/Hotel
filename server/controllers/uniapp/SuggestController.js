const db = require('../../db/index')

const SuggestController = {
    add: async (req, res) => {
        const {content} = req.body
        const create_time = new Date()
        const sql = "insert into hotel_suggest (content, create_time) values (?,?)"
        db.query(sql, [content,create_time], (err, reslut) => {
            if(err) throw err
            res.send({
                code: '200'
            })
        })
    }
}


module.exports = SuggestController
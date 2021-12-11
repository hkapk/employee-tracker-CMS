const { initial } = require("lodash");
const db = require("../db/connection");

function viewDept() {
    const sql = "SELECT * FROM departments;";
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

module.exports = viewDept;
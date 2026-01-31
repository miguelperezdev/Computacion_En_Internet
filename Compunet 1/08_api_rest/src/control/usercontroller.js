const dbConnection = require("../connection/database")
const user = require("../model/user")

const UserController = {
    list: (req, res) => {
	const db = dbConnection.readDB()
	res.status(200).send(db.users)
    },

    get: (req, res) => {
	console.log(req.params)
	res.status(200).send("Get element")
    }, 

    create: (req, res) => {
	console.log(req.body)
	res.status(201).send("Create User")
    }
}

module.exports = UserController

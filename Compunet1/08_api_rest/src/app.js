const express = require("express")
const user = require("./control/usercontroller")

const app = express()

app.use(express.json())

const port = 5000

///////////////////////
//  User controller  //
///////////////////////
app.get("/users", user.list)

app.get("/users/:id", user.get)

app.post("/users/:id", user.create)



app.get("/", (req, res) => {
    res.status(200).send("Hola ")
})

app.post("/", (req, res) => {
    res.status(201).send("Created")
})

app.get("/echo", (req, res) => {
    res.status(418).send("ECHO")
})

app.put("/", (req, res) => {
    res.status(204).send(" HOLA DESDE EL API ")
})

app.delete("/", (req, res) => {
    res.status(204).send("EEEEEE")
})

// siempre al final 
app.listen(port)

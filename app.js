const express = require("express")
const app = express()

console.log("booting up app!")

app.use("/", express.static("static"))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

app.listen(3000, () => {
	console.log("express booted and running ")
})
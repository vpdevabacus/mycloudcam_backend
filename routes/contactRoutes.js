const express = require("express")
const contactController = require("../controllers/contactController")
const contactRouter = express.Router()
contactRouter.post("/mail" , contactController)

module.exports = contactRouter
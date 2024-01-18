const dotenv = require("dotenv");
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

dotenv.config();
const app = express();

const contactRouter = require("./routes/contactRoutes")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/contact', contactRouter)

app.get("/", (req, res) => {
    res.send("Working!");
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}!`);  
})

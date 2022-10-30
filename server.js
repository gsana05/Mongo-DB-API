import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import allRoutes from './routes/routes.js';

dotenv.config();

const app = express();

//parse requests and make it redable for our API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//call the allRoute function and send app which initializes express
allRoutes(app);

const port = 4000;

app.get('/', (req, res) => {
    res.send(`APP IS RUNNING ON PORT: ${port}`)
})

// app.route("/students").get((req, res) => {

//     console.log("result: ", res);
//     res.send("FIREDDD");

// });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error("Here:: " + error) );
db.once('open', () => console.log("Connected to database"),);

app.listen(port, () => console.log("Server started"))
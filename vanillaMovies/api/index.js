import dotenv from 'dotenv';
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config();
const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.tajrfna.mongodb.net/?retryWrites=true&w=majority`

const port = 8000;

const options = {
    maxPoolSize: 50,
    wtimeoutMS: 5000,
}

MongoClient.connect(uri, options)
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })
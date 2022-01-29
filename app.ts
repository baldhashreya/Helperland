
import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
const app = express();
import routes from "./routes";


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server Start at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})

import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./models";
const app = express();
import routes from "./router/Rcontactus";
import User_routes from "./router/User";
import cookieParser from 'cookie-parser';


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/admin',routes);
app.use('/',User_routes);


app.listen(process.env.PORT, () => {
    console.log(`Server Start at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("Database Connected");

        try {
            await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})

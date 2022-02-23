
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
import {sequelize} from "./models";
import routes from "./router/Rcontactus";
import User_routes from "./router/User";
import cookieParser from 'cookie-parser';
import book_routes from './router/book';
dotenv.config();
const app = express();

const swaggerOption={
    definition:{
        openapi:'3.0.3',
        info:{
            title:'Helperland',
            version: '1.0.0',
            description:'Herlperland is a platform where the service providers i.e. cleaners can register themselves for providing services through the portal and would receive the services booked by the customers. The other type of users Customers can book the service requests for cleaning and get the job done by one of the service providers from the portal',
            contact:{
                email:'baldha.shreya027@gamil.com',
                name:"Shreya Baldha"
            },
            servers:[
                {
                url: "http://localhost:7000"
                }
            ]
        }
    },
    apis:["./router/Rcontactus.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/tarinee2021/contact',routes);
app.use('/',User_routes);
app.use('/user',book_routes);




app.listen(process.env.PORT, () => {
    console.log(`Server Start at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("Database Connected");
        try {
            await sequelize.sync({alter:true})
        } catch (error) {
            console.log(error);
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})

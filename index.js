import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import db from "./config/Database.js";
import ManagemenRoute from "./routes/ManagemenRoute.js";
import AntrianMRoute from "./routes/AntrianMRoute.js";
import AntrianDMRoute from "./routes/AntrianDMRoute.js";
import LoketRoute from "./routes/LoketRoute.js";
import SequelizeStore from "connect-session-sequelize";
//soket.io
import { Server } from "socket.io";
import http from "http"



dotenv.config();

const app = express();

//soket.io
const server = http.createServer(app);
//const io = new Server(server)

(async()=>{
    await db.sync();
})();
const  sessionStore =SequelizeStore(session.Store);

const store = new sessionStore(({
    db:db
}));

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store: store,
    cookie:{
        secure:'auto'
    }
}))
// //di gantikan dengan soket.io
// app.use(cors({
//     credentials:true,
//     origin: '*',
//     allowedHeaders:'*'
// }));

//ini Soket.io
const io = new Server(server,{
    cors:{
        origin :'http://localhost:3000' ,
        methods:["GET","POST","PATCH","DELETE"]
    },
})

app.use(express.json());

app.use(ManagemenRoute);
app.use(AntrianMRoute);
app.use(AntrianDMRoute);
app.use(LoketRoute);

store.sync();

// //DIGANTIKAN DENGAN SOKET.IO
// app.listen(process.env.APP_PORT, ()=>{
//     console.log('Server Sedang Berjalan ........');
// });

server.listen(process.env.APP_PORT,()=>{
    console.log('Server Sedang Berjalan ........');
})
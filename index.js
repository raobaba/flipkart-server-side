const express = require("express");
require('dotenv').config(); 
const cors = require("cors"); 
const {UserRouter} = require("./Routes/route.js");
const Connection = require("./database/db.js");
const {defaultData} = require("./default.js");
const app = express();
app.use(express.json()); 
app.use(cors());  
app.use("/",UserRouter);
Connection();  
app.listen(process.env.PORT, () =>
 console.log(`Server is running successfully on PORT ${process.env.PORT}`)
 ); 
 defaultData();
 
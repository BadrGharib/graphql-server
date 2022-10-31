const express=require('express');
const colors=require('colors');
require('dotenv').config();//this for eviroment variable 
const port=process.env.port || 5000;
var {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema')
const connectDb=require('./config/db')
const cors=require('cors');
var { buildSchema } = require('graphql');
const userDate=require('../mock-data.json');
const app=express()
//connect to mongo db
connectDb();
// var schema=buildSchema(`
//  type Query {
//     message:String
//  }
// `)

// var root={
//     message:()=>{
//         return 'Hello Worled';
//     }
// }
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.listen(port,()=>{
    console.log("Server Running on port",port)
})
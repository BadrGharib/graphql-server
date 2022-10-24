const mongoos=require('mongoose')
const connectDb=async ()=>{
    const conn=await mongoos.connect(process.env.MONGO_URI)
    console.log(`Mongo db connected on host=${conn.connection.host}`.cyan.underline.bold)
}

module.exports=connectDb;
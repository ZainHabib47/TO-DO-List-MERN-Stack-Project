const mongoose=require("mongoose")

function connectDB(){
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("✅Connected Successfully")
    }).catch((err)=>{
        console.log("❌Connection Unsuccessfull")
    })
}

module.exports= connectDB;
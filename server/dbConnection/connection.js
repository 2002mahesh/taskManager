const mongoose=require('mongoose');
   require('dotenv').config();
const dbConnection=mongoose.connect(process.env.db_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
                   .then(()=>{
                    console.log(`Dbconnected+ ${process.env.db_URL}`);
                   })
                   .catch(()=>{
                    console.log('error occure during db Connection');
                   })

 module.exports=dbConnection;                  
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
        await mongoose.connect(mongoURI, {useNewUrlParser: true},async(err,result)=>{
            if(err) console.log("---",err)
            else{
                console.log("connected");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(function(err,data){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        console.log(global.food_items)
                    }
                })
            }
        }); 
}

module.exports = mongoDB;

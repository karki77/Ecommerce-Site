import users from "./data/users.js";
import products from "./data/product.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import connectDb from "./config/db.js";
import colors from 'colors';

process.loadEnvFile();
connectDb();

async function loadData(){
    try{ 
    await Product.deleteMany();
    await User.deleteMany();
  
     let newusers = await User.insertMany(users);
     await Product.insertMany(
        products.map((product) => {
        return{
            ...product,
            user: newusers[0]._id,
        };
    })
 );
 console.log("Data Loaded!".green);
 process.exit();
 } catch (err){
    console.log(err.message);
    process.exit(1);
    }
 }
 async function destroyData() {
    try {
      await User.deleteMany();
      await Product.deleteMany();
      console.log("Data Cleared!".red.inverse);
      process.exit();
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }
  
  if (process.argv[2] == "-d") {
    destroyData();
  } else {
    loadData();
  }
  
  

//  async function destroyData(){
//     try{
//         await User.deleteMany();
//         await Product.deleteMany();
//         console.log("Data Cleared!".red.inverse);
//     } catch (err){
//         console.log(err.message);
//         process.exit(1);
//     }
//  }

// //  console.log(process.argv);
// if (process.argv[2] == '-d'){
//     destroyData();
// } else {
//     loadData();
// }
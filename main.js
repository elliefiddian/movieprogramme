const yargs= require ("yargs/yargs"); 

require("dotenv").config();
//console.log(process.env);

if (process.env.NAME === "fred") {
    console.log ("Hello, Fred"); 
} else {
    console.log("I don't know you!");
}

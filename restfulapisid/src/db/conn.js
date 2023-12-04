const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Connection is successful........");
}).catch((err) => {
    console.log("Error in connection : "+err);
});
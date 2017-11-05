var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    "name":String,
});

// userSchema.statics.checkExist = function(name,callback){
//     //this是类名，不是schema
//     this.find({"name":name},function(err,results){
//         if(results.length == 0){
//             callback(false);
//         }else{
//             callback(true);
//         }
//     });
// }

var User = mongoose.model("users",userSchema);

module.exports = User;
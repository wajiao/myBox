var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Student的schema
var commonSchema = new Schema({
   "common":String
   // "img":String,
   // "music":String
});

//生成模型
var Common = mongoose.model("common",commonSchema);
//向外暴露
module.exports = Common;
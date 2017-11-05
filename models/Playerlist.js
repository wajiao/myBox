//用户类
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Student的schema
var playerlistSchema = new Schema({
   "id":String,
   "url":String,
   "title":String,
   "publisher":String,

});

//生成模型
var Playerlist = mongoose.model("playerlist",playerlistSchema);
//向外暴露
module.exports = Playerlist;


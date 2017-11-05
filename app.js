
var express = require("express");
var formidable = require("formidable");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/hehe')

var User = require("./models/User.js");
var Playerlist = require("./models/Playerlist.js");
var Common = require("./models/Common.js");

//数据库就用mongoose,暂时的操作就是 用类操作显示，出现的现象是第二次运行，
//才能查询到，更改数据库并不觉得和查看是同步的。

var app = express();
//login
app.post("/login",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
         if(err){
            res.send("-1");
            return;
        }
        User.find({"name":fields.name},function(err,result){
            console.log(result.length);
            if(result.length > 0){
                res.send(result);
            }else{
                var u = new User({"name":fields.name})
                u.save();
                res.send("-1")
            }
            
        })
    })      
});

//拉layerlist数据
app.get("/getplayerlist",function(req,res){
    Playerlist.find({},function(err,result){
    // console.log(result)
    res.send(result)
    });
    
})
app.post("/postInfo",function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields,files){
       console.log(fields)
       // var c = new Common(fields)
       var c = new Common({
        "common":fields.common
       })
        c.save(); 
       
    })
   
})

app.get("/getcommon",function(req,res){
    Common.find({},function(err,result){
        console.log(result);
        res.send(result)
    })
})


app.use("/public",express.static("public"));

app.listen(3003);

























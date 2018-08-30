var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var adminSchema = new Schema({
    user: String,
    password: String
});

var admin = mongoose.model('admin', adminSchema);

//根据名字查询
exports.getname=function(name,callback){
    admin.findOne({"user":name},function(err,data){
        callback(err,data);
    })
}


//添加用户
exports.adduser=function(tj,callback){
    admin.create(tj,function(data){
        callback("ok");
    })
}

//查找所有
exports.getall=function (callback) {
    admin.find({},function(err,data){
        callback(data);
    })
}
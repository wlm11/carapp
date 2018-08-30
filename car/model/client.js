var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var clientSchema = new Schema({
    user: String,
    tel:String,
    add:String,
    identity:String,
    carid:String
});

clientSchema.statics.getall=function (callback) {
    client.find({},function(err,data){
        callback(data);
    })
}

clientSchema.statics.addclient=function(tj,callback){
    client.create(tj,function(err,data){
        callback(err,data);
    })
}

clientSchema.statics.findcont=function (tj, callback) {
    client.find(tj,function(err,data){
        callback(data);
    })
}

clientSchema.statics.updatecont=function(tj,set,callback){
    client.update(tj,set,function(err,data){
        callback(data);
    })
}

clientSchema.statics.deletecont=function(tj,callback){
    client.remove(tj,function(data){
        callback(data);
    })
}

clientSchema.statics.getattr=function(tj,pro,callback){
    client.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}

var client = mongoose.model('client', clientSchema);

module.exports=client;
//查找所有
// exports.getall=function (callback) {
//     client.find({},function(err,data){
//         callback(data);
//     })
// }

//新建客户
// exports.addclient=function(tj,callback){
//     client.create(tj,function(err,data){
//         callback(err,data);
//     })
// }

//根据条件查找
// exports.findcont=function (tj, callback) {
//     client.find(tj,function(err,data){
//         callback(data);
//     })
// }

//更新数据
// exports.updatecont=function(tj,set,callback){
//     client.update(tj,set,function(err,data){
//         callback(data);
//     })
// }

//删除数据
// exports.deletecont=function(tj,callback){
//     client.remove(tj,function(data){
//         callback(data);
//     })
// }

//获取某一项的属性
// exports.getattr=function(tj,pro,callback){
//     client.findOne(tj,function(err,data){
//         callback(err,data[pro])
//     })
// }
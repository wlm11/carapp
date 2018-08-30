var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var rentSchema = new Schema({
    carname:String,
    class:String,
    username:String,
    usertime:String,
    daymoney:String,
    paid:String,
    allmoney:String,
    data:String,
    admin:String,
    state:String
});
//查找所有
rentSchema.statics.getall=function (callback) {
    rent.find({},function(err,data){
        callback(data);
    })
}
//新建客户
rentSchema.statics.addrent=function(tj,callback){
    rent.create(tj,function(err,data){
        callback(err,data);
    })
}
//根据条件查找
rentSchema.statics.findcont=function (tj, callback) {
    rent.find(tj,function(err,data){
        callback(data);
    })
}
//更新数据
rentSchema.statics.updatecont=function(tj,set,callback){
    rent.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
rentSchema.statics.deletecont=function(tj,callback){
    rent.remove(tj,function(data){
        callback(data);
    })
}
//获取某一项的属性
rentSchema.statics.getattr=function(tj,pro,callback){
    rent.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}
var rent = mongoose.model('rent', rentSchema);

module.exports=rent;










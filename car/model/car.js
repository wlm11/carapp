var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var carSchema = new Schema({
    carname:String,
    class:String,
    state:Boolean,
    money:String

});
//查找所有
carSchema.statics.getall=function (callback) {
    car.find({},function(err,data){
        callback(data);
    })
}
//新建客户
carSchema.statics.addcar=function(tj,callback){
    car.create(tj,function(err,data){
        callback(err,data);
    })
}
//根据条件查找
carSchema.statics.findcont=function (tj, callback) {
    car.find(tj,function(err,data){
        callback(data);
    })
}
//更新数据
carSchema.statics.updatecont=function(tj,set,callback){
    car.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
carSchema.statics.deletecont=function(tj,callback){
    car.remove(tj,function(data){
        callback(data);
    })
}

carSchema.statics.getattr=function(tj,pro,callback){
    car.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}
var car = mongoose.model('car', carSchema);


module.exports=car;

// exports.getall=function (callback) {
//     car.find({},function(err,data){
//         callback(data);
//     })
// }

//新建客户
// exports.addcar=function(tj,callback){
//     car.create(tj,function(err,data){
//         callback(err,data);
//     })
// }

//根据条件查找
// exports.findcont=function (tj, callback) {
//     car.find(tj,function(err,data){
//         callback(data);
//     })
// }

//更新数据
// exports.updatecont=function(tj,set,callback){
//     car.update(tj,set,function(err,data){
//         callback(data);
//     })
// }

//删除数据
// exports.deletecont=function(tj,callback){
//     car.remove(tj,function(data){
//         callback(data);
//     })
// }

//获取某一项的属性
// exports.getattr=function(tj,pro,callback){
//     car.findOne(tj,function(err,data){
//         callback(err,data[pro])
//     })
// }

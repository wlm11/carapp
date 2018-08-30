var formidable=require("formidable");

var admin=require("../model/admin.js");
var client=require("../model/client.js");
var car=require("../model/car.js");
var rent=require("../model/rent.js");

var path = require("path");

var url=require("url");

var crypto = require("crypto");

var Class=require("../model/class.js");

//注册页
exports.showreg=function(req,res){
     res.render("reg");
     return;
}
exports.reg=function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields.mima);
        admin.getname(fields.user,function(err,data){
            console.log(data);
            if(data){
               res.json({"result":-1});//用户名存在
                return;
            }else{

                var sha256 = crypto.createHash("sha256");
                sha256.update(fields.password)
                var str=sha256.digest("hex");


                admin.adduser({"user":fields.user,"password":str},function(err,data){
                    req.session.login=1;
                    req.session.user=fields.user;

                    res.json({"result":1});
                    return;
                })
            }

        })
    });
}

//显示登录
exports.showlogin=function (req, res) {
     res.render("login");
     return;
    // admin.getall(function(data){
    //     console.log(data);
    // })
}
exports.login=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var user = fields.user;

        admin.getname(user,function(err,doc){
            // console.log(doc.mima);
            if(!doc){
                res.json({"result":-1});//已存在
                return;
            }
            // console.log(doc[0]);
            var sha256 = crypto.createHash("sha256");

            if( sha256.update(fields.password).digest("hex")==doc.password ){
                req.session.login = 1;
                req.session.yonghuming = user;
                res.json({"result":1});
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        });
    });

}

//客户页
exports.showclient=function(req,res){
    //显示客户表
    var login=req.session.login==1?true:false;

    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    client.getall(function(data){
        res.render("client",{"result":data,"login":login});
        return;
    })
}
exports.saveclient=function(req,res){
    //新建客户
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        client.addclient(fields,function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
            return;
        })
    });
}
exports.amendclient=function(req,res){
    //修改客户
    var id=req.params.id;
    // console.log(id);
    client.findcont({"_id":id},function(data){
        res.json({"result":data})
        return;
    })

}
exports.updateclient=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        client.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
            return;
        })
    });
}
exports.delclient=function(req,res){
    //删除
    var id=req.params.id;

    client.deletecont({"_id":id},function(data){
        res.json({"result":1})
        return;
    })
}
exports.showIndex=function(req,res){
    //点击返回
    res.render("index",{"login":req.session.login});
    return;
}

exports.Allclient=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    client.count({},function(err,count){
        client.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
            return;
        });
    });
}

//汽车页
exports.showcar=function(req,res){
    //显示所有的汽车
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    var id=req.params.id;
    // console.log(id);
    client.getattr({"_id":id},"user",function(err,data){
        req.session.user=data;

    })

    Class.findcont({},function(Aclass){
        car.getall(function(data){
            res.render("car",{"result":data,"Aclass":Aclass});
            return;
        })
    })


}


exports.allcar=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    //所有的汽车
    Class.findcont({},function(Aclass){
        car.getall(function(data){
            res.render("car",{"result":data,"Aclass":Aclass});
            return;
        })
    })
}
exports.savecar=function(req,res){
    //新建汽车
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        car.addcar(fields,function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
            return;
        })
    });
}
exports.amendcar=function(req,res){
    //修改汽车
    var id=req.params.id;
    // console.log(id);
    car.findcont({"_id":id},function(data){
        res.json({"result":data})
        return;
    })

}
exports.updatecar=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        car.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
            return;
        })
    });
}
exports.delcar=function(req,res){
    //删除汽车
    var id=req.params.id;

    car.deletecont({"_id":id},function(data){
        res.json({"result":1})
        return;
    })
}

exports.getAllcar=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    car.count({},function(err,count){
        car.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
            return;
        });
    });
}



//类别档案页
exports.showclass=function(req,res){
    //显示类别档案
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.findcont({},function(data){
        // console.log(data);

        res.render("class",{"result":data});
        return;
    })


}
exports.saveClass=function(req,res){
    //新建类
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        Class.addclass(fields,function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
            return;
        })
    });
}
exports.delClass=function(req,res){
    //删除
    var id=req.params.id;

    Class.deletecont({"_id":id},function(data){
        res.json({"result":1});
        return;
    })
}

// 租赁页
exports.showrent=function(req,res){
    // 显示租赁页
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.findcont({},function(classarr){
        car.findcont({},function(data){
            client.findcont({},function(name){
                var namearr=[];
                for(var i=0;i<name.length;i++){

                    namearr.push(name[i].user)
                }
                res.render("rent",{"result":classarr,"data":data,"username":namearr});
                return;
            })

        })
    })

}
exports.classcar=function(req,res){
    //点击类别出现对应的汽车
    var cont=req.params.cont;

    car.findcont({"class":cont},function(data){
        res.json({"result":data});
        return;
    })
}
exports.gouxuan=function(req,res){
    //点击勾选的时候
    var id=req.params.id;
    // console.log(id);
    car.findcont({"_id":id},function(data){
        res.json({"result":data});
        return;
    })
}
exports.queren=function(req,res){
    // 确认租出
    var id=req.params.id;
    // console.log(id);

    car.findcont({"_id":id},function(data){
       var name=data[0].carname;
       var classa=data[0].class;
       console.log(name,classa);

        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var str = '';

            var myTime = new Date();

            // number
            var iYear = myTime.getFullYear();
            var iMonth = myTime.getMonth()+1;
            var iDate = myTime.getDate();
            var iWeek = myTime.getDay();

            str = iYear+ '-' +iMonth+'-'+iDate;

                rent.addrent({"carname":name,"class":classa,"username":fields.username,"usertime":fields.usertime,"daymoney":fields.daymoney,"paid":fields.paid,"allmoney":fields.allmoney,"data":str,"admin":req.session.yonghuming,"state":0},function(err,data){
                    // res.json({"result":1})

                })
                car.updatecont({"_id":id},{$set:{state:true}},function(data){
                    res.json({"result":1})
                    return;
                })
            })
        })
}

//归还页
exports.showreturn=function(req,res){

    // 显示归还页
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    rent.findcont({"state":0},function(data){
        res.render("return",{"data":data});
        return;
    })

}

exports.Rgou=function(req,res){
    //归还页点击勾选的时候
    var id=req.params.id;
    // console.log(id);
    rent.findcont({"_id":id},function(data){
        res.json({"result":data});
        return;
    })
}
exports.returnche=function(req,res){
    //确认归还
    var id=req.params.id;
    console.log(id);
    rent.updatecont({"_id":id},{$set:{state:"1"}},function(data){

    })

    rent.findcont({"_id":id},function(data){
        // console.log(data);
        var name=data[0].carname;
        car.updatecont({"carname":name},{$set:{state:false}},function(data){
            res.json({"result":1});
            return;
        })
    })

}

//统计页
exports.showstatistics=function(req,res){

    // 显示归还页
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    rent.findcont({},function(data){
        res.render("statistics",{"data":data});
        return;
    })
}

exports.returncar=function(req,res){
    //渲染归还和未归还
    var cont=req.params.cont;
    // console.log(cont);
    // rent.findcont({"state":cont},function(data){
    //     // console.log(data);
    //     res.json({"result":data})
    // })

    if(cont==0){
        rent.findcont({},function(data){
            res.json({"result":data});
            return;
        })
    }else if(cont==1){
        rent.findcont({"state":cont},function(data){
                // console.log(data);
                res.json({"result":data});
                return;
            })
    }
}

//退出
exports.quit=function(req,res){
    var login = req.session.login =0;

    res.render("client",{"login":login});
    return;
}

exports.showecharts = function(req,res){
    //使用这个页面需要登录！
    if(!req.session.login){
        res.send("本页面需要登录，请<a href='/login'>登录</a>");
        return;
    }
    res.sendFile(path.join(__dirname , "../views/echarts.html"));
}

//最受欢迎的车类型
exports.showtype=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    rent.findcont({},function(data){
        // console.log(data);
        for(var i=0;i<data.length;i++){
            if(data[i].state==1){
                // console.log(data);
                rent.count({"class":"科沃兹"},function(err,count_a){
                    rent.count({"class":"别克"},function (err, count_b) {
                        rent.count({"class":"大众"},function(err,count_c){
                            rent.count({"class":"雪佛兰"},function(err,count_d){
                                rent.count({"class":"丰田"},function(err,count_e){
                                    rent.count({"class":"宝马"},function(err,count_f){
                                        rent.count({"class":"宾利"},function(err,count_g){
                                            res.json({"A":count_a,"B":count_b,"C":count_c,"D":count_d,"E":count_e,"F":count_f,"G":count_g});
                                            // return;
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                return;
            }
        }
        return;
    })
    return;
}



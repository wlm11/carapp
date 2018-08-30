var express = require('express');
var app = express();

var mongoose = require('mongoose');

var control=require("./controller/control.js");

var session = require('express-session');

var url=require("url");

mongoose.connect('mongodb://localhost/carmanage');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.static("static"));

//注册
app.get("/",control.showreg);
app.post("/reg",control.reg);//点击注册

//登录页
app.get("/login",control.showlogin);//显示登录
app.post("/login",control.login);//点击登录

//客户查询页
app.get("/client",control.showclient);//显示
app.post("/saveclient",control.saveclient);//新建客户
app.post("/amendclient/:id",control.amendclient);////修改
app.post("/updateclient/:id",control.updateclient);//更改
app.post("/delclient/:id",control.delclient);////删除
app.get("/Allclient",control.Allclient);//分页


//点击返回
app.get("/index",control.showIndex);

//汽车档案
app.post("/car/:id",control.showcar);
app.get("/car",control.allcar);// //所有汽车
app.post("/savecar",control.savecar);//汽车保存
app.post("/amendcar/:id",control.amendcar);//修改
app.post("/updatecar/:id",control.updatecar);//更改汽车
app.post("/delcar/:id",control.delcar);//删除汽车
app.get("/Allcar",control.getAllcar);//分页


//显示类别档案
app.get("/showClass",control.showclass);
app.post("/saveClass",control.saveClass);//新增类
app.post("/delClass/:id",control.delClass);//删除汽车

//显示租赁业
app.get("/rent",control.showrent);
app.post("/classcar/:cont",control.classcar);//租赁页点击时改变
app.post("/gouxuan/:id",control.gouxuan);//点击勾选的时候
app.post("/queren/:id",control.queren);//确认选择



//显示归还页
app.get("/return",control.showreturn);
app.post("/return/:cont",control.returncar);//渲染归还和未归还
app.post("/Rgou/:id",control.Rgou);//归还页  点击勾选的时候
app.post("/returncar/:id",control.returnche);

//显示统计页
app.get("/statistics",control.showstatistics);

// echarts
app.get("/echarts",control.showecharts);

app.get("/type",control.showtype)

//退出
app.get("/quit",control.quit);

app.listen(7000);
const express= require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require("uuid");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
let Contents=[
    {
        id:uuidv4(),
        name:"piyush",
        content:"I am passionate about backend"
    },
    {
        id:uuidv4(),
        name:"Himanshu",
        content:"I am deeply interested in data science and analytics I enjoy working with large datasets and extracting meaningful insights. Currently learning machine learning algorithms and their practical use cases.I like experimenting with Python, pandas, and visualization tools.My goal is to build data-driven solutions for real-world problems.I believe data, when used correctly, can drive impactful decisions."
    },
    {
        id:uuidv4(),
        name:"shivam",
        content:"I am passionate about AI/ML"
    },
    {
        id:uuidv4(),
        name:"rishi",
        content:"I am passionate about Tech"
    }
];

app.get("/Home",(req,res)=>{
    res.render("index.ejs",{Contents});
});
app.get("/Home/create",(req,res)=>{
    res.render("create.ejs")
});
app.post("/Home",(req,res)=>{
   let {name,content}=req.body;
   let id=uuidv4();
   Contents.push({id,name,content});
   res.redirect("/Home");
});

app.patch("/Home/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let con=Contents.find((c)=> id===c.id);
    con.content=newContent;
    res.redirect("/Home");
});
app.get("/Home/:id/edit",(req,res)=>{
    let {id}=req.params;
    let con=Contents.find((c)=> id===c.id);
    res.render("edit.ejs",{con});
});

app.delete("/Home/:id",(req,res)=>{
    let {id}=req.params;
    let con=Contents.filter((c)=> id!== c.id);
    Contents=con;
    res.redirect("/Home");
})
app.listen(port,()=>{
    console.log("server is listing port :8080");
});
const express = require("express");
const body_parser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js");


//List for home page
const lists = ["Eat", "Sleep", "Code"];
//List for work page
const work_lists = [];


//Setting up the app to use EJS, body-parser and static files
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("public"));


//Listening to the port 3000
app.listen(3000, function(){
    console.log("Server started on port 3000.");
});


//Get request for Home or Root Route
app.get("/", function(req, res){
    const day = date.get_date();
    res.render("list", {
        list_title: day,
        new_item: lists
    });
});


//Get request for Work Route
app.get("/work", function(req,res){
    res.render("list",{
        list_title: "Work List",
        new_item: work_lists
    });
});


//Post request for all the pages are handled in this method only as the action attribute will trigger this i.e. root route
app.post("/", function(request,response){
    // We sneakily passed the page_title in the value attribute of the button
    // So whenever the work route is been triggered the name of the list will contain the work(i.e. page_name) otherwise the date.
    const page_name = request.body.list;// It contains the page_title
    const new_list_item = request.body.each_list;// It contains the exact data which is submitted by the user i.e. Work.
    if(page_name === "Work"){
        work_lists.push(new_list_item);
        response.redirect("/work");
    }
    else{
        lists.push(new_list_item);
        response.redirect("/");
    }
});


//GET request for about page
app.get("/about", function(req,res){
    res.render("about");
});
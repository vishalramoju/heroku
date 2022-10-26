const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { response } = require("express");
const { runInNewContext } = require("vm");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
console.log(req.body.username);
const username=req.body.username;
const url="https://codeforces.com/api/user.status?handle="+username+"&from=1&count=25";
https.get(url,(response)=>{
    response.on("data",(data)=>{
        const userdata=JSON.parse(data);
        let len=userdata.result.length;
        len=Math.min(25,len);
        res.write("<table border='2'>");
        res.write("<thead>")
        res.write("<td style='font-weight:bold'>ProblemName</td>");
        res.write("<td style='font-weight:bold'>ProblemRating</td>");
        res.write("<td style='font-weight:bold'>ProblemTag</td>");
        res.write("<td style='font-weight:bold'>Verdict</td>");
        res.write("</thead>");
        for(let i=0;i<25;i++){
            res.write("<thead>")
            res.write("<td>"+userdata.result[i].problem.name+"</td>");
            res.write("<td>"+userdata.result[i].problem.rating+"</td>");
            res.write("<td>"+userdata.result[i].problem.tags+"</td>");
            res.write("<td>"+userdata.result[i].verdict+"</td>");
            res.write("</thead>");
        }
        res.write("</table>");
        res.send();

    })
})
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running at port 3000");
})
const express = require('express');
const app =express();
const port = 8082;
const path = require('path')
const nodemailer = require('nodemailer');


app.listen(port,()=>{
    console.log('code is ready in port',8082);
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "dhanashma@gmail.com",
        pass: "bkqxbbsopvvgzcmj"
    }
});

app.get('/',(req,res)=>res.send("<h1>Welcome to Coding Competition #2 by Dhanashma,NORKA B3.</h1>"))

app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))})

app.post('/mailer',(req,res)=>{
    const mailOptions = {
        from: 'dhanashma@gmail.com',
        to: req.body.email,
        subject: 'Test email',
        text: 'Hi, ICT academy email app Coding challenge '
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
               console.log(error);
           res.end("Something went wrong");
        }else{
               console.log("Message sent: " + "Mail sent successfully");
           res.end("sent");
            }
    });
    res.json({ message: "Message received"})
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", function(request, responce){
    responce.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, responce){
    var name = request.body.your_name;
    var mobile = request.body.phone_number;
    var email = request.body.email_address;
    var message = request.body.your_message;
    console.log(name + " " + mobile + " " + email + " " + message);

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth : {
            user : 'neerajsb90@gmail.com',
            pass : 'neekklvbqnqionrb'
        }
    })

    const mailOptions = {
        from : email,
        to: "alnicosindustries@gmail.com",
        subject : "Business Reachout",
        text : "Name : " + name + "\n" + "Mobile : " + mobile + "\n" + "Email : " + email + "\n" + "Message : " + message + "\n"
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            responce.sendFile(__dirname + "/failure.html");
            
        }else{
            console.log("Success");
            responce.sendFile(__dirname + "/success.html");
        }
    })


    //alert("Message sent, We will reach out to you shortly !")
    //responce.sendFile(__dirname + "/index.html");
})


app.listen(process.env.PORT || 443);


//5d527bc19e745a8b405c5c3770ae40ec-us13

//5e95defce5
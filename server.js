
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;


app.get('/',function(req,res){
   sess = req.session;
   //session set when user requests our app via the url
    if(sess.email){
// check for existance of session and complete action if it exists
       res.redirect('/admin');
    } else{
        res.render('index.html');
    }
});

//Login
app.post('/login',function(req,res){
   sess = req.session;
   //assign email to sess.email variable, email comes from html page
    sess.email = req.body.email;
    res.end('done');
});

//Admin
app.get('/admin', function(res,req){
   sess = req.session;
   if(sess.email){
       res.write('<h1>Hello ' + sess.email + '</h1>');
   } else{
       res.write('<h1>Please Login first.</h1>');
       res.end('<a href="+">Login</a>');
   }
});

//Logout
app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});
app.listen(3000,function(){
   console.log("App started on port 3000");
});
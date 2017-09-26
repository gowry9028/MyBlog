const express = require('express')
const app = express()
var path = require('path')
var bodyparser = require ('body-parser')
var mongoose = require('mongoose')

app.use(bodyparser.json())

/*Database connection - MongoDB*/

//Created from the command earlier. Ensure this is done on the first_db instance
var username = 'admin';
var password = '123456';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'blog';

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;
console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err) {
    if(err) {
        console.log('connection error: ', err);
    } else {
        console.log('connection successful');
    }
});

/***********
Declare all models here
***********/

//User model
var UserSchema = new mongoose.Schema({
    // _id: mongoose.Schema.ObjectId,
//_id: {type: mongoose.Schema.ObjectId, auto:true},
     title: String,
     content: String
 });

var User = mongoose.model('user', UserSchema);

app.use(express.static(__dirname + '/public/'))

app.get('/index',function(req,res){
res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/read',function(req,res){
res.sendFile(path.join(__dirname, '/public/read.html'));
})
app.get('/edit',function(req,res){
res.sendFile(path.join(__dirname, '/public/edit.html'));
})
app.get('/login',function(req,res){
res.sendFile(path.join(__dirname, '/public/login.html'));
})
app.post('/submit',function(req,res){
    console.log("entered submit");
console.log(req.body);
//recived new blog post in req
//format {title: .......
   //     content: .......}
   // store these data to mongoose db
     User.create(req.body, function(err, saved) {
        if(err) {
            console.log(err);
            res.json({ message : err });
        } else {
            res.json({ message : "User successfully registered!"});
        }
        })

})

app.get('/post',function(req,res){   

User.findOne({ _id: req.query.id })
            .exec(function (err, user) {
            if (err) {
                console.log('db err');
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            else if (user) {
              res.send(user);
              
              //res.render('read', {user
   //});
             // res.sendFile(path.join(__dirname, '/public/read.html'));
                           }          
            });
    
})

app.get('/list',function(req,res){
/*
var list =  ['title 1', "ttile 2", "ek prem katha", "The last story"];
   //var list =  [{'id'='134','titlele'='title 1'}, {"ttile 2", "ek prem katha", "The last story"];
   res.send(list);
*/
//get id,title(find.many())
// search mongo db for all post titles
// send the post as res
//format {title: .......
   //     title: .......}
   // store these data to mongoose db

var list = "";
var i;
    User.find({
    }, function(err, users) {
      if (err) {
        onErr(err, callback);
      } else {
        //console.log(users);
       res.send(users);
       /*
        for(i=0; i<users.length; i++){
        list +='"'+users[i].title+'"';
          // list +=users[i].title;
           if (i <((users.length)-1)) {
                    list += ',';
                  }
                  if (i ==((users.length)-1)) {
                   // list += ']';
                    //console.log(list);
                    res.send(list);
                  }
               
        }
      */
      }
    });

})

app.listen(5000, function(){
    console.log("im listening on 5000,  go grab me  in browser")
})


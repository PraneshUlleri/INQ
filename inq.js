var express= require('express')
var a= require('fs')
var mongojs= require('mongojs')


var db = mongojs('mongodb://pi:abc123321@cluster0-shard-00-00-ccqn3.mongodb.net:27017/Pi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', ['Pi'])

var app = express()
app.use(express.static('frontend'))
app.get('/home',function (req, res) {
	res.send("HI ! WELCOME to PI's World")		
})

app.get('/',function (req, res) {	
res.sendFile(__dirname+"/inq.html")
})

app.get('/search/:name',function (req, res) {
	//res.send("We searched your name in the database")
	
		var usrname=req.params.name
		var search={Username:usrname}
		db.Pi.find(search, function(err, data) {
			if (data.length>0){
				res.send("Found It ")
			}
			else{
				res.send("Ah' I dont remember you here")
			}
		})
})


app.get('/login',function (req, res) {
		res.sendFile(__dirname+"/frontend/project1.html")
})


app.get('/loginsubmit',function (req, res) {
		var logcheck={ 
		 nam:req.query.nam}
		 var all={
 nam:req.query.nam,
 pas:req.query.pas
		 }

		db.Pi.find(logcheck, function(err, data) {
			if (data.length>0){
				db.Pi.find(all,function(err,data){

				res.sendFile(__dirname+"/inqsin.html")

					})
			
			}
			else{
				res.send("no user Found!")
				
			}
		})	


})

app.get('/signup',function (req, res) {
		res.sendFile(__dirname+"/frontend/project2.html")
})

app.get('/signupsubmit',function (req, res) {
		var details={
					 nam: req.query.nam,
					 ema: req.query.ema,
					 pas: req.query.pas,
        			
		}

		var search={ema:req.query.ema}
	db.Pi.find(search, function(err, data) {
			if (data.length>0){
				res.send("Already Signed up using this email ")
			}
			else{
				//res.send("SignedIn!")
				db.Pi.insert(details, function(err,data ){
				res.sendFile(__dirname+"/inqsin.html")
		if (err){
		console.log(err)}
		else{
		console.log(details +" is inserted" )
		}
		})
			}
		})		
})



app.listen(8123, function(){
console.log("here")
})
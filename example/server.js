var Server = require("../").Server;

var MyServer = Server.extends({
	
	getRpc: function( callback ){
		console.log( this.route);
		var keys = [];
		Object.keys(this.route).forEach(function(item,index){
			keys.push(item);
		});
		callback( null, { name: this.name, ext: JSON.stringify(keys) });
	},
	
	post: function( name, fn ){
		this.route["post@"+name] = fn;
		return this;
	},
	
	get: function( name, fn ){
		this.route["get@"+name] = fn;
		return this;
	},
	
	all: function( name, fn ){
		this.route["all@"+name] = fn;
		return this;
	},
	
	test: function( a1, a2, callback){
		callback( null, a1+a2+":"+Date.now());
	}
	
});

var server = new MyServer("test","/test");

server.get("/test",function( name, name2 , callback ){
	callback( null, name+name2+":==="+Date.now());
}).all("/upload",function( name, name2, callback ){
	callback( null, "==========");
}).post("/oauth",function( uname, upass, callback ){
	callback( null, "-----------");
});;

server.listen();
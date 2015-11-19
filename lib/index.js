var Class = require("osr-class");
var thrift = require("thrift");

var Rpc = Class.extends({

	$ : function(){
		this.starttime = Date.now();
		this.name = "Osr-RPC";
	},

	Client: require("./client"),

	Server: require("./server"),

});

module.exports = new Rpc;

var MongoClient 	= require ('mongodb').MongoClient,
	commandLineArgs = require('command-line-args'),
	assert 			= require('assert');


var options = commandLineOptions(); //se não tiver parametro, nem conecta
MongoClient.connect('mongodb://localhost:27017/crunchbase', function (err, db){

	assert.equal(err, null);
	console.log("Successfuly connected to MongoDB");

	var query = getQuery(options);
	var projection = {"_id": 0, "name":1, "founded_year": 1, 
					   "number_of_employees": 1, "crunchbase_url": 1};

	var cursor = db.collection('companies').find(query, projection);

	cursor.forEach(
		function(doc){
			console.log(doc);
		},
		function(err){
			assert.equal(err,null);
			return db.close();
		}
	)
});

function getQuery(options){
	var query = {
		"founded_year":{
			"$gte": options.FirstYear,
			"$lte": options.LastYear
		}
	};
	if("employes" in options){
		query.number_of_employess = {"$gte": options.employess};
	}

	return query;
}

function commandLineOptions(){

	var cli = commandLineArgs([
		{name:"FirstYear", alias:"f", type: Number},
		{name:"LastYear" , alias:"l", type: Number},
		{name:"employess", alias:"e", type: Number}
	]);
	var options = cli.parse();

	if (!(("FirstYear" in options) && ("LastYear" in options))){
		console.log(cli.getUsage({
			title: "Atenção!",
			description:"Por favor analise as opções e passe por parâmetro. =)"
		}));
		process.exit();
	}
	return options;
}
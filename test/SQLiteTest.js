//@ts-check
/// <reference path="../include/SenkoWSH.d.ts" />
/// <reference path="../build/toolbox-wsh.d.ts" />

System.executeOnCScript();
System.initializeCurrentDirectory();

SQLite3.install();

var db_file = new SFile("./SQLiteTest.db");
var db = SQLite3.use(db_file);

for(var key in db) {
	console.log("table : " + key);
	console.log("data  : " + JSON.stringify(db[key].find()));
	console.log("types : " + JSON.stringify(db[key].getTypes()));
}

/*
db.A.insert( {A: Math.trunc(Math.random() * 10000), B : Math.trunc(Math.random() * 10000), C : "こんばんは" } );
db.CCC.insert( {ADATA: "A" + Math.trunc(Math.random() * 100) } );
db.D.insert( {TTT: Math.random() * 100 } );

console.log(db.A.createSQL( "select", { "C" : { $ne: "A" } , "B" : 123 } ));
console.log(db.A.createSQL( "select", {$or: [{A: "A"} , {B: "123" }]}, { A : 1 } ));
console.log(db.A.find( {$or: [{A: "A"} , {B: "123" }]}, { A : 1 } ));

console.log(db.A.createSQL( "update", { "B" : 123 }, undefined, { "A" : "あ" } ));
db.A.update( { "B" : 123 }, { "A" : "あ" } );
db.D.remove( { "TTT" : { $ne : 123} });
*/

console.log("終了");
System.stop();

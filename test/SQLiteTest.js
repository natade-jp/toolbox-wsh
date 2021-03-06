//@ts-check
/// <reference path="../include/SenkoWSH.d.ts" />
/// <reference path="../build/toolbox-wsh.d.ts" />

System.executeOnCScript();
System.initializeCurrentDirectory();

console.log("SQLite3 をインストール／設定します。");
SQLite3.install();
console.log("")

console.log("データベースを取得します。");
var db_file = new SFile("./SQLiteTest.db");
var db = SQLite3.use(db_file);
console.log("")

console.log("テーブルの情報を確認します。");
for(var key in db) {
	console.log("table : " + key);
	console.log("types : " + JSON.stringify(db[key].getTypes()));
	console.log("count : " + JSON.stringify(db[key].count()));
	console.log("data  : " + JSON.stringify(db[key].find()));
	console.log("")
}

var where, select, setdata;

console.log("条件文の動作1");
where = { LOGIN_COUNT : { $ne: 177 } , PLACE : "岐阜県" };
console.log(db.students.createSQL( "select", where ));
console.log(JSON.stringify(db.students.find( where )));
console.log("");

console.log("条件文の動作2");
where = { LOGIN_COUNT : { $gt: 100, $lte: 200 }};
console.log(db.students.createSQL( "select", where ));
console.log(JSON.stringify(db.students.find( where )));
console.log("");

console.log("条件文の動作3");
where = { $or: [{PLACE: "愛知県"} , {PLACE: "三重県" }]};
select = { NM_SEI : 1, NM_MEI : 1 };
console.log(db.students.createSQL( "select", where, select ));
console.log(JSON.stringify(db.students.find( where, select )));
console.log("");

console.log("データを追加");
setdata = {
	ID: Format.textf("B%04d", Math.trunc(Math.random() * 1000)),
	NM_SEI: "森井",
	NM_MEI: "大輔",
	PLACE: "北海道",
	LAST_UPDATE: new Date()
};
console.log(db.students.createSQL( "insert", undefined, undefined, setdata));
db.students.insert( setdata );
console.log(JSON.stringify(db.students.find({PLACE: "北海道"}, { ID : 1, NM_SEI : 1, NM_MEI : 1, PLACE : 1 })));
console.log("");

console.log("データを更新");
where = { "PLACE" : "沖縄県" };
setdata = { "PLACE" : "北海道" };
console.log(db.students.createSQL( "update", where, undefined, setdata));
db.students.update( where, setdata );
console.log(JSON.stringify(db.students.find({NM_MEI: "大輔"}, { ID : 1, NM_SEI : 1, NM_MEI : 1, PLACE : 1 })));
console.log("");

console.log("データを削除");
where = { NM_MEI: "大輔" };
console.log(db.students.createSQL( "delete", where ));
db.students.remove( where );
console.log(JSON.stringify(db.students.find({NM_MEI: "大輔"}, { ID : 1, NM_SEI : 1, NM_MEI : 1, PLACE : 1 })));
console.log("");

console.log("終了");
System.stop();

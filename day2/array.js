var car1 = "saab";
var car2 = "volvo";
var car3 = "porche";

var cars = ['saab','volvo','parche']

console.log(cars);
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[2]);


//////////object+array//////////
var cars = [];
var car01 = {
	name : "sonata",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var car02 = {
	name : "BMW",
	ph : "700ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var car03 = {
	name : "sonata",
	ph : "300ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

cars = [car01, car02, car03]

//#work2
// for, if 구문을 사용하여 bmw 라는 이름의 자동차를 찾은 후 'bmw 차를 찾았습니다' 라고 출력하기

console.log(cars);
console.log(cars[2].name);
console.log(cars[2].ph);

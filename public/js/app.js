var app = angular.module("myApp",["ui.router"]);


app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state("home",{

		url:"/home",
		
		templateUrl:'view/home.html',
		controller:"homeCtrl"
	})
	.state("playerlist",{
		url:"/playerlist",
		
		templateUrl:'view/playerlist.html',
		controller:"playerlistCtrl"
	})
	.state("share",{
		url:"/share",
		
		templateUrl:'view/share.html',
		controller:"shareCtrl"
	})
	.state("list",{
		url:"/list/:listNum",
		templateUrl:'view/list.html',
		// controller:"shareCtrl"
	})
});

app.service('abc', function () {
	var msg = {}
	this.on = function (type, fn) {
		if (msg[type]) {
			msg[type].push(fn)
		} else {
			msg[type] = [fn]
		}
	}
	this.trigger = function (type) {
		var arg = [].slice.call(arguments, 1);
		if (msg[type]) {
			for (var i = 0; i < msg[type].length; i++) {
				msg[type][i](arg)
			}
		}
	}
})


app.controller("sliderCtrl",function($scope,$element, abc){
	abc.on('hello', function(data) {
		console.log(arguments, 111)
	})
	var num = 2;
	$scope.list = [{id:1},{id:2}];
	$scope.str = '登录'
	$scope.add = function(){
		
		num++;
		$scope.list.push({id:num})
	};
	$scope.goToLogin = function () {
		console.log($(".info"));
		// console.log("asdf")
	}
});

app.controller("homeCtrl",function($scope,$element, abc){
	abc.on('hello', function () {
		console.log(arguments, 2222)
	})
	$scope.img = [
		{url:"banner_01.jpg"},{url:"banner_02.jpg"},{url:"banner_03.jpg"},{url:"banner_03.jpg"}
	]
	$scope.song = [
		{
			url:"01.jpg",
			name:"Give you My .Give you My.",
			singer:"plum"
		},
		{
			url:"02.jpg",
			name:"Give you My .Give you My.",
			singer:"陈亦迅"
		},
		{
			url:"03.jpg",
			name:"Give you My ..",
			singer:"A—Lin"
		},
		{
			url:"04.jpg",
			name:"Give you My ..",
			singer:"hoobl"
		}
	]
	$scope.album = [
		{
			url:"01.jpg",
			name:"Give you My ..",
			singer:"plum"
		},
		{
			url:"02.jpg",
			name:"Give you My ..",
			singer:"陈亦迅"
		},
		{
			url:"08.jpg",
			name:"Give you My ..",
			singer:"A—Lin"
		},
		{
			url:"05.jpg",
			name:"Give you My ..",
			singer:"hoobl"
		}
	]
	$scope.hotlist = [
		{
			url:"06.jpg",
			name:"Give you My ..",
			singer:"plum"
		},
		{
			url:"11.jpg",
			name:"Give you My ..",
			singer:"陈亦迅"
		},
		{
			url:"21.jpg",
			name:"Give you My ..",
			singer:"A—Lin"
		},
		{
			url:"18.jpg",
			name:"Give you My ..",
			singer:"hoobl"
		}
	]


})
app.controller("playerlistCtrl",function($scope,$element,$http){
	
	$scope.list = [];
	
	$http.get('/getplayerlist').success(function(res){
		$scope.list = res
	})
	
	

});
app.controller("shareCtrl",function($scope,$element,$http){
	$scope.list = [];
	$http.get('/getcommon').success(function(res){
		
		//console.log(res)
		$scope.list = res
	})
	$scope.postInfo = function(){
		
		$http.post('/postInfo',$scope.data).success(function(res){
		
		})
	}
});
app.controller("playerCtrl",function($scope,$element,$http,$interval, abc){
	// $interval(function () {
		// abc.trigger('hello', 123, 'abc')
	// }, 1000)
	$scope.list = [

		{ line:"Nervous - Gavin James"},
		{ line:"Gavin James"},
		{ line:"James"},
		{ line:"I promise that I'll hold you when it's cold out"},
		{ line:"And we'll lose our winter coats in the spring"},
		{ line:"Cause lately I was thinking I never told you "},
		{ line:"Cause we lived at the carnival in summer "},
		{ line:"Scared ourselves to death on a ghost train"},
		{ line:"And just like every ferris wheel stops turning"},
		{ line:"Oh, I guess we had an expiration date "},
		{ line:"So I won't say I love you, it's too late "},
		{ line:"Ohhh "},
		{ line:"Cause every time I saw you I got nervous "},
		{ line:"Shivering and shaking at the knees "},
		{ line:"just like every song I haven't heard yet,no"},
		{ line:"I didn't know the words in front of me "},
		{ line:"In front of me"},
		{ line:"Oh, but I don't wanna know "},
		{ line:"Who will take you home"},
		{ line:"Who will take you home"},
		{ line:"Who will take you home"},
		{ line:"I will let you go home"},
		{ line:"Ohh "},
		{ line:"And now that you're on someone else's shoulders "},
		{ line:"The winter winds are colder on my own "},
		{ line:"Maybe we will meet when we get older "},
		{ line:"Maybe we won't "},
		{ line:"So I wont say I love if you don't"},
		{ line:"No you don't"},
		{ line:"Ohh "},
		{ line:"So I wont say I love you if you don't "}			
					
	];
	// $scope.show = function(){
	// 	console.log(1);
	// 	// $element.find(".pannal").css("display","block")
	// 	console.log($element.find(".pannal"))
	// }
	$scope.media = $element.find("audio");

	$scope.index = 0;
	$scope.statee = false;
	$scope.currentTime = $scope.media[$scope.index].currentTime;


	$scope.H = 0;
 	$scope.idx = 2;
 	
 	

	$interval(function(){
		$scope.rate = ($scope.media[$scope.index].currentTime /$scope.media[$scope.index].duration);
		$scope.dis = $scope.rate * 500;

		$("span .kuai").css("width",$scope.dis+30);
		
			if($scope.rate > 0.0831){
				$scope.statee = true ;
			}else if ($scope.rate > 0.99){
				$scope.statee = false;

			}
		console.log($scope.statee)
		if($scope.statee){
			$scope.H +=36;
			$scope.idx++;
			$scope.lyric = $(".content li")
			
			//$('.content li:nth-child(n+4)').css("color","red");
			// $('.content li:nth-child(n+3)').css("color","#fff");

			$scope.lyric.eq($scope.idx).css({"color":"#0FAE53",
											 "fontSize":22
			});
			$scope.lyric.eq($scope.idx-1).css({"color":"#fff",
											 "fontSize":18
			});
			
			$scope.lyric.css("transform","translateY("+ -$scope.H +"px)")
		}

	},4500);
	
	$scope.last = function(){
		$scope.media[$scope.index].pause()
		$scope.index = $scope.index <= 0 ? 0 : --$scope.index
			
		$scope.media[$scope.index].load();
		$scope.media[$scope.index].play()
	}
	$scope.next = function(){
		$scope.media[$scope.index].pause()
		$scope.index = $scope.index >= 3 ? 3 : ++$scope.index
		$scope.media[$scope.index].load();
		$scope.media[$scope.index].play()
		
					
	}
	$scope.state = "off";
	
	$scope.toggle = function(){
			
			if($scope.state === "off"){
				$('.current').css('backgroundImage','url(img/icon/parse.png)')
				$scope.media[$scope.index].play();
				$scope.state = "on"
			}else if($scope.state === "on"){
				$('.current').css('backgroundImage','url(img/icon/player.png)')
				$scope.media[$scope.index].pause();
				$scope.state = "off"
			}	
			
		}
	$scope.show = function(){
		$(".pannal").css("display","block")
	}
	$scope.close = function(){
		$(".pannal").css("display","none")
	}
	

});
// var appp = angular.module('myapp', []);
// appp.controller("MyCtrl",function($scope){
// 	 $scope.value = 10;
//     $scope.increment = function() {
//       $scope.value = $scope.value + 1;   
//     };
//     $scope.decrement = function() {
//       $scope.value = $scope.value - 1; 
//     };

// })
// // function MyCtrl($scope) {
// //     $scope.value = 10;
// //     $scope.increment = function() {
// //       $scope.value = $scope.value + 1;   
// //     };
// //     $scope.decrement = function() {
// //       $scope.value = $scope.value - 1; 
// //     };
// // };
 
// appp.directive('ngRightClick', function($parse) {
//     return function(scope, element, attrs) {
//         var fn = $parse(attrs.ngRightClick);
//         element.bind('contextmenu', function(event) {
//             scope.$apply(function() {
//                 event.preventDefault();
//                 fn(scope, {$event:event});
//             });
//         });
//     };
// });

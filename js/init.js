//OOP functions
	function extend(child, Parent){
		child.prototype = inherit(Parent.prototype);
		child.prototype.constructor = child; 	//zvyk, aby instancia odkazovala na svoj konstruktor
		child.parent = Parent.prototype;  		//volanie prepisanych metod
	}
	function inherit(proto){
		function F(){}
		F.prototype = proto
		return new F
	}
	
//DEFINE Objects
	function elementData(){
		var Temperature=[];
		var Humidity=[];
		var Pressure=[];
		
		elementData.prototype.setTemperature = function(myTemperature){Temperature=[];Temperature.push(myTemperature)};
		elementData.prototype.setHumidity = function(myHumidity){Humidity.push(myHumidity)};
		elementData.prototype.setPressure = function(myPressure){Pressure.push(myPressure)};
			
		elementData.prototype.getTemperature = function(){return Temperature};
		elementData.prototype.getHumidity = function(){return Humidity};
		elementData.prototype.getPressure = function(){return Pressure};
		
		elementData.prototype.getHumidityForGauge = function(){return Humidity[Humidity.length-1].y};
		elementData.prototype.getPressureForGauge = function(){return Pressure[Pressure.length-1].y};
		
		elementData.prototype.variableFree = function(){
			Temperature=[];
			Humidity=[];
			Pressure=[];
		};
		elementData.prototype.fillVariables = function(JSONdata){
			var setMoreTemperatureIn16Day;
			if(!JSONdata[0].Temperature_eve){
				setMoreTemperatureIn16Day=false;
			}else{
				setMoreTemperatureIn16Day=true;
			}
			$.each(JSONdata,function(i,field){
				if(setMoreTemperatureIn16Day){
					Temperature.push({x:field.time_night,y:field.Temperature_night});
					Temperature.push({x:field.time_morning,y:field.Temperature_morning});
					Temperature.push({x:field.time,y:field.Temperature,humidity:field.Humidity,pressure:field.Pressure});
					Temperature.push({x:field.time_eve,y:field.Temperature_eve});
				}else{
					console.log(field.time);
					Temperature.push({x:field.time,y:field.Temperature,humidity:field.Humidity,pressure:field.Pressure});
				}
				Humidity.push({x:field.time,y:field.Humidity});
				Pressure.push({x:field.time,y:field.Pressure});
			});
		};
	};
	
	function prepare_RPiData(){
		
		elementData.call(this);
		var self = this;
		var TemperatureIn=[];
		var TemperatureOut=[];
		var Sea_level=[];
		var Grnd_level=[];
		
		prepare_RPiData.prototype.getTemperatureIn=function(){return TemperatureIn};
		prepare_RPiData.prototype.getTemperatureOut=function(){return TemperatureOut};
		prepare_RPiData.prototype.getSea_level=function(){return Sea_level};
		prepare_RPiData.prototype.getGrnd_level=function(){return Grnd_level};
		prepare_RPiData.prototype.getTemperatureInForGauge=function(){return TemperatureIn[TemperatureIn.length-1].y};
		prepare_RPiData.prototype.getTemperatureOutForGauge=function(){return TemperatureOut[TemperatureOut.length-1].y};
		prepare_RPiData.prototype.getSea_levelForGauge=function(){return Sea_level[Sea_level[Sea_level.length-1]].y};
		prepare_RPiData.prototype.getGrnd_levelForGauge=function(){return Grnd_level[Grnd_level.length-1].y};
		
		
		prepare_RPiData.prototype.variableFree = function(){
			elementData.prototype.variableFree();
			TemperatureIn=[];
			TemperatureOut=[];
			Sea_level=[];
			Grnd_level=[];
		};
		prepare_RPiData.prototype.fillVariables = function(JSONdata){
			elementData.prototype.fillVariables(JSONdata);
			$.each(JSONdata,function(i,field){
				TemperatureIn.push({x:field.time,y:field.TemperatureIn});
				TemperatureOut.push({x:field.time,y:field.TemperatureOut});
				Sea_level.push({x:field.time,y:field.Sea_level});
				Grnd_level.push({x:field.time,y:field.Grnd_level});
			});
		};
	};
	extend(prepare_RPiData,elementData);

	function baseForecastData (){
		
		elementData.call(this);

			var Clouds=[];
			var Rain=[];
			var Snow=[];
			var Weather_description=[];
			var Weather_icon=[];
			var Icon_id=[];
			var Weather_main=[];
			var Wind_speed=[];
			var Wind_deg=[];
			
			baseForecastData.prototype.setClouds = function(myClouds){Clouds.push(myClouds)};
			baseForecastData.prototype.setRain = function(myRain){Rain.push(myRain)};
			baseForecastData.prototype.setSnow = function(mySnow){Snow.push(mySnow)};
			baseForecastData.prototype.setWeather_description = function(myWeather_description){Weather_description.push(myWeather_description)};
			baseForecastData.prototype.setWeather_icon = function(myWeather_icon){Weather_icon.push(myWeather_icon)};
			baseForecastData.prototype.setIcon_id = function(myIcon_id){Icon_id.push(myIcon_id)};
			baseForecastData.prototype.setWeather_main = function(myWeather_main){Weather_main.push(myWeather_main)};
			baseForecastData.prototype.setWind_speed = function(myWind_speed){Wind_speed.push(myWind_speed)};
			baseForecastData.prototype.setWind_deg = function(myWind_deg){Wind_deg.push(myWind_deg)};
			
			baseForecastData.prototype.getClouds = function(){return Clouds};
			baseForecastData.prototype.getRain = function(){return Rain};
			baseForecastData.prototype.getSnow = function(){return Snow};
			baseForecastData.prototype.getWeather_description = function(){return Weather_description};
			baseForecastData.prototype.getWeather_icon = function(){return Weather_icon};
			baseForecastData.prototype.getIcon_id = function(){return Icon_id};
			baseForecastData.prototype.getWeather_main = function(){return Weather_main};
			baseForecastData.prototype.getWind_speed = function(){return Wind_speed};
			baseForecastData.prototype.getWind_deg = function(){return Wind_deg};
			
			baseForecastData.prototype.getTemperatureNow = function(){return elementData.prototype.getTemperature()[0].y};
			baseForecastData.prototype.getHumidityNow = function(){return elementData.prototype.getHumidity()[0].y};
			baseForecastData.prototype.getPressureNow = function(){return elementData.prototype.getPressure()[0].y};
			baseForecastData.prototype.getRainNow = function(){return baseForecastData.prototype.getRain()[0].y};
			baseForecastData.prototype.getSnowNow = function(){return baseForecastData.prototype.getSnow()[0].y};
			
			baseForecastData.prototype.variableFree=function(){
				elementData.prototype.variableFree();
				Clouds=[];
				Rain=[];
				Snow=[];
				Weather_description=[];
				Weather_icon=[];
				Icon_id=[];
				Weather_main=[];
				Wind_speed=[];
				Wind_deg=[];
			};
			baseForecastData.prototype.fillVariables = function(JSONdatas){
				elementData.prototype.fillVariables(JSONdatas);
				
				$.each(JSONdatas,function(i,field){
					var Clouds_array=[];
					Clouds_array.push(field.time);
					Clouds_array.push(field.Clouds);
					Clouds_array.push(-field.Clouds);
					Clouds.push(Clouds_array);
					Rain.push({x:field.time,y:field.Rain});
					Snow.push({x:field.time,y:field.Snow});
					Weather_description.push({x:field.time,y:field.Weather_description});
					Weather_icon.push({x:field.time,y:field.Weather_icon});
					Icon_id.push({x:field.time,y:field.Icon_id});
					Weather_main.push({x:field.time,y:field.Weather_main});
					Wind_speed.push({x:field.time,y:field.Wind_speed});
					Wind_deg.push({x:field.time,y:0,wind_deg:field.Wind_deg});
				});
			};
	};
	extend(baseForecastData,elementData);
//*******************************************************************************

	function prepare_data5Day (){
		var self = this;
		baseForecastData.call(this);
		var Grnd_level=[];
		var Sea_level=[];
		
		prepare_data5Day.prototype.setGrnd_level=function(myGrnd_level){Grnd_level.push(myGrnd_level);}
		prepare_data5Day.prototype.setSea_level=function(mySea_level){Sea_level.push(mySea_level);}
		
		prepare_data5Day.prototype.getGrnd_level=function(){return Grnd_level;}
		prepare_data5Day.prototype.getSea_level=function(){return Sea_level;}
		
		prepare_data5Day.prototype.fillVariables = function(externalJSONdata){
			//self.__proto__.constructor.parent.fillVariables(externalJSONdata);
			baseForecastData.prototype.fillVariables(externalJSONdata);
			$.each(externalJSONdata,function(i,field){
				prepare_data5Day.prototype.setSea_level({x:field.time,y:field.Sea_level});
				prepare_data5Day.prototype.setGrnd_level({x:field.time,y:field.Grnd_level});
			});
		}
		prepare_data5Day.prototype.variableFree=function(){
			baseForecastData.prototype.variableFree();
			Grnd_level=[];
			Sea_level=[];
		}
	};
	extend(prepare_data5Day,baseForecastData);
	
	var RPiData = new prepare_RPiData;
	var data5Day = new prepare_data5Day;
	var data16Day = new baseForecastData;
	
//global VARIABLE-----------------------------------------------------------------------------
var prepareGlobal=function(){
	this.actualChartContainer=[];
	this.actualCitySelection="";
}
var GLOBAL_options = new prepareGlobal;
//-----------------------------------FUNCTION SECTION--------------------------------------------------------------------------

//-------------------------------round corner in gauge-----------------------------------------		
function round_corner(){
	var svg;
		svg = document.getElementsByTagName('svg');
		if (svg.length > 0) {
			$.each(svg,function(i,field){
				var path = field.getElementsByTagName('path')
					if (path.length > 1) {
						// First path is gauge background
						path[0].setAttributeNS(null, 'stroke-linejoin', 'round');
						// Second path is gauge value
						path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
						//path[2].setAttributeNS(null, 'stroke-linejoin', 'round');
						path[2].setAttributeNS(null, 'stroke-linejoin', 'round');
				}
			})
		}
}
//-------------------------------end round corner----------------------------------------
function getMenuSelection(){
	return $('input[name="accordion"]:checked').val();
}
function loadJSON5Day(callback){
		
	$.getJSON("php/getDBdata_5Day.php?city_id=3056508",function(result){
		console.log(result);
		callback(result);
	});
}

function getDayString(day){
	(day>6)?day-=7:true;
	var dayOfWeek = Array(7);
	dayOfWeek[0] = "Sunday";
	dayOfWeek[1] = "Monday";
	dayOfWeek[2] = "Tuesday";
	dayOfWeek[3] = "Wednesday";
	dayOfWeek[4] = "Thursday";
	dayOfWeek[5] = "Friday";
	dayOfWeek[6] = "Saturday";
	var dayString = dayOfWeek[day];
	return dayString;
}

/*function loadScript(url, callback){
			// Adding the script tag to the head as suggested before
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;

			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			script.onreadystatechange = callback;
			script.onload = callback;

			// Fire the loading
			head.appendChild(script);
}*/

//-----------------------------------FUNCTION SECTION END--------------------------------------------------------------------------
//-------------------------------DOCUMENT READY SECTION----------------------------------------------------------------------------
//------------------------------scroll to top--------------------------------------------
$(document).ready(function(){
    
   $(window).scroll(function(){
      if ($(this).scrollTop() > 120) {
         $('.scrollToTop').fadeIn();
      } else {
         $('.scrollToTop').fadeOut();
      }
   });
    
   $('.scrollToTop').on("click",function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
   });
   
//-------------------------------fade out search---------------------------------------------
   $('#accordion input').on("change",function(){
		var selected = getMenuSelection();
		if(selected==='1')
		{
			$('#search').fadeOut();
		}else
		{
			$('#search').fadeIn();
		}
	   
   });
//----------------------------------SELECT - UPDATE CHARTS-------------------------------------------
var selectedButton=2;
	
	$('body').on('click','*',function(){
		$("#livesearch").slideUp();
	});
	
	$("form").submit(function(e){
		e.preventDefault();
	});
	
	$('#first').on('click',function(){
		if(selectedButton!=1){
			selectedButton=1;
			destroyAllCharts();
			deleteUnusedDIV();
			createRPiCharts();
		}
	});
	$('#second').on('click',function(){
		if(selectedButton!=2){
			selectedButton=2;
			destroyAllCharts();
			deleteUnusedDIV();
			create5DayCharts();
			getForecastData(GLOBAL_options.actualCitySelection);
		}
	});
	$('#third').on('click',function(){
		if(selectedButton!=3){
			selectedButton=3;
			destroyAllCharts();
			deleteUnusedDIV();
			create16DayCharts();
			getForecastData(GLOBAL_options.actualCitySelection);
		}
	});
	
	function deleteUnusedDIV(){
		if(selectedButton==1){
			$("#graph_windSpeed").addClass('hide');
			$("#graph_sealevel").removeClass('hide');
			console.log("selected first");
		}else
		if(selectedButton==2){
			$("#graph_windSpeed").removeClass('hide');
			$("#graph_sealevel").removeClass('hide');
			
		}else{
			$("#graph_sealevel").addClass('hide');
			$("#graph_windSpeed").removeClass('hide');
		}
	}
	
	function destroyAllCharts(){
		var numOfCharts = GLOBAL_options.actualChartContainer.length;
		if(numOfCharts>0)
		{
			for(numOfCharts=numOfCharts-1;numOfCharts>=0;numOfCharts--){
				GLOBAL_options.actualChartContainer[numOfCharts].destroy();
				GLOBAL_options.actualChartContainer.pop();
			}
		}else{
			console.log("there is no chart to erase!");
		}
	}
	$('.left_top').on('click',function(){
		location.reload(true); //force reload
	});
//----------------------Click efect ---------Thanks to 440desig-----
	var ink, d, x, y;
 $(".ripplelink").click(function(e){
    if($(this).find(".ink").length === 0){
      $(this).prepend("<span class='ink'></span>");
    }
          
    ink = $(this).find(".ink");
    ink.removeClass("animate");
      
    if(!ink.height() && !ink.width()){
      d = Math.max($(this).outerWidth(), $(this).outerHeight());
      ink.css({height: d, width: d});
    }
      
    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;
      
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});

//---------------------------------------------------------
//---------------------------side menu anim------------------	
	$(".sideMenu_button").hover(function(){
		$(".side_menu_button_content").addClass("side_menu_animation");
	},function(){
		$(".side_menu_button_content").removeClass("side_menu_animation");
	});
//--------------------------------------------------------------
	/*
	var side_menu_selected=false;
	$(".sideMenu_button").on('click',function(){
		if(!side_menu_selected){
			side_menu_selected=true;
			$(".side_menu_area").css("display","block");
		}else{
			side_menu_selected=false;
			$(".side_menu_area").css("display","none");
		}
		
	});
	*/
	$(".sideMenu_button").on('click',function(){
		 $(".side_menu_area").slideToggle("slow");
	});

//---------------------Time---------------------------------------
function Zero(i){
    ((i<10)?i="0"+i:i);
    
    return i;
}

function getMyTime(){
    var dateNow = new Date();
    var hourNow = Zero(dateNow.getHours());
    var minuteNow = Zero(dateNow.getMinutes());
    var secondNow = Zero(dateNow.getSeconds()+0,5);
	var time = [];
	time.push({date:dateNow,hour:hourNow,minute:minuteNow,second:secondNow});

	return time;
}
function setTimeNow(){
	var timeHtmlElement = document.getElementById("time");
	var time = getMyTime();
    timeHtmlElement.innerHTML = time[0].hour + ":" + time[0].minute + ":" + time[0].second;
	
	((time[0].hour==="00"&&time[0].minute==="01")?setDay():false);
	((time[0].date.getDate()==="00"&&time[0].hour==="00"&&time[0].minute==="01")?setMonth():false);
	((time[0].date.getMonth==="0"&&time[0].date.getDate()==="00"&&time[0].hour==="00"&&time[0].minute==="01")?setYear():false);
}
setInterval(setTimeNow,1000);



function setDay(){
	var time = new Date();
	console.log(time);
	var dayHtmlElement = document.getElementById("day");
	dayHtmlElement.innerHTML = getDayString(time.getDay());
	var dateHtmlElement = document.getElementById("date_day");
	dateHtmlElement.innerHTML = time.getDate();
}
setDay();
//setInterval(setDay,86400000);

function setMonth(){
	var time = new Date();
	var monthOfYear = Array(12);
	monthOfYear[0] = "January";
	monthOfYear[1] = "February";
	monthOfYear[2] = "March";
	monthOfYear[3] = "April";
	monthOfYear[4] = "May";
	monthOfYear[5] = "June";
	monthOfYear[6] = "July";
	monthOfYear[7] = "August";
	monthOfYear[8] = "September";
	monthOfYear[9] = "October";
	monthOfYear[10] = "November";
	monthOfYear[11] = "December";
	
	var monthHtmlElement = document.getElementById("month");
	monthHtmlElement.innerHTML = monthOfYear[time.getMonth()];
	}
setMonth();

function setYear(){
	var time = new Date();
	var yearHtmlElement = document.getElementById("year");
	yearHtmlElement.innerHTML = time.getFullYear();
}
setYear();
//---------------------END Time---------------------------------------
	
});
//-------------------------------DOCUMENT READY SECTION END------------------------------------------------------------------------
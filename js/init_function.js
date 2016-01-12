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
//-------------------------------end round corner in HIGHCHARTS----------------------------------------
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
	
	$('.menu_icon').on('click',function(){
				$('.row_base').toggleClass('expanded');
			});
			$(".menu_icon").on('click',function(){
				$(this).toggleClass('menu_shown');
			});
    
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
		$(".gear_icon").addClass("gear_animation");
	},function(){
		$(".gear_icon").removeClass("gear_animation");
	});
	
//--------------------------------------------------------------

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
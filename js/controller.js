
	
	/*
	$("body").on("change",".search",function(){
		var city_name = $(".search").val();
		var city_id = $(".city").val(city_name);
		var city_id = $(city_id[0].outerHTML)[0].getAttribute("data-ID");
		console.log(" id: "+city_id+" city :"+city_name);
		//$("#livesearch").slideUp("fast",getForecastData(city_id,city_name));
	});
	*/

		
function handle_pressKeyboard(e){
	if(e.which === 13){
		var city_name = $(".search").val();
		if($(".city")[0]){
			var city_id = $(".city").val(city_name);
			var city_id = $(city_id[0].outerHTML)[0].getAttribute("data-ID");
			$("#livesearch").slideUp("fast",getForecastData(city_id));
		}
	}else 
		if(e.which == 8){// <-
			$(".search").val("");
	}else{
		showSearchSugestionResult();
	}
}

function onClickHandlerCityData(object){
	var city_id = object.getAttribute("data-ID");
	var city_name = object.innerHTML;
	$(".search").val(city_name);
	$("#livesearch").slideUp("fast",getForecastData(city_id));
}
function isMenuChoice5Day(){
	if(getMenuSelection()==='2'){
		return true;
	}else
		return false;
}
			
function getForecastData(city_id){
	GLOBAL_options.actualCitySelection=city_id;
	if(!city_id){
		city_id="3060972";
		$(".search").val("Bratislava");
	}
	var selected5Day=isMenuChoice5Day();
	if(selected5Day){
		var url = "php/getDBdata_5Day.php";
	}
	else{
		var url = "php/getDBdata_16Day.php";
	}
		$.ajax({
			type: 	"GET",
			url:	url,
			dataType: "json",
			data:	{city_id:city_id},
			success:function(response){
				if(selected5Day){
					update5DayCharts(response);
				}else{
					update16DayCharts(response);
				}
					
			},
			error: function(jqXHR, exception) {
				console.log(jqXHR);
				if (jqXHR.status === 0) {
					alert('Not connect.\n Verify Network.');
				} else if (jqXHR.status == 404) {
					alert('Requested page not found. [404]');
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
				} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
				} else if (exception === 'timeout') {
					alert('Time out error.');
				} else if (exception === 'abort') {
					alert('Ajax request aborted.');
				} else {
					alert('Uncaught Error.\n' + jqXHR.responseText);
				}
			  
			},
			stop:function(){
				alert("Ajax exit with status: --Stop");
			}
		});
		return false;
}
function mergeObjects(obj1,obj2,obj3){
	objRET=[];

	var j=0;
		for (var i=0;i<obj1.length;i++)
		{
			if(j==obj2.length-1)j=0;
			if(+obj1[i].x===+obj2[j].x)
			{	
				objRET[i]=({x:obj1[i].x,y:obj1[i].y,humidity:obj1[i].humidity,pressure:obj1[i].pressure,w_desc:obj2[j].y,w_icon:obj3[j].y});
				j++;
			}
			else
			{
				objRET[i]=({x:obj1[i].x,y:obj1[i].y,humidity:obj1[i].humidity,pressure:obj1[i].pressure,w_desc:"",w_icon:""});
			}	
		}
	return objRET;
}
			
function update5DayCharts(response){
	data5Day.variableFree();
	data5Day.fillVariables(response);	
	var container = $('#container').highcharts();
	if(!container){
		create5DayCharts();
		var container = $('#container').highcharts();
	}
	container.series[0].setData(mergeObjects(data5Day.getTemperature(),data5Day.getWeather_description(),data5Day.getWeather_icon())); //need to merge for tooltip
	container.series[1].setData(data5Day.getHumidity());
	container.series[2].setData(data5Day.getRain());
	container.series[3].setData(data5Day.getSnow());
	container.series[4].setData(data5Day.getClouds());
	
	var wind = $('#graph_windSpeed').highcharts();
	wind.series[0].setData(data5Day.getWind_speed());
	wind.series[1].setData(data5Day.getWind_deg());

	var pressure = $('#graph_pressure').highcharts();
	pressure.series[0].setData(data5Day.getPressure());
	pressure.series[1].setData(data5Day.getGrnd_level());
	
	var sea_level = $('#graph_sealevel').highcharts();
	sea_level.series[0].setData(data5Day.getSea_level());

	
	var gauge1 = $('#1gauge').highcharts();
	gauge1.series[0].points[0].update(data5Day.getTemperatureNow());
	var gauge2 = $('#2gauge').highcharts();
	gauge2.series[0].points[0].update(data5Day.getHumidityNow());
	var gauge3 = $('#3gauge').highcharts();
	gauge3.series[0].points[0].update(data5Day.getPressureNow());
	var gauge4 = $('#4gauge').highcharts();
	gauge4.series[0].points[0].update(data5Day.getRainNow()+data5Day.getSnowNow());
	
	updateSideBar(data5Day,true);
}

function updateSideBar(data,is5Day){
	var citySideBarHtmlElement=document.getElementById("citySideBar");
	var dateNow = new Date();
	var nextDay = 26;
	var corectIcon = 0;
	var corectionTemperature =1;
	var todayHtmlElement=document.getElementById("today");
	var firsDayHtmlElement=document.getElementById("firstDay");
	var secondDayHtmlElement=document.getElementById("secondDay");
	var thirdDayHtmlElement=document.getElementById("thirdDay");
	var fourthDayHtmlElement=document.getElementById("fourthDay");
	var fivedDayHtmlElement = document.getElementById("fivedDay");
	var	sixthDayHtmlElement = document.getElementById("sixthDay");
	var	seventhDayHtmlElement = document.getElementById("seventhDay");
	var	eightDayHtmlElement = document.getElementById("eightDay");
	var	ninethDayHtmlElement = document.getElementById("ninethDay");
	var	tenthDayHtmlElement = document.getElementById("tenthDay");
	
	for(var i=0;i!==nextDay;i++){
		var dateForecast = new Date((data.getTemperature()[i].x)-288000000);
		var forecastHours=dateForecast.getHours();
		//console.log(data.getTemperature()[i].x-28800000 +"----"+i+"---"+forecastHours + "---"+ 14);
		if(forecastHours===14||forecastHours===12){	//temp from next day
				nextDay=i;
				break; 
			}
	}
	if (is5Day)
	{
		corectIcon=33;
		corectionTemperature =1;
		
		fivedDayHtmlElement.innerHTML="";
		sixthDayHtmlElement.innerHTML="";
		seventhDayHtmlElement.innerHTML="";
		eightDayHtmlElement.innerHTML="";
		ninethDayHtmlElement.innerHTML="";
		tenthDayHtmlElement.innerHTML="";
		
		fivedDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		sixthDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		seventhDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		eightDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		ninethDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		tenthDayHtmlElement.setAttribute("style","background-color:#e6e6e6;box-shadow: 10px 0px 9px -9px rgba(137, 137, 137, 0.9) inset;");
		
	}else{
		corectIcon=7;
		corectionTemperature = 2;
		
		fivedDayHtmlElement.setAttribute("style","background-color:#cfcccc;");
		
		seventhDayHtmlElement.setAttribute("style","background-color:#cfcccc;");
		
		ninethDayHtmlElement.setAttribute("style","background-color:#cfcccc;");
		
	}
	/*
	console.log(data.getTemperature());
	console.log(data.getWeather_icon());
	citySideBarHtmlElement.innerHTML = "In <p>"+ $(".search").val()+"</p>";
	todayHtmlElement.innerHTML = "Now: "+'<span style="float:right"> ' +data.getTemperatureNow()+"ºC " +  '<img src="img/'+data.getWeather_icon()[0].y+'.png" title="" alt=""  height="25" width="22" align="center" style="margin:auto 0 auto 10;	 float:right"></span>';
	firsDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+1)  +'<span > '+data.getTemperature()[nextDay+8/corectionTemperature].y+"ºC  "+ ' <img src="img/'+data.getWeather_icon()[nextDay+8%corectIcon].y+'.png" title="" alt=""  ></span>';
	secondDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+2) +'<span > '+data.getTemperature()[nextDay+16/corectionTemperature].y+"ºC  "+  ' <img src="img/'+data.getWeather_icon()[nextDay+16%corectIcon].y+'.png" title="" alt=""  ></span>';
	thirdDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+3) +'<span > '+data.getTemperature()[nextDay+24/corectionTemperature].y+"ºC  "+  '<img src="img/'+data.getWeather_icon()[nextDay+24%corectIcon].y+'.png" title="" alt=""  ></span>';
	fourthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+4) +'<span > '+ data.getTemperature()[nextDay+32/corectionTemperature].y+"ºC "+ '<img src="img/'+data.getWeather_icon()[nextDay+32%corectIcon].y+'.png" title="" alt=""  ></span>';
	if(!is5Day)
	{
		fivedDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+5)  +'<span > '+data.getTemperature()[nextDay+20].y+"ºC  "+ ' <img src="img/'+data.getWeather_icon()[5].y+'.png" title="" alt=""  ></span>';
		sixthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+6) +'<span > '+data.getTemperature()[nextDay+24].y+"ºC  "+  ' <img src="img/'+data.getWeather_icon()[6].y+'.png" title="" alt="" ></span>';
		seventhDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+7) +'<span > '+data.getTemperature()[nextDay+28].y+"ºC  "+  '<img src="img/'+data.getWeather_icon()[7].y+'.png" title="" alt=""  ></span>';
		eightDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+8) +'<span > '+ data.getTemperature()[nextDay+32].y+"ºC "+ '<img src="img/'+data.getWeather_icon()[8].y+'.png" title="" alt=""  ></span>';
		ninethDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+9) +'<span > '+ data.getTemperature()[nextDay+36].y+"ºC "+ '<img src="img/'+data.getWeather_icon()[9].y+'.png" title="" alt="" ></span>';
		tenthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+10) +'<span> '+ data.getTemperature()[nextDay+40].y+"ºC "+ '<img src="img/'+data.getWeather_icon()[10].y+'.png" title="" alt="" ></span>';
	
	}
	*/
	citySideBarHtmlElement.innerHTML = "In <p>"+ $(".search").val()+"</p>";
	todayHtmlElement.innerHTML = "Now: "+'<span style="float:right"> ' +data.getTemperatureNow()+"ºC " +  getForecastSideIcon(data.getWeather_icon()[0].y);
	firsDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+1)  +'<span > '+data.getTemperature()[nextDay+8/corectionTemperature].y+"ºC  "+ getForecastSideIcon(data.getWeather_icon()[nextDay+8%corectIcon].y);
	secondDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+2) +'<span > '+data.getTemperature()[nextDay+16/corectionTemperature].y+"ºC  "+  getForecastSideIcon(data.getWeather_icon()[nextDay+16%corectIcon].y);
	thirdDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+3) +'<span > '+data.getTemperature()[nextDay+24/corectionTemperature].y+"ºC  "+  getForecastSideIcon(data.getWeather_icon()[nextDay+24%corectIcon].y);
	fourthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+4) +'<span > '+ data.getTemperature()[nextDay+32/corectionTemperature].y+"ºC "+ getForecastSideIcon(data.getWeather_icon()[nextDay+32%corectIcon].y);
	if(!is5Day)
	{
		fivedDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+5)  +'<span > '+data.getTemperature()[nextDay+20].y+"ºC  "+ getForecastSideIcon(data.getWeather_icon()[5].y);
		sixthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+6) +'<span > '+data.getTemperature()[nextDay+24].y+"ºC  "+  getForecastSideIcon(data.getWeather_icon()[6].y);
		seventhDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+7) +'<span > '+data.getTemperature()[nextDay+28].y+"ºC  "+  getForecastSideIcon(data.getWeather_icon()[7].y);
		eightDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+8) +'<span > '+ data.getTemperature()[nextDay+32].y+"ºC "+ getForecastSideIcon(data.getWeather_icon()[8].y);
		ninethDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+9) +'<span > '+ data.getTemperature()[nextDay+36].y+"ºC "+ getForecastSideIcon(data.getWeather_icon()[9].y);
		tenthDayHtmlElement.innerHTML = getDayString(dateNow.getDay()+10) +'<span> '+ data.getTemperature()[nextDay+40].y+"ºC "+ getForecastSideIcon(data.getWeather_icon()[10].y);
		console.log(dateNow.getDay()+10);
		console.log(getDayString(dateNow.getDay()+10));
	
	}
}
 function getForecastSideIcon(iconNum){
	 var sideIcon="";
	 console.log(iconNum);
	 switch(iconNum){
		case '01d':{sideIcon="sun";}
			break;
		case '09d':{sideIcon="rain";}
			break;
		case '09n':{sideIcon="rain";}
			break;
		case '10n':{sideIcon="rain";}
			break;
		case '10d':{sideIcon="halfsunnyrain";}
			break;
		case '':{sideIcon="halfmoonrain";}
			break;
		case '02d':{sideIcon="halfsunny";}
			break;
		case '01n':{sideIcon="moon";}
			break;
		case '02n':{sideIcon="halfmoon";}
			break;
		case '50d':{sideIcon="fog";}
			break;
		case '50n':{sideIcon="fog";}
			break;
		case '13d':{sideIcon="snow";}
			break;
		case '13n':{sideIcon="snow";}
			break;
		default:{sideIcon="cloud";}
	 }
	 return "<div class='"+sideIcon+" sideIcon' ></div></span>"
 }


 
function update16DayCharts(response){
	data16Day.variableFree();
	data16Day.fillVariables(response);			
	
	var container = $('#container').highcharts();
	
	console.log(data16Day.getWeather_icon());
	console.log(data16Day.getTemperature());
	console.log(mergeObjects(data16Day.getTemperature(),data16Day.getWeather_description(),data16Day.getWeather_icon()));
	container.series[0].setData(mergeObjects(data16Day.getTemperature(),data16Day.getWeather_description(),data16Day.getWeather_icon()));
	container.series[1].setData(data16Day.getHumidity());
	container.series[2].setData(data16Day.getRain());
	container.series[3].setData(data16Day.getSnow());
	container.series[4].setData(data16Day.getClouds());
	
	var wind = $('#graph_windSpeed').highcharts();
	wind.series[0].setData(data16Day.getWind_speed());
	wind.series[1].setData(data16Day.getWind_deg());
	
	var pressure = $('#graph_pressure').highcharts();
	pressure.series[0].setData(data16Day.getPressure());
	
	var gauge1 = $('#1gauge').highcharts();
	gauge1.series[0].points[0].update(data16Day.getTemperatureNow());
	var gauge2 = $('#2gauge').highcharts();
	gauge2.series[0].points[0].update(data16Day.getHumidityNow());
	var gauge3 = $('#3gauge').highcharts();
	gauge3.series[0].points[0].update(data16Day.getPressureNow());
	var gauge4 = $('#4gauge').highcharts();
	gauge4.series[0].points[0].update(data16Day.getRainNow()+data16Day.getSnowNow());
	
	updateSideBar(data16Day,false);
	
}

function showSearchSugestionResult(){
	var cityList="";
	var wrapper_cityList;
	var firstCity="";
	var searchBox = document.getElementsByClassName("search")[0];
	
	var str = $(".search").val();

	if(str!=null){
		$.ajax({
			type: 	"GET",
			url:	"php/livesearch.php",
			data: 	{search_string:str},
			success:function(response){
				if(response!=null){
					response=JSON.parse(response);
					$.each(response,function(i,data){
						if(i==0){firstCity=data.NAME}
						cityList+='<div class="city" onclick="onClickHandlerCityData(this)" data-ID="'+data.ID+'";>'+data.NAME+'</div>'
					});
					
					var suggestion =firstCity;
					//console.log(suggestion);
					searchBox.value = suggestion;
					
					searchBox.setSelectionRange(str.length,suggestion.length);
					searchBox.focus();
				}
				wrapper_cityList='<div class="wrapper_cityList">'+cityList+'</div>';
				$("#livesearch").slideDown();
				$("#livesearch").html(wrapper_cityList);
			},
			send:	function(event,xhr,option){
				$("#livesearch").slideDown();
				$("#livesearch").append("<img src='img/loading.gif'>");
			},
			error:  function(event,xhr,options,exception){
				console.log("xhr: "+xhr+"  options: "+options+"  Exception: "+exception);
				alert(xhr);
			}
		});
	}
	return false;
}


			 
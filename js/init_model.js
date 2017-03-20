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
					Temperature.push({x:field.time_night,y:field.Temperature_night,humidity:field.Humidity,pressure:field.Pressure});
					Temperature.push({x:field.time_morning,y:field.Temperature_morning,humidity:field.Humidity,pressure:field.Pressure});
					Temperature.push({x:field.time,y:field.Temperature,humidity:field.Humidity,pressure:field.Pressure});
					Temperature.push({x:field.time_eve,y:field.Temperature_eve,humidity:field.Humidity,pressure:field.Pressure});
				}else{
					Temperature.push({x:field.time,y:field.Temperature,humidity:field.Humidity,pressure:field.Pressure});
				}
				Humidity.push({x:field.time,y:field.Humidity});
				Pressure.push({x:field.time,y:field.Pressure});
			});
		};
	};
	
	function prepare_RPiData(){
		
		elementData.call(this);
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
	
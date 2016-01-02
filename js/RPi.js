var main_optionsRPi = {
					chart: {
						renderTo: 'container',
						type: 'spline',
						zoomType:'x'
					},
					title: {
						text: 'RPi'
					},
					yAxis: [{//first axis
						gridLineWidth:1,
						minorTickInterval: 'auto',
						title: {
							text: 'Temp In',
							style: {
								color: 'green'
								}
						},
						labels:{
							format: '{value} °C',
							style:{
								color:'green'
							}
						},
						opposite: false,
						plotBands:[{
							
						}]
						
					},{//Sec yAxis
						gridLineWidth:1,
						TickInterval: 'auto',
						title:{
							text: 'Hum',
							style: {
								color: '#00A3CC'
							}
						},
						labels:{
							format: '{value} %',
							style:{
								color: '#00A3CC'
								}
						},
						opposite: true,
					},{//Third
						gridLineWidth: 1,
						TickInterval: 'auto',
						title:{
								text: 'Temp Out',
								style:{
									color: '#6B4C9A'
									}
								},
								labels:{
									format: '{value} °C',
									style:{
										color: '#6B4C9A'
										}	
								},
						opposite: true
					}],
					series: [{
						name: 'Temp In',
						type: 'spline',
						yAxis: 0,
						dataLabels:{
								enabled:true,
								useHTML:true,
								formatter:function(){
									// return '<span>'+this.y+'</span><br/>'+this.series+'<img src="'+this.key+'" />';
									return this.point.z;
								}
							},
						color: '#3E9651',
						negativeColor: '#0088FF',
						tooltip:{
							valueSuffix: '°C',
						}
					},{
						name:'Hum',
						type: 'areaspline',
						yAxis: 1,
						tooltip:{
							valueSuffix: '%'
						},
						dashStyle: 'shortdashdot',
						marker:{
							enabled: false,
							symbol: 'circle',
							radius: 2,
							states:{
								hover:{
									enabled:true
								}
							}
						}
					},{
						name: 'Temp Out',
						type: 'spline',
						yAxis:2,
						color:'#6B4C9A',
						tooltip:{
							valueSuffix:'Pa'
						},
						negativeColor: '#0088FF',
					}]
}
//---------------------------------2Chart Press ----------------------------------------------				
var options_pressureRPi = {
					chart: {
						renderTo: 'graph_pressure',
						type: 'spline',
						zoomType:'x'
					},
					title: {
						text: 'Pressure'
					},
					yAxis: [{
						gridLineWidth:1,
						minorTickInterval: 'auto',
						title: {
							text: 'Pressure',
							style: {
								color: '#6C3738'
								}
						},
						labels:{
							format: '{value} Pa',
							style:{
								color:'#6C3738'
							}
						},
						opposite: false,
					},{
						gridLineWidth:1,
						minorTickInterval: 'auto',
						title: {
							text: 'Altitude',
							style: {
								color: '#5C83A3'
								}
						},
						labels:{
							format: '{value} Pa',
							style:{
								color:'#5C83A3'
							}
						},
						opposite: true,
					}],
					series: [{
						name: 'Pressure',
						type: 'spline',
						yAxis: 0,
						dataLabels:{
								enabled:true,
								useHTML:true
							},
						color: '#6C3738',
						tooltip:{
							valueSuffix: 'Pa',
						},
						dashStyle: 'longdash'
					},
					{
						name: 'Altitude',
						type: 'spline',
						yAxis: 1,
						color: '#5C83A3',
						tooltip:{
							valueSuffix: 'Pa',
						},
						dashStyle: 'longdashdot'
					}]
}
//---------------------------------3Chart Sea level ----------------------------------------------
var options_sealevelRPi = {
					chart: {
						renderTo: 'graph_sealevel',
						type: 'spline',
						zoomType:'x'
					},
					title: {
						text: 'Sea level'
					},
					yAxis: {
						gridLineWidth:1,
						minorTickInterval: 'auto',
						title: {
							text: 'Sea level',
							style: {
								color: '#EA8D11'
								}
						},
						labels:{
							format: '{value} Pa',
							style:{
								color:'#EA8D11'
							}
						},
						opposite: false,
					},
					series: [{
						name: 'Sea_level',
						type: 'spline',
						yAxis: 0,
						dataLabels:{
								enabled:true,
								useHTML:true
							},
						color: '#EA8D11',
						tooltip:{
							valueSuffix: 'Pa',
						}
					}]
}
//----------------------------END of graph def-----------------------------------
//----------------------------Gauge default options--------------------------------------
var defaultGaugeOptions = {

							chart: {
                type: 'solidgauge',
                    margin: [0, 0, 0, 0],
                    backgroundColor: 'transparent'
                },
                title: null,
                yAxis: {
                    min: 0,
                    max: 30,
                    minColor: '#009CE8',
                    maxColor: '#009CE8',
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickLength: 0,
                    minTickInterval: 500,
                    labels: {
                        enabled: false
                    }
                },
                pane: {
                    size: '100%',
                    center: ['50%', '60%'],
                    startAngle: -130,
                    endAngle: 130,
                    background: {
                    borderWidth: 20,
                    backgroundColor: '#6B4C9A',
                    shape: 'arc',
                    borderColor: '#DBDBDB',
                        outerRadius: '90%',
                        innerRadius: '90%'
                    }
                },
                
                plotOptions: {
                    solidgauge: {
                        borderColor: '#009CE8',
                        borderWidth: 20,
                        radius: 90,
                        innerRadius: '90%',
                        dataLabels: {
                            borderWidth: 0,
                            useHTML: false
                        }
                    }
                }
}
//---------------------------gauge1 options----------------------------------------
var gaugeOptions_tempInRPi = {
							chart: {
								renderTo: '1gauge'
							},
							yAxis: {
								min: 0,
								max: 60,
								minColor: '#99D6AD',
								maxColor: '#005C1F',
								title: {
									text: 'T (home)'
								}
							},
							plotOptions:{
								solidgauge:{
									borderColor:'green'
								}
							},
							tooltip:{
								enabled:false
							},
							credits: {
								enabled: false
							},
							series: [{
								name: 'Temp in',
								dataLabels: {
									useHTML: true,
									format: '<img src="img/Hum.png" width="50px" align="center"><div style="text-align:center"><span style="font-size:20px;color:#009933">{y}</span></div>'
								}
							}]
}
var gaugeOptions_tempOutRPi = {
							chart: {
								renderTo: '2gauge'
							},
							yAxis: {
								min: 0,
								max: 60,
								minColor: '#99D6AD',
								maxColor: '#005C1F',
								title: {
									text: 'T (out)'
								}
							},
							plotOptions:{
								solidgauge:{
									borderColor:'purple'
								}
							},
							tooltip:{
								enabled:false
							},
							credits: {
								enabled: false
							},
							series: [{
								name: 'Temp out',
								dataLabels: {
									format: '<div style="text-align:center"><span style="font-size:20px;color:purple">{y}</span></div>'
								}
							}]
}
var gaugeOptions_humidityRPi = {
							chart: {
								renderTo: '3gauge'
							},
							yAxis: {
								min: 0,
								max: 100,
								title: {
									text: 'Humidity'
								}
							},
							tooltip:{
								enabled:false
							},
							credits: {
								enabled: false
							},
							series: [{
								name: 'Humidity',
								dataLabels: {
								
									format: '<div style="text-align:center"><span style="font-size:20px;color:#009ce8">{y}</span></div>'
								}
							}]
}
var gaugeOptions_pressureRPi = {
							chart: {
								renderTo: '4gauge'
							},
							yAxis: {
								min: 0,
								max: 2000,
								title: {
									text: 'Pressure'
								}
							},
							plotOptions:{
								solidgauge:{
									borderColor:'orange'
								}
							},
							tooltip:{
								enabled:false
							},
							credits: {
								enabled: false
							},
							series: [{
								name: 'Pressure',
								dataLabels: {
									format: '<div style="text-align:center"><span style="font-size:20px;color:orange">{y}</span></div>'
								}
							}]
}
	
//--------------------------end of gauge options------------------------------------
//--------------------------FUNCTION SECTION---------------------------------------
function createRPiCharts(){
		getRPiData(function (){
				gaugeOptions_tempIn = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_tempInRPi);
				var gauge1 = new Highcharts.Chart(gaugeOptions_tempIn);
				gaugeOptions_tempOut = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_tempOutRPi);
				var gauge2 = new Highcharts.Chart(gaugeOptions_tempOut);
				gaugeOptions_humidity = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_humidityRPi);
				var gauge3 = new Highcharts.Chart(gaugeOptions_humidity);
				gaugeOptions_pressure = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_pressureRPi);
				var gauge4 = new Highcharts.Chart(gaugeOptions_pressure);

				var chart_temp_hum = new Highcharts.Chart(main_optionsRPi);
				var chart_pressure = new Highcharts.Chart(options_pressureRPi);
				var chart_sealevel = new Highcharts.Chart(options_sealevelRPi);
				
				round_corner();
				
				actualChartContainer=[];
				actualChartContainer.push(chart_temp_hum);
				actualChartContainer.push(chart_pressure);
				actualChartContainer.push(chart_sealevel);
				actualChartContainer.push(gauge1);
				actualChartContainer.push(gauge2);
				actualChartContainer.push(gauge3);
				actualChartContainer.push(gauge4);
				
		});
}
function getRPiData(callback){
	$.ajax({
			type: 	"GET",
			url:	"php/getDBdata_RPiData.php",
			dataType: "json",
			success:function(response){	
			console.log(response);
					fillRPiData(response,callback);
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
}

function fillRPiData(data,callback){
	RPiData.variableFree();
	RPiData.fillVariables(data);

	main_optionsRPi.series[0].data=RPiData.getTemperatureIn();
	main_optionsRPi.series[1].data=RPiData.getHumidity();
	main_optionsRPi.series[2].data=RPiData.getTemperatureOut();
	
	options_pressureRPi.series[0].data=RPiData.getPressure();
	options_pressureRPi.series[1].data=RPiData.getGrnd_level();
	
	options_sealevelRPi.series[0].data=RPiData.getSea_level();
	//gauge data
	gaugeOptions_tempInRPi.series[0].data=[RPiData.getTemperatureInForGauge()];
	gaugeOptions_tempOutRPi.series[0].data=[RPiData.getTemperatureOutForGauge()];
	gaugeOptions_humidityRPi.series[0].data=[RPiData.getHumidityForGauge()];
	gaugeOptions_pressureRPi.series[0].data=[RPiData.getPressureForGauge()];
	
	callback();
}

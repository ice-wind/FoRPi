//----------------------------------- global CHART options--------------------------------------------
Highcharts.setOptions({
	global: {
		timezoneOffset: 6 * 60
	},
	xAxis: {
			name: 'time',
			type: 'datetime',
			ordinal: false,
			crosshair:false,
			gridLineWidth:1
	},
	tooltip:{
			useHTML: true,
			formatter: function(){
				var picture_url = '';
				if(this.series.name == "Temp In"){
					picture_url = '<img src="img/Temp.png" title="" alt="" border="1" height="25" width="22" align="center">';
				}else
				if(this.series.name == "Hum"){
					picture_url = '<img src="img/Hum.png" title="" alt="" border="1" height="25" width="22" align="center">';
				}else
				if(this.series.name == "Temp Out"){
					picture_url = '<img src="img/Press.png" title="" alt="" border="1" height="25" width="22" align="center">';
					}
				else
					{
					picture_url = ' ';
					}
					return picture_url+'<b>' + this.series.name + '</b><br/>' + 
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}					
	},
	plotOptions:{
			areaspline:{
					fillOpacity:0.1
			},
			spline:{
					states:{
						hover:{
							lineWidth:4
						}
					}
				}
	},
	credits: {
		enabled: false
	}
});	
//------------------------------DEFINITION MAIN CHART-----------------------------------------------------
	var main_options5Day = {
			chart: {
				spacingTop: 90,
				renderTo: 'container',
				type: 'spline',
				zoomType:'x'
			},
			title: {
				text: 'Forecast for 5 Days',
				y:-100
			},
			xAxis: [{
				type: 'datetime',
				ordinal: false,
				crosshair:true,
				gridLineWidth:1
			},{ gridLineWidth: 1,},{ gridLineWidth: 1,},{ gridLineWidth: 8}],
			yAxis: [{
				gridLineWidth:1,
				minorTickInterval: 'auto',
				title: {
					text: 'Temperature',
					style: {
						color: '#d1240a'
						}
				},
				labels:{
					format: '{value} °C',
					style:{
						color:'#d1240a'
					}
				},
				plotOptions: {
					column: {
						grouping: false,
						shadow: false,
						borderWidth: 0
					}
				},
				opposite: false,
				
			},{//Sec yAxis
				gridLineWidth:1,
				TickInterval: 'auto',
				title:{
					text: 'Hum',
					style: {
						color: '#00AEC2'
					}
				},
				labels:{
					format: '{value} %',
					style:{
						color: '#00AEC2'
						}
				},
				opposite: true,
			},{//Fourth
				min: 0,
				gridLineWidth: 1,
				TickInterval: 'auto',
				title:{
						text: 'Rain/Snow-Fall',
						style:{
							color: 'lightblue'
						}
				},
				labels:{
						format: '{value} mm',
						style:{
							color: 'blue'
						}	
				},
				opposite: false,
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color:  'gray'
					},
					formatter: function() {
						if (this.total != 0) {
						  return this.total;
						} else {
						  return null;
						}
					}
				},
				plotOptions: {
					column: {
						stacking: 'normal',
					},
				}

			},{//clouds
				gridLineWidth:2,
				title:{
					y:10,
					x:-10,
					rotation:0,
					text: 'Clouds',
					style: {
						color: 'grey'
					}
				},
				labels:{
					enabled:false,
				},
				min:-100,
				max:100,
				tickInterval: 50,
				offset: 0,
				height:100,
				top:-10,
				opposite: false,
	
			}],
			
			tooltip:{
				useHTML: true,
				backgroundColor: "rgba(255,255,255,0.8)",
				formatter: function(){
					var tooltip_all = '';
					var description = '';
						
						temp_picture_url = '<img src="img/Temperature.png" title="" alt="" border="1" height="25" width="22" align="center">';
						hum_picture_url = '<img src="img/Humidity.png" title="" alt="" border="1" height="25" width="22" align="center">';
						press_picture_url = '<img src="img/Pressure.png" title="" alt="" border="1" height="25" width="22" align="center">';
					if(this.series.name == "Temp"){
										description = '<div class="situation">Situation: <b>'+this.point.w_desc+'</b></div>';
						tooltip_all = 	['<div class="tooltip">'+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>'+
										description+'<br /><table  style="font-size: 90%"><tr><td>'+temp_picture_url+'Temperature</td><td>'+Highcharts.numberFormat(this.y, 2)+'ºC</td></tr>'+
										'<tr><td>'+hum_picture_url+'Humidity</td><td>'+Highcharts.numberFormat(this.point.humidity, 2)+'%</td></tr>'+
										'<tr><td>'+press_picture_url+'Pressure</td><td>'+Highcharts.numberFormat(this.point.pressure, 2)+'Pa</td></tr>'+
										'</table></div>']
					}				
						return tooltip_all
						//'<b>' + this.series.name + '</b><br/>' + 
				}					
			},
			
			plotOptions:{
				areaspline:{
					fillOpacity:0.1
				},
				spline:{
					states:{
						hover:{
							lineWidth:4
						}
					}
				},
				column:{
					stacking: 'normal',
					grouping: false,
					shadow: false,
					borderWidth: 0
				},
			},
			series:[{
				name: 'Temp',
				type: 'spline',
				yAxis: 0,
				dataLabels:{
					enabled:true,
					useHTML:true,
					formatter:function(){
						var weather_icon=this.point.w_icon;
						if(!weather_icon){
							return "";							
						}
						else{
							return '<span>'+weather_icon+'</span><img src="img/'+this.point.w_icon+'.png"'+'width="42"><img>&nbsp;';
						}
					}
				},
				color: '#FF3D8B',
				negativeColor: '#CCFFFF',
				tooltip:{
					enabled:true,
				},
				zIndex:100,
				data:[],
			},{
				name:'Hum',
				type: 'areaspline',
				yAxis: 1,
				data: [],
				enableMouseTracking: false,
				tooltip:{
					enabled:false
				},
				dashStyle: 'shortdashdot',
				color:'#D1F6FF',
				marker:{
					enabled: false,
					symbol: 'circle',
					radius: 1,
					states:{
						hover:{
							enabled:true
						}
					}
				}
			},{
				name: 'Rain-Fall',
				type: 'column',
				yAxis:2,
				data: [],
				enableMouseTracking: false,
				color:'blue',
			},{
				name: 'Snow-Fall',
				type: 'column',
				yAxis:2,
				data: [],
				enableMouseTracking: false,
				color:'grey',
				plotOptions: {
					series: {
						pointWidth: 400
					}
				},
			},{
				name: 'clouds',
				type: 'arearange',
				yAxis:3,
				data: [],
				enableMouseTracking: false,

				fillColor : {
				  linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
					  stops: [[0, 'rgba(255, 255, 255,0)'], [0.7, 'rgba(99, 99, 99,0.3)'],[1, 'rgba(0, 0, 0,1)']]
				},
				lineWidth:0,
			}]
		}
//--------------------------------------WIND----------------------------		
var options_windSpeed5Day = {
		chart: {
			renderTo: 'graph_windSpeed',
			type: 'spline',
			zoomType:'x',
			marginTop:80,
		},
		title: {
			text: 'Wind Speed'
		},
		xAxis:[{
			
		},{
			offset:-280,
			tickInterval: 24 * 3600 * 1000,	
		}],
		yAxis: [{
			minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
			title: {
				text: 'Wind Speed',
			},
			labels:{
				format: '{value} m/s',
			},
			opposite: false,
			plotBands: [ { // Calm
                from: 0,
                to: 0.3,
                color: 'white',
                label: {
                    text: 'Calm',
                    style: {
                        color: '#606060'
                    }
                }
            },  { // Light air
                from: 0.3,
                to: 1.5,
                color: '#EDFFFF',
                label: {
                    text: 'Light air',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: '#B4FFE6',
                label: {
                    text: 'Light breeze',
                    style: {
                        color: '#606060'
                    }
                }
            },{ // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: '#C2FFC2',
                label: {
                    text: 'Gentle breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: '#AAFFAA',
                label: {
                    text: 'Moderate breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 10.8,
                color:'#99FF99',
                label: {
                    text: 'Fresh breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 10.8,
                to: 13.9,
                color: '#94FF70',
                label: {
                    text: 'Strong breeze',
                    style: {
                        color: '#606060'
                    }
                }
            },{ // High wind
                from: 13.9,
                to: 17.2,
                color: '#D1FF75',
                label: {
                    text: 'High wind',
                    style: {
                        color: '#606060'
                    }
                }
			},{ // Gale
					from: 17.2,
					to: 20.7,
					color: '#FFE066',
					label: {
						text: 'Gale',
						style: {
							color: '#606060'
						}
					}
			},{ // Strong gale
                from: 20.7,
                to: 24.5,
                color: '#FFAD5C',
                label: {
                    text: 'Strong gale',
                    style: {
                        color: '#606060'
                    }
                }
			},{ // Storm
					from: 24.5,
					to: 28.4,
					color: '#FFA366',
					label: {
						text: 'Storm',
						style: {
							color: '#606060'
						}
					}
			},{ // Violent storm
					from: 28.4,
					to: 32.6,
					color: '#FF5050',
					label: {
						text: 'Violent storm',
						style: {
							color: '#606060'
						}
					}
			},{ // Huricane
                from: 32.6,
                to: 60,
                color: 'red',
                label: {
                    text: 'Huricane',
                    style: {
                        color: '#606060'
                    }
                }
			}]
		},{
			minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
			minorTickInterval: 'auto',
			title: {
				enabled:false,
			},
			labels:{
				enabled:false,
			}
		}],

		plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
		series:[{
			name: 'WindSpeed',
			type: 'spline',
			tickInterval: 24 * 3600 * 1000,
			yAxis: 0,
			data: [],
			enableMouseTracking: true,
			marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
                    lineColor: null // inherit from series
            }
		},{
			name: 'WindSpeed Icon',
			type: 'line',
			yAxis: 1,
			tickInterval: 24 * 3600 * 1000,
			data: [],
			enableMouseTracking: false,
			visible:true,
			dataLabels:{
					enabled:true,
					useHTML:true,
					y:550,
					formatter:function(){
						var wind_deg=this.point.wind_deg;				
						return '<img src="img/wind_arrow.png" width="20px" height="20px" style= " float:left; transform: rotate('+wind_deg+'deg) scale(1);-ms-transform: rotate('+wind_deg+'deg) scale(1); -webkit-transform:rotate('+wind_deg+'deg) scale(1);" />';
					},
				},
			marker: {
                    enabled: false
            },
			color:'#D7D7D7',
		}]
}	
//-------------------------------------PRESURE---------------------------------		
var options_pressure5Day = {
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
		series:[{
			name: 'Pressure',
			type: 'spline',
			yAxis: 0,
			data: [],
			color: '#6C3738',
			tooltip:{
				valueSuffix: 'Pa',
			},
			dashStyle: 'longdash'
		},{
			name: 'Ground level',
			type: 'spline',
			yAxis: 1,
			data: [],
			enableMouseTracking: true,
			color: '#EA8D11',
			tooltip:{
				valueSuffix: 'Pa',
			}
		}]
	
}
//--------------------------------- Chart Sea level ----------------------------------------------
var options_sealevel5Day = {
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
		series:[{
			name: 'Sea_level',
			type: 'spline',
			yAxis: 0,
			data: [],
			enableMouseTracking: true,
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
			max: 50,
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
					var gaugeOptions_Temperature5Day = {
							chart: {
								renderTo: '1gauge'
							},
							yAxis: {
								min: 0,
								max: 60,
								minColor: '#99D6AD',
								maxColor: '#005C1F',
								title: {
									text: 'Temperature'
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
							series:[{
								name: 'Temp in',
								data:[0],
								dataLabels: {
									useHTML: true,
									format: '<img src="img/Hum.png" width="50px" align="center"><div style="text-align:center"><span style="font-size:20px;color:#009933">{y}</span></div>'
								}
							}],
							credits: {
								enabled: false
							}
					}
					var gaugeOptions_Humidity5Day = {
							chart: {
								renderTo: '2gauge'
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
							series: [{
								name: 'Humidity',
								data: [0],
								dataLabels: {
								
									format: '<div style="text-align:center"><span style="font-size:20px;color:#009ce8">{y}</span></div>'
								}
							}],
							credits: {
								enabled: false
							}
					}
					var gaugeOptions_Pressure5Day = {
							chart: {
								renderTo: '3gauge'
							},
							yAxis: {
								min: 0,
								max: 20000,
								minColor: '#99D6AD',
								maxColor: '#005C1F',
								title: {
									text: 'Pressure'
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
							series: [{
								name: 'Pressure',
								data: [0],
								dataLabels: {
									format: '<div style="text-align:center"><span style="font-size:20px;color:orange">{y}</span></div>'
								}
							}],
							credits: {
								enabled: false
							}
					}
					var gaugeOptions_Rain_Snow5Day = {
							chart: {
								renderTo: '4gauge'
							},
							yAxis: {
								min: 0,
								max: 50,
								minColor: '#99D6AD',
								maxColor: '#005C1F',
								title: {
									text: 'Rain/Snow'
								}
							},
							plotOptions:{
								solidgauge:{
									borderColor:'blue'
								}
							},
							tooltip:{
								enabled:false
							},
							series: [{
								name: 'Rain/Snow',
								data: [0],
								dataLabels: {
									format: '<div style="text-align:center"><span style="font-size:20px;color:orange">{y}</span></div>'
								}
							}],
							credits: {
								enabled: false
							}
					}
					
//--------------------------end of gauge options------------------------------------
function create5DayCharts(){
	
						
	
		//--------------------------------------CREATE GAUGE----------------------------------------------------
						
						gaugeOptions_Temperature5Day = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_Temperature5Day);
						var gauge1 = new Highcharts.Chart(gaugeOptions_Temperature5Day);
						gaugeOptions_Humidity5Day = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_Humidity5Day);
						var gauge2 = new Highcharts.Chart(gaugeOptions_Humidity5Day);
						gaugeOptions_Pressure5Day = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_Pressure5Day);
						var gauge3 = new Highcharts.Chart(gaugeOptions_Pressure5Day);
						gaugeOptions_Rain_Snow5Day = jQuery.extend(true,[],defaultGaugeOptions,gaugeOptions_Rain_Snow5Day);
						var gauge4 = new Highcharts.Chart(gaugeOptions_Rain_Snow5Day);
								

		//----------------------------------CREATE CHARTS---------------------------------------------

						var chart = new Highcharts.Chart(main_options5Day);
						var chart_options_windSpeed = new Highcharts.Chart(options_windSpeed5Day);
						var chart_graph_pressure = new Highcharts.Chart(options_pressure5Day);
						var chart_options_sealevel = new Highcharts.Chart(options_sealevel5Day);
						GLOBAL_options.actualChartContainer=[];
						GLOBAL_options.actualChartContainer.push(chart);
						GLOBAL_options.actualChartContainer.push(chart_options_windSpeed);
						GLOBAL_options.actualChartContainer.push(chart_graph_pressure);
						GLOBAL_options.actualChartContainer.push(chart_options_sealevel);
						GLOBAL_options.actualChartContainer.push(gauge1);
						GLOBAL_options.actualChartContainer.push(gauge2);
						GLOBAL_options.actualChartContainer.push(gauge3);
						GLOBAL_options.actualChartContainer.push(gauge4);
					
	round_corner();	
}	
/*	
function destroy5DayCharts(){
	$('container').highcharts().destroy();
	$('graph_windSpeed').highcharts().destroy();
	$('graph_pressure').highcharts().destroy();
	$('graph_sealevel').highcharts().destroy();
	$(this).attr('disable',true);
}
*/



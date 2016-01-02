#!/usr/bin/python
#include "DHT22.h"


import sys
import datetime
from datetime import datetime,date
import time
import pymysql
import random
from random import randint

import Adafruit_DHT
import Adafruit_BMP.BMP085 as BMP085

sensor = Adafruit_DHT.DHT22
sensor_BMP = BMP085.BMP085()
pin = 4 #GPIO4

def get_val():
  humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
  temperature_BMP=sensor_BMP.read_temperature()
  pressure = sensor_BMP.read_pressure()
  altitude = sensor_BMP.read_altitude()
  sealevel = sensor_BMP.read_sealevel_pressure()
  if temperature_BMP is not None and pressure is not None and altitude is not None and sealevel is not None:
	print 'Temperature BMP180 = {0:0.2f}*C  Pressure = {1:0.2f} Pa  Altitude = {2:0.2f} m   Sealevel Pressure: {3:0.2f} Pa'.format(temperature_BMP,pressure,altitude,sealevel)

  if humidity is not None and temperature is not None:
    print ('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
    return (humidity,temperature,temperature_BMP,pressure,altitude,sealevel)
  else:
    print ('Failed to get reading. Try again!')
    
def get_rand_val():
  temp=randint(10,30)
  humidity= randint(20,80)
  pressure=randint(100,5000)
  return(humidity,temp)
  
try:
  conn = pymysql.connect(host='localhost',user='root',passwd='oracle',db='RPi')
  cur = conn.cursor()  
  createTable = ('''CREATE TABLE IF NOT EXISTS SENSOR(
         ID  int NOT NULL AUTO_INCREMENT,
         TIME DATETIME,
         HUMIDITY CHAR(20),
         TEMPERATURE  CHAR(20),
         PRESSURE CHAR(20), 
         PRIMARY KEY (ID))''')
  cur.execute(createTable)
  conn.commit()
except NameError:
   # Rollback in case there is any error
  conn.rollback()
  print ("Rollback")
  raise

try:  
  for i in range(0,300000):
  
    humidity,temperature,temperature_BMP,pressure,altitude,sealevel=get_val()
    #humidity,temperature=get_rand_val()
    
  
    day = datetime.now()
  
    insert ="""INSERT INTO SENSOR(
           TIME,HUMIDITY,TEMPERATURE,TEMPERATURE_BMP,PRESSURE,ALTITUDE,SEALEVEL)
           VALUES (%s,%s,%s,%s,%s,%s,%s)""" 
    cur.execute(insert,(day,humidity,temperature,temperature_BMP,pressure,altitude,sealevel))
    conn.commit()
    print ("{0} Data inserted".format(i))
    time.sleep(1800)  #time pause 1/2h 

except NameError:
   # Rollback in case there is any error
  conn.rollback()
  print ("Rollback")
  raise
  
finally:

  print ("End!")
  cur.close()
  conn.close()
  

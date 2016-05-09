#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

// Hotspot
//const char* ssid     = "SennyK";
//const char* password = "27031990!";

// WiFi
const char* ssid     = "SJMK_gast";
const char* password = "directzichtbaar";

// Hosts
const char* host     = "iot.directzichtbaar.nl"; // Your domain
String path          = "/api/status/output";
const int httpPort   = 80;

// LED Pins
const int ledPinGreen   = D5;
const int ledPinYellow  = D6;
const int ledPinRed     = D7;

// Range Pins
const int echoPin       = D0;
const int trigPin       = D1;

// Distance
int maximumRange = 250; // Maximum range needed
int minimumRange = 0; // Minimum range needed
long duration, distance; // Duration used to calculate distance

WiFiClient client;

void setup() {
  //set range sensor
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);

  //set led pins
  pinMode(ledPinGreen, OUTPUT);
  pinMode(ledPinYellow, OUTPUT);
  pinMode(ledPinRed, OUTPUT);


  //set serial
  Serial.begin(9600);

  //set wifi
  delay(10);
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  int wifi_ctr = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  //show when wifi is connected
  Serial.println("WiFi connected");
  //Serial.println("IP address: " + WiFi.localIP());
}

void loop() {
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  getNetworkData();
  delay(2000);
  sendNetworkData();
  delay(30000);
}

// GET DATA
void getNetworkData() {
  client.print(String("GET ") + path + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: keep-alive\r\n\r\n");

  delay(500); // wait for server to respond
  Serial.println("Getting data");
  
  // read response
  String section = "header";
  while (client.available()) {
    String line = client.readStringUntil('\r');
    // Serial.print(line);
    // we’ll parse the HTML body here
    if (section == "header") { // headers..
      //Serial.print(".");
      if (line == "\n") { // skips the empty space at the beginning
        section = "json";
      }
    }
    else if (section == "json") { // print the good stuff
      section = "ignore";
      String result = line.substring(1);

      // Parse JSON
      int size = result.length() + 1;
      char json[size];
      result.toCharArray(json, size);
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& json_parsed = jsonBuffer.parseObject(json);
      if (!json_parsed.success())
      {
        Serial.println("parseObject() failed");
        return;
      } else {
        Serial.print("parseObject() success, color: ");
        
        // Make the decision to turn off or on the right color LED
        if (strcmp(json_parsed["led"], "red") == 0) {
          digitalWrite(ledPinYellow, LOW);
          digitalWrite(ledPinGreen, LOW);
          digitalWrite(ledPinRed, HIGH);
          
          Serial.println("red");
        }
        if (strcmp(json_parsed["led"], "yellow") == 0) {
          digitalWrite(ledPinRed, LOW);
          digitalWrite(ledPinGreen, LOW);
          digitalWrite(ledPinYellow, HIGH);
          
          Serial.println("yellow");
        }   
        if (strcmp(json_parsed["led"], "green") == 0) {
          digitalWrite(ledPinRed, LOW);
          digitalWrite(ledPinYellow, LOW);
          digitalWrite(ledPinGreen, HIGH);
          
          Serial.println("green");
        }
      }
    }
  }
}

// Send data
void sendNetworkData() {
  Serial.println("Sending data");
  
  /* The following trigPin/echoPin cycle is used to determine the
  distance of the nearest object by bouncing soundwaves off of it. */ 
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2); 
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); 
  
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  
  //Calculate the distance (in cm) based on the speed of sound.
  distance = duration/58.2;

  String postStr = "input=";
  
  if (client.connect(host, httpPort)) {
    if (distance >= maximumRange){
      /* Send a negative number to computer and Turn LED ON 
      to indicate "out of range" */
      postStr += String(250);
      Serial.println("Data value sent: 250");
    }
    else if (distance <= minimumRange){
      /* Send a negative number to computer and Turn LED ON 
      to indicate "out of range" */
      postStr += String(-1);
      Serial.println("Data value sent: -1");
    }  
    else {
      /* Send the distance to the computer using Serial protocol, and
      turn LED OFF to indicate successful reading. */
      postStr += String(distance);
      Serial.print("Data value sent: ");
      Serial.println(distance);
    }    

    client.println("POST /api HTTP/1.1");
    client.println("Host: " + String(host));
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println("Connection: close");
    client.print("Content-Length: ");
    client.println(postStr.length());
    client.println();
    client.print(postStr);
    client.println();
  }
}

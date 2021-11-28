
#include <Arduino.h>
#include <WiFi.h>
#include "ESP32_MailClient.h"

#define emailSenderAccount    "Smartlabs.co@gmail.com"    
#define emailSenderPassword   "Texapon70"
#define emailRecipient        "juancarlosenlared@gmail.com"
#define smtpServer            "smtp.gmail.com"
#define smtpServerPort        465
#define emailSubject          "FarmLabs2022 Notificacion"

SMTPData smtpData;
void sendCallback(SendStatus info);
boolean emailSent = false;

#include <NTPClient.h>
#include <WiFiUdp.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

String formattedDate;
String dayStamp;
String timeStamp;

#include <FirebaseESP32.h>
FirebaseData firebaseData;
FirebaseJson json;

#define API_KEY "YPoD1UT8IZiw7kWkOnsARrXN1YTy5H4jsORxBgyV"
#define DATABASE_URL "https://farmlab2022-default-rtdb.firebaseio.com/"

#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 23
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

float temperature_Celsius = 0;
int   cardiaco = 0;
int   respiracion = 0;

float  MaxTemperatura = 39;
int    Maxcardiaco = 75;
int    Maxrespiracion = 180;

float  MinTemperatura = 20;
int    Mincardiaco = 40;
int    Minrespiracion = 100;

String ssid = "Carjuan";
String password = "carjuan123";
String New_ssid = "";
String New_password = "";

unsigned long sendDataPrevMillis = 0;

#include "BLEDevice.h"
//#include "BLEScan.h"

// The remote service we wish to connect to.
static BLEUUID serviceUUID((uint16_t)0x180D);
// The characteristic of the remote service we are interested in.
static BLEUUID  charUUID((uint16_t)0x2A37);

static boolean doConnect = false;
static boolean connected = false;
static boolean doScan = false;
static BLERemoteCharacteristic* pRemoteCharacteristic;
static BLEAdvertisedDevice* myDevice;

boolean notification = false;


String getChipId()
{
  String ChipIdHex = String((uint32_t)(ESP.getEfuseMac() >> 32), HEX);
  ChipIdHex += String((uint32_t)ESP.getEfuseMac(), HEX);
  return ChipIdHex;
}


void getDS18B20Readings(){
  //temperature_Celsius = random(0,100);
  sensors.requestTemperatures();
  temperature_Celsius = sensors.getTempCByIndex(0);
  temperature_Celsius = round( temperature_Celsius * 10) / 10.0;
}

static void notifyCallback(
  BLERemoteCharacteristic* pBLERemoteCharacteristic,
  uint8_t* pData,
  size_t length,
  bool isNotify) {
  Serial.print("Heart Rate ");
  Serial.print(pData[1], DEC);
  Serial.println("bpm");
  cardiaco = (int)pData[1];
}

class MyClientCallback : public BLEClientCallbacks {
    void onConnect(BLEClient* pclient) {
    }

    void onDisconnect(BLEClient* pclient) {
      connected = false;
      Serial.println("onDisconnect");
    }
};

bool connectToServer() {
  Serial.print("Forming a connection to ");
  Serial.println(myDevice->getAddress().toString().c_str());

  BLEClient*  pClient  = BLEDevice::createClient();
  Serial.println(" - Created client");

  pClient->setClientCallbacks(new MyClientCallback());
  pClient->connect(myDevice);
  Serial.println(" - Connected to server");
  BLERemoteService* pRemoteService = pClient->getService(serviceUUID);
  if (pRemoteService == nullptr) {
    Serial.print("Failed to find our service UUID: ");
    Serial.println(serviceUUID.toString().c_str());
    pClient->disconnect();
    return false;
  }
  Serial.println(" - Found our service");
  pRemoteCharacteristic = pRemoteService->getCharacteristic(charUUID);
  if (pRemoteCharacteristic == nullptr) {
    Serial.print("Failed to find our characteristic UUID: ");
    Serial.println(charUUID.toString().c_str());
    pClient->disconnect();
    return false;
  }
  Serial.println(" - Found our characteristic");
  if (pRemoteCharacteristic->canRead()) {
    std::string value = pRemoteCharacteristic->readValue();
    Serial.print("The characteristic value was: ");
    Serial.println(value.c_str());
  }
  if (pRemoteCharacteristic->canNotify())
    pRemoteCharacteristic->registerForNotify(notifyCallback);
  connected = true;
}

class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
      Serial.print("BLE Advertised Device found: ");
      Serial.println(advertisedDevice.toString().c_str());
      if (advertisedDevice.haveServiceUUID() && advertisedDevice.isAdvertisingService(serviceUUID)) {
        BLEDevice::getScan()->stop();
        myDevice = new BLEAdvertisedDevice(advertisedDevice);
        doConnect = true;
        doScan = true;
      }
    }
};


// Callback function to get the Email sending status
void sendCallback(SendStatus msg) {
  // Print the current status
  Serial.println(msg.info());
  // Do something when complete
  if (msg.success()) {
    Serial.println("envio exitoso");
  }
}

void setup(){
  Serial.begin(115200);
  sensors.begin();

  pinMode(5, OUTPUT);//GND Sensor
  digitalWrite(5, LOW);//GND Sensor

  Serial.println();
  Serial.print("Connecting with ");
  Serial.println(ssid);
  WiFi.begin(ssid.c_str(), password.c_str());

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("WiFi conected. IP: ");
  Serial.println(WiFi.localIP());

  timeClient.begin();
  timeClient.setTimeOffset(-18000);

  Firebase.begin(DATABASE_URL, API_KEY);
  Firebase.reconnectWiFi(true);
  getDS18B20Readings();

  Serial.println("Starting Arduino BLE Client application...");
  BLEDevice::init("");
  BLEScan* pBLEScan = BLEDevice::getScan();
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  //pBLEScan->setInterval(1349);
  //pBLEScan->setWindow(449);
  pBLEScan->setActiveScan(true);
  pBLEScan->start(20, false);
}

bool sendEmailNotification(String emailMessage){
  smtpData.setLogin(smtpServer, smtpServerPort, emailSenderAccount, emailSenderPassword);
  smtpData.setSender("FarmLab2022", emailSenderAccount);
  smtpData.setPriority("High");
  smtpData.setSubject(emailSubject);
  smtpData.setMessage(emailMessage, true);
  smtpData.addRecipient(emailRecipient);
  smtpData.setSendCallback(sendCallback);
  if (!MailClient.sendMail(smtpData)) {
    Serial.println("Error sending Email, " + MailClient.smtpErrorReason());
    return false;
  }
  smtpData.empty();
  return true;
}


void loop(){
  if (millis() - sendDataPrevMillis > 10000){
    if (WiFi.status() != WL_CONNECTED){
      WiFi.disconnect();
      WiFi.reconnect();
    }

    while (!timeClient.update()) {
      timeClient.forceUpdate();
    }    
    formattedDate = timeClient.getFormattedDate();
    Serial.println(formattedDate);

    getDS18B20Readings();
    Serial.println(temperature_Celsius);
    //int cardiaco = random(50,200);
    respiracion = random(50, 150);


    /*

    if((temperature_Celsius > MaxTemperatura) || (cardiaco > Maxcardiaco) || (respiracion > Maxrespiracion)){
      String emailMessage = String(getChipId()) + String("Variables por encima del parametro maximo , Temperatura: ") + 
                            String(temperature_Celsius) + String("C") + "Ritmo cardiaco:  " +
                            String(cardiaco) + "LPM" + "Flujo Respiratorio:  " + String(respiracion) + "m3/s";
      
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/temperatura", temperature_Celsius); //GH45JH34
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/cardiaco", cardiaco);
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/respiracion", respiracion);
      
      /*
      if(sendEmailNotification(emailMessage)){
        Serial.println(emailMessage);        
       }
      else{
        Serial.println("Envio de Email fallo");
       } 
      */   
    }
   
    if((temperature_Celsius < MinTemperatura) || (cardiaco < Mincardiaco) || (respiracion < Minrespiracion)){
      String emailMessage = String(getChipId()) + String("Variables por debajo del parametro minimo , Temperatura: ") + 
                            String(temperature_Celsius) + String("C") + "Ritmo cardiaco:  " +
                            String(cardiaco) + "LPM" + "Flujo Respiratorio:  " + String(respiracion) + "m3/s";
      
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/temperatura", temperature_Celsius); //GH45JH34
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/cardiaco", cardiaco);
      json.set("bovinos/" + String(getChipId()) + "/" + formattedDate + "/respiracion", respiracion);
      /*
      if(sendEmailNotification(emailMessage)){
        Serial.println(emailMessage);        
       }
      else{
        Serial.println("Envio de Email fallo");
       }
      */  
    //}
    */
    json.set("Monitor/" + String(getChipId()) + "/temperatura", temperature_Celsius); //GH45JH34
    json.set("Monitor/" + String(getChipId()) + "/cardiaco", cardiaco);
    json.set("Monitor/" + String(getChipId()) + "/respiracion", respiracion);    
    Firebase.updateNode(firebaseData, "/" , json);

    if (doConnect == true){
      if (connectToServer()){
        Serial.println("We are now connected to the BLE Server.");
      } else{
        Serial.println("We have failed to connect to the server; there is nothin more we will do.");
      }
      doConnect = false;
    }
    const uint8_t onPacket[] = {0x1, 0x0};
    const uint8_t offPacket[] = {0x0, 0x0};
    if (connected){
      if (notification == false){
        //Serial.println(F("Turning Notifocation On"));
        pRemoteCharacteristic->getDescriptor(BLEUUID((uint16_t)0x2902))->writeValue((uint8_t*)onPacket, 2, true);// turn on
        //pRemoteCharacteristic->getDescriptor(BLEUUID((uint16_t)0x2902))->writeValue((uint8_t*)offPacket, 2, true);// turn off
      }
    }

    sendDataPrevMillis = millis();
  }
}

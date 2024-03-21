#include <WiFi.h>
#include <PubSubClient.h>

//cambio de la logica para encendido del modulo rele
#define ON 0
#define OFF 1

//Configuracion de la red
const char* ssid = "********";
const char* password = "********";
const char* mqtt_server = "IP del broker";

//configuracion mensajes MQTT
const int mqtt_port = 1883;
const char* topic_control = "ESP-CRT4/";
const char* topic_link = "WEBApp/";

WiFiClient espClient;
PubSubClient client(espClient);

//pines para control de los reles
struct pinOut {
  const uint8_t D23;
  const uint8_t D22;
  const uint8_t D21;
  const uint8_t D19;
  const uint8_t D18;
  const uint8_t D5;
  const uint8_t D4;
  const uint8_t D15;
};
pinOut RELAY = { 23, 22, 21, 19, 18, 5, 4, 15 };

//estructura de control que se utiliza para el control de 
//indicador cuando la webapp se desconecta del servidor
struct blinkPin {
    const uint8_t D2;
    volatile bool blinkLed;    
    uint8_t ledState;
    unsigned long previousMillis;
    long interval; 
};
blinkPin LED = {2, false, LOW, 0, 1000 };


//estructura de control para el control de las señales PWM
//que controlan los lazos de corriente 4-20mA
struct PWM {
    const uint8_t PIN;
    const int frecuency;
    const uint8_t channel;
    const uint8_t resolution;
};
PWM VR1 = {33, 500, 0, 8};
PWM V17 = {32, 500, 1, 8};

//modificar esta variable para calibrar el inicio
//de los 4mA en una escala de 0 - 254 valores
unsigned int current4mA = 50;


//estructura de control para manejo de los pines de los sensores
//y manejo de las interrupciones via hardware
struct Sensor {
  const uint8_t PIN;
  volatile bool pressed;
  uint8_t state;
};
Sensor C1 =  {13, false, LOW };

//primera interrupcion cuando el sensor del nanometro se activa
void IRAM_ATTR ISRTANQUE () {
  C1.pressed = true;
}

void setup_wifi() {
  delay(10);
  Serial.begin(115200);
  Serial.println();
  Serial.print("Conectando a la red WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Conectado a la red WiFi");
  Serial.println("Dirección IP: " + WiFi.localIP().toString());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando al servidor MQTT...");
    if (client.connect("ESP-CRT1")) {
      Serial.println("Conectado");
      client.subscribe(topic_control);
      client.subscribe(topic_link);
    }
    else {
      Serial.print("Error al conectar (rc= ");
      Serial.print(client.state());
      Serial.println("). Intentando de nuevo en 5 segundos...");
      delay(5000);
    }
  }
}

void separateWords(String input, String& word1, String& word2) {
  char stringSeparate[input.length() + 1]; 
  input.toCharArray(stringSeparate, input.length() + 1);
  char* token = strtok(stringSeparate, "-");
  word1 = String(token);
  token = strtok(NULL, "-");
  word2 = String(token);
}

//Lectura del topic con el payload para la ejecucion de las instruccion que 
//se reciben del broker
void callback(char* topic, byte* payload, unsigned int length) {
  String message, valve, operation, state;
  unsigned int range, current;
  
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");
  
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
    Serial.print((char)payload[i]);
  }
  Serial.println();
  
  //separacion de la valvula y su operacion a ejecutar
  separateWords(message, valve, operation);
  
	if(String(valve) == "VR1"){
		if(operation == "ON") {
			digitalWrite(RELAY.D4, ON);
		} else if(operation == "OFF") {
			digitalWrite(RELAY.D4, OFF);
		}
		else {
			range = operation.toInt();
			if(range > 0 ) {
				current = map(range, 0, 100, current4mA, 255);
				ledcWrite(VR1.channel, current);
			}
			else {
				ledcWrite(VR1.channel, 0);
			}
		}
	}
  
	if(String(valve) == "V17"){
		if(operation == "ON") {
			digitalWrite(RELAY.D15, ON);
		} else if(operation == "OFF") {
			digitalWrite(RELAY.D15, OFF);
		}
		else {
			range = operation.toInt();
			if(range > 0 ) {
				current = map(range, 0, 100, current4mA, 255);
				ledcWrite(V17.channel, current);
			}
			else {
				ledcWrite(V17.channel, 0);
			}
		}
	}
  
	if(String(valve) == "V1"){
	if(String(operation) == "ON") {
      digitalWrite(RELAY.D23, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D23, OFF);
    }
  }

  if(String(valve) == "V3"){
    if(String(operation) == "ON") {
      digitalWrite(RELAY.D22, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D22, OFF);
    }
  }

  if(String(valve) == "V6"){
    if(String(operation) == "ON") {
      digitalWrite(RELAY.D21, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D21, OFF);
    }
  }

  if(String(valve) == "V18"){
    if(String(operation) == "ON") {
      digitalWrite(RELAY.D19, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D19, OFF);
    }
  }

  if(String(valve) == "V25"){
    if(String(operation) == "ON") {
      digitalWrite(RELAY.D18, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D18, OFF);
    }
  }

  if(String(valve) == "V100L"){
    if(String(operation) == "ON") {
      digitalWrite(RELAY.D5, ON);
    }
    else if(String(operation) == "OFF") {
      digitalWrite(RELAY.D5, OFF);
    }
  }

  if(String(valve) == "STATUS"){
    if(String(operation) == "OFF") {
      LED.blinkLed = true;
    }
    else if(String(operation) == "ON") {
      LED.blinkLed = false;
    }
  }

}

void setup() {
  //configuracion de salidas RELAY
  pinMode(RELAY.D23, OUTPUT);
  pinMode(RELAY.D22, OUTPUT);
  pinMode(RELAY.D21, OUTPUT);
  pinMode(RELAY.D19, OUTPUT);
  pinMode(RELAY.D18, OUTPUT);
  pinMode(RELAY.D5, OUTPUT);
  pinMode(RELAY.D4, OUTPUT);
  pinMode(RELAY.D15, OUTPUT);
   //
  digitalWrite(RELAY.D23, OFF);
  digitalWrite(RELAY.D22, OFF);
  digitalWrite(RELAY.D21, OFF);
  digitalWrite(RELAY.D19, OFF);
  digitalWrite(RELAY.D18, OFF);
  digitalWrite(RELAY.D5, OFF);
  digitalWrite(RELAY.D4, OFF);
  digitalWrite(RELAY.D15, OFF);
  pinMode(LED.D2, OUTPUT);
  
  //configuracion de PWM
  pinMode(VR1.PIN, OUTPUT);
  ledcSetup(VR1.channel, VR1.frecuency, VR1.resolution);
  ledcAttachPin(VR1.PIN, VR1.channel);

  pinMode(V17.PIN, OUTPUT);
  ledcSetup(V17.channel, V17.frecuency, V17.resolution);
  ledcAttachPin(V17.PIN, V17.channel);

  //configuracion de interrupcion
  pinMode(C1.PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(C1.PIN), ISRTANQUE, CHANGE);
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  unsigned long currentMillis = millis();
  
  if (!client.connected()) {
    reconnect();
  }
  
  if (C1.pressed) {
    Serial.printf("Sensor K1 Contacto aux ha cambio de estado\n");
    if (client.connected()) {
      C1.state = digitalRead(C1.PIN);
      if(C1.state == HIGH) {
        client.publish("ESP-CRT4/TanqueSensor","OFF");
      }
      else {
        client.publish("ESP-CRT4/TanqueSensor","ON");
      }
      C1.pressed = false;
    }
  }
  
  if(LED.blinkLed && (currentMillis - LED.previousMillis >= LED.interval)) {
    LED.previousMillis = currentMillis;

    if(LED.ledState == LOW){
      LED.ledState = HIGH;
    }
    else {
        LED.ledState = LOW;
    }
    digitalWrite(LED.D2, LED.ledState);
  }
  
  if(!LED.blinkLed && (LED.ledState = HIGH)) {
    digitalWrite(LED.D2, LOW);
  }
  
  client.loop();
}

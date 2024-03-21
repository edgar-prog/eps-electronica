## INGENIERIA ELECTRÓNICA - USAC - EPS/CENAME 2023-24
#### SIMULACION Y AUTOMATIZACIÓN DEL BANCO DE MEDIDORES DE AGUA
Este proyecto tiene la finalidad de mostrar el trabajo desarrollado en el diseño de una simulacion de en la automatización del equipo RAC2100/2, acá encontrara los archivos necesarios para el uso de la aplicación que se realizo durante el ejercicio del EPS 2023/24

El desarrollo se hizo en el lenguaje JavaScript, por lo cual en el backend se utilizo Node JS y se instalaron las dependencias necesarias para que el broker mosca pueda comunicarse con los dispositvos ESP32 via MQTT.

<img width="48" height="48" src="https://img.icons8.com/fluency/48/node-js.png" alt="node-js"/><img width="48" height="48" src="https://img.icons8.com/fluency/48/javascript.png" alt="javascript"/><img width="48" height="48" src="https://img.icons8.com/color/48/html-5--v1.png" alt="html-5--v1"/><img width="48" height="48" src="https://img.icons8.com/color/48/css3.png" alt="css3"/><img width="48" height="48" src="https://img.icons8.com/color/48/c-plus-plus-logo.png" alt="c-plus-plus-logo"/>

#### PROCESO DE COMUNICACION ENTRE DISPOSITIVOS
Acá se describe como se diseño el proceso de la mensajeria para accionar las valvulas y los estados fueran controlados por el broker.
Socket IO permite la comunicacion con las Web APP minetras que mosca js lo hace con los MCU conectados



## Instalación

Descargue la versión V16.20 de [node] e instale en su equipo según el sistema operativo WINDOW 10/11 o LINUX

---

<img width="48" height="48" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/external-npm-a-package-manager-for-the-javascript-programming-language-logo-color-tal-revivo.png" alt="external-npm-a-package-manager-for-the-javascript-programming-language-logo-color-tal-revivo"/> dependencias:

Servicios  MQTT
```bash
npm install mosca@2.8.3
npm install jsonschema@1.2.6
npm install mqtt@5.3.4
```
Levantar el servidor web
```bash
npm install express@4.18.2
npm install path@^0.12.7
npm install http@0.0.1-security
```
Mensajeria servidor web y el cliente
```bash
npm install socket.io@4.7.2
```
Guardar informacion y variables
```bash
npm install nedb@1.8.0
npm install dotenv@16.3.1
```
---
## SOFTWARE Y HARDWARE PARA EL CONTROL DE LOS DISPOSIIVOS

Se diseño una placa PCB general para controlar las valvulas por medio de reles y generar una señal PWM de control 4 - 20 mA para las valvulas que lo necesiten.

A continuación se muestra como se distribuyeron los pines del ESP32 para el manejo de las valvulas.

| PINHEAD | FUNCION |
| ------- | ------- |
| *23, 22, 21, 19, 18, 5, 4, 15* | CONTROL DE RELES |
| *33, 32, 25* | SEÑAL PWM|
| *12,13,14* | ENTRADAS DIGIALES |


|   | DESCRIPCION | LINK |
| - |-------------| ---- |
| <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/circuit.png" alt="circuit"/> | En este apartado encontrara el link hacia EASYEDA donde se diseño la placa general que es usada para el proyecto | [pcb]  |
| <img width="48" height="48" src="https://img.icons8.com/fluency/48/arduino.png" alt="arduino"/> | Los programas que se desarrollaron para controlar las valvulas y los sensores | [c++] |

[pcb]: https://oshwlab.com/edgar_pro/proyecto-eps-2023
[node]: https://nodejs.org/en/about/previous-releases
[c++]: https://github.com/edgar-prog/eps-electronica/tree/main/esp32-EPS
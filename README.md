# Stechs challenge

## Resumen

En este repositorio se definen dos servicios:
  - Backend: ubicado en la subcarpeta 'backend'
  - Frontend: ubicado en la subcarpeta 'frontend'

## Tecnologia utilizada para Frontend
- React
- TypeScript
- Patrón flux (react-redux): para manejo de estado global.
- Jest (test)
- reduxjs/toolkit

## Tecnologia utilizada para Backend
- Nodejs
- TypeScript
- Express: para levantar un servicio de tipo api.
- Mysql: Para conectarme desde la api al servicio de base de datos mysql
- Jest (test)

## Para poder ejecutarlos, se puede hacer de dos formas:
  - Manual: Instalacion de cada uno de los servicios que consisten en los siguientes pasos:
    - Instalar fronend
    - Instalar backend
    - Instalar servicio mysql
    - Instalar cliente MySQLWorkbench para interactuar con la BD.
    - Hacer una creacion de la tabla que propone el ejercicio y luego una insercion de 160 registros que propone el ejercicio.
  - Dockerizado: Que corran dentro de docker para facilitar el deployment, esto facilita:
    - Una creacion de los servicios.
    - La creacion del servicio de mysql.
    - La creacion automatica de la BD, tabla e insercion de registros.
    - Una web para poder interactuar con la BD.


## Pre requisitos para la opcion dockerizada
 - docker
 - docker Desktop (opcional)
 - nodejs >=16
 - npm

### IMPORTANTE A TENER EN CUENTA ANTES DE EJECUTAR DOCKER


### Ejecucion de los servicios

 ```
 npm run docker:start
 ```

### Compilacion de las imagenes sin considerar el cache

 ```
 npm run docker:build
 ```

 ### Restore de las apps al estado inicial

 ```
 npm run docker:restart
 ```

 ### Applicaciones
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)
   - Admin de Base de Datos: [http://localhost:8080](http://localhost:8080) con las credenciales 'root' y 'Gmatias1234!'

 



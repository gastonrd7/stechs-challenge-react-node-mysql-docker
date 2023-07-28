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
  - Docker: Que corran dentro de docker para facilitar el deployment, esto facilita:
    - Creacion de los servicios.
    - La creacion del servicio de mysql.
    - La creacion automatica de la BD, tabla e insercion de registros.
    - Una web para poder interactuar con la BD.
  - Manual: Instalacion de cada uno de los servicios que consisten en los siguientes pasos:
    - Instalar fronend
    - Instalar backend
    - Instalar servicio mysql
    - Instalar cliente MySQLWorkbench para interactuar con la BD.
    - Hacer una creacion de la tabla que propone el ejercicio y luego una insercion de 160 registros que propone el ejercicio.

# Ejecucion por el camino dockerizado

## Pre requisitos
 - docker
 - docker Desktop (opcional)
 - nodejs >=16
 - npm

### IMPORTANTE: TENER EN CUENTA ANTES DE EJECUTAR DOCKER

Solo si tienes un chip de apple (M1, M2, Mx), se debe agregar la siguiente sintaxis en el docker-compose.yaml luego de la linea 25 donde esta la palabra db: 
```
 platform: linux/x86_64
 ```

Actualmente esta asi:
```
db:
    image: mysql:5.7.34
    container_name: db
    environment:
      MYSQL_ROOT_PASSWORD: Gmatias1234!
      MYSQL_DATABASE: stechsChallenge
    volumes:
      - ./data/modems.sql:/docker-entrypoint-initdb.d/modems.sql
 ```
Deberia quedar asi con la linea agregada:
```
db:
    platform: linux/x86_64
    image: mysql:5.7.34
    container_name: db
    environment:
      MYSQL_ROOT_PASSWORD: Gmatias1234!
      MYSQL_DATABASE: stechsChallenge
    volumes:
      - ./data/modems.sql:/docker-entrypoint-initdb.d/modems.sql
 ```

La opción platform en docker-compose.yml se utiliza para especificar la plataforma de destino para la construcción y ejecución de servicios en Docker Compose. Puedes usar esta opción cuando tienes una arquitectura específica y deseas asegurarte de que tus servicios se ejecuten en contenedores compatibles con esa arquitectura.

Independientemente del SO, esto tiene que ver con el chip que se utiliza si es intel o apple.




### Ejecucion de los servicios

Estar parado en el root del repositorio y ejecutar la siguiente linea de comando (debemos tener docker corriendo en nuestra maquina).

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
  
Esto particularmente sirve para poner el JSON fisico en su estado inicial, ya que las imagenes de los servicios son       
destruidas y nuevamente construidas.

### Acceso a las applicaciones luego de que esten corriendo todas las imagenes.
  - Frontend: [http://localhost:3000](http://localhost:3000)
  - Backend: [http://localhost:3001](http://localhost:3001)
  - Admin de Base de Datos: [http://localhost:8080](http://localhost:8080) con las credenciales 'root' y 'Gmatias1234!'

En caso de estar usando dockerDesktop se podran ver las imagenes agrupadas en stechs como muestra la imagen
  
![Screenshot 2023-07-28 at 17 41 37](https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/5fbcaac8-a5f2-4a77-af23-0b02279d81c1)

# Ejecucion por el camino no dockerizado

## Pre requisitos
 - [MYSQLWorkbench](https://dev.mysql.com/downloads/workbench/) (creo que ya instala el servicio por defecto, si es asi omitor el siguiente item)
 - [servicio MYSQL](https://dev.mysql.com/downloads/mysql/)
 - nodejs >=16
 - npm

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

## Para poder ejecutar estos servicios y la bd, se puede hacer de dos formas:
  - Mediante docker: Que corran dentro de docker para facilitar el deployment, esto facilita:
    - Creacion de los servicios.
    - La creacion del servicio de mysql.
    - La creacion automatica de la BD, tabla e insercion de registros.
    - Una web para poder interactuar con la BD.
  - Manualmente: Instalacion de cada uno de los servicios:
    - Instalar y correr frontend.
    - Instalar y correr backend.
    - Instalar servicio mysql.
    - Instalar cliente MySQLWorkbench para interactuar con la BD.
    - Crear una BD y luego insertar la tabla y registros que el ejercicio propone.

# Ejecucion de los servicios mediante docker.

Para esto se creo un Dockerfile para backend, un Dockerfile para frontend y un docker-compose.yaml en la raiz del repositorio.

El Dockerfile de backend parte de una version de node, instala y hace un build del paquete y deja como entrada el comando start.

El Dockerfile de frontend parte de una version de node, instala y hace un build del paquete y deja como entrada el comando start.

El docker-compose.yaml ejecuta cada uno de estos dockerfile, vincula los puertos, crea la imagen de mysql y crea la imagen phpmyadmin para poder interactuar con la bd mediante web en el puerto 8080


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

Independientemente del Sistema Operativo, tiene que ver con el chip que se utiliza: intel o apple.


### Ejecucion de los servicios

Estar parado en el root del repositorio y ejecutar la siguiente linea de comando (debemos tener docker corriendo en nuestra maquina).

```
npm run docker:start
```


### Acceso a las applicaciones luego de que esten corriendo todas las imagenes.
  - Frontend: [http://localhost:3000](http://localhost:3000)
  - Backend: [http://localhost:3001](http://localhost:3001)
  - Admin de Base de Datos: [http://localhost:8080](http://localhost:8080) con las credenciales 'root' y 'Gmatias1234!'


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

En caso de estar usando dockerDesktop se podran ver las imagenes agrupadas en stechs como muestra la imagen
  
![Screenshot 2023-07-28 at 17 41 37](https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/5fbcaac8-a5f2-4a77-af23-0b02279d81c1)

# Ejecucion por el camino no dockerizado

## Pre requisitos
 - [MYSQLWorkbench](https://dev.mysql.com/downloads/workbench/) (creo que ya instala el servicio por defecto, si es asi omitor el siguiente item)
 - [servicio MYSQL](https://dev.mysql.com/downloads/mysql/)
 - nodejs >=16
 - npm

### Ejecucion del servicio de BD

  - Ejecutar MysqlWorkbench y generar una intancia local, como muestra la imagen.
![Screenshot 2023-07-28 at 18 09 16](https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/35084ad5-ddac-4af9-a561-db4da098f7f2)
  - Luego crear un nuevo schema (nueva BD) y ahi usar el wizard para crear la tabla y la insercion de registros en base a archivo modems.sql.

### Ejecucion del servicio(api) backend

Debemos reemplazar el siguiente codigo del siguiente file si no vamos a utilizar docker:
Archivo: backend/src/database/connector.ts

Reemplazar este bloque:
```
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: Number.parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
});
```

por este otro
```
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gmatias1234!',
  database: 'stechsChallenge',
  connectionLimit: 10,
});
```
Al no usar docker, no me deja tomar las variables de entorno, es algo a ajustar y por cuestiones de tiempo deben quedar incrustadas en el codigo las credenciales.


Debemos pararnos en la subcarpeta llamada backend y correr los siguientes comandos:

```
npm install
```
```
npm run dev
```
Backend: [http://localhost:3001](http://localhost:3001)

### Ejecucion del servicio frontend

Debemos pararnos en la subcarpeta llamada frontend y correr los siguientes comandos:

```
npm install
```
```
npm start
```
Backend: [http://localhost:3001](http://localhost:3000)

# Demo de la app funcionando

## Levantando todas las imagenes


https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/e8a5802d-e512-4e2b-ab72-b828c24cdd35



## Funcionamiento de la web

https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/0ff28139-bec7-468b-85f0-7fd279c6e0e7

## Interacion con la BD y con la api


https://github.com/gastonrd7/stechs-challenge-react-node-mysql-docker/assets/12037109/d5856532-9b9f-425b-a54f-dc2217f1ee1b




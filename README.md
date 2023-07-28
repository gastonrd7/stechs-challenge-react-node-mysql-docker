# stechsChallenge-React-Node-mySql


En este repositorio se definen dos servicios:
  - Backend, ubicado en la subcarpeta 'backend'
  - Frontend,. ubicado en la subcarpeta 'frontend'

  Para poder ejecutarlos, he decidido que sea adentro de Docker para facilitar el deployment de las tecnologias que adicionalmente se necesitan como mysql y phpmyadmin para poder acceder a los datos de manera manual. 

## Pre requisitos
 - docker
 - nodejs >=16
 - npm

## Ejecucion de los servicios

 ```
 npm run docker:start
 ```

 ### Applicaciones
   - Frontend: localhost:3000
   - Backend: localhost:3001
   - Admin de Base de Datos: localhost:8080 con las credenciales 'root' y 'Gmatias1234!'

 ### Compilacion de las imagenes sin considerar el cache

 ```
 npm run docker:build
 ```

 ### Restore de las apps al estado inicial

 ```
 npm run docker:restart
 ```

<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Documentación de uso
### Deployment
Para ejecutar comando de deploy solicitar las credenciales IAM de AWS
```
$ serverless deploy
```
### Rutas
Existen dos rutas GET y dos POST
la ruta GET https://r5d8jo0t00.execute-api.us-west-2.amazonaws.com/people obtiene todos los registros en la base de datos.

la ruta GET https://r5d8jo0t00.execute-api.us-west-2.amazonaws.com/people/{id} obtiene un registro en especifico usando el id obtenido de la ruta anterior.

la ruta POST https://r5d8jo0t00.execute-api.us-west-2.amazonaws.com/pilot requiere un paramatro en el body como JSON con el siguiente formato :
```
{
  "starshipNumber": "8"
}
```
esta ruta a su ves insertara un piloto aleatoreo (en caso sean varios) de la nave espacial solicitada en caso no tenga pilotos estara vacio.

la ruta POST https://r5d8jo0t00.execute-api.us-west-2.amazonaws.com/artificial no requiere parametros en el body y obtendra los personajes de manera aleatoria clasificados por especie artificial y los insertara a la base de datos con diferentes caracteristicas y nombres.

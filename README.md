# The Karl Project


<a href="http://localhost:3000"> ![react.js](https://img.shields.io/badge/react-js-blue?style=for-the-badge) </a>
![docker](https://img.shields.io/badge/-docker-informational?style=for-the-badge)
<a href="http://localhost:3333/docs"> ![API Docs](https://img.shields.io/badge/API_Docs-informational?style=for-the-badge)  </a>
<a href="http://localhost:3333/docs"> ![nest.js](https://img.shields.io/badge/-nestjs-grey?style=for-the-badge)</a>

![demo.png](/assets/demo.png)

## Description 

Frontend Client available under http://localhost:3000/ 

Countmap in JSON available under http://localhost:3333/api/countmap. (Port may change according to your .env)

Swagger API Docs available under http://localhost:3333/docs ( Placeholder ).

### Task:

Erstelle ein Full Stack System Frontend / Backend mit folgender Aufgabestellung:
1. Das Backend ruft zyklisch (alle paar Sekunden) die Blogbeiträge von der Seite internate.org ab (über die Wordpress API - https://developer.wordpress.org/rest-api/reference/posts/)
2. Das Backend verarbeitet die Blogbeiträge zu einer einfachen Word Count Map ({“und”: 5, “der”: 3, ...})
3. Das Backend sendet nach der Verarbeitung die Map per WebSocket an das Frontend
4. Das Frontend zeigt die neuen Beiträge an und aktualisiert sich selbstständig neu bei neuen Daten.

### Bonus:
- Eventgetriebene Verarbeitung
- Aktualisierung im Frontend nur bei tatsächlich neuen Blogbeiträgen - nicht immer komplett neu
- Microservice-Architektur

### Languages:
- Backend in einer gängigen, modernen Programmiersprache (zB Scala, Java, C#)- Frameworks dürfen gerne genutzt werden
- Frontend in Javascript / Typescript React oder Angular
- Datenspeicherung gerne in-memory

### What we want to see:
- high code quality
- test coverage
- Production-ready code
- deadline 1 week with instructions on how to use it

## Table of Contents

* [Installation](#installation)
* [Setup](#setup)
* [Usage](#usage)

## Installation

To serve the applications via [docker](https://www.docker.com/) and `docker-compose`,
run `docker-compose up` in the root directory.

> You may skip the [setup](#setup) and [usage](#usage) in this case.

To build and serve the applications locally, you need to have [node.js](https://nodejs.org/en/) installed. 

Once you cloned this repository locally:
1. go into the working directory
2. run `npm install`
3. run `npx build server`
4. run `npx build client`

## Setup

Create a .env file in the root directory **if it does not exist**. This may have been provided for showcasing the application.

Following this SAMPLE:
```.env
PORT=3333
WS_PORT=8001
```

`PORT` being the backend port and `WS_PORT` being the websocket gateway. 

**ATTENTION: DO NOT CHANGE THE WS_PORT**.

> If you do, the client will not be able to connect properly to the websocket gateway.

## Usage 

### Build & Serve Applications

To serve both applications go into the `./dist/apps` directory.

To serve the client app, I use `serve`. Install serve via `npm i -g serve` and run `serve client` (CWD: `./dist/apps`).
To serve the server, navigate into the `./server` directory (absolute path: dist/apps/server`) and run `node main.js`.

### Testing

From the root directory, run `npx test common` and `npx test server` to test the library `common` and `server` spec suites. 

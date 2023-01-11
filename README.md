# The Karl Project

## Description 

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

### What we wanna see:
- high code quality
- test coverage
- Production-ready code
- deadline 1 week with instructions on how to use it

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

To build and serve the applications, you need to have [node.js](https://nodejs.org/en/) installed. 
In addition `npx` is needed to build the applications with ease. To install, run `npm i -g npx`.

If a docker-compose has been setup, you can alternatively serve the built applications via [docker](https://www.docker.com/).

Once you cloned this repository locally:
1. go into the working directory
2. run `npm install`
3. run `npx build server`
4. run `npx build client`

## Usage 

### Build & Serve Applications

To serve both applications go into the `./dist/apps` directory.

To serve the client app, I use `serve`. Install serve via `npm i -g serve` and run `serve client` (CWD: `./dist/apps`).
To serve the server, navigate into the `./server` directory (absolute path: dist/apps/server`) and run `node main.js`.

### Testing

From the root directory, run `npx test common` and `npx test server` to test the library `common` and `server` spec suites. 

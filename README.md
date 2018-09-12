# Rock Paper Scissor online game

Web based (HTML, CSS, JS) rock-paper-scissor game ([Wikipedia](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors))
Uses modern JS and CSS features such as ES Modules and CSS Animations.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and 
testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Latest versions of [Node.js](https://nodejs.org/en/) and [Chrome](https://www.google.com/chrome) 
should be installed on your PC.
This project was developed with Node.js version 10.10.0 and Chrome 68.0.3440.106.

### Installing

First you need to clone this repo:

```bash
git clone git@github.com:tadjik1/rock-paper-scissors.git
```

Install dependencies for the project

```bash
cd rock-paper-scissors
npm install
```

Run local server

```bash
npm start
```

If everything goes fine you should see this (or similar message):
```bash
Starting up http-server, serving .
Available on:
  http://127.0.0.1:8080
  http://192.168.178.20:8080
Hit CTRL-C to stop the server
```

This means that now you can open `http://127.0.0.1:8080` your browser and work with app.

### Development

This application was written using plain JS, CSS and HTML so nothing special requires for developing it.
Open cloned folder in your favorite editor and start hacking!

### Running the tests

Tests could be run with
```bash
npm test
```

It uses [Mocha](https://mochajs.org/) and [assert](https://nodejs.org/dist/latest-v10.x/docs/api/assert.html).
Special module called [esm](https://www.npmjs.com/package/esm) requires for launching tests, 
because Node.js doesn't support ES Modules loading without specifying file extensions and Mocha 
doesn't support extensions when launching tests. This behavior could be changed in future versions 
so esm module could be removed from mocha running options (in package.json).

### Deployment

This application automagically serves by GH Pages, so every push to `master` branch will trigger deploy.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.    

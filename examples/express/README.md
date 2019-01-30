# APP

## Express app using Apixu

### Requirements
* Node.js
* npm
* Git

### Setup app

Set APIXUKEY in the .env file.
```
cp .env.dist .env
```

Set Apixu library dependency in [package.json](./package.json).

### Install packages
```
npm install
```

### Run app
```
npm start
```

### Test
```
curl "127.0.0.1:3000/weather?q=London"
```

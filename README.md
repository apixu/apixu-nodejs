# Apixu Node.js

Node.js library for [Apixu Weather API](https://www.apixu.com/api.aspx)

## Requirements
* [Node.js and npm (or yarn)](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads) (optional)

## Install Apixu client

Choose the version you want to install from the [releases page](https://github.com/apixu/apixu-nodejs/releases)
or choose `master` to install the latest updates.

#### npm
```
npm install apixu/apixu-nodejs#vX.X.X
```
or
```
npm install apixu/apixu-nodejs#master
```
or without Git
```
npm install https://github.com/apixu/apixu-nodejs/archive/vX.X.X.tar.gz
```

#### npm with package.json file

Add to `dependencies` section of your `package.json` file

```
{
  "name": "app",
  "version": "0.1.0",
  "description": "App using Apixu",
  "dependencies": {
    "apixu": "apixu/apixu-nodejs#vX.X.X"
  }
}
```
then run
```
npm install
```

#### Manually
```
git clone https://github.com/apixu/apixu-nodejs --branch vX.X.X --single-branch # or download repository
cd apixu-nodejs
```

## Usage and integration with frameworks

See the [examples](./examples).

```
APIXUKEY=yourapikey node examples/<file>.js
```

## Documentation

https://www.apixu.com/doc/

## Development

You can use with Docker. See [Makefile](Makefile).

Run tests:
```
make test NODEVERSION=11 APIXUKEY=yourapikey
```

Enter environment:
```
make env NODEVERSION=11 APIXUKEY=yourapikey
```

Run example file:
```
make run NODEVERSION=11 APIXUKEY=yourapikey FILE=examples/search.js
```

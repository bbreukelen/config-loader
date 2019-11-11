## Config Loader

`config-loader`, loads your configuration variables for multiple environments.  
It allows for more flexibility than using the environment variables due to the support of nested objects.  

## How it works
`config-loader` will look for env/default.js in your application's root folder.  
Add all the possible variables here and set the default values.  
Then it will load env/local.js, continued by env/finally.js.
In finally.js you can define some methods to create config variables from previously loaded variables.
Config variables are deep-merged and later variables overwrite earlier existing ones.  

So default: { a: 0, b: 2 } and local: { a: 1, c: 3 } becomes { a: 1, b: 2, c: 3 }

## Install

```
$ npm install --save env-loader
```

## Usage
require('config-loader');  

## Config file format
```js
module.exports = {
  "SOME_VAR": "define here",

  "OBJECT": {
	"a": 1,
	"b": 2
  }
};
```

## Example for finally
```js
function manipulate() {
  global.config.url = global.config.host + '/' + global.config.path;
}
module.export = manipulate();
```

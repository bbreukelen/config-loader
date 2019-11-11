/*
  ConfigLoader
  Will load configuration variables by combining several configuration files.
  Config files are in /env and if available, "default" will be loaded, then "local", then "finally"

  Keep items that apply to all environments in default.
  Items specifically for the environment should be in local.
  The local file will not be added to the repository so keep your passwords there.

  finally.js can be used to manipulate/combine some items after loading everything.
 */

const TAG = "Config loader: ";
const fs = require('fs');
const mergeOptions = require('merge-options');

function loadFromFile(file) {
  var obj = loadFile(file);
  if (obj !== null) {
    global.config = mergeOptions(global.config, obj);
  }
}

function loadFile(path) {
  if (fs.existsSync(path)) {
    console.log(TAG + "Loading config file " + path);
    try {
      return require(path);
    } catch (e) {
      console.error(TAG + "Invalid configuration file: " + path);
      console.log(e);
      process.exit();
    }
  }
  return null;
}

function loadConfig() {
  // Load the default into memory if exists
  loadFromFile("env/default.js");

  // Load the local into memory if exits
  loadFromFile("env/local.js");

  // Start manipulation process
  loadFile("env/finally.js");
}

module.export = loadConfig();

var fs    = require('fs');
var path  = require('path');

// mkdirSync
var mkdirSync = (path) => {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

// Get action name
let actionName = process.argv[2]
if (typeof actionName === 'undefined') {
  throw "Please provide action name"
}

// Check if empty
if (actionName.trim() === '') {
  throw "Please provide action name"
}

// Path to files
let dirPath = path.join(__dirname, '../src/actions/', actionName)

// Make the dir
mkdirSync(dirPath)

// Write index.js
const indexText = 
"export const testAction = () => ((dispatch, getState) => {\n"
+ "  return fetch('/API/Endpoint')\n"
+ "})"
fs.writeFileSync(dirPath + '/index.js', indexText)

// Write reducer
const reducerText = 
"let initialState = {\n"
+ "  data: {}\n"
+ "}\n\n"
+ "const " + actionName.toLowerCase() + " = (state = initialState, action) => {\n"
+ "  switch (action.type) {\n"
+ "    default:\n"
+ "      return state\n"
+ "  }\n"
+ "}\n\n"
+ "export default " + actionName.toLowerCase()
fs.writeFileSync(dirPath + '/reducer.js', reducerText)
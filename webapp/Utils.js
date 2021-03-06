import React from 'react';
import {
  execPythonMessage, 
  evalPythonMessage
} from '@geppettoengine/geppetto-client/js/communication/geppettoJupyter/GeppettoJupyterUtils';


const Utils = {

  getHTMLType: function (type) {

    let htmlType;
    switch (type) {
    case "int":
      htmlType = "number";
      break;
    default:
      htmlType = "text";
      break;
    }
    return htmlType;

  },
 
  isObject: function (item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  },
    
  // FIXME: Hack to remove scaped chars (\\ -> \ and \' -> ') manually
  convertToJSON (data){
    if (typeof data === 'string' || data instanceof String){
      return JSON.parse(data.replace(/\\\\/g, '\\').replace(/\\'/g, '\''))
    }
    return data
  },

  getErrorResponse (data){
    let parsedData = this.convertToJSON(data)
    if (parsedData["type"] && parsedData['type'] == 'ERROR'){
      return { 'message': parsedData['message'], 'details' : parsedData['details'] }
    }
    return null;
  },

  parsePythonException (exception){
    return <pre dangerouslySetInnerHTML={{ __html: IPython.utils.fixConsole(exception) }} />
  },
  isNotebookLoaded () {
    return window.IPython != undefined;
  },

  execPythonMessage,
  evalPythonMessage
}

/**
 * Deep object comparison
 * @param {*} a 
 * @param {*} b 
 */
export function isEqual (a, b) {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }
  if (a.prototype !== b.prototype) {
    return false;
  }
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }
  return keys.every(k => isEqual(a[k], b[k]));
}

export default Utils
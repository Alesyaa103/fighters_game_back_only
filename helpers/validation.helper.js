
function checkOnExtraParam (currentObject, objectSchema) {
  for(let key in currentObject) {
    if (!objectSchema.hasOwnProperty(key)){
      return false
    }
  }
  return true
}

function checkRequiredParam (currentObject, objectSchema) {
  return JSON.stringify(Object.keys(currentObject).sort()) === JSON.stringify(Object.keys(objectSchema).sort())
} 

function checkOnParamType (currentObject,objectSchema) {
  for(let key in currentObject) {
    if(typeof currentObject[key] !== typeof objectSchema[key]){
      return false
    }
  }
  return true
}

module.exports = {
  checkOnExtraParam,
  checkRequiredParam,
  checkOnParamType
}
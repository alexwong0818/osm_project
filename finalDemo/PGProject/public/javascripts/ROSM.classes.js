
ROSM.extend = function(target_class, properties) {
  for(property in properties) {
    target_class.prototype[property] = properties[property];
  }
};

// Usage model
// Interfaces with redis to read/update values in the allocated usage
// time slots 0..1440
function Usage(redis){
  _self = this; 
  _self.redis = redis;
  _self.setName = 'usage';
  _self.maxSlots = 1440;// <== the number of minutes in 24hours
}

Usage.prototype.get = function(startSlot, count, done){
  var usage = []; 
  var slotList = _self._slotWindow(startSlot, count);
  // Getting the keys from the list
  _self.redis.hmget(_self.setName, slotList, function (err, result){
    if (err) return done(err, "Error getting keys " + slotList);
    var usage = [];
    for (x in result){
      usage.push(JSON.parse(result[x]));
    }
    return done(null, usage);
  });
};

Usage.prototype.increase = function (startSlot, done){
  var biasValues = _self._loadAdjustments();
  _self._biasSlotValues(startSlot, biasValues, 'increase', function (err, result){
    return done(null, true);
  });
};

Usage.prototype.decrease = function (startSlot, done){
  var biasValues = _self._loadAdjustments();
  _self._biasSlotValues(startSlot, biasValues, 'decrease', function (err, result){
    return done(null, true);  
  });
};

Usage.prototype._biasSlotValues = function(startSlot, biasValues, direction, done){
  _self.get(startSlot, biasValues.length, function (err, result){
    if (err) return done(err, "Error getting slots ");
    // make the adjustments
    var newUsage = {};
    var slotList = _self._slotWindow(startSlot, result.length);
    for(x in result){
      if (direction == 'increase'){
        result[x]['bias'] += biasValues[x];
      }
      else{
        result[x]['bias'] = result[x]['bias'] - biasValues[x];
      }
      // update the new usage object with the altered records
      // creating a hash to load to redis
      newUsage[slotList[x]] = JSON.stringify(result[x]);
    }
    // persist the new usage values
    _self.redis.hmset(_self.setName, newUsage, function (err, result){
      if (err) return done(err, "Error updaing biased slot values");
      return done(null, true);
    });
  });
};


// Sets just the bias values back to zeros
// Relies on the slots being there as objects
// It will blow up on an empty data set
Usage.prototype.reset = function (done) {
  var count = _self.maxSlots;
  reset_usage = {}
  _self.get(0, count, function (err, usage){
    // Iterate over the slots set the bias values to zero
    for (var slot=0; slot < count; slot++){
      var slotKey = "slot:" + slot;
      var slotObj = usage[slot] || {};
      slotObj['bias'] = 0;
      reset_usage[slotKey] = JSON.stringify(slotObj);
    }
    // Write the faked baseline data to redis 
    _self.redis.hmset(_self.setName, reset_usage, function (err, result) {
      if (err) return done(true, "Error writing usage update to Redis");
      return done(null, result);
    });
  });
};

// Regenerates all new baseline values for each slot
// and sets the bias values to zero
Usage.prototype.regenerate = function (done) {
  var usage = {};
  var count = _self.maxSlots; 
  // Iterate over the slots and generate faked data load baseline data
  for (var slot=0; slot < count; slot++){
    var fakeValue = (Math.random() * 3) + (Math.sin(slot/10)*4) + 10;
    var fakeBias = 0;//(Math.random() *2) + Math.cos(slot/10)*10;
    var slotKey = "slot:" + slot;
    usage[slotKey] = JSON.stringify({"slot": slot, "value": fakeValue, "bias": fakeBias});
  }
  // Write the faked baseline data to redis 
  _self.redis.hmset(_self.setName, usage, function (err, result) {
    if (err) return done(true, "Error writing usage update to Redis");
    return done(null, result);
  });
};

// Takes a function 'fun' and a callback. Will execute the function
// in the context of each slot and provide an object to store the results.
Usage.prototype.calculate = function (fun, toSlot, done) {
  var count = toSlot;
  sumObj = {};
  _self.get(0, count, function (err, usage){
    // Iterate over the slots set the bias values to zero
    for (var slot=0; slot < count; slot++){
      var slotObj = usage[slot];
      fun(sumObj,slotObj); 
    }
    done(null, sumObj);
   });
};

Usage.prototype._slotWindow = function (startSlot, count){
  var slotList = [];
  // Gathering a list of the keys we need to request
  for(var i=0; i < count; i++){
    var slot = 0;
    if ((startSlot + i) < _self.maxSlots){
      slot = startSlot + i;
      slotList.push('slot:' + slot);
    } else { //Wrap around to beginning
      slot = (startSlot + i) - _self.maxSlots;
      slotList.push('slot:' + slot);
    }
  }  
  return slotList;
}

Usage.prototype._loadAdjustments = function () {
  // Load adjustment bias over 15 slots
  return [0.1, 0.3, 0.5, 1.0, 1.8, 2.8, 1.6, 1.5, 1.1, 1.0, 0.5, 0.2, 0.1, 0.1, 0.1 ];
}
// exporting the class object
module.exports = Usage;
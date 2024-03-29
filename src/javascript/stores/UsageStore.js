var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = MockingwattConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _usageData = [{}];

var _usageSlot = {"slot": 0, "value": 0, "bias": 0};

function _addUsageData(data) {

  var date = new Date();
  var currentHour = date.getHours();
  var currentMinute = date.getMinutes();
  currentSlot = (currentHour * 60) + currentMinute;

  
  var matches = $.grep(data, function(e){ return e.slot == currentSlot;});
  if (matches.length > 0){
    _usageSlot = matches[0];
  }

  _usageData = data;
}

var UsageStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getUsageData: function() {
    return _usageData;
  },

  getUsageSlot: function() {
    return _usageSlot;
  }

});

UsageStore.dispatchToken = MockingwattAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_USAGE:
      _addUsageData(action.data);
      UsageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UsageStore;

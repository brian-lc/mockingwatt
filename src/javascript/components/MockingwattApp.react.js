/** @jsx React.DOM */

var Graph = require('./Graph.react');
var UsageStore = require('../stores/UsageStore');
var React = require('react');
var ClientActionCreators = require('../actions/ClientActionCreators');

function getStateFromStores() {
  return {
    usageData: UsageStore.getUsageData()
  };
}

var MockingwattApp = React.createClass({

  getInitialState: function() {

    // Make a request for the usageData once, before this component mounts.
    ClientActionCreators.getUsage()

    return getStateFromStores();
  },

  componentDidMount: function() {
    UsageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UsageStore.removeChangeListener(this._onChange);
  },

  render: function() {

    // The highcharts div is a total hack because jquery has to be called after render, and then data doesnt update, and kittens cry. Not at all how react should work but an easy hack for now.

    return (
      <div className="sillyContainer">
        <img className="meterImg" src="images/energy-meter.jpg" />
      	<h1 className="pageHeader">Mockingwatt - Artificial Load profile </h1>
      	<Graph
          usageData={this.state.usageData}
        />
        <div id="highcharts"></div>
        <button className="btn btn-lg btn-info" onClick={this.reset} >Reset</button>
        <button className="btn btn-lg btn-warning" onClick={this.decrement} > Reduce Energy Usage</button>
      	<button className="btn btn-lg btn-success" onClick={this.increment} > Increase Energy Usage</button>
      </div>
    );
  },

  increment: function() {
    ClientActionCreators.incrementUsage();
  },

  decrement: function() {
    ClientActionCreators.decrementUsage();
  },  

  reset: function() {
    ClientActionCreators.resetUsage();
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MockingwattApp;
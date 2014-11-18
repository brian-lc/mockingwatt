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

    return (
      <div className="sillyContainer">
      	<h1 className="pageHeader">Mockingwatt</h1>
      	<Graph
          usageData={this.state.usageData}
        />
        <div id="highcharts"></div>
        <button className="btn btn-lg btn-warning" onClick={this.decrement} >-</button>
      	<button className="btn btn-lg btn-success" onClick={this.increment} >+</button>
      </div>
    );
  },

  increment: function() {
    ClientActionCreators.incrementUsage();
  },

  decrement: function() {
    ClientActionCreators.decrementUsage();
  },  

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MockingwattApp;
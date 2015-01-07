/** @jsx React.DOM */

var React = require('react');

var NatGasUsage = React.createClass({
  render: function() {
    var iconStyle = { 
      width: "60px",
      height: "60px"
    }; 
    return (
      <div id="natGasUsage" style={iconStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 560"><title>naturalGas</title><g fill="none" fill-rule="evenodd"><g><g><path d="M272.566 479.526c-37.76 1.79-106.44-24.6-122.983-87.838-19.29-73.656 33.632-134.897 52.047-146.916-14.7 14.73-34.224 60.396-17.81 76.408-5.327-20.946 34.49-59.524 45.183-80.617 10.85-18.474 21.967-71.29 6.035-83.612 13.28 4.626 31.14 15.797 37.063 33.605 3.302 9.853 4.248 18.4 2.333 25.17 3.913 6.304 29.69-1.332 25.907-42.206-3.114-33.718 8.026-59.513 19.337-67.765-6.793 10.162-9.096 29.378 1.166 52.105 7.602 16.796 31.717 48.683 39.817 67.74 5.96 13.985 13.43 41.137 9.266 56.303 11.29 14.108 32.7-7.32 31.443-19.083 7.644 15.183 13.22 32.01 15.046 51.246 6.565 69.23-25.526 134.8-106.717 166.49 17.81-9.83 6.23-48.503-35.83-42.816-36.016 4.878-19.368 35.297-1.304 41.786" fill={this.props.fillColor} /><path d="M349.73 422.045c.802-32.985-21.285-47.533-9.166-61.458-23.965 11.46 1.61 48.933-16.27 52.597-11.39 2.37-27.827-10.2-18.234-40.53 2.653-8.454 10.633-13.8 12.735-19.986 2.265-6.516 0-16.727-6.346-21.705 3.565 6.185 1.336 12.624-2.146 17.256-4.244 5.566-9.767 8.84-16.717 14.932-8.728 7.643-9.393 18.574-18.596 15.34-6.695-2.37-13.77-13.836-13.34-26.057.61-14.814 7.972-23.81 9.318-34.975 1.133-9.726-2.903-17.38-8.41-20.697 4.016 4.828 3.86 12.625.61 20.424-5.178 12.475-22.864 26.9-28.36 45.56-4.923 16.8 5.58 37.975-1.237 41.82-16.713-9.252-16.76-35.685-12.146-47.803-5.804 7.65-15.397 26.775-14.218 39.56 1.117 12.03 12.7 21.964 15.602 39.35 2.863 17.053 23.647 37.314 49.24 43.872.213-.02.357-.02.518-.02-18.064-6.49-25.285-31.258 3.33-34.256 31.534-3.284 45.15 26.713 33.803 35.287 21.565-12.308 39.572-38.5 40.03-58.512" fill={this.props.innerFillColor}/></g></g></g></svg>
      </div>
    );
  }
});

module.exports = NatGasUsage;
import React from 'react';
import Map from '../src/components/Map';
var App = function () {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Mapbox Map"),
        React.createElement(Map, null)));
};
export default App;

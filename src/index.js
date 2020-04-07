import React from "react";
import ReactDOM from "react-dom";
import "assets/css/Index.css";
import App from "./App";
import * as jsonld from "jsonld";
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();







const $rdf = require("rdflib");
var store = $rdf.graph();
let rdf = async () => {
  const doc = {
    "http://schema.org/name": "Manu Sporny",
    "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
    "http://schema.org/image": {
      "@id": "http://manu.sporny.org/images/manu.png",
    },
  };
  const nquads = await jsonld.toRDF(doc, { format: "application/n-quads" });
  console.log(nquads);
  $rdf.parse(nquads, store, "http://andrewcosgaya.inrupt.net/public/ex.jsonld", "application/n-quads");
  console.log(store.toString());
};
rdf();

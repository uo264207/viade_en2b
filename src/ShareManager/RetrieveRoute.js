import { loadSpecificUserRoutesFiles } from "RouteManager/ListSpecificUserRoutes";
import * as cache from "caches/routeCache/RouteCache";
import * as filecache from "caches/fileCache/FileCache";
const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

/**
 * Method that retrieves all the routes from the shared files
 * and lists them.
 *
 * @param {String} routesURL url where the user
 * has the shared routes stored
 * for example "https://testingclrmrnd.inrupt.net/viade/shared/"
 */
export async function sharedRoutesList(routesURL) {
  
  const sharedPath = routesURL;
  const url = await retrieveSharedRoutes(sharedPath);

  console.log(url);
  let routes = [];
  let routes_routes = [];
  let routes_files = [];
  if (url) {
    for (let i = 0; i < url.length; i++) {
      //now, retrieving the specific route from the different urls
      let urlRoute = url[i];

      let route = await loadSpecificUserRoutesFiles(urlRoute);

      routes.push(route);

      routes_routes = [...routes_routes, ...route.routes];
      routes_files = [...routes_files, ...route.files];
    }
    console.table(routes_routes);
    filecache.default.addFilePaths(routes_files);
    cache.default.setSharedRoutes(routes_routes);
  }
  return routes;
}

/**
 * Method that retrieves the file of the shared routes
 * from the folder shared of the user autenticated
 *
 * Example: "https://testingclrmrnd.inrupt.net/viade/shared/"
 * @param {String} sharedPath
 */

export async function retrieveSharedRoutes(sharedPath) {
  let routesJSONS = [];
  let urlsToReturn = [];
  var urls_cache = JSON.parse(localStorage.getItem("urls"));

  let content = await fc
    .readFolder(sharedPath)
    .then()
    .catch((err) => {
      console.log("There was a problem reading " + sharedPath);
      return;
    });

  try {
    let files = content.files;
    console.log('FILES');
    console.log(files);
    console.log(files.length);

    for (let i = 0; i < files.length; i++) {
      console.log('WE ARE INSIDE EACH FILE OF SHARED ROUTES')
      console.log('HERE IS WHAT YOU WANT');
      console.log(files[i].url);
      let fileContent = await fc.readFile(files[i].url);
      
      routesJSONS.push(fileContent);
      //urls_cache.push(files[i].url);
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log(files[i].url);
      const url = jsonURLRetrieve(toJson(fileContent));
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
      for(let i = 0; i< url.length; i++){
        console.log(i);
        console.log(url[i]);
        urlsToReturn.push(url[i]);
      }
      console.log(urlsToReturn);
      
    }

    //localStorage.setItem("urls", JSON.stringify(urls_cache));
    
    //return urlsToReturn;
    const url = jsonURLRetrieve(toJson(routesJSONS));
    console.log('FINAL RESULT');
    console.log(url);
    console.log(urlsToReturn);
    return urlsToReturn;

  } catch (error) {
    console.log("It could not be read the folder " + sharedPath);
  }
}

/**
 * Method that retrieves the urls
 * of the file sharedroutes.js
 * @param {} routes
 */
function jsonURLRetrieve(routes) {
  let routesShared = [];
  let routesURL = [];

  console.log('IM SURE HERE');
  console.log(routes);
  for (let i = 0; i < routes.length; i++) {
    try {
      
      let routesRetrieved = routes[i].routes;
      console.log('Routes retrieved');
      console.log(routesRetrieved);

      for (let i = 0; i < routesRetrieved.length; i++) {
        console.log(routesRetrieved[i]);
        const routeURL = routesRetrieved[i]["@id"];
        console.log('Undefined?');
        console.log(routeURL);
        routesURL.push(routeURL);
      }

      routesShared.push(routes[i]);
      return routesURL;
    } catch (e) {
      // console.log(
      //  "Route " + i + " couldn't be parsed because the format is wrong"
      //);
      // console.log(e);
    }
  }

  //return { routes: entRoutes, files: entFiles };
}

//lo hace bien
function toJson(routes) {
  console.log('HERE IS THE PROBLEM MAYBE');
  console.log("Inside toJson");
  console.log(routes);
  let jsonRoutes = [];
 // for (let i = 0; i < routes.length; i++) {
   let routeA = "";
    try {
      routeA = routes; //routes[i]
      console.log(routeA);
      let route = JSON.parse(routeA);
      console.log(route);
      jsonRoutes.push(route);
    } catch (e) {
      console.log(
        "Route " +
        routeA+
          " couldn't be transformed to json because the format is wrong"
      );
    }
  //}
  console.log(jsonRoutes);
  return jsonRoutes;
}

//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc";
import { ldp, schema } from "rdf-namespaces";

const $rdf = require("rdflib");
const ns = require("solid-namespace")();

//LISTING SHARED ROUTES
export async function sharedRoutesList(routesURL) {
  const sharedPath =
    "https://testingclrmrnd.inrupt.net/viade/shared/sharedroutes.json";
  // = webId + "viade/shared/sharedroutes.json"
  const url = retrieveSharedRoutes(sharedPath);

  for (let i = 0; i < url.length; i++) {}
}
//RETRIEVE SHARED ROUTE
export async function retrieveSharedRoutes(sharedPath) {
  const auth = require("solid-auth-client");
  const FC = require("solid-file-client");
  const fc = new FC(auth);
  let routesJSONS = [];

  let content = await fc.readFolder(
    "https://testingclrmrnd.inrupt.net/viade/shared/"
  );
  let files = content.files;

  for (let i = 0; i < files.length; i++) {
    let fileContent = await fc.readFile(files[i].url);
    routesJSONS.push(fileContent);
  }
  const url = jsonURLRetrieve(toJson(routesJSONS));
  return url;
}

function jsonURLRetrieve(routes) {
  let routesShared = [];
  let routesURL = [];

  for (let i = 0; i < routes.length; i++) {
    try {
      let routesRetrieved = routes[i].routes;

      for (let i = 0; i < routesRetrieved.length; i++) {
        const routeURL = routesRetrieved[i]["@id"];

        routesURL.push(routeURL);
      }

      routesShared.push(routes[i].routes);
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

function toJson(routes) {
  let jsonRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    try {
      let route = JSON.parse(routes[i]);
      jsonRoutes.push(route);
    } catch (e) {
      //console.log(
      //  "Route " +
      //    i +
      //    " couldn't be transformed to json because the format is wrong"
      //);
    }
  }
  return jsonRoutes;
}

//GETTIN ALL NOTIFICATIONS (urls?)
export async function getNotifications(inboxPath) {
  let notificationDocuments = [];
  notificationDocuments = await getNotificationDocuments(inboxPath);
  console.log(notificationDocuments);
  let not2 = processSharedRoutes(notificationDocuments);

  console.log("NOTIFICATIONS RETRIEVED");
  console.log(not2);
}

/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationDocuments(inboxPath) {
  var inbox = inboxPath;
  var containerDoc = await fetchDocument(inbox);

  //if the document exists
  if (containerDoc) {
    var subject = containerDoc.getSubject(inbox);
    var containerURLS = subject.getAllRefs(ldp.contains);
    console.log(containerURLS);

    var result = [];
    for (var i = 0; i < containerURLS.length; i++) {
      try {
        //FETCH DE LA NOTIFICACIÓN
        console.log(containerURLS[i].replace("/viade", "/viade/inbox"))
        var doc = await fetchDocument(containerURLS[i].replace("/viade", "/viade/inbox"));

        console.log(doc);
        if (doc) {
          result = [...result, doc];
        }
      } catch (e) {
        console.log("Error");
      }
    }
    return result;
  }
  return [];
}

export async function processSharedRoutes(notificationDocuments) {
  var result = [];

  if (notificationDocuments.length > 0) {
    for (let i = 0; i < notificationDocuments.length; i++) {
      var message = notificationDocuments[i].getSubject(
        "https://andrewcosgaya.inrupt.net/viade/inbox/0eaeb047-6d6f-451d-9766-d245c0f2fbcd.ttl"
      );
      //const route = message.getString(schema.license);
      const route = message.getString(ns.as("summary"));
      result.push(route);
    }
  }
  return result;
}

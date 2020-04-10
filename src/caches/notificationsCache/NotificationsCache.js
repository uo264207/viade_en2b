import {GetUserWebId} from 'data-access/UserData';
import {discoverInboxUri, list} from 'data-access/gateways/NotificationsGateway';

export default {
    notifications: [],
    inboxUri: "",
    
    
    async getNotifications() {
      var rdf = require('rdflib'); // or other compatible library
      var webClient = require('solid-web-client')(rdf);
      
      const auth = require("solid-auth-client");
      let session = await auth.currentSession();
      
      let inbox = await discoverInboxUri(session.webId, webClient);
      
      let options = {
        webClient: webClient,
        inboxUri: inbox
      };
      console.log(session.webId.split("profile")[0])
      if (this.notifications.length === 0) {
        let foundNotifications = await list(session.webId.split("profile")[0], options);
        
        console.log(foundNotifications);
        
        if (foundNotifications.length > 0) {
          this.notifications = foundNotifications.notifications;
        } else {
          this.notifications = [];
        }
      }
      console.log("return");
      return [{title:"Title", text:"text"}];
    },
    
    clear(){
        this.notifications = [];
    }
}

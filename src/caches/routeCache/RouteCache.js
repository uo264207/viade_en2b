import * as RouteGateway from "../../data-access/gateways/RouteGateway";
import FileCache from "../fileCache/FileCache";

export default {
  routes: [],
  selected: "",
  addRoute(route) {
    if (route && !this.routes.find((obj) => route.name === obj.name)) {
      RouteGateway.add(route);
      this.routes.push(Object.assign({}, route));
    }
  },
  deleteRoute(route) {
    this.routes = this.routes.filter((obj) => route.name !== obj.name);
    RouteGateway.deleteByName(route.name);
  },
  async getRoutes() {
    if (this.routes.length === 0) {
      let foundRoutes = await RouteGateway.findAll();
      this.routes = foundRoutes.routes;
      FileCache.addFilePaths(foundRoutes.files);
    }
    return this.routes;
  },
  setSelected(route) {
    let found = this.routes.find((obj) => route.name === obj.name);

    if (found) {
      this.selected = found;
      return;
    }

    found = RouteGateway.findByName(route);
    if (found) {
      this.routes.push(found);
      this.routes.sort((r1, r2) =>
        r1.name > r2.name ? 1 : r1.name < r2.name ? -1 : 0
      );
    }
    this.selected = found;
  },
  getSelected() {
    return this.selected;
  },
  clear() {
    this.routes = [];
    this.selected = "";
  },
};

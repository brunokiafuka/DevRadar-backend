const { Router } = require("express");
const routes = Router();

const DevController = require("./Controllers/DevControllers");
const SearchController = require("./Controllers/SearchController");

routes.post("/dev", DevController.store);
routes.get("/dev", DevController.index);

routes.get("/search", SearchController.index);

module.exports = routes;

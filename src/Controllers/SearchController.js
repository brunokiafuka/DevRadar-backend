const Dev = require("../Models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { lat, long, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    let devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs });
  }
};

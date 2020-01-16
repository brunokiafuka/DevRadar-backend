const axios = require("axios");
const Dev = require("../Models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json({ devs });
  },
  async store(req, res) {
    const { github_username, techs, lat, long } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) return res.status(401).json({ message: "user alredy registered" });

    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name, avatar_url, bio, login } = apiResponse.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [long, lat]
    };

    dev = await Dev.create({
      name: name !== null ? name : login,
      github_username,
      avatar_url,
      techs: techsArray,
      bio: bio !== null ? bio : "",
      location
    });

    return res.status(201).json({ dev });
  },

  async update() {},
  async destroy() {
    // delete
  }
};

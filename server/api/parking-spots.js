const EXPRESS = require("express");
const SUPERAGENT = require("superagent");

const ROUTER = EXPRESS.Router();

ROUTER.get("/", (req, res) => {
  const { query } = req;
  const { latitude, longitude, radius } = query;

  getParkingSpots(latitude, longitude, radius).then((ret) => {
    res.status(200).send(ret);
  }).catch((err) => {
    res.status(err.status).send(err.message);
  });
});

ROUTER.get("/:parkingId", (req, res) => {
  res.status(501).send("Not yet implemented");
});

module.exports = ROUTER;

/**
 * Fetch data for parking spots within an area
 *
 * @param latitude  Latitude coordinate
 * @param longitude Longitude coordinate
 * @param radius    Radius in meters
 * @return          An array with objects of parking spot data
 */
const getParkingSpots = (latitude, longitude, radius) => {
  const url = `http://data.goteborg.se/ParkingService/v2.1/PublicTollParkings/${process.env.GOTEBORG_PSI_DATA_API_KEY}`;

  return new Promise((resolve, reject) => {
    SUPERAGENT
      .get(url)
      .query({
        format: "json",
        longitude: longitude,
        latitude: latitude,
        radius: radius,
      })
      .end((err, res) => {
        if (err) {
          console.log("superagent catch err", err);
          return reject({ status: 500, message: err });
        }

        return resolve(res.text);
    });
  });
};

/**
 * Fetch data for parking spots within an area
 *
 * @param parkingId Id for a parking spot
 * @return          An array with objects of parking spot data
 */
const getSpecificParkingSpot = () => {
  // WIP
};

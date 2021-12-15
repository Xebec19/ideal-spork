const rfs = require("rotating-file-stream");
const {path } = require("path");

const stream = rfs.createStream("../log/http-error.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: "/../log",
});

// export default stream;
module.exports = stream;

// const rfs = require("rotating-file-stream");
import * as rfs from "rotating-file-stream";
import path,{ dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const stream = rfs.createStream("../log/http-error.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, "../log"),
});

export default stream;

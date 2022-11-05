import nextConnect from "next-connect";
import multer from "multer";
var fs = require("fs");
var ftpClient = require("ftp-client");
var Client = require("ftp");
import { EmailModel } from "../../models/Email";
import mongoose from "mongoose";
const upload = multer({
  storage: multer.diskStorage({
    destination: "./file",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect();

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  const { name, email, number } = req.body;
  // const {}
  // const cl = {
  //   host: "10.0.38.73",
  //   port: 21,
  //   user: "blueteam2022",
  //   password: "UtoledoBlueteam2022",
  // };
  // const options = {
  //   logging: "basic",
  // };
  // const client = new ftpClient(cl, options);

  // var c = new Client();
  // c.on("ready", function () {
  //   c.put(req.file.path, req.file.originalname, async function (err) {
  //     // if (err) throw err;

  await mongoose.connect(
    "mongodb+srv://yashkakade:yashkakade@bug-tracker.np7pj.mongodb.net/cyberforce?retryWrites=true&w=majority"
  );
  try {
    await EmailModel.create({
      number,
      name,
      email,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });
  } catch (error) {
    throw error;
  }

  //   fs.unlinkSync(req.file.path);
  //   c.end();
  // });
  // });
  // c.connect(cl);
  res.status(200).json({ data: "File uploaded" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};

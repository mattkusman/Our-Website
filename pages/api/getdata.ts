import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { EmailModel } from "../../models/Email";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(
    "mongodb+srv://yashkakade:yashkakade@bug-tracker.np7pj.mongodb.net/cyberforce?retryWrites=true&w=majority"
  );
  try {
    return res.json(await EmailModel.find({}));
  } catch (error) {
    throw error;
  }
}

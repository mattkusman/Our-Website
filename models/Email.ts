import mongoose from "mongoose";
async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://yashkakade:yashkakade@bug-tracker.np7pj.mongodb.net/cyberforce?retryWrites=true&w=majority"
  );
}
connectDB();

export const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  fileName: String,
  filePath: String,
});

export const EmailModel =
  mongoose.models.Email || mongoose.model("Email", emailSchema);

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },

  selectedRepos: [
    {
      repo: String,
      webHookId:String,
    },
  ],
});

export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "You need to provide a username!",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "You need to provide an email address!",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    fellowship: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get count of members in the fellowship on retrieval
userSchema.virtual("fellowshipCount").get(function () {
  return this.fellowship.length;
});

const User = mongoose.model("User", userSchema);

export default User;

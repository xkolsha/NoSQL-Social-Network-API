import User from "../models/user.js";

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID!" });
      }
      res.json({ message: "User deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a member to a user's fellowship list
  addFellowshipMember: async (req, res) => {
    try {
      const { userId, fellowId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { fellowship: fellowId } },
        { new: true }
      );
      const updatedFellow = await User.findByIdAndUpdate(
        fellowId,
        { $addToSet: { fellowship: userId } },
        { new: true }
      );
      if (!updatedUser || !updatedFellow) {
        return res.status(404).json({ message: "Sorry, nobody there" });
      }
      res
        .status(200)
        .json({ message: "Fellowship member added!", user: updatedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a member from a user's fellowship list
  removeFellowshipMember: async (req, res) => {
    try {
      const { userId, fellowId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { fellowship: fellowId } },
        { new: true }
      );
      const updatedFellow = await User.findByIdAndUpdate(
        fellowId,
        { $pull: { fellowship: userId } },
        { new: true }
      );
      if (!updatedUser || !updatedFellow) {
        return res.status(404).json({ message: "Sorry, nobody there!" });
      }
      res
        .status(200)
        .json({ message: "Fellowship member removed!", user: updatedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;

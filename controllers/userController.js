import User from "../models/user.js";

const createUser = async (req, res) => {
  try {
    const { email, avatar } = req.body;
    const userExists = await User.findOne({ email });

     if (userExists) return res.status(200).json(userExists);

   const newUser = new User({
      email,
      avatar,
    });
    await newUser.save();
    res.status(200).json(newUser);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { createUser };

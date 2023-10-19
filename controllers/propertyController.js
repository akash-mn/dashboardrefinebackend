import User from "../models/user.js";
import Profile from "../models/profile.js";
import mongoose from "mongoose";


const createProperty = async (req, res) => {
  const { name, password, phoneNumber, youtube, instagram, id } = req.body;
  console.log(req.body);
  try {
    const session=await mongoose.startSession();
    session.startTransaction();
    const users = User.findById({ id });
    if (!users) throw new Error("User Not Found");
    // console.log(users);
    // Build profile object
    const profileFields = {};
    profileFields.user = id;
    if (name) profileFields.name = name;
    if (password) profileFields.password = password;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    // console.log(profileFields);
    // res.send('heello');
    let profile = await Profile.findOne({ user:id });
    if (profile) {
      //  Update
      profile = await Profile.findOneAndUpdate(
        { user: id},
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    // Create
    profile = new Profile(profileFields);
    await profile.save({session});
    await session.commitTransaction();
    res.status(200).json({ message:"Profile Created Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProfile=async(req,res)=>{
  try {
    const {id}=req.params
     const profiles= await Profile.find({user:id})
     if(profiles){
        return res.status(200).json(profiles);
     }
     res.status(200).json({message: "Profile Not Exits"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }

}

export { createProperty,getProfile };

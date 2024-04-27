import mongoose from "mongoose";
import userModel from "./users.js";


mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = userModel.find();
    } else if (name && !job) {
      promise = findUserByName(name);
    } else if (job && !name) {
      promise = findUserByJob(job);
    }
    return promise;
  }
  
  function findUserById(id) {
    return userModel.findById(id);
  }
  
  function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
  }
  
  function findUserByName(name) {
    return userModel.find({ name: name });
  }
  
  function findUserByJob(job) {
    return userModel.find({ job: job });
  }

  function deleteUserById (id){
    return userModel.findByIdAndDelete(id);
  };
  
  export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    deleteUserById,
  };

export const createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  };
  
  export const findUsers = async ({ name, job }) => {
    const query = {};
    if (name) query.name = name;
    if (job) query.job = job;
  
    return User.find(query);
  };

  export const findUsersByNameAndJob = async (name, job) => {
    const users = await User.find({ name, job });
    return users;
  };
  
  

  export const getAllUsers = async () => {
    const users = await User.find();
    return users;
  };



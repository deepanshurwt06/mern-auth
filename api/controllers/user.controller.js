import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test =(req, res) => {
    res.json({
     message: "user route is working"
    })
}

// update user

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next (errorHandler(403,"You can update only your account"))
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);

        }
        const updatedUser = await User.findByIdAndUpdate(
             req.params.id,
             {
               $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                profilePicture : req.body.profilePicture,
               }
             },
             {new : true}
            );
            const {password : hashedPassword,...rest} = updatedUser._doc;
            res.status(200).json(rest);
            
    } catch (error) {
        next(error);
    }
}

// delete user 

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next (errorHandler(403,"You can delete only your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    } catch (error) {
        next(error);
    }
}
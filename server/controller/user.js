import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const signin = async(req,res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid Credentials" });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            'test',
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error("Signin error:", error);  // for debugging
        res.status(500).json({ message: "Something went wrong" });
    }
};


// export const signin = async(req,res) => {
//     const{email,password} = req.body;

//     try{
//         const existingUser = await User.findOne({email});

//         if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

//         const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

//         if(!isPasswordCorrect) return res.status(404).json({message: "Invalid Creadentails"});

//         // const token = jwt.signin({email: existingUser.email,  id:existingUser._id}, 'test', {expiresIn: "1h"})

//         const token = jwt.sign({email: existingUser.email,  id:existingUser._id}, 'test', {expiresIn: "1h"})


//         res.status(200).json({result:existingUser, token});
//     }catch(error){
//         res.status(500).json({message:"something went wrong"});
//     }
// }

export const signup = async(req,res) => {
    const{email,password,confirmPassword,name} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message: "User alredy exist"});

        if(password!==confirmPassword) return res.status(400).json({message: "passwords donot match"});
    
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password:hashedPassword, name: name});

        const token = jwt.sign({email: result.email,  id:result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token});
    }catch(error){
        res.status(500).json({message:"something went wrong"});
    }
}

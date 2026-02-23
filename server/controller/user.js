import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* ===================== SIGN IN ===================== */
export const signin = async (req, res) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase(); // ✅ normalize email

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ include role in token
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/* ===================== SIGN UP ===================== */
export const signup = async (req, res) => {
  let { email, password, confirmPassword, name } = req.body;

  try {
    email = email.toLowerCase(); // ✅ normalize email

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // default
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
        role: result.role,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

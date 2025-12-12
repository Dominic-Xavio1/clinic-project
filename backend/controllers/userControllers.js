import bcrypt from 'bcrypt';
import User from '../models/user.js';
import validator from "validator"
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  let { name, email, password } = req.body;
  console.log('coming data:', req.body);
if(!validator.isLength(name,{min:8})){
return  res.status(404).json({success:false,message:"Your full name can't go below 6 character!"})
}
else if(!validator.isEmail(email)){
 return res.json({success:false,message:"Invalid email!"})
}
else if(!validator.isLength(password,{min:6})){
 return res.json({success:false,message:"Password must be atleast 6 characters!"})
}
    try {
  let user = await User.findOne({ email });
  if (user) return res.status(409).json({ success:false,exist:true, message: 'User already exists. Please login!' });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
        email,
        password: hashedPassword,
        role: 'patient'
    });
    await user.save();
    res.status(201).json({success:true, message: `Account created for ${name} ` });
  } catch (err) {
    console.log('Server error from signup', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Please enter password' });
  }

  try {
    const identifier = email;
    let spaceRemoved = "";
    if (identifier && !validator.isEmail(identifier)) {
      spaceRemoved = identifier.replace(/\s+/g, '').toLowerCase();
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { name: spaceRemoved }] });
    console.log('user', user);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or name' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    res.json({ success: true, message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log('Server error from login', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctor can register nurses
const registerNurse = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const nurse = await User.create({ name, email, password: hashedPassword, role: "nurse" });
    res.status(201).json({ success: true, message: "Nurse registered", user: { id: nurse._id, name: nurse.name, email: nurse.email, role: nurse.role } });
  } catch (err) {
    console.error("Error registering nurse", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("name email role");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Error listing users", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { signup, login, registerNurse, listUsers };
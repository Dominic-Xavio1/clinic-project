import bcrypt from 'bcrypt';
import User from '../models/user.js';
import validator from "validator"
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  let { name, email, password, role } = req.body;
  console.log('coming data:', req.body);
if(!validator.isLength(name,{min:8})){
return  res.status(404).json({success:false,message:"Your full name can't go below 6 character!"})
}
else if(!validator.isEmail(email)){
 return res.json({success:false,message:"Invalid email!"})
}
else if(!role){
 return res.json({success:false,message:"Role is required!"})
}
else if(!validator.isLength(password,{min:6})){
 return res.json({success:false,message:"Password must be atleast 6 characters!"})
}
    try {
  let user = await User.findOne({ email });
  if (user) return res.status(409).json({ success:false, message: 'User already exists. Please login!' });
    const hashedPassword = await bcrypt.hash(password, 10);
    if(role && role !== 'doctor' && role !== 'receptionist') {
      return res.status(400).json({ success:false,message: 'Invalid role specified' });
    } 
    if (!role) {
      role = 'receptionist';
    }
    user = new User({
      name,
        email,
        password: hashedPassword,
        role
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

export { signup, login };
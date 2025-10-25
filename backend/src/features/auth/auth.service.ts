import User from './auth.model';
import bcrypt from 'bcrypt';
import { IUserCreate } from './auth.types';

export const signUpServ = async (data: IUserCreate) => {
  try {
    //check duplicate email
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error('Email already exists');

    //hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    //create user object
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'employee',
      image: data.image || '',
      salary: data.salary || 0,
    });

    // save user to DB
    const savedUser = await user.save();

    // return saved user without password
    const { password, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;

  } catch (err) {
    throw err;
  }
};

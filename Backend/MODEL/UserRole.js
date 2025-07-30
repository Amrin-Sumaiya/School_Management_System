import mongoose from 'mongoose';

// Defining Schema
const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'User email is required!'],
    unique: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Teacher', 'Student', 'Accounts'],
    default: 'Student',
    required: true,
  },

  nid: {
    type: Number,
    trim: true,
  },

  password: { type: String, required: true, trim: true },
});

// Model
const UserRoleModel = mongoose.model('user_role', userRoleSchema);

export default UserRoleModel;

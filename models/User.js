import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required !'],
    minlenght: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required !'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email!',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required !'],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    minlenght: 3,
    maxlength: 20,
    trim: true,
  },
  location: {
    type: String,
    minlenght: 3,
    maxlength: 20,
    trim: true,
    default: 'My city.',
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Response obj handler.
UserSchema.methods.toJSON = function () {
  // Create token.
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  // Get response object.
  const obj = this.toObject();
  // Append token.
  obj['token'] = token;
  // Remove password from public response.
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);

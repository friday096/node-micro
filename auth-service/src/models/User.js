import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserRole = {
  ADMIN: 1,
  USER: 2,
};

const UserStatus = {
  ACTIVE: 1,
  INACTIVE: 2,
};

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
    status: {
      type: Number,
      enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
      default: UserStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;

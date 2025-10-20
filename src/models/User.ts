import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

const UserSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    displayName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    roles: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const User = (models.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);

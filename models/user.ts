import { Schema, model, Document, models } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  rol: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'This field is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'This Field is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'This Field is required'],
      trim: true,
      unique: true,
    },
    rol: {
      type: String,
      required: [true, 'This Field is required'],
      enum: ['musician', 'client'],
      default: 'client',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.user || model<User>('User', userSchema);

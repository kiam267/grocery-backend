import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'customer' })
  roles: string;


}

export const UserSchema = SchemaFactory.createForClass(User);

// Password hashing middleware
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// jwt token middleware

// UserSchema.methods.generateToken = async function () {
//   return jwt.sign(
//     {
//       id: this._id,
//       email: this.email,
//       roles: this.roles,
//     },
//     process.env.TOKEN_SECRET,
//     {
//       expiresIn: '10d',
//     },
//   );
// };

// export interface UserModel extends Model<UserDocument> {
//   generateToken(): string;
// }

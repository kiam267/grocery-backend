import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Permission, PermissionSchema } from './permissions.schema';
import { AddressSchema, Address } from './address.schema';
import { Wallet, WalletSchema } from './wallet.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // This will automatically add createdAt and updatedAt
export class Profile extends Document {
  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ default: null })
  contact: string;

  @Prop({ default: null })
  notifications: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

//  PermissionSchema

// It's main Schema
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'customer' })
  roles: string;

  @Prop({ default: null })
  email_varified_at: Date;

  @Prop({ default: null })
  is_active: boolean;

  @Prop({ required: true })
  coustomer_id: string;

  @Prop({ default: null })
  shop_id: string;

  @Prop({ default: null })
  email_verified: boolean;

  @Prop({ type: ProfileSchema })
  profile: Profile;

  @Prop({ type: PermissionSchema })
  permissions: Permission[];

  @Prop({ default: null, type: AddressSchema })
  address: Address[];

  @Prop({ default: null, type: WalletSchema })
  wallet: Wallet;
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

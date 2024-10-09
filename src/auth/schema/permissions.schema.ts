import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';









//  It's main Schema
@Schema({ timestamps: true }) // This will automatically add createdAt
export class Permission {
  @Prop({ default: 'customer' })
  name: 'customer' | 'super_admin' | 'store_owener';

  @Prop({ default: 'api' })
  guard_name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

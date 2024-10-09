import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

//  It's main Schema
@Schema({ timestamps: true }) // This will automatically add createdAt
export class Wallet {
  @Prop({ required: true })
  coustomer_id: string;

  @Prop({ required: true })
  total_points: number;

  @Prop({ required: true })
  points_used: number;

  @Prop({ required: true })
  available_points: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

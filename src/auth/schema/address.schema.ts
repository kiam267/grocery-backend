import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  zip: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  state: string;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  street_address: string;
  @Prop({ required: true })
  location: string;
}


export const AddressSchema = SchemaFactory.createForClass(Address);

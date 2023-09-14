import { Prop } from '@nestjs/mongoose';

export class CreateUserDto {
  @Prop()
  _id?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

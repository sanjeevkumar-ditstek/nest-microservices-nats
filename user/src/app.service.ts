import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(user: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(user);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getUser({ books }) {
    await this.create({ firstName: 'John', lastName: 'Test' });
    const users = await this.findAll();
    return {
      books,
      data: 'getUser',
      users,
    };
  }
}

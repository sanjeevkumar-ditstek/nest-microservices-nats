import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('BOOK_SERVICE') private booksClient: ClientProxy,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/books')
  getAllBooks() {
    return this.booksClient.send({ cmd: 'get_books' }, {});
  }
  @Get('/users')
  getAllUsers() {
    return this.userClient.send({ cmd: 'get_users' }, {});
  }
}

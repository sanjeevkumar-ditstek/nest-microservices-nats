import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ALL_SERVICES } from './app.providers';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(ALL_SERVICES.BOOK_SERVICE) private booksClient: ClientProxy,
    @Inject(ALL_SERVICES.USER_SERVICE) private userClient: ClientProxy,
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

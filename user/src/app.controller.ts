import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('BOOK_SERVICE') private booksClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'get_users' })
  async getBooks() {
    const books = await this.booksClient
      .send({ cmd: 'get_books' }, {})
      .toPromise();
    return this.appService.getUser({ books });
  }
}

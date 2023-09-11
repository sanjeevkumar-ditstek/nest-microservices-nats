import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser({ books }) {
    return {
      books,
      data: 'getUser',
    };
  }
}

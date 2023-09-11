import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'BOOK_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [process.env.NATS_URL],
            // headers: { 'x-version': '1.0.0' },
          },
        }),
    },
    {
      provide: 'USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [process.env.NATS_URL],
            // headers: { 'x-version': '1.0.0' },
          },
        }),
    },
  ],
})
export class AppModule {}

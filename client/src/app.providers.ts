import { ClientProxyFactory, Transport } from '@nestjs/microservices';

// Basic configurations
const clientFactory = ClientProxyFactory.create({
  transport: Transport.NATS,
  options: {
    servers: [process.env.NATS_URL],
    // headers: { 'x-version': '1.0.0' },
  },
});

// Reading services from json file
// const DIRS = process.cwd().split('/');
// DIRS.pop();
// const filePath = DIRS.join('/') + '/services.json';
// export const ALL_SERVICES = JSON.parse(fs.readFileSync(filePath, 'utf8'));
export const ALL_SERVICES = {
  BOOK_SERVICE: 'BOOK_SERVICE',
  USER_SERVICE: 'USER_SERVICE',
};
export const Providers = Object.keys(ALL_SERVICES).map((service) => ({
  provide: service,
  useFactory: () => clientFactory,
}));

// export const Providers = [
//   {
//     provide: 'BOOK_SERVICE',
//     useFactory: () => clientFactory,
//   },
//   {
//     provide: 'USER_SERVICE',
//     useFactory: () => clientFactory,
//   },
// ];

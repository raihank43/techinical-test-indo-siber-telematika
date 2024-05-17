import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'test';
  }
  getTest(): any {
    const hello = {
      hello: 'hello',
    };
    return hello;
  }
}

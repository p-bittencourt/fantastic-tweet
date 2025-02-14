import { Controller, Get, Head } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Head()
  welcome() {
    return { message: 'Welcome to FantasTweet API' };
  }

  @Get('health')
  @Head('health')
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

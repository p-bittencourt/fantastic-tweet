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
    console.log('got to health');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

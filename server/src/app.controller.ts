import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  welcome() {
    return { message: 'Welcome to FantasTweet API' };
  }

  @Get('health')
  check() {
    console.log('got to health');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

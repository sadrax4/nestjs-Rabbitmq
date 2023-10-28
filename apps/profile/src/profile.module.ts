import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule, RmqModule } from '@app/cammon';
import { ConfigModule } from '@nestjs/config';
import { AUTH_SERVICE } from './constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule.register({
      name: AUTH_SERVICE
    }),
    AuthModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }

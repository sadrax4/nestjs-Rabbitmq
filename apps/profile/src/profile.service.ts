import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE } from './constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) { }
  async getProfile() {
    try {
      const user = this.authClient.send("get-profile", { });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
 async validate(email: string, password: string) {
    // const user = await this.userService.findOne(email) 
    // if (user.password==password) {
    //     return user 
    // }
    return false
  }
}

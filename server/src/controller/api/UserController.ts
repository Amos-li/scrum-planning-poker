import { JsonController, Post, Body, Authorized, CurrentUser } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../../entity';
import { WxLogin } from '../../model';
import { UserRepository } from '../../repository';

@Service()
@JsonController('/users')
export class UserController {

  @InjectRepository(User)
  private userRepository: UserRepository;

  @Post('/wxlogin')
  wxLogin(@Body() data: WxLogin): Promise<string> {
    return this.userRepository.wxLogin(data);
  }

  @Authorized()
  @Post('/whoami')
  whoAmI(@CurrentUser({ required: true }) user: User): User {
    return user;
  }

}

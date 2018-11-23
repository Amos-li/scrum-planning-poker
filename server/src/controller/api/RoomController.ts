import { JsonController, Get, Post, Body, CurrentUser, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Room, User } from '../../entity';
import { RoomRepository } from '../../repository';

@Service()
@JsonController('/rooms')
export class RoomController {

  @InjectRepository(Room)
  private roomRepository: RoomRepository;

  @Authorized()
  @Get()
  get(@CurrentUser({ required: true }) user: User): Promise<Room[]> {
    return this.roomRepository.getByUser(user);
  }

  @Authorized()
  @Post()
  // TODO: change the request model
  // tslint:disable-next-line:max-line-length
  create(@CurrentUser({ required: true }) user: User, @Body({ validate: false }) room: Room): Promise<Room> {
    return this.roomRepository.createWithStory(user, room);
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { UserListQueryDto } from './dto/userListQuery.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserEntity: Repository<UserEntity>,
  ) {}
  async list({ limit, page, query }: UserListQueryDto): Promise<UserEntity[]> {
    const users = await this.UserEntity.find({
      where: [{ email: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }],
      skip: (page - 1) * limit,
      take: page * limit,
    });
    return users;
  }
  async findOne(id?: number, email?: string): Promise<UserEntity> {
    const user = await this.UserEntity.findOne({ where: [{ id }, { email }] });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
  async create(data: CreateUserDto): Promise<UserEntity> {
    const newUser = this.UserEntity.create(data);
    await newUser.save();
    return newUser;
  }
  async update(data: UpdateUserDto, id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    await user.save();
    return user;
  }
  async addAdmin(id: number, state: boolean): Promise<UserEntity> {
    const user = await this.findOne(id);
    user['isAdmin'] = state;
    await user.save();
    return user;
  }
}

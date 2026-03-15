import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/User';
import { Repository } from 'typeorm';
import { UserSave } from './dto/UserSave';
import { UserNotFoundException } from './exceptions/UserNotFound';
import { UserRole } from 'src/auth/roles';
import { hash, genSalt } from 'bcrypt';
import { UserUpdate } from './dto/UserRequest';

@Injectable()
export class IdentityService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public static flag = 0;

  public async onApplicationBootstrap() {
    const user = await this.userRepository.existsBy({
      user_login: process.env.ADMIN_LOGIN ?? '',
    });

    if (!user && !IdentityService.flag) {
      await this.userRepository.save(
        new UserSave(
          'admin',
          process.env.ADMIN_LOGIN ?? '',
          await hash(process.env.ADMIN_PASSWORD ?? '', await genSalt()),
          '00000000000',
          '',
          '',
          new Date(Date.now()),
          UserRole.manager,
        ),
      );

      IdentityService.flag = 1;
    }
  }

  public save(user: UserSave) {
    return this.userRepository.save(user);
  }

  public findAll() {
    return this.userRepository.find();
  }

  public async findById(user_id: string) {
    const user = await this.userRepository.findOneBy({ user_id: user_id });

    if (user == null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async findByLogin(user_login: string) {
    const user = await this.userRepository.findOneBy({
      user_login: user_login,
    });

    if (user == null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async findByCpf(user_cpf: string) {
    const user = await this.userRepository.findOneBy({ user_cpf: user_cpf });

    if (user == null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async edit(user_id: string, user: UserUpdate) {
    const userExist = await this.userRepository.existsBy({ user_id: user_id });

    if (!userExist) {
      throw new UserNotFoundException();
    }

    return this.userRepository.update({ user_id: user_id }, user);
  }

  public delete(user_id: string) {
    return this.userRepository.delete({ user_id: user_id });
  }
}

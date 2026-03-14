import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/User';
import { Repository } from 'typeorm';
import { UserSave, UserUpdate } from './dto/UserSave';
import { UserNotFoundException } from './exceptions/UserNotFound';

@Injectable()
export class IdentityService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    public save (user: UserSave) {
        return this.userRepository.save(user);
    }

    public findAll () {
        return this.userRepository.find();
    }

    public async findById(id: string) {
        const user = await this.userRepository.findOneBy({user_id: id});

        if(user == null) {
            throw new UserNotFoundException();
        }

        return user;
    }

    public async findByCpf(cpf: string) {
        const user = await this.userRepository.findOneBy({cpf: cpf});

        if(user == null) {
            throw new UserNotFoundException();
        }

        return user;
    }

    public async verifyUserExistence(id: string) {
        const user = await this.userRepository.findOneBy({user_id: id});

        if(user == null) {
            return false;
        }

        return true;
    }

    public async edit(id: string, user: UserUpdate) {
        const userExist = await this.verifyUserExistence(id);

        if(!userExist) {
            throw new UserNotFoundException();
        }

        return this.userRepository.update({user_id: id}, user)
    }

    public delete(id: string) {
        return this.userRepository.delete({user_id: id});
    }

}

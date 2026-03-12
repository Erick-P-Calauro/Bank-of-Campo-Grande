import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/User';
import { Repository } from 'typeorm';
import { UserSave, UserUpdate } from './dto/UserSave';

@Injectable()
export class IdentityService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    save (user: UserSave) {
        return this.userRepository.save(user);
    }

    findAll () {
        return this.userRepository.find();
    }

    findById(id: string) {
        const user = this.userRepository.findBy({user_id: id});

        return user;
    }

    edit(id: string, user: UserUpdate) {
        return this.userRepository.update({user_id: id}, user)
    }

    delete(id: string) {
        return this.userRepository.delete({user_id: id})
    }

}

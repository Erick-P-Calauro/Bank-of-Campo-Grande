import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/User';
import { Repository } from 'typeorm';
import { UserSave, UserUpdate } from './dto/UserSave';
import { UserNotFoundException } from './exceptions/UserNotFound';
import { UserRole } from 'src/auth/roles';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class IdentityService implements OnModuleInit{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    async onModuleInit() {
        const user = await this.userRepository.findOneBy({login: process.env.ADMIN_LOGIN ?? ""})

        if(user == null) {
            this.userRepository.save(new UserSave(
                'admin', 
                process.env.ADMIN_LOGIN ?? "",
                await hash(process.env.ADMIN_PASSWORD ?? "", await genSalt()),
                "00000000000",
                "",
                "",
                new Date(Date.now()), 
                UserRole.manager)
            );
        }
    
    }

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

    public async findByLogin(login: string) {
        const user = await this.userRepository.findOneBy({login: login});

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

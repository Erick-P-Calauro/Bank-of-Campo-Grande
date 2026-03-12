import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/User';
import { Repository } from 'typeorm';

@Injectable()
export class IdentityService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

}

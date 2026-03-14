import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IdentityService } from './identity.service';
import { UserRole } from './models/User';
import { UserRequest } from './dto/UserRequest';
import { UserMapper } from './dto/UserMapper';
import { UserUpdate } from './dto/UserSave';

@Controller('/identity/user')
export class IdentityController {
    
    constructor(private IdentityService: IdentityService){}

    @Post('')
    @ApiBody({type: UserRequest})
    @HttpCode(201)
    public async saveRegularUser (@Body() user : UserRequest) {
        const userToInsert = UserMapper.toUserSaveDto(user, new Date(Date.now()), UserRole.client);
        const userResponse = await this.IdentityService.save(userToInsert);

        return UserMapper.toUserResponseDto(userResponse);
    }

    @Get('')
    @HttpCode(200)
    public async findUsers () {
        return (await this.IdentityService.findAll()).map((user) => UserMapper.toUserResponseDto(user));
    }

    @Get(':id')
    @HttpCode(200)
    public async getUserById(@Param('id') id: string) {
        return UserMapper.toUserResponseDto((await this.IdentityService.findById(id))[0]);
    }

    @Patch(':id')
    @HttpCode(204)
    public async editUser(@Param('id') id: string, @Body() user: UserUpdate) {
        this.IdentityService.edit(id, user)
    }

    @Delete(':id')
    @HttpCode(204)
    public deleteUser(@Param('id') id : string) {
        this.IdentityService.delete(id);
    }

}

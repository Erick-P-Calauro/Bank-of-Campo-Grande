import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { User, UserRole } from './models/User';
import { UserRequest } from './dto/UserRequest';
import { UserMapper } from './dto/UserMapper';
import { UserUpdate } from './dto/UserSave';
import { ApiBody } from '@nestjs/swagger';

@Controller('identity')
export class IdentityController {
    
    constructor(private IdentityService: IdentityService){}

    @Post()
    @ApiBody({type: UserRequest})
    @HttpCode(201)
    async saveRegularUser (@Body() user : UserRequest) {
        const userToInsert = UserMapper.toUserSaveDto(user, new Date(Date.now()), UserRole.client);
        const userResponse = await this.IdentityService.save(userToInsert);

        return UserMapper.toUserResponseDto(userResponse);
    }

    @Post('/manager')
    @ApiBody({type: UserRequest})
    @HttpCode(201)
    async saveManagerUser (@Body() user : UserRequest) {
        const userToInsert = UserMapper.toUserSaveDto(user, new Date(Date.now()), UserRole.manager);
        const userResponse = await this.IdentityService.save(userToInsert);

        return UserMapper.toUserResponseDto(userResponse);
    }

    @Get()
    @HttpCode(200)
    async findUsers () {
        return (await this.IdentityService.findAll()).map((user) => UserMapper.toUserResponseDto(user));
    }

    @Get(':id')
    @HttpCode(200)
    async getUserById(@Param('id') id: string) {
        return UserMapper.toUserResponseDto((await this.IdentityService.findById(id))[0]);
    }

    @Patch(':id')
    @HttpCode(204)
    async editUser(@Param('id') id: string, @Body() user: UserUpdate) {
        this.IdentityService.edit(id, user)
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id : string) {
        this.IdentityService.delete(id);
    }

}

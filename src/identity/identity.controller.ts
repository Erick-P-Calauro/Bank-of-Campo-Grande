import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IdentityService } from './identity.service';
import { UserRequest, UserUpdate } from './dto/UserRequest';
import { UserMapper } from './dto/UserMapper';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../auth/roles';
import { Public, Roles } from 'src/utils/global.decorators';

@Controller('/identity/user')
export class IdentityController {
  constructor(private IdentityService: IdentityService) {}

  @Public()
  @Post('')
  @ApiBody({ type: UserRequest })
  @HttpCode(201)
  public async saveRegularUser(@Body() user: UserRequest) {
    const encripted_pass = await bcrypt.hash(
      user.user_password,
      await bcrypt.genSalt(),
    );
    const created_at = new Date(Date.now());

    const userToInsert = UserMapper.toUserSaveDto(
      user,
      encripted_pass,
      created_at,
      UserRole.client,
    );
    const userResponse = await this.IdentityService.save(userToInsert);

    return UserMapper.toUserResponseDto(userResponse);
  }

  @Post(':id/promote')
  @Roles(UserRole.manager)
  @HttpCode(204)
  public async promoteToManager(@Param('id') id: string) {
    const user = await this.IdentityService.findById(id);
    user.user_role = UserRole.manager.toString();

    await this.IdentityService.edit(id, user);
  }

  @Get('')
  @Roles(UserRole.manager)
  @HttpCode(200)
  public async findUsers() {
    return (await this.IdentityService.findAll()).map((user) =>
      UserMapper.toUserResponseDto(user),
    );
  }

  @Get(':id')
  @Roles(UserRole.client)
  @HttpCode(200)
  public async getUserById(@Param('id') id: string) {
    return UserMapper.toUserResponseDto(
      await this.IdentityService.findById(id),
    );
  }

  @Patch(':id')
  @Roles(UserRole.client)
  @HttpCode(204)
  public async editUser(@Param('id') id: string, @Body() user: UserUpdate) {
    const encripted_pass = user.user_password
      ? await bcrypt.hash(user.user_password, await bcrypt.genSalt())
      : undefined;
    const userToUpdate = UserMapper.toUpdateUserSaveDto(user, encripted_pass);

    await this.IdentityService.edit(id, userToUpdate);
  }

  @Delete(':id')
  @Roles(UserRole.client)
  @HttpCode(204)
  public async deleteUser(@Param('id') id: string) {
    await this.IdentityService.delete(id);
  }
}

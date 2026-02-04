import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserListQueryDto } from './dto/userListQuery.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of users with search and pagination' })
  @ApiQuery({ name: 'query', required: false, type: String, example: 'john' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  list(@Query() dto: UserListQueryDto) {
    return this.userService.list(dto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile data' })
  profile() {
    return this.userService.findOne(1);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Get one user by ID' })
  @ApiParam({ name: 'id', type: Number, example: 5, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  detail(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update user (full replace)' })
  @ApiParam({ name: 'id', type: Number, example: 5 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Body() data: UpdateUserDto, @Param('id') id: number) {
    return this.userService.update(data, id);
  }

  @Patch('addAdmin/:id/:state')
  @ApiOperation({ summary: 'Set or remove admin role for a user' })
  @ApiParam({ name: 'id', type: Number, example: 5, description: 'User ID' })
  @ApiParam({
    name: 'state',
    type: Boolean,
    example: true,
    description: 'true = make admin, false = remove admin',
  })
  @ApiResponse({ status: 200, description: 'Admin status updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  addAdmin(@Param('id') id: number, @Param('state') state: boolean) {
    return this.userService.addAdmin(id, state);
  }
}
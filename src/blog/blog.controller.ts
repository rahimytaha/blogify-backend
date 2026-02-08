import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/createBlog.dto';

@ApiTags('Blogs') 
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'List of all blogs returned' })
  list() {
    return this.blogService.list();
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Get one blog post by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Blog ID' })
  @ApiResponse({ status: 200, description: 'Blog post found' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'Blog created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Blog ID' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  update(@Param('id') id: number, @Body() dto: CreateBlogDto) {
    return this.blogService.update(dto, id);
  }
}
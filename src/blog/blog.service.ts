import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from 'src/entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/createBlog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {
  }
  async list(): Promise<BlogEntity[]> {
    const data = await this.blogRepository.find();
    return data;
  }
  async listOfTitles(): Promise<string[]> {
    const data = await this.blogRepository.find({ select: { title: true } });
    return data.map(e=>e.title)
  }
  async findOne(id: number, setSeen: boolean = true): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException('blog not found');
    setSeen && (await this.view(blog));
    return blog;
  }
  async view(blog: BlogEntity) {
    blog['viewsCount'] = blog.viewsCount + 1;
    await blog.save();
  }
  async create(data: CreateBlogDto): Promise<BlogEntity> {
    const newBlog = this.blogRepository.create(data);
    await newBlog.save();
    return newBlog;
  }
  async update(data: CreateBlogDto, id: number): Promise<BlogEntity> {
    const blog = await this.findOne(id, false);
    Object.assign(blog, data);
    return blog;
  }
}

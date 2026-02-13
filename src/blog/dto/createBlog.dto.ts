import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { EBlogStatus } from 'src/entities/blog.entity';

export class CreateBlogDto {
  @ApiProperty({
    example: 'My First Blog Post',
    description: 'Title of the blog',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty({
    example: 'my-first-blog-post',
    description: 'Unique slug for URL (auto-generated if empty)',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase().replace(/\s+/g, '-'))
  slug?: string;

  @ApiProperty({
    example: 'Full content of the blog post here...',
    description: 'Main content (markdown or HTML)',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'reading time of blog',
    example:0
  })
  @IsNumber()
  @IsNotEmpty()
  readingTime: number;

  @ApiPropertyOptional({
    example: 'Short summary of the post (shown in list)',
    description: 'Excerpt (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Transform(({ value }) => value?.trim())
  excerpt?: string;

  @ApiProperty({
    example: 'DRAFT',
    description: 'Blog status',
    enum: EBlogStatus,
  })
  @IsEnum(EBlogStatus)
  @IsNotEmpty()
  status: EBlogStatus;

  @ApiPropertyOptional({
    example: '2025-03-15T10:00:00Z',
    description: 'When the post should be published (optional)',
  })
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Cover image URL',
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Show this post as featured',
  })
  @IsOptional()
  isFeatured?: boolean;
}

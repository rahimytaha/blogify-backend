import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { EBlogStatus } from 'src/entities/blog.entity';


export class UpdateBlogDto {
  @ApiPropertyOptional({
    example: 'Updated Title',
    description: 'New title (optional)',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  title?: string;

  @ApiPropertyOptional({
    example: 'updated-blog-slug',
    description: 'New slug (optional)',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim().toLowerCase().replace(/\s+/g, '-'))
  slug?: string;

  @ApiPropertyOptional({
    description: 'New content (optional)',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: 'Updated short description...',
    description: 'New excerpt (optional)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Transform(({ value }) => value?.trim())
  excerpt?: string;

  @ApiPropertyOptional({
    example: 'PUBLISHED',
    description: 'Change status (optional)',
    enum: EBlogStatus,
  })
  @IsOptional()
  @IsEnum(EBlogStatus)
  status?: EBlogStatus;

  @ApiPropertyOptional({
    example: '2025-04-01T12:00:00Z',
    description: 'New publish date (optional)',
  })
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional({
    example: 'https://new-image.com/cover.jpg',
    description: 'New cover image URL (optional)',
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Mark as featured (optional)',
  })
  @IsOptional()
  isFeatured?: boolean;
}
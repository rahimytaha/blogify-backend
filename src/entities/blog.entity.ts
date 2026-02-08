import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { UserEntity } from './user.entity';
enum EBlogStatus {
  draft = 'DRAFT',
  published = 'PUBLISHED',
  private = 'PRIVATE',
}
@Entity('blog')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({ nullable: true, length: 300 })
  excerpt?: string;

  @ManyToOne(() => UserEntity,(e)=>e.blogs)
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @Column({ default: EBlogStatus.draft, enum: EBlogStatus ,type:"enum"})
  status: EBlogStatus;
  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date;

  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  coverImage?: string;
}

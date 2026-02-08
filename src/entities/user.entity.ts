import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BlogEntity } from './blog.entity';

@Entity('userEntity')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({ default: false, type: 'boolean' })
  isAdmin: boolean;
  @OneToMany(()=>BlogEntity,(e)=>e.author)
  blogs:BlogEntity[]
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

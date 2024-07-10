import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';

  @Entity()
export class Enrollement {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
    @Column({ default: false })
    price: number;
  
    @Column({ default: false })
    isExpired: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
}

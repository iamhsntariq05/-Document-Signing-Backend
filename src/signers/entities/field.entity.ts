import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Signer } from './signer.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; 

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  page: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Signer, (signer) => signer.fields)
  signer: Signer;

  @Column({ nullable: true })
  value: string;

  @Column({ default: false })
  signed: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Signer } from './signer.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // 'signature' | 'date' | 'initials' | 'text'

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  page: number;

  @ManyToOne(() => Signer, (signer) => signer.fields)
  signer: Signer;
}

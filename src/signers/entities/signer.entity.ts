import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Field } from './field.entity';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'src/documents/entities/document.entity';


@Entity()
export class Signer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Field, (field) => field.signer, { cascade: true })
  fields: Field[];

  @Column({ unique: true, default: () => `'${uuidv4()}'` })
  signingToken: string;

  @ManyToOne(() => Document, (document : any) => document.signers, { onDelete: 'CASCADE' })
  document: Document; 
}

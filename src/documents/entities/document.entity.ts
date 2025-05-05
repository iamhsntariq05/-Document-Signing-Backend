import { Signer } from 'src/signers/entities/signer.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadedAt: Date;

  @OneToMany(() => Signer, (signer) => signer.document, { cascade: true })
  signers: Signer[];
}

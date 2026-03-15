import { UserRole } from 'src/auth/roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  user_name: string;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  user_login: string;

  @Column({ type: 'text', nullable: false })
  user_password: string;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  user_cpf: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  user_phone: string | undefined;

  @Column({ type: 'varchar', length: 60, nullable: true })
  user_email: string | undefined;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.client })
  user_role: string;
}

import { UserInterface } from './user.interface';
import { EmailVo } from './value-objects/email.vo';

export class UserEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly password: string;
  private readonly username: string;
  private readonly email: EmailVo;

  constructor({id, name, password, username, email}: UserInterface) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.username = username;
    this.email = new EmailVo(email);
  }
}
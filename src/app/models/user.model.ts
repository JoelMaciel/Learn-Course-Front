import { v4 as uuidv4 } from 'uuid';
import { Role } from './role.models';
import { RoleType } from './roleType.enum';

export class User {
  userId: string | undefined;
  username: string = '';
  fullName: string = '';
  cpf: string = '';
  password: string = '';
  email: string = '';
  phoneNumber: string = '';
  token: string = '';
  roles: Role[] = [];
  sub: string = '';

  constructor() {
    this.userId = uuidv4();
  }
}

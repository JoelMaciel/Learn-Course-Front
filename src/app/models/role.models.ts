import { v4 as uuidv4 } from 'uuid';
import { RoleType } from './roleType.enum';

export class Role {
  roleId: string | undefined;
  roleName: RoleType[] = [];

   constructor() {
    this.roleId = uuidv4();
  }
}

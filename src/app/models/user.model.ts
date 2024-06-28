import {Role} from "./role.enum"
import { v4 as uuidv4 } from 'uuid';

export class User {
  userId: string | undefined;
  username: string = "";
  fullName: string = "";
  cpf: string = "";
  password: string = "";
  email: string = "";
  phoneNumber: string = "";
  token: string = "";
  role: Role = Role.STUDENT;

  constructor() {
    this.userId = uuidv4();
  }
}

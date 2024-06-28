import { v4 as uuidv4 } from 'uuid';

export class Course {
  courseId: string | undefined;
  title: string = "";
  subtitle: string = "";
  price: number = 0.0;
  creationDate: Date = new Date();

   constructor() {
    this.courseId = uuidv4();
  }
}

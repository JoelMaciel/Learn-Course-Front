export class Course {
  id: number | undefined;
  userId: number | undefined;
  courseId: number | undefined;
  title: string = '';
  price: number | undefined;
  orderDate: Date = new Date();

  constructor(
    userId?: number,
    courseId?: number,
    title: string = '',
    price?: number,
  ) {
    this.userId = userId;
    this.courseId = courseId;
    this.title = title;
    this.price = price;
  }
}

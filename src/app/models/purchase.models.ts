export class Purchase {
  id: string | undefined;
  userId: string | undefined;
  courseId: string | undefined;
  title: string = '';
  price: number | undefined;
  orderDate: Date | undefined;

  constructor(
    userId?: string,
    courseId?: string,
    title: string = '',
    price?: number,
    orderDate?: Date,
  ) {
    this.courseId = courseId;
    this.title = title;
    this.price = price;
    this.orderDate = orderDate;
  }
}

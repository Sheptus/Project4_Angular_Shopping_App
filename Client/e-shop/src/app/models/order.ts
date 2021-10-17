/* -------------------------------------------------------------------------- */
/*                                 Order Model                                */
/* -------------------------------------------------------------------------- */

export class Order {
  _id?: string;
  cart?: object;
  user?: string;
  city: string;
  price: number;
  dateOfOrder: string;
  card: string;
}

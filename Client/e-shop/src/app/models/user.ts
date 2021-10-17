/* -------------------------------------------------------------------------- */
/*                                 user Model                                 */
/* -------------------------------------------------------------------------- */
import { Role } from './role';

export class User {
  name: string;
  password: string;
  email: string;
  lastName: string;
  id: number;
  city: string;
  street: string;
  role: Role;
}

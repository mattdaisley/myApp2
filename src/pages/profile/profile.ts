export class Profile {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  notifications: boolean = true;
  vibrate: boolean = true;
  sound: boolean = true;
}
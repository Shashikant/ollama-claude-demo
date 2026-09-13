export interface UserProfile {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  zipCode?: string;
}

export interface UserData {
  [key: string]: UserProfile;
}

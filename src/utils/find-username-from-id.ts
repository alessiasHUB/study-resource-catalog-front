import { IUserData } from "./interfaces";

export default function findUsernameFromID(
  id: number,
  userArr: IUserData[]
): string | undefined {
  for (const row of userArr) {
    if (row.id === id) {
      return row.username;
    }
  }
}

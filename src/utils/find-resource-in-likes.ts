import { ILikesData } from "./interfaces";

export default function findResourceInLikes(
  id: number,
  userLikes: ILikesData[]
): false | "like" | "dislike" {
  for (const row of userLikes) {
    if (row.resource_id === id) {
      if (row.liked) {
        return "like";
      } else {
        return "dislike";
      }
    }
  }
  return false;
}

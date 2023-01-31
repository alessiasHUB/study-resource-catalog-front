import findResourceInLikes from "../utils/find-resource-in-likes";

const userLikesTestArr = [
  {
    id: 0,
    resource_id: 1,
    user_id: 1,
    liked: true,
  },
  {
    id: 1,
    resource_id: 2,
    user_id: 3,
    liked: true,
  },
  {
    id: 2,
    resource_id: 3,
    user_id: 3,
    liked: false,
  },
];

test("likes from resource", () => {
  expect(findResourceInLikes(1, userLikesTestArr)).toBe("like");
  expect(findResourceInLikes(3, userLikesTestArr)).toBe("dislike");
  expect(findResourceInLikes(100, userLikesTestArr)).toBe(false);
});

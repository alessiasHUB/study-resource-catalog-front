import { ITypes } from "./interfaces";

//hey TS! WE only want to deal with resourceTypes
export type ResourceType = keyof ITypes;

// export const typesArr: ResourceType[] = [
//   "video",
//   "article",
//   "eBook",
//   "podcast",
//   "exercise",
//   "exercise set",
//   "software tool",
//   "course",
//   "diagram",
//   "cheat-sheet",
//   "reference",
//   "resource list",
//   "youtube channel",
//   "organisation",
// ];

export const typesArr: ResourceType[] = [
  "video",
  "article",
  "eBook",
  "podcast",
  "exercise",
  "exercise_set",
  "software_tool",
  "course",
  "diagram",
  "cheat_sheet",
  "reference",
  "resource_list",
  "youtube_channel",
  "organisation",
];

//Add presentable ResourceType

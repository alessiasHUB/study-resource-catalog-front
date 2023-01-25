interface IUserData {
  id: number;
  username: string;
  isFaculty: boolean;
}

interface IResourceData {
  description: string;
  dislikes: number;
  id: number;
  likes: number;
  link: string;
  post_date: Date;
  tags: string[];
  title: string;
  type: string;
  usage: string;
  user_id: number;
}
interface INewResourceData {
  description: string;
  link: string;
  tags: string[];
  title: string;
  type: string;
  usage: string;
}

interface ICommentData {
  id: number;
  resource_id: number;
  user_id: number;
  text: string;
  post_date: Date;
}

interface ILikesData {
  id: number;
  resource_id: number;
  user_id: number;
  liked: boolean;
}

interface IStudyListData {
  id: number;
  resource_id: number;
  user_id: number;
  post_date: Date;
}

interface ITypes {
  video: boolean;
  article: boolean;
  eBook: boolean;
  podcast: boolean;
  exercise: boolean;
  exercise_set: boolean;
  software_tool: boolean;
  course: boolean;
  diagram: boolean;
  cheat_sheet: boolean;
  reference: boolean;
  resource_list: boolean;
  youtube_channel: boolean;
  organisation: boolean;
}

export type {
  IUserData,
  IResourceData,
  ICommentData,
  ILikesData,
  IStudyListData,
  INewResourceData,
  ITypes,
};

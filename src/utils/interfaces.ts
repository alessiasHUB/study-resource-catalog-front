//rename as userDataI to signal userdata as interface
export interface userData {
  id: number;
  username: string;
  isFaculty: boolean;
}
//you should se me now
export interface resourceDataI {
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

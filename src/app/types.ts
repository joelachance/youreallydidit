export interface Post {
    id: number;
    content: string;
    createdAt: Date;
    userId: number;
    workPost: boolean;
  }
  
  export interface UserData {
    id?: number;
    email: string | null;
    name: string;
    posts?: Array<Post> | null;
  }
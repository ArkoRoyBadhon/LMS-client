export interface IEnrollmentData {
  _id: string;
  user: string;
  course: ICourse;
  status: "active" | "inactive";
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isCompleted: boolean;
  nextVideoToUnlock: string | null;
  accessibleVideos: string[];
}

export interface ICourse2 {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  modules: IModule[];
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  modules: IModule[];
}

export interface IModule {
  _id: string;
  title: string;
  position: number;
  isPublished: boolean;
  lectures: ILecture[];
}

export interface ILecture {
  _id: string;
  title: string;
  video_url: string;
  pdf_urls: string[];
  position: number;
  isFreePreview: boolean;
  isPublished: boolean;
}


export interface IEnrollment {
  _id: string;
  user: string;
  course: ICourse2;
  status: string;
  accessibleVideos: string[];
  isCompleted: boolean;
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
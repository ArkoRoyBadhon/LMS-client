
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
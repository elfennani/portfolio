
export interface DescriptionMetadata {
  heading: string;
  resume: string;
  photo: string;
}

export interface ProjectMetadata {
  title: string;
  created: Date;
  thumbnail: string;
}

export interface Markdown<T> {
  metadata: T;
  content: string;
}
import { Author } from "./Author";

export enum SubmissionType {
    POSTER = 'POSTER',
    ORAL = 'ORAL',
    OTHER = 'OTHER',
  }
  
  export interface Submission {
    id: number;
    customId: string;
    title: string;
    abstractText: string;
    keywords: string;
    submissionState: string;
    submissionDate: string;
    paper: string;
    authors: Author[];
    submissionType: SubmissionType;
    admin_id: number;
    paymentFileName: string;
    paymentStatus: string;
  }
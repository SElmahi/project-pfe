import { Author } from "./Author";

export enum SubmissionType {
    POSTER = 'POSTER',
    ORAL = 'ORAL',
    OTHER = 'OTHER',
  }
  export enum SubmissionStatus {
    POSTER = 'REJECETED',
    ORAL = 'ACCEPTED',
    OTHER = 'OTHER',
  }
  export interface Submission {
    id: number;
    customId: string;
    title: string;
    abstractText: string;
    keywords: string;
    submissionStatus: SubmissionStatus;
    submissionDate: string;
    paper: string;
    authors: Author[];
    submissionType: SubmissionType;
    admin_id: number;
    paymentFileName: string;
    paymentStatus: string;
  }
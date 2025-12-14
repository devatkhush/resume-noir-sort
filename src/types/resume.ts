export interface Resume {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  status: 'pending' | 'processing' | 'classified' | 'error';
  jobRole?: string;
  confidence?: number;
  skills?: string[];
  experience?: string;
  error?: string;
}

export type JobRole = 
  | 'Software Engineer'
  | 'Data Scientist'
  | 'Product Manager'
  | 'UX Designer'
  | 'DevOps Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Machine Learning Engineer'
  | 'Data Analyst'
  | 'Project Manager'
  | 'Business Analyst'
  | 'Quality Assurance'
  | 'Mobile Developer'
  | 'Cloud Engineer'
  | 'Security Engineer'
  | 'Other';

export const JOB_ROLES: JobRole[] = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Machine Learning Engineer',
  'Data Analyst',
  'Project Manager',
  'Business Analyst',
  'Quality Assurance',
  'Mobile Developer',
  'Cloud Engineer',
  'Security Engineer',
  'Other',
];

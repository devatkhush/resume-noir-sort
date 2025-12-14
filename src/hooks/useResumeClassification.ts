import { useState, useCallback } from 'react';
import type { Resume, JobRole } from '@/types/resume';
import { JOB_ROLES } from '@/types/resume';

// Simulated classification - in production this would call Lovable Cloud
const simulateClassification = async (file: File): Promise<Partial<Resume>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
  
  // Simulate random classification results
  const randomRole = JOB_ROLES[Math.floor(Math.random() * (JOB_ROLES.length - 1))];
  const confidence = 0.7 + Math.random() * 0.28;
  
  const skillSets: Record<string, string[]> = {
    'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
    'Data Scientist': ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
    'Product Manager': ['Agile', 'Scrum', 'Roadmapping', 'Analytics', 'User Research'],
    'UX Designer': ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'UI/UX'],
    'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    'Frontend Developer': ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    'Backend Developer': ['Node.js', 'Python', 'PostgreSQL', 'APIs', 'Microservices'],
    'Full Stack Developer': ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    'Machine Learning Engineer': ['PyTorch', 'TensorFlow', 'Python', 'MLOps', 'Deep Learning'],
    'Data Analyst': ['SQL', 'Excel', 'Tableau', 'Python', 'Power BI'],
    'Project Manager': ['PMP', 'Agile', 'Risk Management', 'Budgeting', 'Stakeholder Management'],
    'Business Analyst': ['SQL', 'Requirements', 'Process Mapping', 'Jira', 'Documentation'],
    'Quality Assurance': ['Selenium', 'Testing', 'Automation', 'JIRA', 'Agile'],
    'Mobile Developer': ['React Native', 'Swift', 'Kotlin', 'Flutter', 'iOS/Android'],
    'Cloud Engineer': ['AWS', 'Azure', 'GCP', 'Networking', 'Security'],
    'Security Engineer': ['Penetration Testing', 'SIEM', 'Compliance', 'Encryption', 'IAM'],
    'Other': ['Communication', 'Problem Solving', 'Leadership', 'Teamwork'],
  };

  return {
    jobRole: randomRole,
    confidence,
    skills: skillSets[randomRole] || skillSets['Other'],
    status: 'classified',
  };
};

export function useResumeClassification() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = useCallback(async (files: File[]) => {
    setIsProcessing(true);

    // Create pending resumes
    const newResumes: Resume[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
      status: 'pending',
    }));

    setResumes(prev => [...newResumes, ...prev]);

    // Process each file
    for (const resume of newResumes) {
      // Update to processing
      setResumes(prev => 
        prev.map(r => r.id === resume.id ? { ...r, status: 'processing' } : r)
      );

      try {
        const file = files.find(f => f.name === resume.fileName);
        if (!file) throw new Error('File not found');

        const result = await simulateClassification(file);
        
        setResumes(prev =>
          prev.map(r => r.id === resume.id ? { ...r, ...result, status: 'classified' } : r)
        );
      } catch (error) {
        setResumes(prev =>
          prev.map(r => r.id === resume.id ? { 
            ...r, 
            status: 'error',
            error: error instanceof Error ? error.message : 'Classification failed'
          } : r)
        );
      }
    }

    setIsProcessing(false);
  }, []);

  const deleteResume = useCallback((id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setResumes([]);
  }, []);

  return {
    resumes,
    isProcessing,
    processFiles,
    deleteResume,
    clearAll,
  };
}

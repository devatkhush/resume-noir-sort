import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { UploadZone } from '@/components/UploadZone';
import { Dashboard } from '@/components/Dashboard';
import { useResumeClassification } from '@/hooks/useResumeClassification';

const Index = () => {
  const { resumes, isProcessing, processFiles, deleteResume } = useResumeClassification();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        <section className="container py-16 space-y-16">
          <div className="max-w-2xl mx-auto">
            <UploadZone 
              onFilesSelected={processFiles} 
              isProcessing={isProcessing} 
            />
          </div>

          {resumes.length > 0 && (
            <Dashboard 
              resumes={resumes} 
              onDeleteResume={deleteResume} 
            />
          )}
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 ResumeAI. Intelligent Resume Classification.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

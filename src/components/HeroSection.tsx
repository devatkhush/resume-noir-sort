import { ArrowDown, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-sm mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Classification</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Classify Resumes
            <br />
            <span className="text-muted-foreground">Intelligently</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
            Upload hundreds of resumes at once. Our AI instantly categorizes them by job role, 
            skills, and experience level. Save hours of manual screening.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Button variant="hero" asChild>
              <a href="#upload">
                Get Started
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Instant Classification</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>95% Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

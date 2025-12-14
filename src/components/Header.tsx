import { FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">ResumeAI</h1>
            <p className="text-xs text-muted-foreground">Intelligent Classification</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#upload" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Upload
          </a>
          <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#analytics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </a>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            <a href="#upload" className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Upload
            </a>
            <a href="#dashboard" className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="#analytics" className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

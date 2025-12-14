import { FileText, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Resume } from '@/types/resume';

interface ResumeCardProps {
  resume: Resume;
  onDelete?: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const statusIcon = {
    pending: <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />,
    processing: <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />,
    classified: <CheckCircle className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-destructive" />,
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={cn(
      "group relative p-4 rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg hover:border-primary/20",
      resume.status === 'processing' && "animate-pulse-subtle"
    )}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {statusIcon[resume.status]}
            <h4 className="text-sm font-medium truncate">{resume.fileName}</h4>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <span>{formatFileSize(resume.fileSize)}</span>
            <span>•</span>
            <span>{formatDate(resume.uploadedAt)}</span>
          </div>

          {resume.status === 'classified' && resume.jobRole && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="font-medium">
                  {resume.jobRole}
                </Badge>
                {resume.confidence && (
                  <span className="text-xs text-muted-foreground">
                    {(resume.confidence * 100).toFixed(0)}% confidence
                  </span>
                )}
              </div>

              {resume.skills && resume.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {resume.skills.slice(0, 4).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {resume.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{resume.skills.length - 4}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}

          {resume.status === 'error' && resume.error && (
            <p className="text-xs text-destructive">{resume.error}</p>
          )}

          {resume.status === 'processing' && (
            <p className="text-xs text-muted-foreground">Analyzing resume...</p>
          )}
        </div>

        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(resume.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

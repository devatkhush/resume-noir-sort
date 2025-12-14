import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, FileText, Users, Briefcase, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ResumeCard } from './ResumeCard';
import { cn } from '@/lib/utils';
import type { Resume, JobRole } from '@/types/resume';
import { JOB_ROLES } from '@/types/resume';

interface DashboardProps {
  resumes: Resume[];
  onDeleteResume: (id: string) => void;
}

export function Dashboard({ resumes, onDeleteResume }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<JobRole | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stats = useMemo(() => {
    const classified = resumes.filter(r => r.status === 'classified');
    const roles = classified.reduce((acc, r) => {
      if (r.jobRole) {
        acc[r.jobRole] = (acc[r.jobRole] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topRole = Object.entries(roles).sort((a, b) => b[1] - a[1])[0];

    return {
      total: resumes.length,
      classified: classified.length,
      processing: resumes.filter(r => r.status === 'processing').length,
      topRole: topRole ? topRole[0] : 'N/A',
      roleDistribution: roles,
    };
  }, [resumes]);

  const filteredResumes = useMemo(() => {
    return resumes.filter(resume => {
      const matchesSearch = resume.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.jobRole?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resume.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRole = selectedRole === 'All' || resume.jobRole === selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }, [resumes, searchQuery, selectedRole]);

  const activeRoles = useMemo(() => {
    const roles = new Set<JobRole>();
    resumes.forEach(r => {
      if (r.jobRole) roles.add(r.jobRole as JobRole);
    });
    return Array.from(roles);
  }, [resumes]);

  return (
    <div id="dashboard" className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Resumes</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.classified}</p>
          <p className="text-sm text-muted-foreground">Classified</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold">{Object.keys(stats.roleDistribution).length}</p>
          <p className="text-sm text-muted-foreground">Job Roles</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold truncate text-lg">{stats.topRole}</p>
          <p className="text-sm text-muted-foreground">Top Role</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes, roles, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Role Filters */}
      {activeRoles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedRole === 'All' ? 'default' : 'secondary'}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedRole('All')}
          >
            All Roles
          </Badge>
          {activeRoles.map(role => (
            <Badge
              key={role}
              variant={selectedRole === role ? 'default' : 'secondary'}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedRole(role)}
            >
              {role} ({stats.roleDistribution[role] || 0})
            </Badge>
          ))}
        </div>
      )}

      {/* Resume Grid */}
      {filteredResumes.length > 0 ? (
        <div className={cn(
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-3"
        )}>
          {filteredResumes.map((resume, index) => (
            <div
              key={resume.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ResumeCard resume={resume} onDelete={onDeleteResume} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No resumes found</h3>
          <p className="text-muted-foreground">
            {resumes.length === 0
              ? 'Upload some resumes to get started'
              : 'Try adjusting your search or filters'}
          </p>
        </div>
      )}
    </div>
  );
}

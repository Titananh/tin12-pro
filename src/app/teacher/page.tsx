// ==========================================
// Teacher Dashboard - Tin12 Pro Cánh Diều
// Class overview, student roster, assignments, progress, analytics
// ==========================================
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  mockTeacher,
  mockClasses,
  getStudentsByClass,
  getAssignmentsByClass,
  getLabSubmissionsByClass,
} from '@/content/teacher-data';
import {
  getClassSummary,
  getStudentAnalytics,
  getStudentsNeedingAttention,
  getExamReadinessForClass,
  getTopicAnalyticsForClass,
  generateStudentReportCard,
  exportClassReportCSV,
  StudentAnalytics,
} from '@/lib/teacher-analytics';

// ============ ICONS (inline SVG) ============
const IconOverview = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const IconStudents = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const IconAssignments = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconLabs = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-3.5 1.424c-.77.308-1.67-.163-1.67-.978l-.353-.673a1.125 1.125 0 00-.578-.392l-2.46-1.394a1.125 1.125 0 00-.678.003l-2.46 1.394c-.77.308-1.67-.163-1.67-.978l-.353.673a1.125 1.125 0 00-.578.392l-2.46 1.394a1.125 1.125 0 00-.678.003L5 14.5" />
  </svg>
);

const IconAnalytics = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 14.496 6.996 15 6.375 15h-2.25a1.125 1.125 0 01-1.125-1.125v-6.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125v13.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0112 17.25v-13.125h3.75z" />
  </svg>
);

const IconReports = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconWarning = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 3.376c-.866 1.5.217 3.374 1.948 3.374h1.307zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconTrendUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconUser = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const IconDownload = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

// ============ TYPES ============
type TabType = 'overview' | 'students' | 'assignments' | 'labs' | 'analytics' | 'reports';

interface StudentDetailModal {
  studentId: string;
  analytics: StudentAnalytics;
  reportCard: ReturnType<typeof generateStudentReportCard>;
}

// ============ COMPONENT ============
export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedClassId, setSelectedClassId] = useState<string>(mockClasses[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentModal, setStudentModal] = useState<StudentDetailModal | null>(null);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <IconOverview /> },
    { id: 'students', label: 'Students', icon: <IconStudents /> },
    { id: 'assignments', label: 'Assignments', icon: <IconAssignments /> },
    { id: 'labs', label: 'Labs', icon: <IconLabs /> },
    { id: 'analytics', label: 'Analytics', icon: <IconAnalytics /> },
    { id: 'reports', label: 'Reports', icon: <IconReports /> },
  ];

  const selectedClass = mockClasses.find(c => c.id === selectedClassId);
  const classSummary = selectedClassId ? getClassSummary(selectedClassId) : null;
  const students = selectedClassId ? getStudentsByClass(selectedClassId) : [];
  const assignments = selectedClassId ? getAssignmentsByClass(selectedClassId) : [];
  const labSubmissions = selectedClassId ? getLabSubmissionsByClass(selectedClassId) : [];
  const examReadiness = selectedClassId ? getExamReadinessForClass(selectedClassId) : null;
  const topicAnalytics = selectedClassId ? getTopicAnalyticsForClass(selectedClassId) : [];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleStudentClick(studentId: string) {
    const analytics = getStudentAnalytics(studentId);
    const reportCard = generateStudentReportCard(studentId);
    if (analytics) {
      setStudentModal({ studentId, analytics, reportCard });
    }
  }

  function handleExportClassReport() {
    const csv = exportClassReportCSV(selectedClassId);
    if (csv) {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${selectedClass?.name || 'class'}-${Date.now()}.csv`;
      a.click();
    }
  }

  function getMasteryColor(score: number): string {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-cyan-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  }

  

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <IconUser />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>
              <p className="text-sm text-slate-400">Welcome, {mockTeacher.name}. Manage your class and track student progress.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Selected Class</span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
              >
                {mockClasses.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.studentCount} students)</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Class Selector Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {mockClasses.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedClassId(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedClassId === c.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {c.name} - {c.studentCount} students
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW TAB ============ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Students</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <IconStudents />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{selectedClass?.studentCount || 0}</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Mastery</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <IconTrendUp />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{classSummary?.avgMastery || 0}%</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Today</span>
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <IconOverview />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{classSummary?.activeToday || 0}</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Exam Ready</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <IconAnalytics />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{examReadiness?.readinessScore || 0}%</div>
              </Card>
            </div>

            {/* Weak Topics Alert */}
            {classSummary && classSummary.weakTopics.length > 0 && (
              <Card className="p-5 border-amber-500/20 bg-amber-500/5">
                <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <IconWarning />
                  Topics Needing Improvement
                </h3>
                <div className="flex flex-wrap gap-2">
                  {classSummary.weakTopics.map(topic => (
                    <span key={topic} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs border border-amber-500/30">
                      {topic}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Students needing attention */}
            <Card className="p-5 bg-slate-900/50 border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Students Needing Attention</h3>
              {(() => {
                const needsAttention = getStudentsNeedingAttention(selectedClassId);
                if (needsAttention.length === 0) {
                  return <p className="text-slate-400 text-sm">All students are progressing well.</p>;
                }
                return (
                  <div className="space-y-3">
                    {needsAttention.slice(0, 5).map(s => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div
                            role="img"
                            aria-label={s.name}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-300 font-medium text-sm"
                          >
                            {s.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-slate-200">{s.name}</div>
                            <div className="text-xs text-slate-500">
                              {s.streak === 0 ? 'Streak broken' : `Streak: ${s.streak} days`}
                              {' - '}
                              {Object.values(s.mastery).reduce((a, b) => a + b, 0) / Object.values(s.mastery).length < 50 ? 'Low mastery' : 'Low activity'}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => handleStudentClick(s.id)}>
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>

            {/* Recent Activity */}
            <Card className="p-5 bg-slate-900/50 border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Recent Assignments</h3>
              <div className="space-y-3">
                {assignments.slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                        <IconAssignments />
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{a.title}</div>
                        <div className="text-xs text-slate-500">
                          {a.submissions}/{a.totalStudents} submitted - Due: {a.dueDate}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      a.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      a.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {a.status === 'active' ? 'Active' : a.status === 'draft' ? 'Draft' : 'Completed'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ============ STUDENTS TAB ============ */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm"
              />
            </div>

            {/* Student Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map(student => {
                const masteryAvg = Math.round(
                  Object.values(student.mastery).reduce((a, b) => a + b, 0) / Object.values(student.mastery).length
                );
                return (
                  <Card
                    key={student.id}
                    hover
                    className="p-5 cursor-pointer bg-slate-900/50 border-slate-800"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        role="img"
                        aria-label={student.name}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 font-semibold"
                      >
                        {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-200 truncate">{student.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20">Lv.{student.level}</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            {student.streak}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-300">{student.completedLessons}/{student.totalLessons} lessons</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-cyan-500 rounded-full h-2 transition-all"
                          style={{ width: `${(student.completedLessons / student.totalLessons) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Quiz Avg</span>
                        <span className={getMasteryColor(student.quizAverage)}>{student.quizAverage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Mastery</span>
                        <span className={getMasteryColor(masteryAvg)}>{masteryAvg}%</span>
                      </div>
                    </div>

                    {student.weakTopics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {student.weakTopics.slice(0, 2).map(topic => (
                          <span key={topic} className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                            {topic}
                          </span>
                        ))}
                        {student.weakTopics.length > 2 && (
                          <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-500">
                            +{student.weakTopics.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ ASSIGNMENTS TAB ============ */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Assignment List</h3>
              <Button variant="primary" size="sm">
                <IconPlus />
                Create Assignment
              </Button>
            </div>

            <Card className="p-0 overflow-hidden bg-slate-900/50 border-slate-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Assignment</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Type</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Due Date</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Submitted</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {assignments.map(a => (
                    <tr key={a.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-medium text-slate-200">{a.title}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400 capitalize border border-slate-700">{a.type}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{a.dueDate}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-800 rounded-full h-2">
                            <div
                              className="bg-emerald-500 rounded-full h-2"
                              style={{ width: `${(a.submissions / a.totalStudents) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-500">{a.submissions}/{a.totalStudents}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          a.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          a.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}>
                          {a.status === 'active' ? 'Active' : a.status === 'draft' ? 'Draft' : 'Completed'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost">View</Button>
                          <Button size="sm" variant="ghost">Edit</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {/* ============ LABS TAB ============ */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Recent Lab Submissions</h3>

            <Card className="p-0 overflow-hidden bg-slate-900/50 border-slate-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Student</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Lab</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Submitted</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Score</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {labSubmissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-200">{sub.studentName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{sub.labTitle}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {new Date(sub.submittedAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-5 py-4">
                        {sub.score !== undefined ? (
                          <span className={`font-semibold ${getMasteryColor(sub.score)}`}>{sub.score}/100</span>
                        ) : (
                          <span className="text-slate-500">--</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          sub.status === 'graded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          sub.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                        }`}>
                          {sub.status === 'graded' ? 'Graded' : sub.status === 'pending' ? 'Pending' : 'Returned'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="secondary">Grade</Button>
                          <Button size="sm" variant="ghost">Feedback</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {/* ============ ANALYTICS TAB ============ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Topic Mastery */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200 mb-5 uppercase tracking-wider flex items-center gap-2">
                <IconAnalytics />
                Topic Mastery
              </h3>
              <div className="space-y-4">
                {topicAnalytics.map(topic => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300 capitalize">{topic.topic.replace(/-/g, ' ')}</span>
                      <span className={getMasteryColor(topic.classAverage)}>{topic.classAverage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="rounded-full h-3"
                        style={{
                          width: `${topic.classAverage}%`,
                          backgroundColor: topic.classAverage >= 80 ? 'rgba(52, 211, 153, 0.5)' :
                                           topic.classAverage >= 60 ? 'rgba(34, 211, 238, 0.5)' :
                                           topic.classAverage >= 40 ? 'rgba(251, 191, 36, 0.5)' :
                                           'rgba(248, 113, 113, 0.5)'
                        }}
                      />
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600">
                      <span>Excellent: {topic.masteryDistribution.excellent}</span>
                      <span>Good: {topic.masteryDistribution.good}</span>
                      <span>Developing: {topic.masteryDistribution.developing}</span>
                      <span>Beginning: {topic.masteryDistribution.beginning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Exam Readiness */}
            {examReadiness && (
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200 mb-5 uppercase tracking-wider flex items-center gap-2">
                  <IconTrendUp />
                  Exam Readiness
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{examReadiness.readinessScore}%</div>
                    <div className="text-sm text-slate-500">Readiness Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">{examReadiness.topicsCovered}/{examReadiness.totalTopics}</div>
                    <div className="text-sm text-slate-500">Topics Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-400 mb-2">{examReadiness.weakAreas.length}</div>
                    <div className="text-sm text-slate-500">Weak Areas</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                      <IconWarning />
                      Needs Improvement
                    </h4>
                    <div className="space-y-1">
                      {examReadiness.weakAreas.map(area => (
                        <div key={area} className="text-sm text-slate-400">{area}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                      <IconCheck />
                      Strong Areas
                    </h4>
                    <div className="space-y-1">
                      {examReadiness.strongAreas.map(area => (
                        <div key={area} className="text-sm text-slate-400">{area}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h4 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                    <IconArrow />
                    Recommended Actions
                  </h4>
                  <ul className="space-y-2">
                    {examReadiness.recommendedActions.map((action, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">-</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ============ REPORTS TAB ============ */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Reports & Data Export</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Report Card */}
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <IconReports />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Class Report Card</h3>
                    <p className="text-sm text-slate-500">Summary of progress and learning outcomes</p>
                  </div>
                </div>
                <Button variant="primary" className="w-full" onClick={handleExportClassReport}>
                  <IconDownload />
                  Export CSV
                </Button>
              </Card>

              {/* Individual Student Reports */}
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <IconUser />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Individual Student Reports</h3>
                    <p className="text-sm text-slate-500">Print report for each student</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {students.slice(0, 3).map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300">{s.name}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleStudentClick(s.id)}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Exam Readiness Report */}
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <IconAnalytics />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Exam Readiness Analysis</h3>
                    <p className="text-sm text-slate-500">Assess exam preparation level</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  <IconDownload />
                  Download Exam Readiness Report
                </Button>
              </Card>

              {/* Topic Performance */}
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <IconTrendUp />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Topic Performance</h3>
                    <p className="text-sm text-slate-500">Mastery and coverage by topic</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  <IconDownload />
                  Download Topic Analysis
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {studentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setStudentModal(null)}>
          <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {studentModal.reportCard && (
                  <div
                    role="img"
                    aria-label={studentModal.reportCard.student.name}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold"
                  >
                    {studentModal.reportCard.student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {studentModal.reportCard?.student.name || 'Student'}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30">Lv.{studentModal.analytics.level}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      {studentModal.analytics.streak} streak
                    </span>
                    <span>{studentModal.analytics.xp} XP</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setStudentModal(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200">
                <IconX />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-cyan-400">{studentModal.analytics.progress}%</div>
                <div className="text-xs text-slate-500">Progress</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-emerald-400">{studentModal.analytics.quizAverage}%</div>
                <div className="text-xs text-slate-500">Quiz Avg</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="text-2xl font-bold text-violet-400">{studentModal.analytics.masteryScore}%</div>
                <div className="text-xs text-slate-500">Mastery</div>
              </div>
            </div>

            {/* Topic Mastery */}
            {studentModal.reportCard && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Topic Mastery</h3>
                <div className="space-y-2">
                  {studentModal.reportCard.topicMastery.map(tm => (
                    <div key={tm.topic} className="flex items-center gap-3">
                      <span className="text-sm text-slate-400 w-40 truncate capitalize">{tm.topic.replace(/-/g, ' ')}</span>
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full`}
                          style={{
                            width: `${tm.score}%`,
                            backgroundColor: tm.score >= 80 ? 'rgba(52, 211, 153, 0.5)' :
                                             tm.score >= 60 ? 'rgba(34, 211, 238, 0.5)' :
                                             tm.score >= 40 ? 'rgba(251, 191, 36, 0.5)' :
                                             'rgba(248, 113, 113, 0.5)'
                          }}
                        />
                      </div>
                      <span className={`text-sm w-12 text-right ${getMasteryColor(tm.score)}`}>{tm.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {studentModal.analytics.recommendedActions.length > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <IconArrow />
                  Recommendations
                </h3>
                <ul className="space-y-1">
                  {studentModal.analytics.recommendedActions.map((action, i) => (
                    <li key={i} className="text-sm text-slate-400">{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

const IconX = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
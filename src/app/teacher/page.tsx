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

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Tổng quan', icon: '📊' },
    { id: 'students', label: 'Học sinh', icon: '👥' },
    { id: 'assignments', label: 'Bài tập', icon: '📝' },
    { id: 'labs', label: 'Lab', icon: '💻' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'reports', label: 'Báo cáo', icon: '📋' },
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

  function getMasteryBg(score: number): string {
    if (score >= 80) return 'bg-emerald-500/20';
    if (score >= 60) return 'bg-cyan-500/20';
    if (score >= 40) return 'bg-amber-500/20';
    return 'bg-red-500/20';
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">👩‍🏫 Teacher Dashboard</h1>
            <p className="text-slate-400">Xin chào, {mockTeacher.name}! Quản lý lớp học và theo dõi tiến độ học sinh.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-slate-400">Lớp đang chọn</div>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
              >
                {mockClasses.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.studentCount} học sinh)</option>
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
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedClassId === c.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
              }`}
            >
              {c.name} • {c.studentCount} HS
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW TAB ============ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <div className="text-3xl font-bold text-blue-400 mb-1">{selectedClass?.studentCount || 0}</div>
                <div className="text-sm text-slate-400">Học sinh</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{classSummary?.avgMastery || 0}%</div>
                <div className="text-sm text-slate-400">Mastery TB</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-violet-500/10 to-violet-600/5 border-violet-500/20">
                <div className="text-3xl font-bold text-violet-400 mb-1">{classSummary?.activeToday || 0}</div>
                <div className="text-sm text-slate-400">Hoạt động hôm nay</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
                <div className="text-3xl font-bold text-amber-400 mb-1">{examReadiness?.readinessScore || 0}%</div>
                <div className="text-sm text-slate-400">Sẵn sàng thi</div>
              </Card>
            </div>

            {/* Weak Topics Alert */}
            {classSummary && classSummary.weakTopics.length > 0 && (
              <Card className="p-5 border-amber-500/20 bg-amber-500/5">
                <h3 className="text-lg font-semibold text-amber-400 mb-3">⚠️ Chủ đề cần cải thiện</h3>
                <div className="flex flex-wrap gap-2">
                  {classSummary.weakTopics.map(topic => (
                    <span key={topic} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm border border-amber-500/30">
                      {topic}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Students needing attention */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-white mb-4">🚨 Học sinh cần chú ý</h3>
              {(() => {
                const needsAttention = getStudentsNeedingAttention(selectedClassId);
                if (needsAttention.length === 0) {
                  return <p className="text-slate-400">Tất cả học sinh đều tiến triển tốt!</p>;
                }
                return (
                  <div className="space-y-3">
                    {needsAttention.slice(0, 5).map(s => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div
                            role="img"
                            aria-label={s.name}
                            className="w-10 h-10 rounded-full bg-white/10 bg-cover bg-center"
                            style={{ backgroundImage: `url(${s.avatar})` }}
                          />
                          <div>
                            <div className="font-medium text-white">{s.name}</div>
                            <div className="text-xs text-slate-400">
                              {s.streak === 0 ? 'Streak bị gián đoạn' : `Streak: ${s.streak} ngày`}
                              {' • '}
                              {Object.values(s.mastery).reduce((a, b) => a + b, 0) / Object.values(s.mastery).length < 50 ? 'Mastery thấp' : 'Ít hoạt động'}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => handleStudentClick(s.id)}>
                          Chi tiết
                        </Button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>

            {/* Recent Activity */}
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-white mb-4">📝 Bài tập gần đây</h3>
              <div className="space-y-3">
                {assignments.slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{
                        a.type === 'lesson' ? '📖' :
                        a.type === 'quiz' ? '❓' :
                        a.type === 'lab' ? '💻' : '📝'
                      }</span>
                      <div>
                        <div className="font-medium text-white">{a.title}</div>
                        <div className="text-xs text-slate-400">
                          {a.submissions}/{a.totalStudents} nộp • Hạn: {a.dueDate}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      a.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                      a.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {a.status === 'active' ? 'Đang hoạt động' : a.status === 'draft' ? 'Nháp' : 'Hoàn thành'}
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
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm học sinh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
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
                    className="p-5 cursor-pointer"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        role="img"
                        aria-label={student.name}
                        className="w-12 h-12 rounded-full bg-white/10 bg-cover bg-center"
                        style={{ backgroundImage: `url(${student.avatar})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{student.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs">Lv.{student.level}</span>
                          <span>🔥 {student.streak}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tiến độ</span>
                        <span className="text-white">{student.completedLessons}/{student.totalLessons} bài</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-cyan-500 rounded-full h-2 transition-all"
                          style={{ width: `${(student.completedLessons / student.totalLessons) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Quiz TB</span>
                        <span className={getMasteryColor(student.quizAverage)}>{student.quizAverage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Mastery</span>
                        <span className={getMasteryColor(masteryAvg)}>{masteryAvg}%</span>
                      </div>
                    </div>
                    
                    {student.weakTopics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {student.weakTopics.slice(0, 2).map(topic => (
                          <span key={topic} className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">
                            {topic}
                          </span>
                        ))}
                        {student.weakTopics.length > 2 && (
                          <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-slate-400">
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
              <h3 className="text-lg font-semibold text-white">Danh sách Bài tập</h3>
              <Button variant="primary" size="sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tạo bài tập mới
              </Button>
            </div>

            <Card className="p-0 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Bài tập</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Loại</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Hạn nộp</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Nộp</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Trạng thái</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assignments.map(a => (
                    <tr key={a.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-medium text-white">{a.title}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded text-xs bg-white/5 text-slate-400 capitalize">{a.type}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-400">{a.dueDate}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 rounded-full h-2">
                            <div
                              className="bg-emerald-500 rounded-full h-2"
                              style={{ width: `${(a.submissions / a.totalStudents) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-400">{a.submissions}/{a.totalStudents}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          a.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                          a.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {a.status === 'active' ? 'Đang hoạt động' : a.status === 'draft' ? 'Nháp' : 'Hoàn thành'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">Xem</Button>
                          <Button size="sm" variant="ghost">Sửa</Button>
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
            <h3 className="text-lg font-semibold text-white">Nộp Lab gần đây</h3>
            
            <Card className="p-0 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Học sinh</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Lab</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Nộp lúc</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Điểm</th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Trạng thái</th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {labSubmissions.map(sub => (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{sub.studentName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-400">{sub.labTitle}</td>
                      <td className="px-5 py-4 text-sm text-slate-400">
                        {new Date(sub.submittedAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-5 py-4">
                        {sub.score !== undefined ? (
                          <span className={`font-semibold ${getMasteryColor(sub.score)}`}>{sub.score}/100</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          sub.status === 'graded' ? 'bg-emerald-500/20 text-emerald-400' :
                          sub.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-violet-500/20 text-violet-400'
                        }`}>
                          {sub.status === 'graded' ? 'Đã chấm' : sub.status === 'pending' ? 'Đang chấm' : 'Đã trả lại'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="secondary">Chấm điểm</Button>
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
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📊 Mastery theo Chủ đề</h3>
              <div className="space-y-4">
                {topicAnalytics.map(topic => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white capitalize">{topic.topic.replace(/-/g, ' ')}</span>
                      <span className={getMasteryColor(topic.classAverage)}>{topic.classAverage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className={`rounded-full h-3 ${getMasteryBg(topic.classAverage).replace('bg-', 'bg-').replace('/20', '')}`}
                        style={{ 
                          width: `${topic.classAverage}%`,
                          backgroundColor: topic.classAverage >= 80 ? 'rgba(52, 211, 153, 0.2)' :
                                           topic.classAverage >= 60 ? 'rgba(34, 211, 238, 0.2)' :
                                           topic.classAverage >= 40 ? 'rgba(251, 191, 36, 0.2)' :
                                           'rgba(248, 113, 113, 0.2)'
                        }}
                      />
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>Xuất sắc: {topic.masteryDistribution.excellent}</span>
                      <span>Tốt: {topic.masteryDistribution.good}</span>
                      <span>Đang phát triển: {topic.masteryDistribution.developing}</span>
                      <span>Bắt đầu: {topic.masteryDistribution.beginning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Exam Readiness */}
            {examReadiness && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🎯 Sẵn sàng thi THPT</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{examReadiness.readinessScore}%</div>
                    <div className="text-sm text-slate-400">Điểm sẵn sàng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">{examReadiness.topicsCovered}/{examReadiness.totalTopics}</div>
                    <div className="text-sm text-slate-400">Chủ đề đã ôn</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-400 mb-2">{examReadiness.weakAreas.length}</div>
                    <div className="text-sm text-slate-400">Điểm yếu cần luyện</div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-red-400 mb-2">⚠️ Cần cải thiện</h4>
                    <div className="space-y-1">
                      {examReadiness.weakAreas.map(area => (
                        <div key={area} className="text-sm text-slate-300">{area}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-emerald-400 mb-2">✅ Nắm vững</h4>
                    <div className="space-y-1">
                      {examReadiness.strongAreas.map(area => (
                        <div key={area} className="text-sm text-slate-300">{area}</div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <h4 className="text-sm font-medium text-cyan-400 mb-2">📋 Đề xuất hành động</h4>
                  <ul className="space-y-2">
                    {examReadiness.recommendedActions.map((action, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Báo cáo & Xuất dữ liệu</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Report Card */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">📋</div>
                  <div>
                    <h3 className="font-semibold text-white">Report Card Lớp</h3>
                    <p className="text-sm text-slate-400">Tổng hợp tiến độ và kết quả học tập</p>
                  </div>
                </div>
                <Button variant="primary" className="w-full" onClick={handleExportClassReport}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Xuất CSV
                </Button>
              </Card>

              {/* Individual Student Reports */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">👤</div>
                  <div>
                    <h3 className="font-semibold text-white">Báo cáo cá nhân HS</h3>
                    <p className="text-sm text-slate-400">In report cho từng học sinh</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {students.slice(0, 3).map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{s.name}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleStudentClick(s.id)}>
                        Xem
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Exam Readiness Report */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-white">Phân tích Exam Readiness</h3>
                    <p className="text-sm text-slate-400">Đánh giá mức độ sẵn sàng thi</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Tải báo cáo Exam Readiness
                </Button>
              </Card>

              {/* Topic Performance */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">📈</div>
                  <div>
                    <h3 className="font-semibold text-white">Phân tích Topic</h3>
                    <p className="text-sm text-slate-400">Mastery và coverage theo chủ đề</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Tải phân tích Topic
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {studentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setStudentModal(null)}>
          <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {studentModal.reportCard && (
                  <div
                    role="img"
                    aria-label={studentModal.reportCard.student.name}
                    className="w-14 h-14 rounded-full bg-white/10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${studentModal.reportCard.student.avatar})` }}
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {studentModal.reportCard?.student.name || 'Student'}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">Lv.{studentModal.analytics.level}</span>
                    <span>🔥 {studentModal.analytics.streak} streak</span>
                    <span>⭐ {studentModal.analytics.xp} XP</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setStudentModal(null)} className="p-2 hover:bg-white/10 rounded-lg">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-cyan-400">{studentModal.analytics.progress}%</div>
                <div className="text-xs text-slate-400">Tiến độ</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-emerald-400">{studentModal.analytics.quizAverage}%</div>
                <div className="text-xs text-slate-400">Quiz TB</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-violet-400">{studentModal.analytics.masteryScore}%</div>
                <div className="text-xs text-slate-400">Mastery</div>
              </div>
            </div>

            {/* Topic Mastery */}
            {studentModal.reportCard && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Topic Mastery</h3>
                <div className="space-y-2">
                  {studentModal.reportCard.topicMastery.map(tm => (
                    <div key={tm.topic} className="flex items-center gap-3">
                      <span className="text-sm text-slate-300 w-40 truncate capitalize">{tm.topic.replace(/-/g, ' ')}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getMasteryBg(tm.score)}`}
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
                <h3 className="text-sm font-semibold text-amber-400 mb-2">💡 Đề xuất</h3>
                <ul className="space-y-1">
                  {studentModal.analytics.recommendedActions.map((action, i) => (
                    <li key={i} className="text-sm text-slate-300">{action}</li>
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

// ==========================================
// Admin Page - Tin12 Pro Cánh Diều
// Full-featured CMS with tabs: Courses, Lessons, Questions, Labs, Exams, Analytics
// ==========================================
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  getCourses, getLessons, getQuestions, getLabs, getExams,
  getCMSAnalytics, CMSItem, deleteCourse, deleteLesson, deleteQuestion, deleteLab,
  saveCourse, saveLesson, saveQuestion, saveLab,
  publishItem, unpublishItem,
  clearCMSData
} from '@/lib/cms-store';
import { 
  importQuestionsFromCSV, getQuestionCSVTemplate, exportQuestionsJSON, exportLessonsJSON, exportLabsJSON 
} from '@/lib/admin-import-export';
import { questions as contentQuestions } from '@/content/questions';
import { lessons as contentLessons } from '@/content/lessons';
import { labs as contentLabs } from '@/content/labs';
import { Question, LabType } from '@/lib/types';

// ============ TYPES ============
type TabType = 'courses' | 'lessons' | 'questions' | 'labs' | 'exams' | 'analytics';
type ModalType = 'create' | 'edit' | 'delete' | 'import' | 'analytics-detail' | null;

interface FormState {
  title: string;
  description: string;
  type: string;
  difficulty: string;
  topic: string;
  status: 'draft' | 'published';
  content: string;
}

// ============ INITIAL DATA ============
function getInitialItems() {
  // Merge content data with localStorage CMS data
  const cmsQuestions = getQuestions();
  const cmsLabs = getLabs();
  
  // Add content data if CMS is empty (for demo purposes)
  if (cmsQuestions.length === 0) {
    contentQuestions.slice(0, 20).forEach(q => {
      saveQuestion(q);
    });
  }
  if (cmsLabs.length === 0) {
    contentLabs.slice(0, 3).forEach(l => {
      saveLab(l);
    });
  }
  
  return {
    courses: getCourses(),
    lessons: getLessons(),
    questions: getQuestions(),
    labs: getLabs(),
    exams: getExams(),
  };
}

// ============ COMPONENT ============
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('courses');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<CMSItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(getInitialItems);
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    type: 'mcq',
    difficulty: 'medium',
    topic: 'general',
    status: 'draft',
    content: '',
  });
  const [importResult, setImportResult] = useState<{ success: number; errors: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Refresh items when tab changes
  useEffect(() => {
    refreshItems();
  }, [activeTab]);
  
  function refreshItems() {
    setItems({
      courses: getCourses(),
      lessons: getLessons(),
      questions: getQuestions(),
      labs: getLabs(),
      exams: getExams(),
    });
  }
  
  const tabs: { id: TabType; label: string; icon: string; count: number }[] = [
    { id: 'courses', label: 'Khóa học', icon: '📚', count: items.courses.length },
    { id: 'lessons', label: 'Bài học', icon: '📖', count: items.lessons.length },
    { id: 'questions', label: 'Câu hỏi', icon: '❓', count: items.questions.length },
    { id: 'labs', label: 'Labs', icon: '💻', count: items.labs.length },
    { id: 'exams', label: 'Đề thi', icon: '📝', count: items.exams.length },
    { id: 'analytics', label: 'Analytics', icon: '📊', count: 0 },
  ];
  
  const currentItems = activeTab === 'analytics' ? [] : (items[activeTab]?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []);
  
  function handleOpenModal(type: ModalType, item?: CMSItem) {
    setModalType(type);
    setSelectedItem(item || null);
    if (type === 'edit' || type === 'create') {
      setFormState({
        title: item?.title || '',
        description: '',
        type: item?.type || 'mcq',
        difficulty: 'medium',
        topic: 'general',
        status: item?.status || 'draft',
        content: '',
      });
    }
    if (type === 'delete' && item) {
      setSelectedItem(item);
    }
  }
  
  function handleCloseModal() {
    setModalType(null);
    setSelectedItem(null);
    setImportResult(null);
  }
  
  function handleSave() {
    if (!formState.title) return;
    
    switch (activeTab) {
      case 'courses':
        saveCourse({ id: selectedItem?.id, title: formState.title, slug: formState.title.toLowerCase().replace(/\s+/g, '-') });
        break;
      case 'lessons':
        saveLesson({ id: selectedItem?.id, title: formState.title, slug: formState.title.toLowerCase().replace(/\s+/g, '-') });
        break;
      case 'questions':
        const question: Partial<Question> = {
          id: selectedItem?.id,
          type: formState.type as 'mcq' | 'true-false',
          question: formState.title,
          options: ['A. ', 'B. ', 'C. ', 'D. '],
          correctAnswer: 0,
          explanation: formState.description,
          difficulty: formState.difficulty as 'easy' | 'medium' | 'hard',
          topic: formState.topic,
        };
        saveQuestion(question);
        break;
      case 'labs':
        saveLab({ id: selectedItem?.id, title: formState.title, slug: formState.title.toLowerCase().replace(/\s+/g, '-'), type: formState.type as LabType });
        break;
    }
    
    refreshItems();
    handleCloseModal();
  }
  
  function handleDelete() {
    if (!selectedItem) return;
    
    switch (activeTab) {
      case 'courses':
        deleteCourse(selectedItem.id);
        break;
      case 'lessons':
        deleteLesson(selectedItem.id);
        break;
      case 'questions':
        deleteQuestion(selectedItem.id);
        break;
      case 'labs':
        deleteLab(selectedItem.id);
        break;
    }
    
    refreshItems();
    handleCloseModal();
  }
  
  function handleTogglePublish(item: CMSItem) {
    if (item.status === 'published') {
      unpublishItem(activeTab.slice(0, -1), item.id);
    } else {
      publishItem(activeTab.slice(0, -1), item.id);
    }
    refreshItems();
  }
  
  function handleFileImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      if (activeTab === 'questions') {
        const result = importQuestionsFromCSV(content);
        setImportResult(result);
        refreshItems();
      }
    };
    reader.readAsText(file);
  }
  
  function handleExportJSON() {
    switch (activeTab) {
      case 'questions':
        exportQuestionsJSON(contentQuestions);
        break;
      case 'lessons':
        exportLessonsJSON(contentLessons);
        break;
      case 'labs':
        exportLabsJSON(contentLabs);
        break;
    }
  }
  
  function handleClearAllData() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu CMS? Hành động này không thể hoàn tác.')) {
      clearCMSData();
      refreshItems();
    }
  }
  
  function getAnalytics() {
    return getCMSAnalytics();
  }
  
  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">⚙️ Admin Panel</h1>
            <p className="text-slate-400">Quản lý nội dung học tập Tin12 Pro</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => handleOpenModal('import')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Import
            </Button>
            {activeTab !== 'analytics' && (
              <Button variant="secondary" onClick={handleExportJSON}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </Button>
            )}
            <Button variant="primary" onClick={() => handleOpenModal('create')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tạo mới
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-cyan-500/30' : 'bg-white/10'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        {activeTab !== 'analytics' && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={`Tìm kiếm ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <div className="text-3xl font-bold text-blue-400 mb-1">{analytics.totalCourses}</div>
                <div className="text-sm text-slate-400">Tổng Khóa học</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{analytics.totalLessons}</div>
                <div className="text-sm text-slate-400">Tổng Bài học</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-violet-500/10 to-violet-600/5 border-violet-500/20">
                <div className="text-3xl font-bold text-violet-400 mb-1">{analytics.totalQuestions}</div>
                <div className="text-sm text-slate-400">Tổng Câu hỏi</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{analytics.totalLabs}</div>
                <div className="text-sm text-slate-400">Tổng Labs</div>
              </Card>
            </div>

            {/* Questions by Topic */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📈 Câu hỏi theo Chủ đề</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(analytics.questionsByTopic).map(([topic, count]) => (
                  <div key={topic} className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-xs text-slate-400 mt-1 capitalize">{topic.replace(/-/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Questions by Difficulty */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">🎯 Câu hỏi theo Độ khó</h3>
              <div className="flex gap-4 justify-center">
                {Object.entries(analytics.questionsByDifficulty).map(([diff, count]) => (
                  <div key={diff} className={`text-center p-4 rounded-xl ${
                    diff === 'easy' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                    diff === 'medium' ? 'bg-amber-500/10 border border-amber-500/20' :
                    'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      diff === 'easy' ? 'text-emerald-400' :
                      diff === 'medium' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>{count}</div>
                    <div className="text-xs text-slate-400 mt-1 capitalize">{diff === 'easy' ? 'Dễ' : diff === 'medium' ? 'Trung bình' : 'Khó'}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Question Type Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📝 Loại Câu hỏi</h3>
              <div className="flex gap-6 justify-center">
                {Object.entries(analytics.questionTypeBreakdown).map(([type, count]) => (
                  <div key={type} className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">{count}</div>
                    <div className="text-sm text-slate-400 mt-1">
                      {type === 'mcq' ? 'Trắc nghiệm' : 'Đúng/Sai'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Content Coverage */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">✅ Trạng thái Nội dung</h3>
              <div className="flex gap-8 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">{analytics.publishedCount}</div>
                  <div className="text-sm text-slate-400 mt-1">Đã đăng tải</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{analytics.draftCount}</div>
                  <div className="text-sm text-slate-400 mt-1">Bản nháp</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Content Table */}
        {activeTab !== 'analytics' && (
          <>
            {currentItems.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">Chưa có dữ liệu</h3>
                <p className="text-slate-400 mb-6">Bắt đầu bằng cách tạo mới hoặc import dữ liệu</p>
                <div className="flex gap-3 justify-center">
                  <Button variant="secondary" onClick={() => handleOpenModal('import')}>Import CSV/JSON</Button>
                  <Button variant="primary" onClick={() => handleOpenModal('create')}>Tạo mới</Button>
                </div>
              </Card>
            ) : (
              <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Tiêu đề</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Loại</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Trạng thái</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Cập nhật</th>
                        <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-medium text-white">{item.title}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded text-xs bg-white/5 text-slate-400 border border-white/10">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleTogglePublish(item)}
                              className={`px-2.5 py-1 rounded text-xs cursor-pointer transition-all ${
                                item.status === 'published'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                              }`}
                            >
                              {item.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-400">{item.lastModified}</td>
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleOpenModal('edit', item)}
                                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                title="Chỉnh sửa"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleOpenModal('delete', item)}
                                className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                                title="Xóa"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Import/Export Section */}
        {activeTab !== 'analytics' && (
          <Card className="mt-8 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">📦 Import / Export Tools</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import CSV/JSON
              </Button>
              <Button variant="secondary" onClick={handleExportJSON}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export JSON
              </Button>
              <Button variant="secondary" onClick={() => {
                const template = getQuestionCSVTemplate();
                const blob = new Blob([template], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'question-template.csv';
                a.click();
              }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CSV Template
              </Button>
              <Button variant="danger" onClick={handleClearAllData}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Data
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Import CSV cho questions: question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
            </p>
            
            {importResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                importResult.errors.length > 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'
              }`}>
                <div className="font-medium text-white">
                  Import Result: {importResult.success} items imported successfully
                </div>
                {importResult.errors.length > 0 && (
                  <div className="mt-2 text-sm text-amber-400">
                    {importResult.errors.slice(0, 3).map((err, i) => (
                      <div key={i}>{err}</div>
                    ))}
                    {importResult.errors.length > 3 && (
                      <div>...and {importResult.errors.length - 3} more errors</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept=".csv,.json"
          className="hidden"
        />
      </div>

      {/* Create/Edit Modal */}
      {modalType === 'create' || modalType === 'edit' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-6">
              {modalType === 'create' ? '✨ Tạo mới' : '✏️ Chỉnh sửa'}: {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Tiêu đề *</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="Nhập tiêu đề..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              
              {activeTab === 'questions' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Loại câu hỏi</label>
                      <select
                        value={formState.type}
                        onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="mcq">Trắc nghiệm (MCQ)</option>
                        <option value="true-false">Đúng/Sai (T/F)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Độ khó</label>
                      <select
                        value={formState.difficulty}
                        onChange={(e) => setFormState({ ...formState, difficulty: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="easy">Dễ</option>
                        <option value="medium">Trung bình</option>
                        <option value="hard">Khó</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Chủ đề</label>
                    <select
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="general">Tổng quát</option>
                      <option value="kiến-trúc-máy-tính">Kiến trúc máy tính</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="mạng-máy-tính">Mạng máy tính</option>
                      <option value="html-css">HTML/CSS</option>
                      <option value="đạo-đức-số">Đạo đức số</option>
                      <option value="thuật-toán">Thuật toán</option>
                    </select>
                  </div>
                </>
              )}
              
              {activeTab === 'labs' && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Loại Lab</label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="html-css">HTML/CSS</option>
                    <option value="network">Network</option>
                    <option value="data">Data</option>
                    <option value="project">Project</option>
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">Mô tả / Giải thích</label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  rows={3}
                  placeholder="Nhập mô tả hoặc giải thích..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>Hủy</Button>
              <Button variant="primary" onClick={handleSave}>
                {modalType === 'create' ? 'Tạo mới' : 'Lưu thay đổi'}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <Card className="max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-4xl mb-4">🗑️</div>
              <h2 className="text-xl font-bold text-white mb-2">Xóa nội dung?</h2>
              <p className="text-slate-400 mb-6">
                Bạn có chắc muốn xóa &quot;{selectedItem.title}&quot;? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={handleCloseModal}>Hủy</Button>
                <Button variant="danger" onClick={handleDelete}>Xóa vĩnh viễn</Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {/* Import Modal */}
      {modalType === 'import' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <Card className="max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4">📥 Import Dữ liệu</h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-medium text-white mb-2">CSV Format for Questions</h3>
                <p className="text-sm text-slate-400 mb-3">
                  Import câu hỏi từ CSV với format:
                </p>
                <code className="text-xs text-cyan-400 block bg-black/30 p-3 rounded-lg overflow-x-auto">
                  question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
                </code>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-medium text-white mb-2">JSON Import</h3>
                <p className="text-sm text-slate-400">
                  Import lessons hoặc labs từ JSON file. File phải có cấu trúc hợp lệ với các trường cần thiết.
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
                <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                  Chọn File để Import
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
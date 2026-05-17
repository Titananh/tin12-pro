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

// ============ ICONS (inline SVG) ============
const IconCourses = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconLessons = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconQuestions = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
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

const IconExam = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);



const IconEdit = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a22.05 22.05 0 00-3.592 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const IconUpload = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const IconDownload = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const IconTrendUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const IconTrendDown = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l2.74 1.22m0 0L5.94 19.28m0 0a11.945 11.945 0 01-5.814-5.519l-2.74-1.22" />
  </svg>
);

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
  const cmsQuestions = getQuestions();
  const cmsLabs = getLabs();

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
  const [items, setItems] = useState<ReturnType<typeof getInitialItems>>({
    courses: [],
    lessons: [],
    questions: [],
    labs: [],
    exams: [],
  });
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

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(getInitialItems()), 0);
    return () => window.clearTimeout(timer);
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

  const tabs: { id: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'courses', label: 'Courses', icon: <IconCourses />, count: items.courses.length },
    { id: 'lessons', label: 'Lessons', icon: <IconLessons />, count: items.lessons.length },
    { id: 'questions', label: 'Questions', icon: <IconQuestions />, count: items.questions.length },
    { id: 'labs', label: 'Labs', icon: <IconLabs />, count: items.labs.length },
    { id: 'exams', label: 'Exams', icon: <IconExam />, count: items.exams.length },
    { id: 'analytics', label: 'Analytics', icon: <IconAnalytics />, count: 0 },
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
    if (confirm('Clear all CMS data? This cannot be undone.')) {
      clearCMSData();
      refreshItems();
    }
  }

  function getAnalytics() {
    return getCMSAnalytics();
  }

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h2.086c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v2.086c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.389.966.45 1.45.12l.738-.527c.418-.28.509-1.065.12-1.45l-.774-.773a1.125 1.125 0 00-1.449-.12l-.738.527c-.35.25-.806.272-1.203.107-.397-.165-.71-.505-.781-.929l-.149-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Content Management</h1>
              <p className="text-sm text-slate-400">Manage courses, lessons, questions, labs and exams</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => handleOpenModal('import')}>
              <IconUpload />
              Import
            </Button>
            {activeTab !== 'analytics' && (
              <Button variant="secondary" size="sm" onClick={handleExportJSON}>
                <IconDownload />
                Export
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => handleOpenModal('create')}>
              <IconPlus />
              New Item
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-1">
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
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-cyan-500/30' : 'bg-slate-700'
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
              <IconSearch />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
              />
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Courses</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <IconCourses />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{analytics.totalCourses}</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Lessons</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <IconLessons />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{analytics.totalLessons}</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Questions</span>
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <IconQuestions />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{analytics.totalQuestions}</div>
              </Card>
              <Card className="p-5 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Labs</span>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <IconLabs />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{analytics.totalLabs}</div>
              </Card>
            </div>

            {/* Questions by Topic */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <div className="flex items-center gap-2 mb-5">
                <IconTrendUp />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Questions by Topic</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(analytics.questionsByTopic).map(([topic, count]) => (
                  <div key={topic} className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
                    <div className="text-2xl font-bold text-white mb-1">{count}</div>
                    <div className="text-xs text-slate-400 capitalize">{topic.replace(/-/g, ' ')}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Questions by Difficulty */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <div className="flex items-center gap-2 mb-5">
                <IconTrendDown />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Difficulty Distribution</h3>
              </div>
              <div className="flex gap-4 justify-center">
                {Object.entries(analytics.questionsByDifficulty).map(([diff, count]) => (
                  <div key={diff} className={`text-center p-4 rounded-xl border ${
                    diff === 'easy' ? 'bg-emerald-500/5 border-emerald-500/20' :
                    diff === 'medium' ? 'bg-amber-500/5 border-amber-500/20' :
                    'bg-red-500/5 border-red-500/20'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      diff === 'easy' ? 'text-emerald-400' :
                      diff === 'medium' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>{count}</div>
                    <div className="text-xs text-slate-400 mt-1 capitalize">{diff}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Question Type Breakdown */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <div className="flex items-center gap-2 mb-5">
                <IconAnalytics />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Question Types</h3>
              </div>
              <div className="flex gap-6 justify-center">
                {Object.entries(analytics.questionTypeBreakdown).map(([type, count]) => (
                  <div key={type} className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">{count}</div>
                    <div className="text-sm text-slate-400 mt-1 uppercase">{type}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Content Coverage */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <div className="flex items-center gap-2 mb-5">
                <IconCheck />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Content Status</h3>
              </div>
              <div className="flex gap-8 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">{analytics.publishedCount}</div>
                  <div className="text-sm text-slate-400 mt-1">Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{analytics.draftCount}</div>
                  <div className="text-sm text-slate-400 mt-1">Draft</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Content Table */}
        {activeTab !== 'analytics' && (
          <>
            {currentItems.length === 0 ? (
              <Card className="p-12 text-center bg-slate-900/50 border-slate-800">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <IconQuestions />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No content yet</h3>
                <p className="text-slate-400 mb-6">Create new content or import from CSV/JSON</p>
                <div className="flex gap-3 justify-center">
                  <Button variant="secondary" size="sm" onClick={() => handleOpenModal('import')}>Import Data</Button>
                  <Button variant="primary" size="sm" onClick={() => handleOpenModal('create')}>Create New</Button>
                </div>
              </Card>
            ) : (
              <Card className="overflow-hidden bg-slate-900/50 border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/50">
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Title</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Type</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Status</th>
                        <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Last Modified</th>
                        <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3.5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-medium text-slate-200">{item.title}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleTogglePublish(item)}
                              className={`px-2.5 py-1 rounded text-xs cursor-pointer transition-all ${
                                item.status === 'published'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                              }`}
                            >
                              {item.status === 'published' ? 'Published' : 'Draft'}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">{item.lastModified}</td>
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleOpenModal('edit', item)}
                                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all"
                                title="Edit"
                              >
                                <IconEdit />
                              </button>
                              <button
                                onClick={() => handleOpenModal('delete', item)}
                                className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                                title="Delete"
                              >
                                <IconTrash />
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
          <Card className="mt-6 p-5 bg-slate-900/50 border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <IconDownload />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Import / Export Tools</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                <IconUpload />
                Import CSV/JSON
              </Button>
              <Button variant="secondary" size="sm" onClick={handleExportJSON}>
                <IconDownload />
                Export JSON
              </Button>
              <Button variant="secondary" size="sm" onClick={() => {
                const template = getQuestionCSVTemplate();
                const blob = new Blob([template], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'question-template.csv';
                a.click();
              }}>
                <IconDownload />
                CSV Template
              </Button>
              <Button variant="danger" size="sm" onClick={handleClearAllData}>
                <IconTrash />
                Clear All Data
              </Button>
            </div>
            <p className="mt-3 break-all text-xs text-slate-500">
              CSV format: question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
            </p>

            {importResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                importResult.errors.length > 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'
              }`}>
                <div className="font-medium text-slate-200">
                  {importResult.success} items imported successfully
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
          <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                {modalType === 'create' ? <IconPlus /> : <IconEdit />}
              </span>
              {modalType === 'create' ? 'Create' : 'Edit'}: {tabs.find(t => t.id === activeTab)?.label}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Title *</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="Enter title..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>

              {activeTab === 'questions' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Question Type</label>
                      <select
                        value={formState.type}
                        onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="mcq">MCQ</option>
                        <option value="true-false">True/False</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Difficulty</label>
                      <select
                        value={formState.difficulty}
                        onChange={(e) => setFormState({ ...formState, difficulty: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Topic</label>
                    <select
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="general">General</option>
                      <option value="kiến-trúc-máy-tính">Computer Architecture</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="mạng-máy-tính">Computer Networks</option>
                      <option value="html-css">HTML/CSS</option>
                      <option value="đạo-đức-số">Digital Ethics</option>
                      <option value="thuật-toán">Algorithms</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'labs' && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Lab Type</label>
                  <select
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="html-css">HTML/CSS</option>
                    <option value="network">Network</option>
                    <option value="data">Data</option>
                    <option value="project">Project</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-2">Description / Explanation</label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  rows={3}
                  placeholder="Enter description..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                {modalType === 'create' ? 'Create' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <Card className="max-w-md w-full p-6 bg-slate-900 border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <IconTrash />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Delete Item?</h2>
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete &quot;{selectedItem.title}&quot;? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>Delete Permanently</Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {/* Import Modal */}
      {modalType === 'import' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <Card className="max-w-lg w-full p-6 bg-slate-900 border-slate-700" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <IconUpload />
              </span>
              Import Data
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="font-medium text-slate-200 mb-2">CSV Format for Questions</h3>
                <p className="text-sm text-slate-400 mb-3">
                  Import questions from CSV with format:
                </p>
                <code className="text-xs text-cyan-400 block bg-slate-900 p-3 rounded-lg overflow-x-auto border border-slate-700">
                  question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
                </code>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="font-medium text-slate-200 mb-2">JSON Import</h3>
                <p className="text-sm text-slate-400">
                  Import lessons or labs from JSON file. File must have valid structure with required fields.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="sm" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Select File to Import
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

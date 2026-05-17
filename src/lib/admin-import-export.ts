// ==========================================
// Admin Import/Export - Tin12 Pro Cánh Diều
// CSV/JSON import parsers and export utilities
// ==========================================

import { Question, Lesson, Lab } from './types';
import { saveQuestion, saveLesson, saveLab } from './cms-store';

// ============ CSV PARSER ============

export interface CSVParseResult {
  success: boolean;
  data: Record<string, string>[];
  errors: string[];
  rowCount: number;
}

// Parse CSV string to array of objects
export function parseCSV(csvText: string): CSVParseResult {
  const errors: string[] = [];
  const data: Record<string, string>[] = [];
  
  if (!csvText.trim()) {
    return { success: false, data: [], errors: ['Empty CSV content'], rowCount: 0 };
  }
  
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    return { success: false, data: [], errors: ['CSV must have header and at least one data row'], rowCount: 0 };
  }
  
  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parsing - handles basic cases
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length !== headers.length) {
      errors.push(`Row ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
      continue;
    }
    
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx];
    });
    data.push(row);
  }
  
  return {
    success: errors.length === 0,
    data,
    errors,
    rowCount: data.length,
  };
}

// ============ QUESTION IMPORT ============

export interface QuestionBlueprint {
  question: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  type?: 'mcq' | 'true-false';
}

// Import questions from CSV (expected format: question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic)
export function importQuestionsFromCSV(csvText: string): { success: number; errors: string[] } {
  const result = parseCSV(csvText);
  const errors: string[] = [...result.errors];
  let successCount = 0;
  
  const headerMap: Record<string, string> = {
    'question': 'question',
    'câu hỏi': 'question',
    'q': 'question',
    'options': 'options',
    'choices': 'options',
    'answers': 'options',
    'correctanswer': 'correctAnswer',
    'correct': 'correctAnswer',
    'answer': 'correctAnswer',
    'explanation': 'explanation',
    'giải thích': 'explanation',
    'difficulty': 'difficulty',
    'độ khó': 'difficulty',
    'topic': 'topic',
    'chủ đề': 'topic',
  };
  
  for (let i = 0; i < result.data.length; i++) {
    const row = result.data[i];
    const rowNum = i + 2; // +2 for 1-indexed and header row
    
    try {
      // Map headers to standard field names
      const mapped: Record<string, string> = {};
      Object.keys(row).forEach(key => {
        const normalizedKey = key.toLowerCase().trim();
        const mappedKey = headerMap[normalizedKey] || key.toLowerCase().trim();
        mapped[mappedKey] = row[key];
      });
      
      // Parse options (comma-separated or pipe-separated)
      const optionsRaw = mapped.options || mapped.choices || '';
      const options = optionsRaw.split(/[,|]/).map(o => o.trim()).filter(Boolean);
      
      // Parse correct answer (0-3 for MCQ, or "A","B","C","D")
      let correctAnswer = 0;
      const caRaw = (mapped.correctAnswer || mapped.correct || '0').toString().trim();
      if (['A', 'B', 'C', 'D'].includes(caRaw.toUpperCase())) {
        correctAnswer = ['A', 'B', 'C', 'D'].indexOf(caRaw.toUpperCase());
      } else {
        correctAnswer = parseInt(caRaw, 10) || 0;
      }
      
      // Parse difficulty
      const difficulty = (mapped.difficulty || 'medium').toLowerCase().trim() as 'easy' | 'medium' | 'hard';
      const validDifficulty = ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';
      
      // Create question
      const question: Partial<Question> = {
        id: `q-import-${Date.now()}-${i}`,
        type: 'mcq',
        question: mapped.question || '',
        options: options.length === 4 ? options : ['A', 'B', 'C', 'D'],
        correctAnswer,
        explanation: mapped.explanation || '',
        difficulty: validDifficulty,
        topic: (mapped.topic || 'general').toLowerCase().replace(/\s+/g, '-'),
      };
      
      saveQuestion(question);
      successCount++;
    } catch (err) {
      errors.push(`Row ${rowNum}: Failed to parse - ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }
  
  return { success: successCount, errors };
}

// ============ JSON IMPORT/EXPORT ============

export interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

// Export data to JSON
export function exportToJSON(data: unknown[], filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Import lessons from JSON
export function importLessonsFromJSON(jsonText: string): ImportResult {
  const errors: string[] = [];
  let successCount = 0;
  let failedCount = 0;
  
  try {
    const data = JSON.parse(jsonText);
    const lessons = Array.isArray(data) ? data : [data];
    
    for (let i = 0; i < lessons.length; i++) {
      try {
        const lesson = lessons[i];
        if (!lesson.title || !lesson.id) {
          errors.push(`Item ${i + 1}: Missing required field (title or id)`);
          failedCount++;
          continue;
        }
        saveLesson(lesson);
        successCount++;
      } catch (err) {
        errors.push(`Item ${i + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        failedCount++;
      }
    }
  } catch (err) {
    errors.push(`JSON parse error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
  
  return { success: successCount, failed: failedCount, errors };
}

// Import labs from JSON
export function importLabsFromJSON(jsonText: string): ImportResult {
  const errors: string[] = [];
  let successCount = 0;
  let failedCount = 0;
  
  try {
    const data = JSON.parse(jsonText);
    const labs = Array.isArray(data) ? data : [data];
    
    for (let i = 0; i < labs.length; i++) {
      try {
        const lab = labs[i];
        if (!lab.title || !lab.id) {
          errors.push(`Item ${i + 1}: Missing required field (title or id)`);
          failedCount++;
          continue;
        }
        saveLab(lab);
        successCount++;
      } catch (err) {
        errors.push(`Item ${i + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        failedCount++;
      }
    }
  } catch (err) {
    errors.push(`JSON parse error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
  
  return { success: successCount, failed: failedCount, errors };
}

// ============ BULK EXPORT HELPERS ============

export function exportQuestionsJSON(questions: Question[]): void {
  exportToJSON(questions, `questions-export-${Date.now()}.json`);
}

export function exportLessonsJSON(lessons: Lesson[]): void {
  exportToJSON(lessons, `lessons-export-${Date.now()}.json`);
}

export function exportLabsJSON(labs: Lab[]): void {
  exportToJSON(labs, `labs-export-${Date.now()}.json`);
}

// ============ CSV TEMPLATES ============

export function getQuestionCSVTemplate(): string {
  return `question,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
"Kiến trúc máy tính là gì?","Nghiên cứu phần cứng","Nghiên cứu phần mềm","Khoa học máy tính","Cả A và C","0","Kiến trúc máy tính liên quan đến cả phần cứng và phần mềm","easy","kien-truc-may-tinh"
"AI hẹp là gì?","AI làm mọi việc","AI chỉ giỏi một việc cụ thể","AI có ý thức","Robot AI","1","AI hẹp chỉ giỏi một tác vụ cụ thể","easy","ai-ml"`;
}

export function getLessonCSVTemplate(): string {
  return `id,title,description,estimatedMinutes,difficulty,track,order
"lesson-new-1","Tiêu đề bài học","Mô tả bài học",45,"medium","general",1`;
}
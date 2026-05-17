// ==========================================
// Lab Engine - Tin12 Pro Cánh Diều
// Demo lab checker using regex/DOM-like rules
// ==========================================

// ============ TYPES ============

export interface LabCheckResult {
  labId: string;
  passed: boolean;
  score: number;
  maxScore: number;
  checks: LabCheck[];
  feedback: string[];
  requirementsMet: Record<string, boolean>;
}

export interface LabCheck {
  criterion: string;
  points: number;
  passed: boolean;
  feedback: string;
}

export interface HTMLCheckRule {
  pattern: RegExp;
  description: string;
  points: number;
  required: boolean;
}

export interface CSSCheckRule {
  pattern: RegExp;
  description: string;
  points: number;
  required: boolean;
}

// ============ HTML CHECK RULES ============

const HTML_RULES: HTMLCheckRule[] = [
  {
    pattern: /<!DOCTYPE\s+html>/i,
    description: 'Có khai báo DOCTYPE',
    points: 10,
    required: true,
  },
  {
    pattern: /<html[^>]*>/i,
    description: 'Có thẻ <html>',
    points: 10,
    required: true,
  },
  {
    pattern: /<head[^>]*>/i,
    description: 'Có thẻ <head>',
    points: 10,
    required: true,
  },
  {
    pattern: /<body[^>]*>/i,
    description: 'Có thẻ <body>',
    points: 10,
    required: true,
  },
  {
    pattern: /<title[^>]*>[^<]+<\/title>/i,
    description: 'Có thẻ <title> với nội dung',
    points: 10,
    required: false,
  },
  {
    pattern: /<h1[^>]*>[^<]+<\/h1>/i,
    description: 'Có tiêu đề <h1>',
    points: 15,
    required: true,
  },
  {
    pattern: /<p[^>]*>[^<]+<\/p>/i,
    description: 'Có đoạn văn <p>',
    points: 15,
    required: true,
  },
  {
    pattern: /<img\s+[^>]*src\s*=\s*["'][^"']+["'][^>]*>/i,
    description: 'Có thẻ <img> với src',
    points: 15,
    required: true,
  },
  {
    pattern: /<img\s+[^>]*alt\s*=\s*["'][^"']+["'][^>]*>/i,
    description: 'Có alt attribute cho hình ảnh (accessibility)',
    points: 20,
    required: false,
  },
  {
    pattern: /<a\s+[^>]*href\s*=\s*["'][^"']+["'][^>]*>/i,
    description: 'Có liên kết <a> với href',
    points: 15,
    required: true,
  },
  {
    pattern: /<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>/i,
    description: 'Có danh sách <ul> hoặc <ol>',
    points: 15,
    required: false,
  },
  {
    pattern: /<li[^>]*>[^<]+<\/li>/i,
    description: 'Có mục trong danh sách <li>',
    points: 10,
    required: false,
  },
  {
    pattern: /<div[^>]*>/i,
    description: 'Có thẻ <div>',
    points: 10,
    required: false,
  },
  {
    pattern: /<header[^>]*>|<\/header>|<nav[^>]*>|<\/nav>|<main[^>]*>|<\/main>/i,
    description: 'Có semantic tags (header, nav, main)',
    points: 20,
    required: false,
  },
];

// ============ CSS CHECK RULES ============

const CSS_RULES: CSSCheckRule[] = [
  {
    pattern: /<style[^>]*>|<\/style>/i,
    description: 'Có thẻ <style> hoặc CSS',
    points: 10,
    required: true,
  },
  {
    pattern: /font-family\s*:/i,
    description: 'Có font-family',
    points: 10,
    required: false,
  },
  {
    pattern: /color\s*:/i,
    description: 'Có color property',
    points: 10,
    required: false,
  },
  {
    pattern: /background(-color)?\s*:\s*#[0-9a-fA-F]{3,6}|background(-color)?\s*:\s*rgb/i,
    description: 'Có background-color',
    points: 10,
    required: false,
  },
  {
    pattern: /padding\s*:/i,
    description: 'Có padding',
    points: 15,
    required: false,
  },
  {
    pattern: /margin\s*:/i,
    description: 'Có margin',
    points: 15,
    required: false,
  },
  {
    pattern: /display\s*:\s*(flex|grid|block|inline)/i,
    description: 'Có display property (flex/grid/block)',
    points: 20,
    required: false,
  },
  {
    pattern: /justify-content\s*:/i,
    description: 'Có justify-content (Flexbox)',
    points: 15,
    required: false,
  },
  {
    pattern: /align-items\s*:/i,
    description: 'Có align-items (Flexbox)',
    points: 15,
    required: false,
  },
  {
    pattern: /border(-radius)?\s*:/i,
    description: 'Có border hoặc border-radius',
    points: 10,
    required: false,
  },
  {
    pattern: /box-sizing\s*:\s*border-box/i,
    description: 'Có box-sizing: border-box',
    points: 15,
    required: false,
  },
  {
    pattern: /@media\s*\(/i,
    description: 'Có media queries (responsive)',
    points: 25,
    required: false,
  },
  {
    pattern: /\.([a-zA-Z_-]+)\s*\{[^}]*\}/i,
    description: 'Có CSS class selector',
    points: 15,
    required: false,
  },
  {
    pattern: /#[a-zA-Z_-]+\s*\{[^}]*\}/i,
    description: 'Có CSS ID selector',
    points: 15,
    required: false,
  },
  {
    pattern: /@import\s+url\(/i,
    description: 'Có @import font (Google Fonts)',
    points: 10,
    required: false,
  },
];

// ============ CHECKER FUNCTIONS ============

/**
 * Check HTML code using regex rules
 */
export function checkHTML(code: string): {
  score: number;
  maxScore: number;
  checks: LabCheck[];
} {
  const checks: LabCheck[] = [];
  let score = 0;
  let maxScore = 0;

  for (const rule of HTML_RULES) {
    maxScore += rule.points;
    const passed = rule.pattern.test(code);
    
    if (passed) {
      score += rule.points;
    }

    checks.push({
      criterion: rule.description,
      points: rule.points,
      passed,
      feedback: passed 
        ? `✓ ${rule.description}`
        : rule.required 
          ? `✗ Thiếu: ${rule.description}`
          : `○ Không có: ${rule.description}`,
    });
  }

  return { score, maxScore, checks };
}

/**
 * Check CSS code using regex rules
 */
export function checkCSS(code: string): {
  score: number;
  maxScore: number;
  checks: LabCheck[];
} {
  const checks: LabCheck[] = [];
  let score = 0;
  let maxScore = 0;

  for (const rule of CSS_RULES) {
    maxScore += rule.points;
    const passed = rule.pattern.test(code);
    
    if (passed) {
      score += rule.points;
    }

    checks.push({
      criterion: rule.description,
      points: rule.points,
      passed,
      feedback: passed 
        ? `✓ ${rule.description}`
        : rule.required 
          ? `✗ Thiếu: ${rule.description}`
          : `○ Không có: ${rule.description}`,
    });
  }

  return { score, maxScore, checks };
}

/**
 * Extract CSS from HTML (inline styles + style tags)
 */
export function extractCSS(html: string): string {
  // Match content inside <style> tags
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (styleMatch) {
    return styleMatch.join('\n');
  }

  // Match inline style attributes
  const inlineMatch = html.match(/style\s*=\s*["']([^"']+)["']/gi);
  if (inlineMatch) {
    return inlineMatch.join('\n');
  }

  return '';
}

/**
 * Check for common accessibility issues
 */
export function checkAccessibility(html: string): {
  score: number;
  maxScore: number;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 100;
  const maxScore = 100;

  // Check for alt attribute on img
  if (!/<img[^>]*alt\s*=/i.test(html)) {
    issues.push('Thiếu alt attribute cho hình ảnh');
    score -= 25;
  }

  // Check for label in forms (if form exists)
  if (/<form/i.test(html) && !/<label/i.test(html)) {
    issues.push('Form không có label cho input');
    score -= 15;
  }

  // Check for semantic headings (h1 should come before h2)
  const h1Count = (html.match(/<h1/gi) || []).length;
  const h2Count = (html.match(/<h2/gi) || []).length;
  if (h2Count > 0 && h1Count === 0) {
    issues.push('Có thẻ h2 nhưng không có h1');
    score -= 15;
  }

  // Check heading hierarchy
  const headingOrder = html.match(/<h[1-6]/gi) || [];
  let prevLevel = 0;
  for (const tag of headingOrder) {
    const level = parseInt(tag.match(/h(\d)/i)?.[1] || '0');
    if (level > prevLevel + 1) {
      issues.push(`Cấu trúc heading không hợp lệ: ${tag}`);
      score -= 10;
      break;
    }
    prevLevel = level;
  }

  // Check for color contrast (simplified - just check if color/background exist)
  if (/color\s*:/i.test(html) && /background(-color)?\s*:/i.test(html)) {
    // Both exist - good sign
  } else if (/color\s*:/i.test(html) || /background(-color)?\s*:/i.test(html)) {
    issues.push('Chỉ có color HOẶC background, nên có cả hai để đảm bảo contrast');
    score -= 10;
  }

  // Ensure link text is descriptive (not "click here")
  if (/click\s+here|here|read\s+more/i.test(html)) {
    issues.push('Liên kết nên có text mô tả, không dùng "click here"');
    score -= 10;
  }

  return { score: Math.max(0, score), maxScore, issues };
}

/**
 * Check for common HTML errors
 */
export function checkHTMLErrors(html: string): {
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for unclosed tags (simple approach)
  const tags = ['div', 'p', 'span', 'a', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'];
  for (const tag of tags) {
    const openCount = (html.match(new RegExp(`<${tag}[^>]*>`, 'gi')) || []).length;
    const closeCount = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    
    if (tag !== 'img' && tag !== 'br' && tag !== 'hr') {
      // Self-closing tags don't need closing
      if (openCount > closeCount) {
        errors.push(`Thiếu thẻ đóng </${tag}> (${openCount - closeCount} thiếu)`);
      }
    }
  }

  // Check for attribute without quotes
  if (/\w+=[^"'\s>]/.test(html)) {
    errors.push('Thuộc tính HTML cần có giá trị trong dấu ngoặc kép');
  }

  // Check for inline styles vs class usage
  if (/<[^>]+style\s*=/i.test(html)) {
    const styleCount = (html.match(/style\s*=/gi) || []).length;
    const classCount = (html.match(/class\s*=/gi) || []).length;
    if (styleCount > classCount) {
      warnings.push('Nên dùng class thay vì inline styles để dễ bảo trì');
    }
  }

  // Check for deprecated tags
  const deprecatedTags = ['center', 'font', 'marquee', 'blink'];
  for (const tag of deprecatedTags) {
    if (new RegExp(`<${tag}[^>]*>`, 'gi').test(html)) {
      errors.push(`Thẻ <${tag}> đã bị deprecated, nên dùng CSS thay thế`);
    }
  }

  // Check for proper DOCTYPE
  if (!/<!doctype\s+html/i.test(html)) {
    warnings.push('Nên có DOCTYPE để trình duyệt render đúng');
  }

  return { errors, warnings };
}

// ============ MAIN LAB CHECKER ============

/**
 * Check submitted HTML/CSS code for a lab
 */
export function checkLabSubmission(
  labId: string,
  submittedCode: string,
  rubric: { criterion: string; points: number }[],
  requirements: { html: string[]; css: string[] }
): LabCheckResult {
  const checks: LabCheck[] = [];
  const feedback: string[] = [];
  const requirementsMet: Record<string, boolean> = {};

  // Extract HTML and CSS from combined code
  const htmlCode = submittedCode;
  let cssCode = '';

  // If code contains <style> tags, extract CSS
  if (/<style/i.test(submittedCode)) {
    cssCode = extractCSS(submittedCode);
  }

  // Check HTML
  const htmlResult = checkHTML(htmlCode);
  checks.push(...htmlResult.checks);

  // Check CSS
  const cssResult = checkCSS(cssCode);
  checks.push(...cssResult.checks);

  // Check accessibility
  const a11yResult = checkAccessibility(htmlCode);
  if (!a11yResult.issues.length) {
    feedback.push('✓ Đạt chuẩn accessibility cơ bản');
  } else {
    for (const issue of a11yResult.issues) {
      feedback.push(`⚠ ${issue}`);
    }
  }

  // Check for HTML errors
  const htmlErrors = checkHTMLErrors(htmlCode);
  if (htmlErrors.errors.length) {
    for (const error of htmlErrors.errors) {
      feedback.push(`✗ ${error}`);
    }
  }
  if (htmlErrors.warnings.length) {
    for (const warning of htmlErrors.warnings) {
      feedback.push(`○ ${warning}`);
    }
  }

  // Check specific requirements
  for (const req of requirements.html) {
    const passed = new RegExp(req, 'i').test(htmlCode);
    requirementsMet[req] = passed;
    if (!passed) {
      feedback.push(`✗ Thiếu yêu cầu: ${req}`);
    }
  }

  for (const req of requirements.css) {
    const passed = new RegExp(req, 'i').test(cssCode);
    requirementsMet[req] = passed;
    if (!passed) {
      feedback.push(`✗ Thiếu CSS: ${req}`);
    }
  }

  // Calculate score
  const totalScore = htmlResult.score + cssResult.score + a11yResult.score;
  const maxScore = htmlResult.maxScore + cssResult.maxScore + a11yResult.maxScore;

  // Check passed (>= 60%)
  const passed = totalScore >= maxScore * 0.6;

  return {
    labId,
    passed,
    score: totalScore,
    maxScore,
    checks,
    feedback,
    requirementsMet,
  };
}

/**
 * Quick validation check
 */
export function quickValidate(code: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Basic HTML structure check
  if (!/<html/i.test(code)) {
    errors.push('Thiếu thẻ <html>');
  }
  if (!/<head/i.test(code)) {
    errors.push('Thiếu thẻ <head>');
  }
  if (!/<body/i.test(code)) {
    errors.push('Thiếu thẻ <body>');
  }

  // Check for basic content
  if (!/<h[1-6]/i.test(code)) {
    errors.push('Thiếu thẻ tiêu đề (h1-h6)');
  }
  if (!/<p/i.test(code)) {
    errors.push('Thiếu thẻ đoạn văn (p)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get suggestions for improvement
 */
export function getImprovementSuggestions(result: LabCheckResult): string[] {
  const suggestions: string[] = [];

  // Find failed checks and suggest fixes
  for (const check of result.checks) {
    if (!check.passed) {
      if (check.criterion.includes('alt')) {
        suggestions.push('Thêm thuộc tính alt cho hình ảnh để tăng accessibility');
      }
      if (check.criterion.includes('semantic')) {
        suggestions.push('Sử dụng semantic tags như <header>, <nav>, <main>, <section>');
      }
      if (check.criterion.includes('display')) {
        suggestions.push('Thử dùng display: flex hoặc display: grid để bố cục');
      }
      if (check.criterion.includes('media')) {
        suggestions.push('Thêm @media queries để responsive trên mobile');
      }
    }
  }

  // Accessibility improvements
  if (result.feedback.some(f => f.includes('alt'))) {
    suggestions.push('Đảm bảo mỗi hình ảnh có alt text mô tả nội dung');
  }

  if (suggestions.length === 0) {
    suggestions.push('Code của bạn đã tốt! Thử thêm features nâng cao hơn.');
  }

  return [...new Set(suggestions)];
}
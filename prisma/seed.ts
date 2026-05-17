// ==========================================
// Seed Script - Tin12 Pro Cánh Diều
// Run: npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts
// Or: npm run db:seed
// ==========================================

import { PrismaClient } from '@prisma/client';
import { courses } from '../src/content/courses';
import { lessons } from '../src/content/lessons';
import { questions } from '../src/content/questions';
import { labs } from '../src/content/labs';
import { exams } from '../src/content/exams';
import { flashcards } from '../src/content/flashcards';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed for Tin12 Pro...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.questionAttempt.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.flashcardProgress.deleteMany();
  await prisma.labSubmission.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quizScore.deleteMany();
  await prisma.classEnrollment.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.flashcard.deleteMany();
  await prisma.lab.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.question.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.class.deleteMany();

  // Create demo users
  console.log('👤 Creating demo users...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tin12.edu.vn',
      name: 'Admin User',
      role: 'ADMIN',
      track: 'CS',
      passwordHash: 'demo-hash', // In production, use bcrypt
      xp: 0,
      level: 1,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@tin12.edu.vn',
      name: 'Giáo viên Demo',
      role: 'TEACHER',
      track: 'CS',
      passwordHash: 'demo-hash',
      xp: 100,
      level: 2,
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@tin12.edu.vn',
      name: 'Học sinh Demo',
      role: 'STUDENT',
      track: 'GENERAL',
      passwordHash: 'demo-hash',
      xp: 150,
      level: 2,
    },
  });

  console.log('✅ Created users:', { admin: admin.id, teacher: teacher.id, student: student.id });

  // Create courses and lessons
  console.log('📚 Creating courses...');
  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        icon: course.icon,
        track: course.track as 'CS' | 'ICT' | 'GENERAL',
        difficulty: course.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        estimatedHours: course.estimatedHours,
        color: course.color,
      },
    });

    console.log(`  - Created course: ${createdCourse.title}`);
  }

  // Create lessons
  console.log('📖 Creating lessons...');
  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: {
        id: lesson.id,
        slug: lesson.slug,
        moduleId: lesson.moduleId,
        title: lesson.title,
        description: lesson.description,
        estimatedMinutes: lesson.estimatedMinutes,
        difficulty: lesson.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        track: lesson.track as 'CS' | 'ICT' | 'GENERAL',
        order: lesson.order,
        content: JSON.stringify(lesson.content),
      },
    });
  }
  console.log(`  - Created ${lessons.length} lessons`);

  // Create questions
  console.log('❓ Creating questions...');
  for (const question of questions) {
    await prisma.question.create({
      data: {
        id: question.id,
        type: question.type as 'MCQ' | 'TRUE_FALSE',
        question: question.question,
        options: question.options ? JSON.stringify(question.options) : null,
        statements: question.statements ? JSON.stringify(question.statements) : null,
        correctAnswer: JSON.stringify(question.correctAnswer),
        explanation: question.explanation,
        difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        topic: question.topic,
      },
    });
  }
  console.log(`  - Created ${questions.length} questions`);

  // Create exams
  console.log('📝 Creating exams...');
  for (const exam of exams) {
    await prisma.exam.create({
      data: {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        part1Config: JSON.stringify({
          totalQuestions: exam.part1.totalQuestions,
          pointsEach: exam.part1.pointsEach,
        }),
        part2Config: JSON.stringify({
          totalQuestions: exam.part2.totalQuestions,
          pointsEach: exam.part2.pointsEach,
        }),
      },
    });
  }
  console.log(`  - Created ${exams.length} exams`);

  // Create labs
  console.log('💻 Creating labs...');
  for (const lab of labs) {
    await prisma.lab.create({
      data: {
        id: lab.id,
        slug: lab.slug,
        title: lab.title,
        description: lab.description,
        type: lab.type as 'HTML_CSS' | 'NETWORK' | 'DATA' | 'PROJECT',
        difficulty: lab.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        estimatedMinutes: lab.estimatedMinutes,
        starterCode: lab.starterCode,
        solutionCode: lab.solutionCode || null,
        instructions: JSON.stringify(lab.instructions),
        hints: JSON.stringify(lab.hints),
        rubric: JSON.stringify(lab.rubric),
      },
    });
  }
  console.log(`  - Created ${labs.length} labs`);

  // Create flashcards
  console.log('🃏 Creating flashcards...');
  for (const card of flashcards) {
    await prisma.flashcard.create({
      data: {
        id: card.id,
        deckId: card.deckId,
        front: card.front,
        back: card.back,
        topic: card.topic,
        difficulty: card.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
      },
    });
  }
  console.log(`  - Created ${flashcards.length} flashcards`);

  console.log('✅ Seed completed successfully!');
  console.log('');
  console.log('Demo accounts:');
  console.log('  Admin:   admin@tin12.edu.vn');
  console.log('  Teacher: teacher@tin12.edu.vn');
  console.log('  Student: student@tin12.edu.vn');
  console.log('  (Password for all: demo123)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
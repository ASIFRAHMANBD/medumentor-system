import { pool } from '../src/lib/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedContent() {
  try {
    console.log('Seeding content hierarchy...');
    
    // Clear existing content (optional, but good for idempotent runs if we truncate)
    // await pool.query('TRUNCATE TABLE programs CASCADE');

    // 1. Program
    const progRes = await pool.query(
      `INSERT INTO programs (title, description) 
       VALUES ($1, $2) 
       RETURNING id`,
      ['MBBS Video Lectures', 'Complete MBBS curriculum video series']
    );
    const programId = progRes.rows[0].id;
    console.log(`Created Program: ${programId}`);

    // 2. Stage: Beginner Journey
    const stageRes = await pool.query(
      `INSERT INTO stages (program_id, title, subtitle, color, sequence_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [programId, 'Beginner Journey', 'Foundations', '#F63049', 1]
    );
    const stageId = stageRes.rows[0].id;
    console.log(`Created Stage: ${stageId}`);

    // 3. Subject: Anatomy
    const subRes = await pool.query(
      `INSERT INTO subjects (stage_id, title, icon, sequence_order)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [stageId, 'Anatomy', 'activity', 1]
    );
    const subjectId = subRes.rows[0].id;
    console.log(`Created Subject: ${subjectId}`);

    // 4. Module: Neuro Anatomy
    const modRes = await pool.query(
      `INSERT INTO modules (subject_id, title, sequence_order)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [subjectId, 'Neuro Anatomy', 1]
    );
    const moduleId = modRes.rows[0].id;
    console.log(`Created Module: ${moduleId}`);

    // 5. Topic: Cranial Nerves (Deep structure)
    const topRes = await pool.query(
      `INSERT INTO topics (module_id, title, sequence_order)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [moduleId, 'Cranial Nerves', 1]
    );
    const topicId = topRes.rows[0].id;
    console.log(`Created Topic: ${topicId}`);

    // 6. Lesson: Cranial Nerves Intro (Inside Topic)
    const lessonRes = await pool.query(
      `INSERT INTO lessons (module_id, topic_id, title, sequence_order)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [moduleId, topicId, 'Introduction to Cranial Nerves', 1]
    );
    const lessonId = lessonRes.rows[0].id;
    console.log(`Created Lesson: ${lessonId}`);

    // 7. Content: Video 03
    await pool.query(
      `INSERT INTO content_items (lesson_id, type, title, video_url, duration_seconds, sequence_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [lessonId, 'video', 'Video 03: Olfactory Nerve', 'https://example.com/video03.mp4', 600, 1]
    );
    console.log('Created Video Content');

    // 8. Module Exam (Directly under Module)
    await pool.query(
      `INSERT INTO content_items (module_id, type, title, exam_data, sequence_order)
       VALUES ($1, $2, $3, $4, $5)`,
      [moduleId, 'exam', 'Neuro Anatomy Assessment', '{"questions": []}', 99]
    );
    console.log('Created Module Exam');

    // 9. Shallow Structure Example: Physiology -> Cell Phys -> Lesson -> Note
    const physRes = await pool.query(
      `INSERT INTO subjects (stage_id, title, icon, sequence_order)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [stageId, 'Physiology', 'zap', 2]
    );
    const physId = physRes.rows[0].id;

    const cellModRes = await pool.query(
      `INSERT INTO modules (subject_id, title, sequence_order)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [physId, 'Cell Physiology', 1]
    );
    const cellModId = cellModRes.rows[0].id;

    const cellLessonRes = await pool.query(
      `INSERT INTO lessons (module_id, title, sequence_order)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [cellModId, 'Cell Membrane Structure', 1]
    );
    const cellLessonId = cellLessonRes.rows[0].id;

    await pool.query(
      `INSERT INTO content_items (lesson_id, type, title, content_text, sequence_order)
       VALUES ($1, $2, $3, $4, $5)`,
      [cellLessonId, 'note', 'Membrane Transport PDF', 'Download PDF here...', 1]
    );
    console.log('Created Shallow Content Structure');

  } catch (error) {
    console.error('Error seeding content:', error);
  } finally {
    await pool.end();
  }
}

seedContent();

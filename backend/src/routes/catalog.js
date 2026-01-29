import { Router } from 'express';
import { pool } from '../lib/db.js';

const r = Router();

// Get all programs (root)
r.get('/programs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM programs ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stages (optionally filter by program)
r.get('/stages', async (req, res) => {
  try {
    const { programId } = req.query;
    let query = 'SELECT * FROM stages';
    const params = [];
    if (programId) {
      query += ' WHERE program_id = $1';
      params.push(programId);
    }
    query += ' ORDER BY sequence_order';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get subjects for a stage
r.get('/subjects', async (req, res) => {
  try {
    const { stageId } = req.query;
    if (!stageId) return res.status(400).json({ error: 'stageId required' });
    
    const { rows } = await pool.query(
      'SELECT * FROM subjects WHERE stage_id = $1 ORDER BY sequence_order',
      [stageId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get modules for a subject
r.get('/modules', async (req, res) => {
  try {
    const { subjectId } = req.query;
    if (!subjectId) return res.status(400).json({ error: 'subjectId required' });
    
    const { rows } = await pool.query(
      'SELECT * FROM modules WHERE subject_id = $1 ORDER BY sequence_order',
      [subjectId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get full details for a module (Topics -> Lessons OR Direct Lessons)
r.get('/modules/:id/details', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Get Module info
    const modRes = await pool.query('SELECT * FROM modules WHERE id = $1', [id]);
    if (modRes.rows.length === 0) return res.status(404).json({ error: 'Module not found' });
    const module = modRes.rows[0];

    // 2. Get Topics
    const topicsRes = await pool.query(
      'SELECT * FROM topics WHERE module_id = $1 ORDER BY sequence_order',
      [id]
    );
    const topics = topicsRes.rows;

    // 3. Get Lessons (both direct and topic-based)
    const lessonsRes = await pool.query(
      'SELECT * FROM lessons WHERE module_id = $1 ORDER BY sequence_order',
      [id]
    );
    const lessons = lessonsRes.rows;

    // 4. Get Content Items (Video/Note/Exam)
    // We need contents for lessons, AND contents directly under module (Exams)
    const contentRes = await pool.query(
      `SELECT * FROM content_items 
       WHERE module_id = $1 OR lesson_id IN (SELECT id FROM lessons WHERE module_id = $1)
       ORDER BY sequence_order`,
      [id]
    );
    const contents = contentRes.rows;

    // Assemble the tree
    // Map contents to lessons
    const lessonsWithContent = lessons.map(l => ({
      ...l,
      contents: contents.filter(c => c.lesson_id === l.id)
    }));

    // Map lessons to topics, or keep as direct children
    const result = {
      ...module,
      topics: topics.map(t => ({
        ...t,
        lessons: lessonsWithContent.filter(l => l.topic_id === t.id)
      })),
      // Direct lessons (no topic)
      direct_lessons: lessonsWithContent.filter(l => l.topic_id === null),
      // Direct module content (e.g. Module Exams)
      module_contents: contents.filter(c => c.module_id === parseInt(id) && c.lesson_id === null)
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default r;

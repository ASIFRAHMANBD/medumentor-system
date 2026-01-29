-- Content Hierarchy Schema

-- Programs (e.g. MBBS Video Lectures)
CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stages (e.g. Beginner Journey, Becoming Expert)
CREATE TABLE stages (
  id BIGSERIAL PRIMARY KEY,
  program_id BIGINT REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects (e.g. Anatomy, Physiology)
CREATE TABLE subjects (
  id BIGSERIAL PRIMARY KEY,
  stage_id BIGINT REFERENCES stages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon TEXT,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules (e.g. Neuro Anatomy, Thorax)
CREATE TABLE modules (
  id BIGSERIAL PRIMARY KEY,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Topics (Optional subdivision, e.g. Cranial Nerves)
CREATE TABLE topics (
  id BIGSERIAL PRIMARY KEY,
  module_id BIGINT REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons (Logical learning unit)
-- Can belong to a Topic OR directly to a Module
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  module_id BIGINT REFERENCES modules(id) ON DELETE CASCADE,
  topic_id BIGINT REFERENCES topics(id) ON DELETE CASCADE, -- Nullable
  title TEXT NOT NULL,
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Items (Video, Note, Exam)
CREATE TABLE content_items (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  module_id BIGINT REFERENCES modules(id) ON DELETE CASCADE, -- For Exams at Module level
  type TEXT NOT NULL CHECK (type IN ('video', 'note', 'exam')),
  title TEXT NOT NULL,
  
  -- Content specific data
  video_url TEXT,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  
  content_text TEXT,
  file_url TEXT,
  
  exam_data JSONB,
  
  sequence_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints based on rules
  CONSTRAINT content_placement CHECK (
    (lesson_id IS NOT NULL AND module_id IS NULL) OR 
    (lesson_id IS NULL AND module_id IS NOT NULL AND type = 'exam')
  )
);

-- Indexes for performance
CREATE INDEX idx_stages_program ON stages(program_id);
CREATE INDEX idx_subjects_stage ON subjects(stage_id);
CREATE INDEX idx_modules_subject ON modules(subject_id);
CREATE INDEX idx_topics_module ON topics(module_id);
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_lessons_topic ON lessons(topic_id);
CREATE INDEX idx_content_lesson ON content_items(lesson_id);
CREATE INDEX idx_content_module ON content_items(module_id);

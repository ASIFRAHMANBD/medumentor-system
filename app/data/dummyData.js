import { COLORS } from '../constants';
import { 
  Brain, Activity, Beaker, Microscope, Pill, BookOpen, Scale, 
  Stethoscope, Scissors, Heart, Baby 
} from 'lucide-react-native';

// Unified Demo Data Structure based on User Request
export const DEMO_DATA = [
  // 1️⃣ BEGINNER JOURNEY
  {
    id: "stage_beginner",
    title: "Beginner Journey",
    subtitle: "Foundations",
    color: COLORS.base,
    subjects: [
      {
        id: "subject_anatomy",
        title: "Anatomy",
        icon: 'brain',
        desc: "Structure",
        modules: [
          {
            id: "module_neuro_anatomy",
            title: "Neuro Anatomy",
            topics: [
              {
                id: "topic_cranial_nerves",
                title: "Cranial Nerves",
                lessons: [
                  {
                    id: "lesson_cn_overview",
                    title: "Overview of Cranial Nerves",
                    videos: [
                      { id: "video_cn_01", title: "Introduction to Cranial Nerves", duration: "10:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                      { id: "video_cn_02", title: "Functional Components", duration: "12:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
                      { id: "video_cn_03", title: "Classification of Cranial Nerves", duration: "08:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                      { id: "video_cn_04", title: "Clinical Correlation", duration: "15:20", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
                    ],
                    notes: [
                      { id: "note_cn_01", title: "Cranial Nerves Summary", pages: "5 pages", content: "Summary of all 12 cranial nerves..." },
                      { id: "note_cn_02", title: "Functional Columns Table", pages: "2 pages", content: "Detailed table of functional columns..." }
                    ]
                  }
                ]
              },
              {
                id: "topic_brainstem",
                title: "Brainstem",
                lessons: [
                  {
                    id: "lesson_medulla",
                    title: "Medulla Oblongata",
                    videos: [
                      { id: "video_bs_01", title: "External Features", duration: "14:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                      { id: "video_bs_02", title: "Internal Structure", duration: "16:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
                    ],
                    notes: [
                      { id: "note_bs_01", title: "Brainstem Cross-sections", pages: "6 pages", content: "Atlas of brainstem cross-sections..." }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "module_upper_limb",
            title: "Upper Limb",
            topics: [
              {
                id: "topic_pectoral_region",
                title: "Pectoral Region",
                lessons: [
                  {
                    id: "lesson_pectoral_muscles",
                    title: "Pectoral Muscles",
                    videos: [
                      { id: "video_ul_01", title: "Pectoralis Major", duration: "08:15", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                      { id: "video_ul_02", title: "Clavipectoral Fascia", duration: "06:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "module_thorax",
            title: "Thorax",
            topics: [
              {
                id: "topic_heart_anatomy",
                title: "Heart Anatomy",
                lessons: [
                  {
                    id: "lesson_heart_chambers",
                    title: "Chambers of Heart",
                    videos: [
                      { id: "video_th_01", title: "Right Atrium", duration: "12:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                      { id: "video_th_02", title: "Left Ventricle", duration: "10:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "subject_physiology",
        title: "Physiology",
        icon: 'activity',
        desc: "Function",
        modules: [
          {
            id: "module_cardiovascular",
            title: "Cardiovascular Physiology",
            lessons: [
              {
                id: "lesson_cv_basics",
                title: "Basics of Cardiac Function",
                videos: [
                      { id: "video_cv_01", title: "Heart as a Pump", duration: "09:15", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                      { id: "video_cv_02", title: "Cardiac Cycle", duration: "14:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                      { id: "video_cv_03", title: "Regulation of Heart Rate", duration: "11:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
                    ],
                    notes: [
                      { id: "note_cv_01", title: "Cardiac Cycle Phases", pages: "4 pages", content: "Phases of cardiac cycle explained..." },
                      { id: "note_cv_02", title: "ECG Basics", pages: "3 pages", content: "Understanding ECG waves and segments..." }
                    ]
              }
            ]
          },
          {
            id: "module_respiratory_phys",
            title: "Respiratory Physiology",
            lessons: [
              {
                id: "lesson_mechanics_breathing",
                title: "Mechanics of Breathing",
                videos: [
                  { id: "video_resp_01", title: "Muscles of Respiration", duration: "10:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
                  { id: "video_resp_02", title: "Pressure Changes", duration: "12:15", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "subject_biochemistry",
        title: "Biochemistry",
        icon: 'flask',
        desc: "Chemistry",
        modules: [
          {
            id: "module_protein_metabolism",
            title: "Protein Metabolism",
            lessons: [
              {
                id: "lesson_amino_acids",
                title: "Amino Acids",
                videos: [
                  { id: "video_bc_01", title: "Structure of Amino Acids", duration: "08:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                  { id: "video_bc_02", title: "Classification", duration: "10:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                  { id: "video_bc_03", title: "Essential vs Non-essential", duration: "07:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
                ],
                notes: [
                  { id: "note_bc_01", title: "Amino Acids Classification", pages: "3 pages", content: "Structural and metabolic classification..." }
                ]
              }
            ]
          },
          {
            id: "module_carb_metabolism",
            title: "Carbohydrate Metabolism",
            lessons: [
              {
                id: "lesson_glycolysis",
                title: "Glycolysis",
                videos: [
                  { id: "video_bc_04", title: "Pathway Overview", duration: "15:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                  { id: "video_bc_05", title: "Regulation", duration: "12:20", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
                ],
                notes: [
                  { id: "note_bc_02", title: "Glycolysis Pathway", pages: "6 pages", content: "Steps, enzymes and regulation..." }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // 4️⃣ GETTING FAMILIAR
  {
    id: "stage_familiar",
    title: "Getting Familiar",
    subtitle: "Bridging",
    color: COLORS.deep,
    subjects: [
      {
        id: "subject_forensic",
        title: "Forensic Medicine",
        icon: 'scale',
        desc: "Law",
        modules: [
          {
            id: "module_injuries",
            title: "Mechanical Injuries",
            lessons: [
              {
                id: "lesson_blunt_force",
                title: "Blunt Force Injuries",
                videos: [
                  { id: "video_fm_01", title: "Types of Blunt Injuries", duration: "13:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                  { id: "video_fm_02", title: "Medico-legal Importance", duration: "09:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
                  { id: "video_fm_03", title: "Case Studies", duration: "16:15", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
                ]
              }
            ]
          },
          {
            id: "module_toxicology",
            title: "Toxicology",
            lessons: [
              {
                id: "lesson_gen_tox",
                title: "General Toxicology",
                videos: [
                  { id: "video_fm_04", title: "Classification of Poisons", duration: "11:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                  { id: "video_fm_05", title: "Antidotes", duration: "14:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
                ],
                notes: [
                  { id: "note_fm_02", title: "Common Antidotes", pages: "2 pages", content: "List of poisons and their specific antidotes..." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'pharm',
        title: "Pharmacology",
        icon: 'pill',
        desc: "Drugs",
        modules: [
          {
            id: "module_gen_pharm",
            title: "General Pharmacology",
            lessons: [
              {
                id: "lesson_pk",
                title: "Pharmacokinetics",
                videos: [
                  { id: "video_pharm_01", title: "Absorption", duration: "12:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
                  { id: "video_pharm_02", title: "Distribution", duration: "10:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
                ],
                notes: [
                  { id: "note_pharm_01", title: "Pharmacokinetics Overview", pages: "8 pages", content: "ADME principles..." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'micro',
        title: "Microbiology",
        icon: 'book',
        desc: "Microbes",
        modules: [
          {
            id: "module_bacteriology",
            title: "General Bacteriology",
            lessons: [
              {
                id: "lesson_bacteria_struct",
                title: "Bacterial Structure",
                videos: [
                  { id: "video_micro_01", title: "Cell Wall", duration: "15:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                  { id: "video_micro_02", title: "Spores", duration: "08:45", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
                ],
                notes: [
                  { id: "note_micro_01", title: "Bacterial Cell Wall", pages: "5 pages", content: "Gram positive vs Gram negative bacterial cell wall structure differences." }
                ]
              }
            ]
          }
        ]
      },
    ]
  },

  // 5️⃣ BECOMING EXPERT
  {
    id: "stage_expert",
    title: "Becoming Expert",
    subtitle: "Clinical",
    color: COLORS.secondary,
    subjects: [
      {
        id: "subject_pathology",
        title: "Pathology",
        icon: 'microscope',
        desc: "Diseases",
        modules: [
          {
            id: "module_cell_injury",
            title: "Cell Injury",
            lessons: [
              {
                id: "lesson_reversible_injury",
                title: "Reversible Cell Injury",
                videos: [
                  { id: "video_path_01", title: "Cell Swelling", duration: "10:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                  { id: "video_path_02", title: "Fatty Change", duration: "12:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
                ],
                notes: [
                  { id: "note_path_01", title: "Cell Injury Patterns", pages: "4 pages", content: "Mechanisms of reversible cell injury including hydropic degeneration and fatty change." }
                ]
              }
            ]
          },
          {
            id: "module_neoplasia",
            title: "Neoplasia",
            lessons: [
              {
                id: "lesson_benign_vs_malignant",
                title: "Benign vs Malignant",
                videos: [
                  { id: "video_path_04", title: "Differences", duration: "14:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
                  { id: "video_path_05", title: "Metastasis", duration: "16:30", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
                ],
                notes: [
                  { id: "note_path_02", title: "Neoplasia Basics", pages: "7 pages", content: "Benign vs Malignant tumors and routes of metastasis." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'med',
        title: "Medicine",
        icon: 'stethoscope',
        desc: "Diagnosis",
        modules: [
          {
            id: "module_cardiology",
            title: "Cardiology",
            lessons: [
              {
                id: "lesson_mi",
                title: "Myocardial Infarction",
                videos: [
                  { id: "video_med_01", title: "Pathophysiology", duration: "18:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                  { id: "video_med_02", title: "Management", duration: "20:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
                ],
                notes: [
                  { id: "note_med_01", title: "MI Management", pages: "8 pages", content: "Protocol for Myocardial Infarction management and pathophysiology." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'surg',
        title: "Surgery",
        icon: 'scissors',
        desc: "Surgery",
        modules: [
          {
            id: "module_gen_surg",
            title: "General Surgery",
            lessons: [
              {
                id: "lesson_wound_healing",
                title: "Wound Healing",
                videos: [
                  { id: "video_surg_01", title: "Phases of Healing", duration: "12:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
                ],
                notes: [
                  { id: "note_surg_01", title: "Wound Healing Phases", pages: "5 pages", content: "Hemostasis, Inflammation, Proliferation, and Remodeling phases." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'obg',
        title: "OBG",
        icon: 'heart',
        desc: "Women",
        modules: [
          {
            id: "module_obstetrics",
            title: "Obstetrics",
            lessons: [
              {
                id: "lesson_anc",
                title: "Antenatal Care",
                videos: [
                  { id: "video_obg_01", title: "First Trimester", duration: "15:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
                ],
                notes: [
                  { id: "note_obg_01", title: "ANC Visits", pages: "6 pages", content: "Schedule and investigations for Antenatal Care visits." }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'peds',
        title: "Pediatrics",
        icon: 'baby',
        desc: "Children",
        modules: [
          {
            id: "module_growth",
            title: "Growth & Development",
            lessons: [
              {
                id: "lesson_milestones",
                title: "Developmental Milestones",
                videos: [
                  { id: "video_peds_01", title: "Motor Milestones", duration: "14:00", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
                ],
                notes: [
                  { id: "note_peds_01", title: "Milestones Chart", pages: "4 pages", content: "Gross motor, fine motor, social, and language milestones by age." }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
];

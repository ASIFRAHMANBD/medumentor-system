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
                    ],
                    quizBank: [
                      {
                        id: "quiz_cn_01",
                        title: "Cranial Nerves Basics",
                        description: "Test your knowledge of cranial nerves fundamentals",
                        timeLimit: 300, // 5 minutes
                        questions: [
                          {
                            id: "q_cn_01",
                            question: "How many pairs of cranial nerves are there?",
                            options: ["10", "12", "14", "16"],
                            correctAnswer: 1,
                            explanation: "There are 12 pairs of cranial nerves that emerge directly from the brain."
                          },
                          {
                            id: "q_cn_02",
                            question: "Which cranial nerve is responsible for smell?",
                            options: ["Optic nerve (II)", "Oculomotor nerve (III)", "Olfactory nerve (I)", "Trigeminal nerve (V)"],
                            correctAnswer: 2,
                            explanation: "The olfactory nerve (I) is responsible for the sense of smell."
                          },
                          {
                            id: "q_cn_03",
                            question: "Which cranial nerve controls eye movement?",
                            options: ["Facial nerve (VII)", "Vagus nerve (X)", "Oculomotor nerve (III)", "Hypoglossal nerve (XII)"],
                            correctAnswer: 2,
                            explanation: "The oculomotor nerve (III) controls most eye movements."
                          }
                        ]
                      }
                    ],
                    writtenExamBank: [
                      {
                        id: "wexam_cn_01",
                        title: "Cranial Nerves Written Exam",
                        description: "Fill in the blanks about cranial nerves",
                        questions: [
                          {
                            id: "wq_cn_01",
                            sentence: "There are _____ pairs of cranial nerves in humans.",
                            correctAnswer: "12"
                          },
                          {
                            id: "wq_cn_02",
                            sentence: "The _____ nerve (CN I) is responsible for the sense of smell.",
                            correctAnswer: "olfactory"
                          },
                          {
                            id: "wq_cn_03",
                            sentence: "The _____ nerve (CN III) controls most eye movements.",
                            correctAnswer: "oculomotor"
                          }
                        ]
                      }
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
                    ],
                    quizBank: [
                      {
                        id: "quiz_bs_01",
                        title: "Brainstem Anatomy Quiz",
                        description: "Test your knowledge of brainstem structures",
                        timeLimit: 240, // 4 minutes
                        questions: [
                          {
                            id: "q_bs_01",
                            question: "Which part of the brainstem contains the pyramids?",
                            options: ["Midbrain", "Pons", "Medulla oblongata", "Cerebellum"],
                            correctAnswer: 2,
                            explanation: "The pyramids are located in the medulla oblongata."
                          },
                          {
                            id: "q_bs_02",
                            question: "Which cranial nerve nuclei are found in the midbrain?",
                            options: ["III and IV", "V and VI", "VII and VIII", "IX and X"],
                            correctAnswer: 0,
                            explanation: "The oculomotor (III) and trochlear (IV) nuclei are in the midbrain."
                          }
                        ]
                      }
                    ],
                    writtenExamBank: [
                      {
                        id: "wexam_bs_01",
                        title: "Brainstem Written Exam",
                        description: "Fill in the blanks about brainstem anatomy",
                        questions: [
                          {
                            id: "wq_bs_01",
                            sentence: "The _____ are longitudinal ridges on the anterior surface of the medulla oblongata.",
                            correctAnswer: "pyramids"
                          },
                          {
                            id: "wq_bs_02",
                            sentence: "The oculomotor (III) and trochlear (IV) cranial nerve nuclei are located in the _____.",
                            correctAnswer: "midbrain"
                          }
                        ]
                      }
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
                    ],
                    quizBank: [
                      {
                        id: "quiz_ul_01",
                        title: "Pectoral Region Basics",
                        description: "Check your understanding of key pectoral muscles",
                        timeLimit: 240,
                        questions: [
                          {
                            id: "q_ul_01",
                            question: "Which muscle forms the bulk of the anterior chest wall?",
                            options: ["Pectoralis minor", "Pectoralis major", "Serratus anterior", "Deltoid"],
                            correctAnswer: 1,
                            explanation: "Pectoralis major is the large, fan-shaped muscle forming most of the anterior chest wall."
                          },
                          {
                            id: "q_ul_02",
                            question: "The clavipectoral fascia is most closely related to which muscle?",
                            options: ["Pectoralis major", "Subclavius", "Latissimus dorsi", "Trapezius"],
                            correctAnswer: 1,
                            explanation: "The clavipectoral fascia encloses the subclavius and pectoralis minor muscles."
                          }
                        ]
                      }
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
                    ],
                    quizBank: [
                      {
                        id: "quiz_th_01",
                        title: "Heart Chambers Quiz",
                        description: "Test the anatomy of cardiac chambers",
                        timeLimit: 300,
                        questions: [
                          {
                            id: "q_th_01",
                            question: "Which chamber has the thickest myocardium?",
                            options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
                            correctAnswer: 3,
                            explanation: "The left ventricle has the thickest wall as it pumps blood into the systemic circulation."
                          },
                          {
                            id: "q_th_02",
                            question: "The crista terminalis is a feature of which chamber?",
                            options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
                            correctAnswer: 0,
                            explanation: "Crista terminalis is a muscular ridge in the right atrium separating smooth and rough parts."
                          }
                        ]
                      }
                    ],
                    writtenExamBank: [
                      {
                        id: "wexam_th_01",
                        title: "Heart Chambers Written Exam",
                        description: "Fill in the blanks about cardiac chambers",
                        questions: [
                          {
                            id: "wq_th_01",
                            sentence: "The _____ ventricle has the thickest myocardium because it pumps blood into the systemic circulation.",
                            correctAnswer: "left"
                          },
                          {
                            id: "wq_th_02",
                            sentence: "The crista terminalis is a muscular ridge found in the right _____.",
                            correctAnswer: "atrium"
                          }
                        ]
                      }
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
                    ],
                    quizBank: [
                      {
                        id: "quiz_cv_01",
                        title: "Cardiac Physiology Quiz",
                        description: "Test your understanding of heart function",
                        timeLimit: 300, // 5 minutes
                        questions: [
                          {
                            id: "q_cv_01",
                            question: "What is the normal duration of the cardiac cycle at 75 bpm?",
                            options: ["0.3 seconds", "0.8 seconds", "1.2 seconds", "1.6 seconds"],
                            correctAnswer: 1,
                            explanation: "At 75 beats per minute, the cardiac cycle lasts 0.8 seconds (60/75 = 0.8)."
                          },
                          {
                            id: "q_cv_02",
                            question: "Which phase of the cardiac cycle has the longest duration?",
                            options: ["Atrial systole", "Ventricular systole", "Isovolumetric relaxation", "Rapid ventricular filling"],
                            correctAnswer: 1,
                            explanation: "Ventricular systole is the longest phase, lasting about 0.3 seconds."
                          },
                          {
                            id: "q_cv_03",
                            question: "What does the P wave represent on an ECG?",
                            options: ["Ventricular depolarization", "Atrial depolarization", "Ventricular repolarization", "Atrial repolarization"],
                            correctAnswer: 1,
                            explanation: "The P wave represents atrial depolarization (contraction)."
                          }
                        ]
                      }
                    ],
                    writtenExamBank: [
                      {
                        id: "wexam_cv_01",
                        title: "Cardiac Physiology Written Exam",
                        description: "Fill in the blanks about cardiac function",
                        questions: [
                          {
                            id: "wq_cv_01",
                            sentence: "At 75 bpm, the cardiac cycle lasts _____ seconds.",
                            correctAnswer: "0.8"
                          },
                          {
                            id: "wq_cv_02",
                            sentence: "The P wave on an ECG represents _____ depolarization.",
                            correctAnswer: "atrial"
                          },
                          {
                            id: "wq_cv_03",
                            sentence: "The QRS complex on an ECG represents _____ depolarization.",
                            correctAnswer: "ventricular"
                          }
                        ]
                      }
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
                ],
                quizBank: [
                  {
                    id: "quiz_resp_01",
                    title: "Breathing Mechanics Quiz",
                    description: "Review muscles and pressure changes in respiration",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_resp_01",
                        question: "Which muscle is the primary muscle of inspiration at rest?",
                        options: ["External intercostals", "Internal intercostals", "Diaphragm", "Scalenes"],
                        correctAnswer: 2,
                        explanation: "The diaphragm is the main muscle of quiet inspiration."
                      },
                      {
                        id: "q_resp_02",
                        question: "During inspiration, intra-alveolar pressure becomes:",
                        options: ["More than atmospheric", "Equal to atmospheric", "Less than atmospheric", "Unchanged"],
                        correctAnswer: 2,
                        explanation: "Expansion of the thoracic cavity reduces intra-alveolar pressure below atmospheric, drawing air in."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_bc_aa_01",
                    title: "Amino Acids Quiz",
                    description: "Test classification and basic properties of amino acids",
                    timeLimit: 300,
                    questions: [
                      {
                        id: "q_bc_aa_01",
                        question: "Which amino acid has a sulfur-containing side chain?",
                        options: ["Alanine", "Valine", "Methionine", "Glycine"],
                        correctAnswer: 2,
                        explanation: "Methionine contains sulfur in its side chain."
                      },
                      {
                        id: "q_bc_aa_02",
                        question: "Which of the following is an essential amino acid?",
                        options: ["Glycine", "Leucine", "Alanine", "Aspartate"],
                        correctAnswer: 1,
                        explanation: "Leucine is an essential branched-chain amino acid."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_fm_bf_01",
                    title: "Blunt Injuries Quiz",
                    description: "Quick check on types and medico-legal aspects",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_fm_bf_01",
                        question: "A bruise is best described as:",
                        options: ["Abrasion", "Laceration", "Contusion", "Incised wound"],
                        correctAnswer: 2,
                        explanation: "Bruise is another term for contusion caused by blunt force."
                      },
                      {
                        id: "q_fm_bf_02",
                        question: "Patterned injuries are most often seen with:",
                        options: ["Sharp weapons", "Blunt weapons", "Thermal burns", "Chemical injuries"],
                        correctAnswer: 1,
                        explanation: "Blunt objects can leave a pattern corresponding to the impacting surface."
                      }
                    ]
                  }
                ],
                writtenExamBank: [
                  {
                    id: "wexam_fm_bf_01",
                    title: "Blunt Injuries Written Exam",
                    description: "Fill in the blanks about blunt force injuries",
                    questions: [
                      {
                        id: "wq_fm_bf_01",
                        sentence: "A bruise is also known as a _____.",
                        correctAnswer: "contusion"
                      },
                      {
                        id: "wq_fm_bf_02",
                        sentence: "_____ injuries leave a pattern on the skin corresponding to the shape of the impacting surface.",
                        correctAnswer: "patterned"
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_pharm_pk_01",
                    title: "Pharmacokinetics Quiz",
                    description: "Test absorption, distribution, metabolism, and excretion concepts",
                    timeLimit: 300,
                    questions: [
                      {
                        id: "q_pharm_pk_01",
                        question: "First-pass metabolism primarily affects which route?",
                        options: ["Intravenous", "Sublingual", "Oral", "Intramuscular"],
                        correctAnswer: 2,
                        explanation: "Oral drugs pass through the liver before reaching systemic circulation, undergoing first-pass effect."
                      },
                      {
                        id: "q_pharm_pk_02",
                        question: "Volume of distribution reflects:",
                        options: ["Drug absorption rate", "Extent of drug distribution", "Drug clearance", "Bioavailability"],
                        correctAnswer: 1,
                        explanation: "A large volume of distribution indicates extensive distribution into tissues."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_micro_bs_01",
                    title: "Bacterial Structure Quiz",
                    description: "Check basic structural features of bacteria",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_micro_bs_01",
                        question: "The thick peptidoglycan layer is characteristic of:",
                        options: ["Gram-negative bacteria", "Gram-positive bacteria", "Mycoplasma", "Spirochetes"],
                        correctAnswer: 1,
                        explanation: "Gram-positive bacteria have a thick peptidoglycan cell wall."
                      },
                      {
                        id: "q_micro_bs_02",
                        question: "Bacterial spores are important because they:",
                        options: ["Cause motility", "Provide nutrition", "Increase virulence", "Ensure survival in harsh conditions"],
                        correctAnswer: 3,
                        explanation: "Spores allow bacteria to survive extreme environmental conditions."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_path_ri_01",
                    title: "Cell Injury Quiz",
                    description: "Differentiate reversible from irreversible cell injury",
                    timeLimit: 300,
                    questions: [
                      {
                        id: "q_path_ri_01",
                        question: "Which of the following is a feature of reversible injury?",
                        options: ["Nuclear pyknosis", "Cell swelling", "Karyorrhexis", "Karyolysis"],
                        correctAnswer: 1,
                        explanation: "Cell swelling is a hallmark of reversible injury due to failure of ion pumps."
                      },
                      {
                        id: "q_path_ri_02",
                        question: "Fatty change is most commonly seen in injury to the:",
                        options: ["Brain", "Heart", "Liver", "Kidney"],
                        correctAnswer: 2,
                        explanation: "Fatty change is classically described in liver cells following toxic or hypoxic injury."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_med_mi_01",
                    title: "Myocardial Infarction Quiz",
                    description: "Test key facts about MI presentation and management",
                    timeLimit: 300,
                    questions: [
                      {
                        id: "q_med_mi_01",
                        question: "The most common cause of acute MI is:",
                        options: ["Coronary artery spasm", "Atherosclerotic plaque rupture with thrombosis", "Coronary embolism", "Myocarditis"],
                        correctAnswer: 1,
                        explanation: "Rupture of an atherosclerotic plaque with superimposed thrombosis is the usual cause."
                      },
                      {
                        id: "q_med_mi_02",
                        question: "Early management of STEMI typically includes:",
                        options: ["Only beta blockers", "Immediate thrombolysis or PCI", "Long-term statin therapy alone", "Antibiotics"],
                        correctAnswer: 1,
                        explanation: "Reperfusion therapy with thrombolysis or PCI is crucial in early STEMI management."
                      }
                    ]
                  }
                ],
                writtenExamBank: [
                  {
                    id: "wexam_med_mi_01",
                    title: "Myocardial Infarction Written Exam",
                    description: "Fill in the blanks about MI",
                    questions: [
                      {
                        id: "wq_med_mi_01",
                        sentence: "The most common cause of acute MI is atherosclerotic plaque rupture with _____.",
                        correctAnswer: "thrombosis"
                      },
                      {
                        id: "wq_med_mi_02",
                        sentence: "Early management of STEMI includes reperfusion therapy such as thrombolysis or _____.",
                        correctAnswer: "PCI"
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_surg_wh_01",
                    title: "Wound Healing Quiz",
                    description: "Cover major phases and factors affecting healing",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_surg_wh_01",
                        question: "Which is the correct order of wound healing phases?",
                        options: [
                          "Inflammation, Hemostasis, Proliferation, Remodeling",
                          "Hemostasis, Inflammation, Proliferation, Remodeling",
                          "Proliferation, Hemostasis, Inflammation, Remodeling",
                          "Hemostasis, Proliferation, Inflammation, Remodeling"
                        ],
                        correctAnswer: 1,
                        explanation: "The classic order is Hemostasis → Inflammation → Proliferation → Remodeling."
                      },
                      {
                        id: "q_surg_wh_02",
                        question: "Which factor delays wound healing?",
                        options: ["Good nutrition", "Early mobilization", "Infection", "Adequate blood supply"],
                        correctAnswer: 2,
                        explanation: "Infection is a major local factor that impairs healing."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_obg_anc_01",
                    title: "Antenatal Care Quiz",
                    description: "Check basics of ANC schedule and key visits",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_obg_anc_01",
                        question: "The minimum recommended number of ANC visits in an uncomplicated pregnancy is:",
                        options: ["2", "3", "4", "8"],
                        correctAnswer: 2,
                        explanation: "WHO recommends at least four focused antenatal visits in low-risk pregnancies."
                      },
                      {
                        id: "q_obg_anc_02",
                        question: "Anemia screening in pregnancy is usually done by measuring:",
                        options: ["Serum ferritin", "Hemoglobin level", "Serum iron", "Transferrin saturation"],
                        correctAnswer: 1,
                        explanation: "Routine screening uses hemoglobin estimation; ferritin is reserved for specific indications."
                      }
                    ]
                  }
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
                ],
                quizBank: [
                  {
                    id: "quiz_peds_ms_01",
                    title: "Developmental Milestones Quiz",
                    description: "Key gross motor and language milestones",
                    timeLimit: 240,
                    questions: [
                      {
                        id: "q_peds_ms_01",
                        question: "A child typically sits without support by:",
                        options: ["3 months", "6 months", "9 months", "12 months"],
                        correctAnswer: 1,
                        explanation: "Most children can sit without support around 6 months of age."
                      },
                      {
                        id: "q_peds_ms_02",
                        question: "Meaningful two-word sentences are usually spoken by:",
                        options: ["9 months", "12 months", "18 months", "24 months"],
                        correctAnswer: 3,
                        explanation: "Two-word phrases (e.g., 'mama go') are expected around 2 years."
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
];

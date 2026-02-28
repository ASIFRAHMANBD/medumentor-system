import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, 
  Platform, ScrollView, Animated, ActivityIndicator, LayoutAnimation, UIManager,
  Modal, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, Clock, CheckCircle, Search, Filter,
  ChevronDown, ChevronRight, FileText, HelpCircle, Activity, Zap, X,
  PlayCircle, Award, BarChart3, Timer,
  Brain, Beaker, Microscope, Pill, Scale, Stethoscope, Scissors, Heart, Baby, BookOpen
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { DEMO_DATA } from '../data/dummyData';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function QuizListScreen({ navigation, route }) {
  const lessonId = route?.params?.lessonId || null;
  const isLessonMode = !!lessonId;
  
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loadingLesson, setLoadingLesson] = useState(isLessonMode);

  const [stages, setStages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [activeStageId, setActiveStageId] = useState(null);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [loadingTree, setLoadingTree] = useState(!isLessonMode);
  const [loadingModules, setLoadingModules] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  useEffect(() => {
    if (isLessonMode) {
      loadLessonData(lessonId);
    }
  }, [lessonId, isLessonMode]);

  const loadLessonData = (targetLessonId) => {
    setLoadingLesson(true);
    
    let foundLesson = null;
    
    DEMO_DATA.forEach(stage => {
      stage.subjects?.forEach(subject => {
        subject.modules?.forEach(module => {
          module.topics?.forEach(topic => {
            topic.lessons?.forEach(lesson => {
              if (lesson.id === targetLessonId && lesson.quizBank) {
                foundLesson = lesson;
              }
            });
          });
          module.lessons?.forEach(lesson => {
            if (lesson.id === targetLessonId && lesson.quizBank) {
              foundLesson = lesson;
            }
          });
        });
      });
    });

    if (foundLesson) {
      setLesson(foundLesson);
      setQuizzes(foundLesson.quizBank || []);
    }
    
    setLoadingLesson(false);
  };

  useEffect(() => {
    if (!isLessonMode) {
      loadStages();
    }
  }, [isLessonMode]);

  const loadStages = () => {
    setStages(DEMO_DATA);
    if (DEMO_DATA.length > 0) {
      setActiveStageId(DEMO_DATA[0].id);
    }
    setLoadingTree(false);
  };

  useEffect(() => {
    if (activeStageId && !isLessonMode) {
      loadSubjects(activeStageId);
    }
  }, [activeStageId, isLessonMode]);

  const loadSubjects = (stageId) => {
    const stage = DEMO_DATA.find(s => s.id === stageId);
    if (stage) {
      setSubjects(stage.subjects || []);
      if (stage.subjects && stage.subjects.length > 0) {
        setActiveSubjectId(stage.subjects[0].id);
      } else {
        setActiveSubjectId(null);
        setModules([]);
      }
    }
  };

  useEffect(() => {
    if (activeSubjectId && !isLessonMode) {
      loadModules(activeSubjectId);
    }
  }, [activeSubjectId, isLessonMode]);

  const loadModules = (subjectId) => {
    setLoadingModules(true);
    let foundModules = [];
    
    const stage = DEMO_DATA.find(s => s.id === activeStageId);
    if (stage) {
      const subject = stage.subjects.find(s => s.id === subjectId);
      if (subject) {
        foundModules = subject.modules || [];
      }
    }

    setModules(foundModules);
    setExpandedModuleId(null);
    setLoadingModules(false);
  };

  const toggleModule = (moduleId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(moduleId);
    }
  };

  const navigateToQuiz = (quiz) => {
    navigation.navigate('QuizPlay', { 
      quizId: quiz.id,
      lessonId: lessonId,
      quizData: quiz
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuizCard = ({ item: quiz }) => (
    <TouchableOpacity 
      style={styles.quizCard}
      onPress={() => navigateToQuiz(quiz)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.quizCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.quizHeader}>
          <View style={styles.quizIconContainer}>
            <Award size={24} color={COLORS.white} />
          </View>
          <View style={styles.quizInfo}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizDescription}>{quiz.description}</Text>
          </View>
        </View>
        
        <View style={styles.quizMeta}>
          <View style={styles.metaItem}>
            <Timer size={16} color={COLORS.white} />
            <Text style={styles.metaText}>{formatTime(quiz.timeLimit)}</Text>
          </View>
          <View style={styles.metaItem}>
            <BarChart3 size={16} color={COLORS.white} />
            <Text style={styles.metaText}>{quiz.questions.length} questions</Text>
          </View>
        </View>
        
        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Quiz</Text>
          <PlayCircle size={20} color={COLORS.white} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderStageTab = (stage) => {
    const isActive = activeStageId === stage.id;
    return (
      <TouchableOpacity 
        key={stage.id} 
        onPress={() => setActiveStageId(stage.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isActive ? [stage.color || COLORS.primary, COLORS.deep] : [COLORS.white, COLORS.white]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.stageTab, isActive ? styles.stageTabActive : {}]}
        >
          <Text style={[styles.stageTabText, isActive ? styles.stageTabTextActive : {}]}>
            {stage.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderSubjectChip = (subject) => {
    const isActive = activeSubjectId === subject.id;
    
    let IconComponent = Activity;
    switch (subject.icon) {
      case 'brain': IconComponent = Brain; break;
      case 'activity': IconComponent = Activity; break;
      case 'flask': IconComponent = Beaker; break;
      case 'microscope': IconComponent = Microscope; break;
      case 'pill': IconComponent = Pill; break;
      case 'book': IconComponent = BookOpen; break;
      case 'scale': IconComponent = Scale; break;
      case 'stethoscope': IconComponent = Stethoscope; break;
      case 'scissors': IconComponent = Scissors; break;
      case 'heart': IconComponent = Heart; break;
      case 'baby': IconComponent = Baby; break;
      default: IconComponent = Activity;
    }

    return (
      <TouchableOpacity 
        key={subject.id} 
        onPress={() => setActiveSubjectId(subject.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isActive ? [COLORS.secondary, COLORS.deep] : [COLORS.white, COLORS.white]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.subjectChip, isActive ? {borderWidth: 0} : {}]}
        >
          <IconComponent size={14} color={isActive ? COLORS.white : COLORS.textSecondary} />
          <Text style={[styles.subjectChipText, isActive ? styles.subjectChipTextActive : {}]}>
            {subject.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderLessonWithQuiz = (lessonItem) => {
    const quizCount = lessonItem.quizBank?.length || 0;
    if (!quizCount) return null;

    return (
      <View key={lessonItem.id} style={styles.lessonContainer}>
        <Text style={styles.lessonTitle}>{lessonItem.title}</Text>
        <View style={styles.lessonContent}>
          <TouchableOpacity 
            style={styles.quizEntryButton}
            onPress={() => navigation.navigate('QuizList', { lessonId: lessonItem.id })}
            activeOpacity={0.8}
          >
            <View style={styles.quizEntryInfo}>
              <Text style={styles.quizEntryTitle}>QA Bank</Text>
              <Text style={styles.quizEntrySubtitle}>
                {quizCount} quiz{quizCount !== 1 ? 'zes' : ''} available
              </Text>
            </View>
            <ChevronRight size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderModuleCardBrowser = ({ item }) => {
    const isExpanded = expandedModuleId === item.id;

    const hasQuizzes = (item.topics?.some(t => t.lessons?.some(l => l.quizBank && l.quizBank.length > 0))) ||
                     (item.lessons?.some(l => l.quizBank && l.quizBank.length > 0));

    return (
      <View style={styles.moduleCardContainer}>
        <TouchableOpacity 
          style={[styles.moduleHeader, isExpanded && styles.moduleHeaderExpanded]}
          onPress={() => toggleModule(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>{item.title}</Text>
            <Text style={styles.moduleSubtitle}>
              {hasQuizzes ? 'Quizzes available' : 'No quizzes yet'}
            </Text>
          </View>
          {isExpanded ? 
            <ChevronDown size={20} color={COLORS.primary} /> : 
            <ChevronRight size={20} color={COLORS.textSecondary} />
          }
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.moduleBody}>
            {item.topics?.map(topic => {
              const topicHasQuizzes = topic.lessons?.some(l => l.quizBank && l.quizBank.length > 0);
              if (!topicHasQuizzes) return null;

              return (
                <View key={topic.id} style={styles.topicContainer}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  {topic.lessons?.map(renderLessonWithQuiz)}
                </View>
              );
            })}

            {item.lessons?.map(renderLessonWithQuiz)}

            {!hasQuizzes && (
              <Text style={styles.emptyModuleText}>No quizzes available for this module yet.</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  if (isLessonMode) {
    if (loadingLesson) {
      return (
        <LinearGradient
          colors={[COLORS.deep, COLORS.base]}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.white} />
              <Text style={styles.loadingText}>Loading quizzes...</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      );
    }

    if (quizzes.length === 0) {
      return (
        <LinearGradient
          colors={[COLORS.deep, COLORS.base]}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.emptyContainer}>
              <Award size={64} color={COLORS.gray} />
              <Text style={styles.emptyTitle}>No Quizzes Available</Text>
              <Text style={styles.emptyText}>This lesson doesn't have any quizzes yet.</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient
        colors={[COLORS.deep, COLORS.base]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>QA Bank</Text>
            <View style={styles.headerRight} />
          </View>

          {lesson && (
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.quizCount}>
                {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} available
              </Text>
            </View>
          )}

          <FlatList
            data={quizzes}
            renderItem={renderQuizCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.quizzesList}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (loadingTree) {
    return (
      <LinearGradient
        colors={[COLORS.deep, COLORS.base]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
            <Text style={styles.loadingText}>Loading QA Bank...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.deep, COLORS.base]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QA Bank</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.stageTabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stageTabsContent}>
            {stages.map(renderStageTab)}
          </ScrollView>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
            {subjects.map(renderSubjectChip)}
          </ScrollView>
        </View>

        {loadingModules ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        ) : (
          <FlatList
            data={modules}
            renderItem={renderModuleCardBrowser}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Select a subject to view QA Bank.</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerRight: {
    width: 40,
  },
  lessonInfo: {
    padding: 20,
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  quizCount: {
    fontSize: 14,
    color: COLORS.gray,
  },
  quizzesList: {
    padding: 16,
    paddingBottom: 32,
  },
  quizCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quizCardGradient: {
    padding: 20,
    borderRadius: 16,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quizMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  startButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  stageTabsContainer: {
    marginBottom: 16,
  },
  stageTabsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  stageTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stageTabActive: {
    borderWidth: 0,
  },
  stageTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B', 
  },
  stageTabTextActive: {
    color: COLORS.white,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  subjectChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  subjectChipTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
    paddingBottom: 40,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  moduleCardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 0,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  moduleHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.base,
    marginBottom: 4,
  },
  moduleSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  moduleBody: {
    backgroundColor: '#F8FAFC',
    paddingBottom: 8,
  },
  emptyModuleText: {
    padding: 20,
    textAlign: 'center',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  topicContainer: {
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.deep,
    backgroundColor: '#FFF1F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  lessonContainer: {
    paddingLeft: 0,
  },
  lessonContent: {
    paddingHorizontal: 12,
  },
  quizEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  quizEntryInfo: {
    flex: 1,
  },
  quizEntryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.base,
    marginBottom: 4,
  },
  quizEntrySubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

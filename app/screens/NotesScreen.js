import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, 
  Platform, ScrollView, Animated, ActivityIndicator, LayoutAnimation, UIManager,
  Modal, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, FileText, Clock, CheckCircle, Search, Filter,
  ChevronDown, ChevronRight, BookOpen, HelpCircle, Activity, Zap, X,
  Brain, Beaker, Microscope, Pill, Scale, Stethoscope, Scissors, Heart, Baby
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

export default function NotesScreen({ navigation }) {
  // Data State
  const [stages, setStages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modules, setModules] = useState([]);
  
  // Selection State
  const [activeStageId, setActiveStageId] = useState(null);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [loadingModules, setLoadingModules] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  // 1. Fetch Stages on Mount (from DEMO_DATA)
  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = () => {
    // Simulate API delay
    setTimeout(() => {
      setStages(DEMO_DATA);
      if (DEMO_DATA.length > 0) {
        setActiveStageId(DEMO_DATA[0].id);
      }
      setLoading(false);
    }, 500);
  };

  // 2. Fetch Subjects when Stage Changes
  useEffect(() => {
    if (activeStageId) {
      loadSubjects(activeStageId);
    }
  }, [activeStageId]);

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

  // 3. Fetch Modules when Subject Changes
  useEffect(() => {
    if (activeSubjectId) {
      loadModules(activeSubjectId);
    }
  }, [activeSubjectId]);

  const loadModules = (subjectId) => {
    setLoadingModules(true);
    // Simulate API delay
    setTimeout(() => {
      // Find subject across all stages (or within active stage)
      let foundModules = [];
      
      const stage = DEMO_DATA.find(s => s.id === activeStageId);
      if (stage) {
        const subject = stage.subjects.find(s => s.id === subjectId);
        if (subject) {
          foundModules = subject.modules || [];
        }
      }

      setModules(foundModules);
      setExpandedModuleId(null); // Reset expansion
      setLoadingModules(false);
    }, 300);
  };

  // 4. Handle Module Expansion
  const toggleModule = (moduleId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(moduleId);
    }
  };

  // Render Helpers
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
    
    // Map icon name to Lucide component
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

  const renderNoteItem = (note, index) => {
    return (
      <TouchableOpacity 
        key={note.id} 
        style={styles.noteItem}
        onPress={() => setViewingNote(note)}
      >
        <View style={styles.noteIndexBox}>
          <Text style={styles.noteIndexText}>{index + 1}</Text>
        </View>
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.notePages}>{note.pages}</Text>
        </View>
        <FileText size={24} color={COLORS.primary} />
      </TouchableOpacity>
    );
  };

  const renderLesson = (lesson) => {
    // Only render if there are notes
    if (!lesson.notes || lesson.notes.length === 0) return null;

    return (
      <View key={lesson.id} style={styles.lessonContainer}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <View style={styles.lessonContent}>
          {lesson.notes.map((note, index) => renderNoteItem(note, index))}
        </View>
      </View>
    );
  };

  const renderModuleCard = ({ item }) => {
    const isExpanded = expandedModuleId === item.id;
    
    // Check if module has any notes content
    const hasNotes = (item.topics?.some(t => t.lessons?.some(l => l.notes?.length > 0))) ||
                     (item.lessons?.some(l => l.notes?.length > 0));

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
              {hasNotes ? 'Notes Available' : 'No Notes'}
            </Text>
          </View>
          {isExpanded ? 
            <ChevronDown size={20} color={COLORS.primary} /> : 
            <ChevronRight size={20} color={COLORS.textSecondary} />
          }
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.moduleBody}>
            {/* 1. Topics with Lessons */}
            {item.topics?.map(topic => {
              const topicHasNotes = topic.lessons?.some(l => l.notes?.length > 0);
              if (!topicHasNotes) return null;

              return (
                <View key={topic.id} style={styles.topicContainer}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  {topic.lessons?.map(renderLesson)}
                </View>
              );
            })}

            {/* 2. Direct Lessons (No Topic) */}
            {item.lessons?.map(renderLesson)}
            
            {/* Empty State */}
            {!hasNotes && (
              <Text style={styles.emptyModuleText}>No notes available for this module yet.</Text>
            )}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.deep, COLORS.base]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Smart Notes</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Stage Tabs */}
        <View style={styles.stageTabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stageTabsContent}>
            {stages.map(renderStageTab)}
          </ScrollView>
        </View>

        {/* Subject Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
            {subjects.map(renderSubjectChip)}
          </ScrollView>
        </View>

        {/* Modules List (Tree) */}
        {loadingModules ? (
           <View style={styles.center}>
             <ActivityIndicator size="large" color={COLORS.white} />
           </View>
        ) : (
          <FlatList
            data={modules}
            renderItem={renderModuleCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Select a subject to view notes.</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>

      {/* Note Viewer Modal */}
      <Modal
        visible={!!viewingNote}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setViewingNote(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                {viewingNote?.title}
              </Text>
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setViewingNote(null)}
              >
                <X size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.noteContentScroll}>
              <Text style={styles.noteBodyText}>{viewingNote?.content}</Text>
              <View style={styles.notePlaceholder}>
                 <FileText size={48} color={COLORS.primary} style={{opacity: 0.5}} />
                 <Text style={styles.notePlaceholderText}>Full note content would appear here...</Text>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
               <TouchableOpacity style={styles.downloadButton}>
                 <Text style={styles.downloadButtonText}>Download PDF</Text>
               </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginLeft: -8,
  },
  iconButton: {
    padding: 8,
    marginRight: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  
  // Stage Tabs
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

  // Filters
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

  // List
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
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  // Module Card (Accordion)
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

  // Tree Nodes
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
  lessonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  lessonContent: {
    paddingHorizontal: 12,
  },
  
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  noteIndexBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  noteIndexText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.base,
    marginBottom: 4,
  },
  notePages: {
    fontSize: 12,
    color: '#94A3B8',
  },

  // Note Viewer Modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.base,
    flex: 1,
    marginRight: 16,
  },
  closeModalButton: {
    padding: 4,
  },
  noteContentScroll: {
    flex: 1,
  },
  noteBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
    marginBottom: 24,
  },
  notePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginTop: 20,
  },
  notePlaceholderText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 14,
  },
  modalFooter: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

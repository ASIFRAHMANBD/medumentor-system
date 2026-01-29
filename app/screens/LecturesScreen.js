import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, 
  Platform, ScrollView, Animated, ActivityIndicator, LayoutAnimation, UIManager,
  Modal, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';
import { 
  ChevronLeft, PlayCircle, Clock, CheckCircle, Search, Filter,
  ChevronDown, ChevronRight, FileText, HelpCircle, Activity, Zap, X
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

export default function LecturesScreen({ navigation }) {
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
  const [playingVideo, setPlayingVideo] = useState(null);
  // No longer needed moduleDetails cache as we have full tree in memory

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
      // Since we know activeStageId, we can find it faster, but searching globally is safer if IDs are unique
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
    // Map icon name to Lucide component (simplified mapping)
    const IconComponent = subject.icon === 'activity' ? Activity : 
                          subject.icon === 'zap' ? Zap : 
                          Activity; // Default

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

  const renderVideoItem = (video, index) => {
    return (
      <TouchableOpacity 
        key={video.id} 
        style={styles.videoItem}
        onPress={() => setPlayingVideo(video)}
      >
        <View style={styles.videoIndexBox}>
          <Text style={styles.videoIndexText}>{index + 1}</Text>
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoDuration}>{video.duration}</Text>
        </View>
        <PlayCircle size={24} color={COLORS.primary} fill={COLORS.white} />
      </TouchableOpacity>
    );
  };

  const renderLesson = (lesson) => (
    <View key={lesson.id} style={styles.lessonContainer}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <View style={styles.lessonContent}>
        {lesson.videos?.map((video, index) => renderVideoItem(video, index))}
      </View>
    </View>
  );

  const renderModuleCard = ({ item }) => {
    const isExpanded = expandedModuleId === item.id;
    // item itself contains topics and lessons now
    
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
              {item.topics?.length ? `${item.topics.length} Topics` : 
               item.lessons?.length ? `${item.lessons.length} Lessons` : 'No Content'}
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
            {item.topics?.map(topic => (
              <View key={topic.id} style={styles.topicContainer}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                {topic.lessons?.map(renderLesson)}
              </View>
            ))}

            {/* 2. Direct Lessons (No Topic) */}
            {item.lessons?.map(renderLesson)}
            
            {/* Empty State */}
            {(!item.topics?.length && !item.lessons?.length) && (
              <Text style={styles.emptyModuleText}>No content available yet.</Text>
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
          <Text style={styles.headerTitle}>Lectures</Text>
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
                <Text style={styles.emptyText}>Select a subject to view modules.</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>

      {/* Video Player Modal */}
      <Modal
        visible={!!playingVideo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPlayingVideo(null)}
      >
        <View style={styles.videoModalContainer}>
          <View style={styles.videoPlayerWrapper}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoPlayerTitle} numberOfLines={1}>
                {playingVideo?.title}
              </Text>
              <TouchableOpacity 
                style={styles.closeVideoButton}
                onPress={() => setPlayingVideo(null)}
              >
                <X size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            
            <Video
              source={{ uri: playingVideo?.url }}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              onPlaybackStatusUpdate={status => {
                if (status.didJustFinish) {
                  // Optional: close or show replay
                }
              }}
            />
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
  
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  videoIndexBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoIndexText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.base,
    marginBottom: 4,
  },
  videoDuration: {
    fontSize: 12,
    color: '#94A3B8',
  },

  // Video Player Modal
  videoModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayerWrapper: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
  },
  videoHeader: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  videoPlayerTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  closeVideoButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
});

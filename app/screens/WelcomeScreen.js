import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Stethoscope, BookOpen, ChevronRight, GraduationCap, PlayCircle, Brain, Activity, Users, Star,
  Beaker, Heart, Microscope, Pill, Scale, Baby, Scissors, Video, FileText, Mic, HelpCircle, LogOut
} from 'lucide-react-native';
import { COLORS } from '../constants';
import AuthForm from '../components/AuthForm';

const STAGES = [
  {
    id: 1,
    title: "Beginner's Journey",
    subtitle: "Foundations of Medicine",
    description: "Build a strong base with core pre-clinical sciences. Understand the normal structure and function of the human body.",
    color: COLORS.base,
    subjects: [
      { name: "Anatomy", icon: <Brain size={20} color={COLORS.white} />, desc: "Structure of human body" },
      { name: "Physiology", icon: <Activity size={20} color={COLORS.white} />, desc: "Functions of body systems" },
      { name: "Biochemistry", icon: <Beaker size={20} color={COLORS.white} />, desc: "Chemical processes" },
    ]
  },
  {
    id: 2,
    title: "Getting Familiar",
    subtitle: "Bridging Sciences",
    description: "Connect basic sciences to clinical practice. Learn about diseases, drugs, and diagnostic methods.",
    color: COLORS.deep,
    subjects: [
      { name: "Pathology", icon: <Microscope size={20} color={COLORS.white} />, desc: "Study of diseases" },
      { name: "Pharmacology", icon: <Pill size={20} color={COLORS.white} />, desc: "Drug actions & uses" },
      { name: "Microbiology", icon: <BookOpen size={20} color={COLORS.white} />, desc: "Infectious agents" },
      { name: "Forensic Med", icon: <Scale size={20} color={COLORS.white} />, desc: "Medical jurisprudence" },
    ]
  },
  {
    id: 3,
    title: "Becoming Expert",
    subtitle: "Clinical Mastery",
    description: "Master the art of diagnosis and treatment. Rotate through clinical wards and learn patient care.",
    color: COLORS.secondary,
    subjects: [
      { name: "Medicine", icon: <Stethoscope size={20} color={COLORS.white} />, desc: "Diagnosis & treatment" },
      { name: "Surgery", icon: <Scissors size={20} color={COLORS.white} />, desc: "Operative procedures" },
      { name: "OBG", icon: <Heart size={20} color={COLORS.white} />, desc: "Women's health" },
      { name: "Pediatrics", icon: <Baby size={20} color={COLORS.white} />, desc: "Child healthcare" },
    ]
  }
];

const METHODS = [
  { title: "Video Lectures", icon: <Video size={24} color={COLORS.white} />, desc: "Conceptual clarity from experts", color: COLORS.primary },
  { title: "Smart Notes", icon: <FileText size={24} color={COLORS.white} />, desc: "High-yield summary for revision", color: COLORS.secondary },
  { title: "Audio Viva", icon: <Mic size={24} color={COLORS.white} />, desc: "Prepare for oral examinations", color: COLORS.deep },
  { title: "Q&A Bank", icon: <HelpCircle size={24} color={COLORS.white} />, desc: "Practice past year questions", color: COLORS.base },
];

const EXAMS = [
  { year: "1st Professional", subjects: "Anatomy, Physiology, Biochemistry", color: COLORS.base },
  { year: "2nd Professional", subjects: "Pathology, Microbiology, Pharmacology", color: COLORS.deep },
  { year: "3rd Professional", subjects: "ENT, Ophthalmology, Community Medicine", color: COLORS.secondary },
  { year: "4th Professional", subjects: "Medicine, Surgery, OBG, Pediatrics", color: COLORS.primary },
];

export default function WelcomeScreen({ navigation }) {
  const [user, setUser] = React.useState(null);

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    navigation.replace('Dashboard', { user: data.user });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={[COLORS.base, COLORS.deep]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Stethoscope size={64} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Medumentor</Text>
            <Text style={styles.subtitle}>Master Medicine with Mentorship</Text>
            
            {/* Social Proof / Stats */}
            <View style={styles.statsRow}>
              <StatItem icon={<Users size={16} color={COLORS.secondary} />} text="10k+ Learners" />
              <View style={styles.statDivider} />
              <StatItem icon={<PlayCircle size={16} color={COLORS.secondary} />} text="500+ Lectures" />
              <View style={styles.statDivider} />
              <StatItem icon={<Star size={16} color={COLORS.secondary} />} text="4.9/5 Rating" />
            </View>
          </View>

          {/* Auth Section */}
          <View style={styles.authSection}>
            {user ? (
              <View style={styles.loggedInCard}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userInitials}>{user.name?.charAt(0).toUpperCase() || 'U'}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.welcomeTitle}>Welcome back,</Text>
                  <Text style={styles.welcomeName}>{user.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setUser(null)} style={styles.logoutBtn}>
                  <LogOut size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            ) : (
              <AuthForm onLoginSuccess={handleLoginSuccess} />
            )}
          </View>

          {/* Features / Value Props */}
          <View style={styles.features}>
            <FeatureItem 
              icon={<GraduationCap size={24} color={COLORS.white} />}
              title="Expert-Led Learning"
              desc="Learn from top medical professionals"
            />
            <FeatureItem 
              icon={<Brain size={24} color={COLORS.white} />}
              title="Interactive 3D Anatomy"
              desc="Visualize complex structures easily"
            />
            <FeatureItem 
              icon={<BookOpen size={24} color={COLORS.white} />}
              title="Comprehensive Notes"
              desc="High-yield content for exams"
            />
            <FeatureItem 
              icon={<Activity size={24} color={COLORS.white} />}
              title="Clinical Case Studies"
              desc="Real-world patient scenarios"
            />
          </View>

          <View style={styles.sectionDivider} />

          {/* Curriculum Section */}
          <View style={styles.curriculumSection}>
            <Text style={styles.sectionMainTitle}>Curriculum Roadmap</Text>
            <Text style={styles.sectionMainSubtitle}>Your journey from student to doctor</Text>

            {/* Stages */}
            <View style={styles.stagesContainer}>
              {STAGES.map((stage, index) => (
                <View key={stage.id} style={styles.stageCard}>
                  <View style={[styles.stageHeader, { backgroundColor: stage.color }]}>
                    <View style={styles.stageNumberBadge}>
                      <Text style={styles.stageNumber}>{index + 1}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.stageTitle}>{stage.title}</Text>
                      <Text style={styles.stageSubtitle}>{stage.subtitle}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.stageContent}>
                    <Text style={styles.stageDescription}>{stage.description}</Text>
                    
                    <Text style={[styles.sectionLabel, { color: stage.color }]}>Key Subjects:</Text>
                    <View style={styles.subjectsGrid}>
                      {stage.subjects.map((subject, idx) => (
                        <View key={idx} style={styles.subjectItem}>
                          <View style={[styles.subjectIcon, { backgroundColor: stage.color }]}>
                            {subject.icon}
                          </View>
                          <View style={styles.subjectInfo}>
                            <Text style={styles.subjectName}>{subject.name}</Text>
                            <Text style={styles.subjectDesc}>{subject.desc}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Teaching Methods */}
            <View style={styles.spacing} />
            <Text style={styles.subSectionTitle}>How We Teach</Text>
            <View style={styles.methodsGrid}>
              {METHODS.map((method, index) => (
                <View key={index} style={[styles.methodCard, { borderColor: method.color }]}>
                  <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
                    {method.icon}
                  </View>
                  <Text style={[styles.methodTitle, { color: method.color }]}>{method.title}</Text>
                  <Text style={styles.methodDesc}>{method.desc}</Text>
                </View>
              ))}
            </View>

            {/* Exam Structure */}
            <View style={styles.spacing} />
            <Text style={styles.subSectionTitle}>Exam Structure</Text>
            <View style={styles.examContainer}>
              {EXAMS.map((exam, index) => (
                <View key={index} style={styles.examRow}>
                  <View style={styles.timelineContainer}>
                    <View style={[styles.timelineDot, { backgroundColor: exam.color }]} />
                    {index !== EXAMS.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.examContent}>
                    <Text style={[styles.examYear, { color: exam.color }]}>{exam.year}</Text>
                    <Text style={styles.examSubjects}>{exam.subjects}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Call to Action - Removed as Auth Form is now primary */}
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function StatItem({ icon, text }) {
  return (
    <View style={styles.statItem}>
      {icon}
      <Text style={styles.statText}>{text}</Text>
    </View>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        {icon}
      </View>
      <View>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.base,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  features: {
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    marginRight: 16,
    padding: 10,
    backgroundColor: 'rgba(246, 48, 73, 0.15)',
    borderRadius: 12,
  },
  featureTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 24,
  },
  sectionMainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionMainSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
    marginTop: 8,
  },
  spacing: {
    height: 32,
  },
  stageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  stageHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stageNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  stageNumber: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  stageTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stageSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  stageContent: {
    padding: 16,
  },
  stageDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  subjectsGrid: {
    gap: 12,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 8,
    borderRadius: 8,
  },
  subjectIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  subjectDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  methodCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  methodDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  examContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  examRow: {
    flexDirection: 'row',
    height: 80,
  },
  timelineContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
  },
  examContent: {
    flex: 1,
  },
  examYear: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  examSubjects: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  authSection: {
    marginBottom: 32,
  },
  loggedInCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInitials: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  welcomeName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutBtn: {
    padding: 8,
  },
});

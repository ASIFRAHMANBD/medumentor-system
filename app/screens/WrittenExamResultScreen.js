import React, { useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Animated,
  Dimensions, Easing, ScrollView
} from 'react-native';
import {
  ChevronLeft, CheckCircle, XCircle, RotateCcw, List, Home,
  Star, TrendingUp, Target, PenLine
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

export default function WrittenExamResultScreen({ navigation, route }) {
  const { examData, userAnswers } = route.params;
  const questions = examData.questions || [];
  const totalQuestions = questions.length;

  // Calculate score (case-insensitive comparison, trimmed)
  const results = questions.map((q, i) => {
    const userAns = (userAnswers[i] || '').trim().toLowerCase();
    const correctAns = (q.correctAnswer || '').trim().toLowerCase();
    return {
      ...q,
      userAnswer: userAnswers[i] || '',
      isCorrect: userAns === correctAns,
    };
  });

  const score = results.filter(r => r.isCorrect).length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const scoreAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  const getPerformanceColor = () => {
    if (percentage >= 80) return COLORS.success;
    if (percentage >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! Perfect recall!";
    if (percentage >= 80) return "Excellent! You've mastered this topic!";
    if (percentage >= 70) return "Great job! Solid understanding!";
    if (percentage >= 60) return "Good effort! Keep practicing!";
    if (percentage >= 50) return "Not bad! Review and try again!";
    return "Keep studying! You'll get there!";
  };

  const getPerformanceIcon = () => {
    if (percentage >= 80) return <Star size={32} color={getPerformanceColor()} />;
    if (percentage >= 60) return <TrendingUp size={32} color={getPerformanceColor()} />;
    return <Target size={32} color={getPerformanceColor()} />;
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scoreAnim, {
        toValue: 1, duration: 1000,
        easing: Easing.out(Easing.back(1.2)), useNativeDriver: true,
      }),
      Animated.timing(listAnim, {
        toValue: 1, duration: 800,
        easing: Easing.out(Easing.ease), useNativeDriver: true,
      }),
      Animated.timing(buttonsAnim, {
        toValue: 1, duration: 600,
        easing: Easing.out(Easing.ease), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRetry = () => {
    navigation.replace('WrittenExamPlay', { examData });
  };

  const handleBackToExams = () => {
    navigation.navigate('WrittenExamList');
  };

  const handleGoHome = () => {
    navigation.navigate('Dashboard');
  };

  const renderAnswerCard = (result, index) => {
    return (
      <View
        key={result.id}
        style={[
          styles.answerCard,
          { borderLeftColor: result.isCorrect ? COLORS.success : COLORS.error }
        ]}
      >
        <View style={styles.answerHeader}>
          <View style={styles.answerNumberBadge}>
            <Text style={styles.answerNumber}>Q{index + 1}</Text>
          </View>
          {result.isCorrect ? (
            <CheckCircle size={20} color={COLORS.success} />
          ) : (
            <XCircle size={20} color={COLORS.error} />
          )}
        </View>

        <Text style={styles.answerSentence}>{result.sentence}</Text>

        <View style={styles.answerRow}>
          <Text style={styles.answerLabel}>Your answer:</Text>
          <Text style={[
            styles.answerValue,
            { color: result.isCorrect ? COLORS.success : COLORS.error }
          ]}>
            {result.userAnswer || '(no answer)'}
          </Text>
        </View>

        {!result.isCorrect && (
          <View style={styles.answerRow}>
            <Text style={styles.answerLabel}>Correct answer:</Text>
            <Text style={[styles.answerValue, { color: COLORS.success }]}>
              {result.correctAnswer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={[COLORS.deep, COLORS.base]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Exam Results</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Score Display */}
          <Animated.View
            style={[
              styles.scoreContainer,
              {
                opacity: scoreAnim,
                transform: [{
                  scale: scoreAnim.interpolate({
                    inputRange: [0, 1], outputRange: [0.5, 1]
                  })
                }]
              }
            ]}
          >
            <LinearGradient
              colors={['#7C3AED', '#5B21B6']}
              style={styles.scoreGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.scoreCircle}>
                <View style={styles.performanceIcon}>
                  {getPerformanceIcon()}
                </View>
                <Text style={styles.scoreText}>{score}</Text>
                <Text style={styles.scoreTotal}>/ {totalQuestions}</Text>
                <View style={styles.progressCircle}>
                  <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
              </View>
              <Text style={styles.performanceMessage}>{getPerformanceMessage()}</Text>
            </LinearGradient>
          </Animated.View>

          {/* Correct Answers Section */}
          <Animated.View
            style={[
              styles.answersSection,
              {
                opacity: listAnim,
                transform: [{
                  translateY: listAnim.interpolate({
                    inputRange: [0, 1], outputRange: [30, 0]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.answersSectionTitle}>All Answers</Text>
            {results.map(renderAnswerCard)}
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View
            style={[
              styles.buttonsContainer,
              {
                opacity: buttonsAnim,
                transform: [{
                  translateY: buttonsAnim.interpolate({
                    inputRange: [0, 1], outputRange: [50, 0]
                  })
                }]
              }
            ]}
          >
            <TouchableOpacity style={[styles.actionButton, styles.retryButton]} onPress={handleRetry}>
              <RotateCcw size={20} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Retry Exam</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.examsButton]} onPress={handleBackToExams}>
              <List size={20} color="#7C3AED" />
              <Text style={[styles.actionButtonText, { color: '#7C3AED' }]}>Back to Written Exams</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.homeButton]} onPress={handleGoHome}>
              <Home size={20} color={COLORS.text} />
              <Text style={[styles.actionButtonText, { color: COLORS.text }]}>Go to Dashboard</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Exam Info */}
          <Animated.View style={[styles.examInfoContainer, { opacity: listAnim }]}>
            <Text style={styles.examInfoTitle}>{examData.title}</Text>
            <Text style={styles.examInfoDescription}>{examData.description}</Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: COLORS.white },
  headerRight: { width: 40 },
  scoreContainer: { padding: 20 },
  scoreGradient: {
    padding: 32, borderRadius: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, shadowRadius: 16, elevation: 8,
  },
  scoreCircle: { alignItems: 'center', marginBottom: 16 },
  performanceIcon: { marginBottom: 16 },
  scoreText: { fontSize: 48, fontWeight: '800', color: COLORS.white, lineHeight: 52 },
  scoreTotal: { fontSize: 20, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 16 },
  progressCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  percentageText: { fontSize: 18, fontWeight: '700', color: COLORS.white },
  performanceMessage: {
    fontSize: 16, color: COLORS.white, textAlign: 'center', fontWeight: '500', lineHeight: 22,
  },
  answersSection: { paddingHorizontal: 16, marginBottom: 24 },
  answersSectionTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.white, marginBottom: 16,
  },
  answerCard: {
    backgroundColor: COLORS.white, borderRadius: 12, padding: 16,
    marginBottom: 12, borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  answerHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
  },
  answerNumberBadge: {
    backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  answerNumber: { fontSize: 12, fontWeight: '700', color: COLORS.base },
  answerSentence: {
    fontSize: 14, color: COLORS.text, lineHeight: 20, marginBottom: 12,
    fontStyle: 'italic',
  },
  answerRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 8,
  },
  answerLabel: { fontSize: 13, color: COLORS.gray },
  answerValue: { fontSize: 14, fontWeight: '600' },
  buttonsContainer: { paddingHorizontal: 16, gap: 12, marginBottom: 24 },
  actionButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 16, borderRadius: 12, gap: 8,
  },
  retryButton: { backgroundColor: '#7C3AED' },
  examsButton: {
    backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#7C3AED',
  },
  homeButton: {
    backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border,
  },
  actionButtonText: { fontSize: 16, fontWeight: '600', color: COLORS.white },
  examInfoContainer: {
    backgroundColor: COLORS.white, marginHorizontal: 16, padding: 16,
    borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#7C3AED',
  },
  examInfoTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  examInfoDescription: { fontSize: 14, color: COLORS.gray, lineHeight: 20 },
});

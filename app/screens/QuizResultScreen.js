import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, Animated, 
  Dimensions, Easing, ScrollView
} from 'react-native';
import { 
  ChevronLeft, Award, BarChart3, Clock, CheckCircle, XCircle,
  RotateCcw, List, Home, Star, TrendingUp, Target
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';

const { width, height } = Dimensions.get('window');

export default function QuizResultScreen({ navigation, route }) {
  const { score, totalQuestions, timeTaken, quizData } = route.params;
  
  const wrongAnswers = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);
  const timePerQuestion = timeTaken > 0 ? (timeTaken / totalQuestions).toFixed(1) : 0;
  
  // Animation refs
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;
  
  const getPerformanceColor = () => {
    if (percentage >= 80) return COLORS.success;
    if (percentage >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a medical genius! 🎯";
    if (percentage >= 80) return "Excellent! You've mastered this topic! 🌟";
    if (percentage >= 70) return "Great job! Solid understanding! 👍";
    if (percentage >= 60) return "Good effort! Keep practicing! 📚";
    if (percentage >= 50) return "Not bad! Review and try again! 🔄";
    return "Keep studying! You'll get there! 💪";
  };

  const getPerformanceIcon = () => {
    if (percentage >= 80) return <Star size={32} color={getPerformanceColor()} />;
    if (percentage >= 60) return <TrendingUp size={32} color={getPerformanceColor()} />;
    return <Target size={32} color={getPerformanceColor()} />;
  };

  useEffect(() => {
    // Animated sequence for result reveal
    Animated.sequence([
      // Score reveal
      Animated.timing(scoreAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true
      }),
      // Progress circle
      Animated.timing(progressAnim, {
        toValue: percentage,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false
      }),
      // Stats reveal
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      // Buttons reveal
      Animated.timing(buttonsAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetryQuiz = () => {
    navigation.replace('QuizPlay', { quizData });
  };

  const handleBackToQuizzes = () => {
    navigation.navigate('QuizList', { lessonId: quizData.id.replace('quiz_', 'lesson_') });
  };

  const handleGoHome = () => {
    navigation.navigate('Dashboard');
  };

  const renderStatCard = (icon, label, value, color = COLORS.text) => (
    <Animated.View 
      style={[
        styles.statCard,
        {
          opacity: statsAnim,
          transform: [
            {
              translateY: statsAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }
          ]
        }
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {React.cloneElement(icon, { size: 20, color })}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={[COLORS.deep, COLORS.base]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quiz Results</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Score Display */}
          <Animated.View 
            style={[
              styles.scoreContainer,
              {
                opacity: scoreAnim,
                transform: [
                  {
                    scale: scoreAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.deep]}
              style={styles.scoreGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.scoreCircle}>
                <View style={styles.performanceIcon}>
                  {getPerformanceIcon()}
                </View>
                
                <Animated.Text style={styles.scoreText}>
                  {score}
                </Animated.Text>
                <Text style={styles.scoreTotal}>/ {totalQuestions}</Text>
                
                <Animated.View style={styles.progressCircle}>
                  <Animated.Text style={styles.percentageText}>
                    {percentage}%
                  </Animated.Text>
                </Animated.View>
              </View>
              
              <Text style={styles.performanceMessage}>
                {getPerformanceMessage()}
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {renderStatCard(
              <CheckCircle />,
              "Correct",
              score,
              COLORS.success
            )}
            {renderStatCard(
              <XCircle />,
              "Incorrect", 
              wrongAnswers,
              COLORS.error
            )}
            {renderStatCard(
              <BarChart3 />,
              "Accuracy",
              `${percentage}%`,
              getPerformanceColor()
            )}
            {renderStatCard(
              <Clock />,
              "Time Taken",
              formatTime(timeTaken),
              COLORS.primary
            )}
          </View>

          {/* Performance Analysis */}
          <Animated.View 
            style={[
              styles.analysisContainer,
              {
                opacity: statsAnim,
                transform: [
                  {
                    translateY: statsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.analysisTitle}>Performance Analysis</Text>
            
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>Average Time per Question:</Text>
              <Text style={styles.analysisValue}>{timePerQuestion}s</Text>
            </View>
            
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>Quiz Difficulty:</Text>
              <Text style={styles.analysisValue}>Medium</Text>
            </View>
            
            <View style={styles.analysisRow}>
              <Text style={styles.analysisLabel}>Topic Mastery:</Text>
              <Text style={[
                styles.analysisValue,
                { color: getPerformanceColor() }
              ]}>
                {percentage >= 80 ? 'Advanced' : percentage >= 60 ? 'Intermediate' : 'Beginner'}
              </Text>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            style={[
              styles.buttonsContainer,
              {
                opacity: buttonsAnim,
                transform: [
                  {
                    translateY: buttonsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <TouchableOpacity 
              style={[styles.actionButton, styles.retryButton]}
              onPress={handleRetryQuiz}
            >
              <RotateCcw size={20} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Retry Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.quizzesButton]}
              onPress={handleBackToQuizzes}
            >
              <List size={20} color={COLORS.primary} />
              <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>
                Back to Quizzes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.homeButton]}
              onPress={handleGoHome}
            >
              <Home size={20} color={COLORS.text} />
              <Text style={[styles.actionButtonText, { color: COLORS.text }]}>
                Go to Dashboard
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Quiz Info */}
          <Animated.View 
            style={[
              styles.quizInfoContainer,
              {
                opacity: statsAnim
              }
            ]}
          >
            <Text style={styles.quizInfoTitle}>{quizData.title}</Text>
            <Text style={styles.quizInfoDescription}>{quizData.description}</Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
    fontWeight: '600',
    color: COLORS.white,
  },
  headerRight: {
    width: 40,
  },
  scoreContainer: {
    padding: 20,
  },
  scoreGradient: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  scoreCircle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceIcon: {
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 52,
  },
  scoreTotal: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  performanceMessage: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  analysisContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  analysisLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  analysisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
  },
  quizzesButton: {
    backgroundColor: COLORS.lightPrimary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  homeButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  quizInfoContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  quizInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  quizInfoDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
});

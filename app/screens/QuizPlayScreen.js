import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, Animated, 
  Dimensions, Easing, StatusBar, Platform,
  Vibration
} from 'react-native';
import { 
  ChevronLeft, Clock, CheckCircle, XCircle, AlertCircle,
  ChevronRight, Award, BarChart3, Timer, Play, Pause
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';

const { width, height } = Dimensions.get('window');

export default function QuizPlayScreen({ navigation, route }) {
  const quizData = route.params?.quizData || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit || 0);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const timerAnim = useRef(new Animated.Value(1)).current;
  const questionAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const optionAnimations = useRef([]);
  
  const questions = Array.isArray(quizData.questions) ? quizData.questions : [];
  const totalQuestions = questions.length;
  const effectiveIndex = totalQuestions > 0
    ? Math.min(currentQuestionIndex, totalQuestions - 1)
    : 0;
  const currentQuestion =
    totalQuestions > 0 ? questions[effectiveIndex] : null;
  const progressPercentage = totalQuestions
    ? ((effectiveIndex + 1) / totalQuestions) * 100
    : 0;

  // Timer useEffect
  useEffect(() => {
    let timer;
    if (!isPaused && timeLeft > 0 && !showResult && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isPaused, timeLeft, showResult, quizFinished]);

  // Timer color animation
  useEffect(() => {
    if (timeLeft <= 10) {
      // Pulse animation for last 10 seconds
      Animated.loop(
        Animated.sequence([
          Animated.timing(timerAnim, {
            toValue: 1.2,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(timerAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ).start();
    }
  }, [timeLeft]);

  // Question entrance animation
  useEffect(() => {
    if (!currentQuestion || !Array.isArray(currentQuestion.options)) {
      return;
    }
    
    optionAnimations.current = currentQuestion.options.map(
      () => new Animated.Value(0)
    );
    
    Animated.parallel([
      Animated.timing(questionAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true
      }),
      Animated.timing(progressAnim, {
        toValue: progressPercentage,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false
      })
    ]).start();
    
    currentQuestion.options.forEach((_, index) => {
      setTimeout(() => {
        Animated.spring(optionAnimations.current[index], {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true
        }).start();
      }, index * 100);
    });
  }, [effectiveIndex, totalQuestions, currentQuestion]);

  const handleTimeUp = () => {
    Vibration.vibrate(400);
    setShowResult(true);
    setSelectedOption(null); // Auto-submit with no selection
    
    // Move to next question after delay
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleOptionSelect = (optionIndex) => {
    if (showResult) return;
    
    Vibration.vibrate(50);
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    // Check if answer is correct
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
      // Success vibration pattern
      Vibration.vibrate([0, 100, 50, 100]);
    } else {
      // Error vibration pattern
      Vibration.vibrate([0, 200, 100, 200]);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // Reset animations for next question
      questionAnim.setValue(0);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(quizData.timeLimit);
      setIsPaused(false);
      timerAnim.setValue(1);
      
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finished
      setQuizFinished(true);
      navigation.navigate('QuizResult', {
        score,
        totalQuestions,
        timeTaken: quizData.timeLimit - timeLeft,
        quizData
      });
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    Vibration.vibrate(50);
  };

  const getTimerColor = () => {
    if (timeLeft > 30) return COLORS.success;
    if (timeLeft > 10) return COLORS.warning;
    return COLORS.error;
  };

  const renderOption = (option, index) => {
    if (!currentQuestion) return null;
    const animationValue = optionAnimations.current?.[index];
    const isSelected = selectedOption === index;
    const isCorrect = index === currentQuestion.correctAnswer;
    const showCorrect = showResult && isCorrect;
    const showIncorrect = showResult && isSelected && !isCorrect;
    
    let backgroundColor = COLORS.white;
    let borderColor = COLORS.border;
    
    if (showCorrect) {
      backgroundColor = '#F0FDF4';
      borderColor = COLORS.success;
    } else if (showIncorrect) {
      backgroundColor = '#FEF2F2';
      borderColor = COLORS.error;
    } else if (isSelected) {
      backgroundColor = '#F0F9FF';
      borderColor = COLORS.primary;
    }
    
    return (
      <Animated.View
        key={index}
        style={[
          styles.optionCard,
          {
            backgroundColor,
            borderColor,
            transform: animationValue
              ? [
                  {
                    scale: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1]
                    })
                  },
                  {
                    translateY: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0]
                    })
                  }
                ]
              : [],
            opacity: animationValue || 1
          }
        ]}
      >
        <TouchableOpacity
          style={styles.optionContent}
          onPress={() => handleOptionSelect(index)}
          disabled={showResult}
          activeOpacity={0.7}
        >
          <View style={styles.optionIndicator}>
            {showCorrect && <CheckCircle size={20} color={COLORS.success} />}
            {showIncorrect && <XCircle size={20} color={COLORS.error} />}
            {!showResult && (
              <View style={[
                styles.optionRadio,
                isSelected && styles.optionRadioSelected
              ]}>
                {isSelected && <View style={styles.optionRadioInner} />}
              </View>
            )}
          </View>
          
          <Text style={[
            styles.optionText,
            (showCorrect || showIncorrect) && styles.optionTextResult
          ]}>
            {option}
          </Text>
          
          {(showCorrect || showIncorrect) && (
            <View style={styles.optionStatus}>
              {showCorrect && (
                <Text style={styles.correctText}>Correct</Text>
              )}
              {showIncorrect && (
                <Text style={styles.incorrectText}>Incorrect</Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (!quizData || totalQuestions === 0 || !currentQuestion) {
    return (
      <LinearGradient
        colors={[COLORS.deep, COLORS.base]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.quizTitle} numberOfLines={1}>
                {quizData.title || 'Quiz'}
              </Text>
            </View>
          </View>
          <View style={[styles.optionsContainer, styles.center]}>
            <Text style={styles.emptyQuizText}>
              This quiz has no questions configured yet.
            </Text>
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
        <StatusBar barStyle="light-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.quizTitle} numberOfLines={1}>
              {quizData.title}
            </Text>
            <Text style={styles.questionCount}>
              {effectiveIndex + 1} / {totalQuestions}
            </Text>
          </View>
          
          <View style={styles.timerContainer}>
            <Animated.View style={[
              styles.timerCircle,
              { 
                backgroundColor: getTimerColor(),
                transform: [{ scale: timerAnim }]
              }
            ]}>
              <Clock size={16} color={COLORS.white} />
              <Text style={styles.timerText}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </Text>
            </Animated.View>
            
            <TouchableOpacity 
              style={styles.pauseButton}
              onPress={togglePause}
            >
              {isPaused ? (
                <Play size={20} color={COLORS.primary} />
              ) : (
                <Pause size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View 
              style={[
                styles.progressFill,
                { 
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  })
                }
              ]}
            />
          </View>
        </View>

        {/* Question Card */}
        <Animated.View 
          style={[
            styles.questionContainer,
            {
              transform: [
                { 
                  translateY: questionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                  }) 
                }
              ],
              opacity: questionAnim
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.questionCard}
          >
            <Text style={styles.questionText}>
              {currentQuestion.question}
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options?.map(renderOption)}
        </View>

        {/* Explanation (when shown) */}
        {showResult && (
          <Animated.View 
            style={[
              styles.explanationContainer,
              {
                opacity: questionAnim
              }
            ]}
          >
            <View style={styles.explanationHeader}>
              <AlertCircle size={20} color={COLORS.primary} />
              <Text style={styles.explanationTitle}>Explanation</Text>
            </View>
            {currentQuestion.explanation ? (
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            ) : null}
          </Animated.View>
        )}

        {/* Next Button */}
        {showResult && (
          <Animated.View 
            style={[
              styles.nextButtonContainer,
              {
                opacity: questionAnim
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
              </Text>
              <ChevronRight size={20} color={COLORS.white} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  questionCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    justifyContent: 'center',
  },
  timerText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  pauseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  progressBackground: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  questionContainer: {
    padding: 20,
  },
  questionCard: {
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.white,
    lineHeight: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  optionCard: {
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  optionIndicator: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  optionRadioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  optionTextResult: {
    fontWeight: '500',
  },
  optionStatus: {
    marginLeft: 'auto',
  },
  correctText: {
    color: COLORS.success,
    fontWeight: '600',
    fontSize: 12,
  },
  incorrectText: {
    color: COLORS.error,
    fontWeight: '600',
    fontSize: 12,
  },
  explanationContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  explanationText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  nextButtonContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

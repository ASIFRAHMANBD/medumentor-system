import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Animated,
  Dimensions, Easing, StatusBar, KeyboardAvoidingView, Platform,
  ScrollView, Keyboard
} from 'react-native';
import {
  ChevronLeft, ChevronRight, PenLine
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

export default function WrittenExamPlayScreen({ navigation, route }) {
  const examData = route.params?.examData || {};
  const questions = Array.isArray(examData.questions) ? examData.questions : [];
  const totalQuestions = questions.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(totalQuestions).fill(''));
  const [currentInput, setCurrentInput] = useState('');

  const questionAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const effectiveIndex = totalQuestions > 0 ? Math.min(currentQuestionIndex, totalQuestions - 1) : 0;
  const currentQuestion = totalQuestions > 0 ? questions[effectiveIndex] : null;
  const progressPercentage = totalQuestions ? ((effectiveIndex + 1) / totalQuestions) * 100 : 0;

  useEffect(() => {
    if (!currentQuestion) return;

    questionAnim.setValue(0);
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
  }, [effectiveIndex, totalQuestions, currentQuestion]);

  const handleNext = () => {
    Keyboard.dismiss();

    const updatedAnswers = [...userAnswers];
    updatedAnswers[effectiveIndex] = currentInput.trim();
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentInput(userAnswers[currentQuestionIndex + 1] || '');
    } else {
      navigation.navigate('WrittenExamResult', {
        examData,
        userAnswers: updatedAnswers
      });
    }
  };

  const handlePrevious = () => {
    Keyboard.dismiss();

    const updatedAnswers = [...userAnswers];
    updatedAnswers[effectiveIndex] = currentInput.trim();
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentInput(userAnswers[currentQuestionIndex - 1] || '');
    }
  };

  const renderSentenceWithBlank = () => {
    if (!currentQuestion) return null;
    const parts = currentQuestion.sentence.split('_____');

    return (
      <View style={styles.sentenceContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={styles.sentenceText}>{part}</Text>
            {index < parts.length - 1 && (
              <View style={styles.blankIndicator}>
                <Text style={styles.blankText}>
                  {currentInput || '______'}
                </Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  if (!examData || totalQuestions === 0 || !currentQuestion) {
    return (
      <LinearGradient colors={[COLORS.deep, COLORS.base]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.examTitle} numberOfLines={1}>
                {examData.title || 'Written Exam'}
              </Text>
            </View>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>This exam has no questions configured yet.</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[COLORS.deep, COLORS.base]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.examTitle} numberOfLines={1}>{examData.title}</Text>
            <Text style={styles.questionCount}>{effectiveIndex + 1} / {totalQuestions}</Text>
          </View>
          <View style={{ width: 40 }} />
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

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
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
                colors={['#7C3AED', '#5B21B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.questionCard}
              >
                <View style={styles.questionBadge}>
                  <PenLine size={16} color={COLORS.white} />
                  <Text style={styles.questionBadgeText}>Fill in the Blank</Text>
                </View>
                {renderSentenceWithBlank()}
              </LinearGradient>
            </Animated.View>

            {/* Text Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Answer</Text>
              <TextInput
                style={styles.textInput}
                value={currentInput}
                onChangeText={setCurrentInput}
                placeholder="Type your answer here..."
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={currentQuestionIndex < totalQuestions - 1 ? 'next' : 'done'}
                onSubmitEditing={handleNext}
              />
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navButtonsContainer}>
              {currentQuestionIndex > 0 && (
                <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
                  <ChevronLeft size={20} color="#7C3AED" />
                  <Text style={styles.prevButtonText}>Previous</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.nextButton,
                  currentQuestionIndex === 0 && { flex: 1 }
                ]}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                </Text>
                <ChevronRight size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  backButton: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center', marginHorizontal: 16 },
  examTitle: { fontSize: 18, fontWeight: '600', color: COLORS.white, textAlign: 'center' },
  questionCount: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  progressContainer: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white },
  progressBackground: { height: 4, backgroundColor: COLORS.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#7C3AED', borderRadius: 2 },
  scrollContent: { paddingBottom: 40 },
  questionContainer: { padding: 20 },
  questionCard: {
    padding: 24, borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  questionBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    alignSelf: 'flex-start', marginBottom: 16,
  },
  questionBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  sentenceContainer: {
    flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
  },
  sentenceText: { fontSize: 18, fontWeight: '500', color: COLORS.white, lineHeight: 28 },
  blankIndicator: {
    borderBottomWidth: 2, borderBottomColor: '#FDE68A',
    paddingHorizontal: 8, paddingVertical: 2, marginHorizontal: 4,
    minWidth: 80,
  },
  blankText: { fontSize: 18, fontWeight: '600', color: '#FDE68A', textAlign: 'center' },
  inputContainer: { paddingHorizontal: 20, marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginBottom: 8 },
  textInput: {
    backgroundColor: COLORS.white, borderRadius: 12, padding: 16,
    fontSize: 16, color: COLORS.text, borderWidth: 2, borderColor: '#E2E8F0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  navButtonsContainer: {
    flexDirection: 'row', paddingHorizontal: 20, gap: 12,
  },
  prevButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.white, padding: 16, borderRadius: 12, gap: 8,
    borderWidth: 1, borderColor: '#7C3AED',
  },
  prevButtonText: { color: '#7C3AED', fontWeight: '600', fontSize: 16 },
  nextButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#7C3AED', padding: 16, borderRadius: 12, gap: 8,
  },
  nextButtonText: { color: COLORS.white, fontWeight: '600', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: COLORS.white, textAlign: 'center' },
});

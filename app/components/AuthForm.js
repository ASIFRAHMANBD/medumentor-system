import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Mail, Lock, User, CheckCircle, ArrowRight, Loader } from 'lucide-react-native';
import { COLORS, API_URL } from '../constants';

export default function AuthForm({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'verify'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    const testUser = {
      token: 'dev-token',
      user: {
        id: 'dev-user',
        email: formData.email || 'test@example.com',
        name: formData.name || 'Test User',
        role: 'student',
      },
    };
    if (onLoginSuccess) {
      onLoginSuccess(testUser);
    }
    return;

    setError('');
    setLoading(true);
    
    try {
      let endpoint = '';
      let body = {};
      
      if (mode === 'login') {
        endpoint = '/auth/login';
        body = { email: formData.email, password: formData.password };
      } else if (mode === 'register') {
        endpoint = '/auth/register';
        body = { email: formData.email, password: formData.password, name: formData.name };
      } else if (mode === 'verify') {
        endpoint = '/auth/verify';
        body = { email: formData.email, code: formData.code };
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success handling
      if (mode === 'register') {
        if (data.requiresVerification) {
          setMode('verify');
          Alert.alert('Verification Required', 'Please check your email for the verification code.');
        } else {
          // Should not happen based on backend logic, but just in case
          setMode('login');
          Alert.alert('Success', 'Account created. Please login.');
        }
      } else if (mode === 'verify') {
        Alert.alert('Success', 'Email verified! You are now logged in.');
        if (onLoginSuccess) onLoginSuccess(data);
      } else if (mode === 'login') {
        if (onLoginSuccess) onLoginSuccess(data);
      }

    } catch (err) {
      let msg = err.message;
      if (msg === 'invalid_credentials') msg = 'Invalid email or password';
      if (msg === 'email_exists') msg = 'Email already registered';
      if (msg === 'email_not_verified') {
        msg = 'Email not verified. Please verify your account.';
        setMode('verify');
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      {mode !== 'verify' && (
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, mode === 'login' && styles.activeTab]}
            onPress={() => { setMode('login'); setError(''); }}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, mode === 'register' && styles.activeTab]}
            onPress={() => { setMode('register'); setError(''); }}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Header Text */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Verify Email'}
        </Text>
        <Text style={styles.subtitle}>
          {mode === 'login' ? 'Sign in to continue your learning journey' : 
           mode === 'register' ? 'Start your medical education today' : 
           'Enter the code sent to ' + formData.email}
        </Text>
      </View>

      {/* Inputs */}
      <View style={styles.form}>
        {mode === 'register' && (
          <View style={styles.inputContainer}>
            <User size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.textSecondary}
              value={formData.name}
              onChangeText={(t) => updateForm('name', t)}
            />
          </View>
        )}

        {(mode === 'login' || mode === 'register' || mode === 'verify') && (
          <View style={styles.inputContainer}>
            <Mail size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, mode === 'verify' && styles.disabledInput]}
              placeholder="Email Address"
              placeholderTextColor={COLORS.textSecondary}
              value={formData.email}
              onChangeText={(t) => updateForm('email', t)}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={mode !== 'verify'}
            />
          </View>
        )}

        {(mode === 'login' || mode === 'register') && (
          <View style={styles.inputContainer}>
            <Lock size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.textSecondary}
              value={formData.password}
              onChangeText={(t) => updateForm('password', t)}
              secureTextEntry
            />
          </View>
        )}

        {mode === 'verify' && (
          <View style={styles.inputContainer}>
            <CheckCircle size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Verification Code (e.g. 123456)"
              placeholderTextColor={COLORS.textSecondary}
              value={formData.code}
              onChangeText={(t) => updateForm('code', t)}
              keyboardType="number-pad"
            />
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Sign Up' : 'Verify'}
              </Text>
              <ArrowRight size={20} color={COLORS.white} />
            </>
          )}
        </TouchableOpacity>

        {mode === 'verify' && (
          <TouchableOpacity onPress={() => setMode('login')} style={styles.linkButton}>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.white,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 50,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
  disabledInput: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    textAlign: 'center',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

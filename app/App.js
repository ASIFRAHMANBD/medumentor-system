import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import LecturesScreen from './screens/LecturesScreen';
import NotesScreen from './screens/NotesScreen';
import QuizListScreen from './screens/QuizListScreen';
import QuizPlayScreen from './screens/QuizPlayScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import WrittenExamListScreen from './screens/WrittenExamListScreen';
import WrittenExamPlayScreen from './screens/WrittenExamPlayScreen';
import WrittenExamResultScreen from './screens/WrittenExamResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? 'Dashboard' : 'Welcome'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} user={user} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {(props) => <DashboardScreen {...props} user={user} onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="Lectures" component={LecturesScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="QuizList" component={QuizListScreen} />
        <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        <Stack.Screen name="WrittenExamList" component={WrittenExamListScreen} />
        <Stack.Screen name="WrittenExamPlay" component={WrittenExamPlayScreen} />
        <Stack.Screen name="WrittenExamResult" component={WrittenExamResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

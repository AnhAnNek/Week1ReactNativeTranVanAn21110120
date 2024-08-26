import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const COUNTDOWN_TIME = 10;

const IntroductionPage = ({navigation}) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME); // Initialize countdown with 10 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1); // Decrease countdown by 1 every second
    }, 1000);

    if (countdown === 0) {
      navigation.replace('Home');
    }

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>Introduction</Text>
      <Text style={styles.introText}>Full name: Tran Van An</Text>
      <Text style={styles.introText}>Student id: 21110120</Text>
      <Text style={styles.countdownText}>
        Redirecting in {countdown} seconds...
      </Text>
    </View>
  );
};

const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>This is the Home Page.</Text>
      <Button
        title="Back to Introduction"
        onPress={() => navigation.replace('Introduction')}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction">
        <Stack.Screen
          name="Introduction"
          component={IntroductionPage}
          options={{headerShown: false}} // Hide the header for the intro screen
        />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 20,
    color: 'red',
  },
  homeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation'; // Importando nossa estrutura de rotas

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
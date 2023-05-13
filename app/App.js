import AppNavigator from './src/AppNavigator';
import { AuthProvider } from './src/context/AppContext';

export default function App() {
  
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

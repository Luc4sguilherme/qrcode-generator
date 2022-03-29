import './App.css';
import './themes';

import { ErrorProvider } from './contexts/errorContext';
import { ThemeProvider } from './contexts/themeContext';
import Home from './pages/Home';

function App() {
  return (
    <ErrorProvider>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </ErrorProvider>
  );
}

export default App;

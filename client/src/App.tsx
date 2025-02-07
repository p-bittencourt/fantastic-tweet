import { ThemeProvider } from './components/theme/ThemeProvider';
import Home from './pages/Home';

function App() {
  return (
    <>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;

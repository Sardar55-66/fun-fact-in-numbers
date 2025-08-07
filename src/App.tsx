import { useState } from 'react';
import NumberForm from './components/NumberForm';
import NumberResult from './components/NumberResult';
import type { UserInput, NumberInfo, ErrorState } from './types';
import { fetchNumberInfo, fetchRandomNumberInfo } from './services/numbersApi';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'result'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: ''
  });

  const handleFormSubmit = async (data: UserInput) => {
    setIsLoading(true);
    setError({ hasError: false, message: '' });

    try {
      let result: NumberInfo;

      if (data.isRandom) {
        result = await fetchRandomNumberInfo(data.infoType);
      } else {
        result = await fetchNumberInfo(data.number, data.infoType);
      }

      setNumberInfo(result);
      setUserInput(data);
      setCurrentView('result');
    } catch (err) {
      setError({
        hasError: true,
        message: err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentView('form');
    setNumberInfo(null);
    setUserInput(null);
    setError({ hasError: false, message: '' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔢 Информация о числах</h1>
        <p>Узнайте интересные факты о числах с помощью Numbers API</p>
      </header>

      <main className="app-main">
        {error.hasError && (
          <div className="global-error">
            {error.message}
          </div>
        )}

        {currentView === 'form' && (
          <NumberForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}

        {currentView === 'result' && numberInfo && userInput && (
          <NumberResult
            numberInfo={numberInfo}
            userInput={userInput}
            onBack={handleBack}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by <a href="http://numbersapi.com" target="_blank" rel="noopener noreferrer">Numbers API</a></p>
      </footer>
    </div>
  );
}

export default App;

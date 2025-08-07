import type { NumberInfo, UserInput } from '../types';

interface NumberResultProps {
  numberInfo: NumberInfo;
  userInput: UserInput;
  onBack: () => void;
}

const NumberResult: React.FC<NumberResultProps> = ({ numberInfo, userInput, onBack }) => {
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'trivia':
        return 'Интересные факты';
      case 'math':
        return 'Математические факты';
      case 'date':
        return 'Факты о датах';
      default:
        return type;
    }
  };

  const getInputSummary = (): string => {
    if (userInput.isRandom) {
      return `Случайное число (${getTypeLabel(userInput.infoType)})`;
    }
    return `Число ${userInput.number} (${getTypeLabel(userInput.infoType)})`;
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>Результат</h2>
        <button onClick={onBack} className="back-button">
          ← Назад
        </button>
      </div>

      <div className="input-summary">
        <h3>Ваш запрос:</h3>
        <p>{getInputSummary()}</p>
      </div>

      <div className="number-info">
        <div className="number-display">
          <span className="number">{numberInfo.number}</span>
        </div>
        
        <div className="info-content">
          <h3>{getTypeLabel(numberInfo.type)}</h3>
          <p className="info-text">{numberInfo.text}</p>
          <div className="translation-note">
            <small>🌐 Переведено с английского языка</small>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <h3>Дополнительная информация</h3>
        <ul>
          <li>Тип запроса: {getTypeLabel(numberInfo.type)}</li>
          <li>Число: {numberInfo.number}</li>
          <li>Статус: {numberInfo.found ? 'Найдено' : 'Не найдено'}</li>
        </ul>
      </div>
    </div>
  );
};

export default NumberResult; 
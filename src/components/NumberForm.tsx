import { useState } from 'react';
import type { UserInput, InfoType, ErrorState } from '../types';

interface NumberFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const NumberForm: React.FC<NumberFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    number: '',
    infoType: 'trivia',
    isRandom: false
  });
  
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: ''
  });

  const validateForm = (): boolean => {
    if (formData.isRandom) {
      setError({ hasError: false, message: '' });
      return true;
    }

    if (!formData.number.trim()) {
      setError({ hasError: true, message: 'Пожалуйста, введите число' });
      return false;
    }

    const number = parseInt(formData.number);
    if (isNaN(number)) {
      setError({ hasError: true, message: 'Число должно быть в виде цифры' });
      return false;
    }

    if (number < 0) {
      setError({ hasError: true, message: 'Число должно быть положительным' });
      return false;
    }

    setError({ hasError: false, message: '' });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof UserInput, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (error.hasError) {
      setError({ hasError: false, message: '' });
    }
  };

  return (
    <div className="form-container">
      <h2>Информация о числах</h2>
      <form onSubmit={handleSubmit} className="number-form">
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.isRandom}
              onChange={(e) => handleInputChange('isRandom', e.target.checked)}
            />
            Случайное число
          </label>
        </div>

        {!formData.isRandom && (
          <div className="form-group">
            <label htmlFor="number">Введите число:</label>
            <input
              id="number"
              type="text"
              value={formData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              placeholder="Например: 42"
              disabled={isLoading}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="infoType">Тип информации:</label>
          <select
            id="infoType"
            value={formData.infoType}
            onChange={(e) => handleInputChange('infoType', e.target.value as InfoType)}
            disabled={isLoading}
          >
            <option value="trivia">Интересные факты</option>
            <option value="math">Математические факты</option>
            <option value="date">Факты о датах</option>
          </select>
        </div>

        {error.hasError && (
          <div className="error-message">
            {error.message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Загрузка...' : 'Получить информацию'}
        </button>
      </form>
    </div>
  );
};

export default NumberForm; 
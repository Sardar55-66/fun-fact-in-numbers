import type { NumberInfo, InfoType } from '../types';

const BASE_URL = 'http://numbersapi.com';

const translateToRussian = async (text: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ru`
    );
    
    if (!response.ok) {
      return text;
    }
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }
    
    return text;
  } catch (error) {
    console.warn('Ошибка перевода:', error);
    return text;
  }
};

export const fetchNumberInfo = async (
  number: string | number,
  type: InfoType
): Promise<NumberInfo> => {
  try {
    const url = `${BASE_URL}/${number}/${type}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const originalText = await response.text();
    const translatedText = await translateToRussian(originalText);
    
    return {
      text: translatedText,
      number: typeof number === 'string' ? parseInt(number) : number,
      found: true,
      type
    };
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
};

export const fetchRandomNumberInfo = async (type: InfoType): Promise<NumberInfo> => {
  try {
    const url = `${BASE_URL}/random/${type}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const originalText = await response.text();
    const translatedText = await translateToRussian(originalText);
    
    const urlParts = response.url.split('/');
    const number = parseInt(urlParts[urlParts.length - 2]) || Math.floor(Math.random() * 1000);
    
    return {
      text: translatedText,
      number,
      found: true,
      type
    };
  } catch (error) {
    throw new Error(`Ошибка при получении случайного числа: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}; 
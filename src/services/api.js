const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const searchWord = async (word) => {
  const response = await fetch(`${API_URL}${word}`);
  if (!response.ok) {
    throw new Error('Word not found');
  }
  const data = await response.json();
  return data[0];
};
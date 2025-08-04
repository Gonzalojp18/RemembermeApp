// const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// export const searchWord = async (word) => {
//   const response = await fetch(`${API_URL}${word}`);
//   if (!response.ok) {
//     throw new Error('Word not found');
//   }
//   const data = await response.json();
//   return data[0];
// };


// src/services/api.js

// === IMPORTANTE ===
// Esta URL es para la API pública del diccionario.
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/**
 * Busca una palabra en la API del diccionario.
 * @param {string} word - La palabra a buscar.
 * @returns {Promise<object>} - Los datos de la palabra.
 */
export const searchWord = async (word) => {
  try {
    // La API del diccionario usa un método GET, no POST.
    // No se necesita un body ni headers especiales de CORS.
    const response = await fetch(`${DICTIONARY_API_URL}/${word}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // Si la respuesta no es 2xx, la palabra no se encontró o hubo otro error.
      const errorDetails = await response.json();
      const errorMessage = errorDetails.title || 'Failed to fetch word from dictionary API';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Dictionary API Response:', data);

    // La API devuelve un array, tomamos el primer resultado
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty dictionary API response format');
    }

    return data[0]; 
  } catch (error) {
    console.error("Error searching word via Dictionary API:", error);
    throw error;
  }
};
// import { useState, useEffect } from 'react';
// import { searchWord } from '../services/api';

// export const useDictionary = () => {
//   const [word, setWord] = useState('');
//   const [wordData, setWordData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [playingAudio, setPlayingAudio] = useState(null);

//   const handleSearch = async () => {
//     if (!word.trim()) {
//       return { success: false, error: 'Please enter a word!' };
//     }

//     setLoading(true);
//     try {
//       const data = await searchWord(word);
//       setWordData(data);
//       return { success: true, data };
//     } catch (error) {
//       return { success: false, error: 'Word not found!' };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAudioPlay = (audio, index) => {
//     const audioElement = new Audio(audio);
//     if (playingAudio === index) {
//       audioElement.pause();
//       setPlayingAudio(null);
//     } else {
//       audioElement.play();
//       setPlayingAudio(index);
//       audioElement.addEventListener('ended', () => setPlayingAudio(null));
//     }
//   };

//   return {
//     word,
//     setWord,
//     wordData,
//     setWordData,
//     loading,
//     playingAudio,
//     handleSearch,
//     handleAudioPlay,
//   };
// }; 


import { useState, useEffect } from 'react';
import { searchWord } from '../services/api.js'; // <--- Asumimos que este searchWord ya llama a n8n

export const useDictionary = () => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [error, setError] = useState(null); // Añadimos un estado para manejar errores

  const handleSearch = async () => {
    if (!word.trim()) {
      setError('Please enter a word!'); // Usamos el estado de error
      return { success: false, error: 'Please enter a word!' };
    }

    setLoading(true);
    setError(null); // Limpiamos cualquier error previo
    setWordData(null); // Limpiamos data anterior antes de una nueva búsqueda

    try {
      // Esta es la llamada clave que ahora va a tu Webhook de n8n
      const data = await searchWord(word); 
      
      // La función searchWord (que ahora llama a n8n) ya debería devolver
      // directamente el objeto formateado que WordCard espera.
      // Por ejemplo: { word: "learn", phonetic: "/lɜːn/", ... }
      setWordData(data); 
      
      return { success: true, data };
    } catch (error) {
      console.error("Error during dictionary search:", error); // Log para depuración
      setError(error.message || 'Word not found!'); // Capturamos y mostramos el mensaje de error
      return { success: false, error: error.message || 'Word not found!' };
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (audio, index) => {
    const audioElement = new Audio(audio);
    if (playingAudio === index) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      audioElement.play();
      setPlayingAudio(index);
      audioElement.addEventListener('ended', () => setPlayingAudio(null));
    }
  };

  return {
    word,
    setWord,
    wordData,
    setWordData, // Puedes mantener este si necesitas resetear la data desde fuera del hook
    loading,
    playingAudio,
    error, // Exponemos el estado de error
    handleSearch,
    handleAudioPlay,
  };
};
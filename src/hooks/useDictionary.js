import { useState, useEffect } from 'react';
import { searchWord } from '../services/api';

export const useDictionary = () => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);

  const handleSearch = async () => {
    if (!word.trim()) {
      return { success: false, error: 'Please enter a word!' };
    }

    setLoading(true);
    try {
      const data = await searchWord(word);
      setWordData(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Word not found!' };
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
    setWordData,
    loading,
    playingAudio,
    handleSearch,
    handleAudioPlay,
  };
}; 
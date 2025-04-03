import { useState, useEffect } from 'react';

export const useStorage = (key, initialValue = []) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const addItem = (item) => {
    if (!items.find(i => i.word === item.word)) {
      setItems([...items, item]);
      return true;
    }
    return false;
  };

  const removeItem = (wordToRemove) => {
    setItems(items.filter(item => item.word !== wordToRemove.word));
  };

  const clearItems = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    clearItems,
  };
}; 
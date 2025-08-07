import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes } from 'react-icons/fa';

const N8N_PRODUCTION_WEBHOOK_URL = 'https://siriusweb.app.n8n.cloud/webhook/remember';

const ChatBot = ({ currentWord }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('¡Hola! Pregúntame algo sobre esta palabra.');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [botResponse, open]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim() || !currentWord) return;
    setLoading(true);
    setBotResponse('');
    try {
      const response = await fetch(N8N_PRODUCTION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: currentWord, question: userQuestion }),
        mode: 'cors'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la respuesta del bot.');
      }
      const data = await response.json();
      setBotResponse(data.output);
    } catch (error) {
      setBotResponse(error.message || 'Lo siento, hubo un error. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
      setUserQuestion('');
    }
  };

  // Widget button (burbuja)
  if (!currentWord) return null;

  return (
    <div className="fixed z-40 right-4 bottom-4 sm:right-8 sm:bottom-8 flex flex-col items-end">
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chatbot-bubble"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Abrir chat"
            className="bg-purple-600 text-white rounded-full shadow-lg p-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            onClick={() => setOpen(true)}
          >
            <FaComments size={28} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
            style={{ minHeight: 320, maxHeight: 420 }}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-purple-700">Chat experto</h3>
              <button
                aria-label="Cerrar chat"
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => setOpen(false)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="flex flex-col h-48 overflow-y-auto mb-3 p-2 bg-gray-50 rounded-lg border border-gray-100 custom-scrollbar text-sm">
              <AnimatePresence>
                {loading ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 italic"
                  >
                    ...Cargando respuesta...
                  </motion.p>
                ) : (
                  botResponse && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-purple-100 p-2 rounded-lg self-start text-gray-800"
                    >
                      {botResponse}
                    </motion.p>
                  )
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder={`Pregunta sobre "${currentWord}"...`}
                disabled={loading || !currentWord}
                className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                aria-label="Pregunta al experto"
                maxLength={120}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !currentWord}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                {loading ? '...' : 'Enviar'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
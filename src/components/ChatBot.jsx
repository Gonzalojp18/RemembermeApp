import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// REEMPLAZA esta URL con la URL de PRODUCCIÓN de tu Webhook de n8n.
const N8N_PRODUCTION_WEBHOOK_URL = 'https://siriusweb.app.n8n.cloud/webhook/remember';

const ChatBot = ({ currentWord }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('¡Hola! Pregúntame algo sobre esta palabra.');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [botResponse]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim() || !currentWord) return;
    setLoading(true);
    setBotResponse(''); // Limpiamos la respuesta anterior para mostrar el indicador de carga

    try {
      const response = await fetch(N8N_PRODUCTION_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: currentWord,
          question: userQuestion,
        }),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la respuesta del bot.');
      }

      const data = await response.json();
      setBotResponse(data.output);

    } catch (error) {
      console.error("Error al comunicarse con el bot:", error);
      setBotResponse(error.message || "Lo siento, hubo un error. Por favor, intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
      setUserQuestion('');
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-8 w-full max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100 custom-scrollbar">
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
                className="bg-purple-100 p-3 rounded-lg self-start text-gray-800"
              >
                {botResponse}
              </motion.p>
            )
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder={`Pregunta sobre "${currentWord}"...`}
          disabled={loading || !currentWord}
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !currentWord}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </motion.div>
  );
};

export default ChatBot;
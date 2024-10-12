import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType } from '../types';
import Card from './Card';

interface CardStackProps {
  cards: CardType[];
  onSwipe: (id: number, direction: 'left' | 'right') => void;
}

const CardStack: React.FC<CardStackProps> = ({ cards, onSwipe }) => {
  const [stackOffset, setStackOffset] = useState(0);

  useEffect(() => {
    setStackOffset((prev) => (prev + 1) % 10);
  }, [cards]);

  return (
    <div className="relative w-80 h-120">
      <AnimatePresence>
        {cards.slice(0, 5).map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute w-full h-full"
            style={{
              zIndex: 5 - index,
              transformOrigin: 'bottom',
            }}
            initial={{ scale: 1 - index * 0.05, y: index * 10 }}
            animate={{ 
              scale: 1 - index * 0.05, 
              y: index * 10 - stackOffset * 2,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card card={card} onSwipe={onSwipe} isTop={index === 0} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardStack;
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onSwipe: (id: number, direction: 'left' | 'right') => void;
    isTop: boolean;
}

const Card: React.FC<CardProps> = ({ card, onSwipe, isTop }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const background = useTransform(
        x,
        [-200, 0, 200],
        ['rgb(220 38 38)', 'rgb(255 255 255)', 'rgb(22 163 74)']
    );

    const tapStartTime = useRef<number | null>(null);
    const tapStartPosition = useRef<{ x: number; y: number } | null>(null);

    const handleDragStart = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: { point: { x: number; y: number } }
    ) => {
        tapStartTime.current = Date.now();
        tapStartPosition.current = info.point;
    };

    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: {
            offset: { x: number; y: number };
            point: { x: number; y: number };
        }
    ) => {
        const tapEndTime = Date.now();
        const tapDuration = tapEndTime - (tapStartTime.current || 0);
        const tapDistance = Math.sqrt(
            Math.pow(info.point.x - (tapStartPosition.current?.x || 0), 2) +
                Math.pow(info.point.y - (tapStartPosition.current?.y || 0), 2)
        );

        if (Math.abs(info.offset.x) > 200) {
            onSwipe(card.id, info.offset.x > 0 ? 'right' : 'left');
        } else if (tapDuration < 200 && tapDistance < 5) {
            // This is considered a tap
            handleFlip();
        }

        // Reset tap tracking
        tapStartTime.current = null;
        tapStartPosition.current = null;
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const textOpacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
    const leftLabelOpacity = useTransform(x, [-100, -50], [1, 0]);
    const rightLabelOpacity = useTransform(x, [50, 100], [0, 1]);

    return (
        <motion.div
            className="absolute w-full h-full"
            style={{ x, rotate, opacity }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
        >
            <motion.div
                className="w-full h-full relative shadow-lg rounded-lg overflow-hidden"
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                    z: isFlipped ? 100 : 0,
                    scaleY: isFlipped ? 1.1 : 1,
                    transformOrigin: 'center center',
                }}
                transition={{ duration: 0.6 }}
                style={{ background }}
            >
                {/* Front of the card */}
                <motion.div
                    className="absolute w-full h-full p-6 flex flex-col"
                    style={{
                        opacity: textOpacity,
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                    <p className="text-gray-600 flex-grow">{card.content}</p>
                    <div className="mt-4 text-sm text-gray-500">
                        Swipe left to retry, right when learned
                    </div>
                </motion.div>

                {/* Back of the card */}
                <motion.div
                    className="absolute w-full h-full p-6 flex flex-col bg-gray-100"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <h3 className="text-xl font-semibold mb-2">
                        Deep Dive: {card.title}
                    </h3>
                    <p className="text-sm text-gray-700 flex-grow">
                        {card.backContent}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                        Tap to flip back | Swipe to categorize
                    </div>
                </motion.div>
            </motion.div>

            {/* Swipe labels */}
            <motion.div
                className="absolute text-white text-center text-2xl"
                style={{ opacity: leftLabelOpacity }}
            >
                Retry soon
            </motion.div>
            <motion.div
                className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded"
                style={{ opacity: rightLabelOpacity }}
            >
                Learned
            </motion.div>
        </motion.div>
    );
};

export default Card;

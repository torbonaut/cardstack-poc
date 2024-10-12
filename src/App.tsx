import React, { useState, useCallback } from 'react';
import CardStack from './components/CardStack';
import { Card } from './types';

const initialCards: Card[] = [
  { 
    id: 1, 
    title: 'React Hooks', 
    content: 'Learn about useState, useEffect, and other React hooks for efficient state management and side effects in functional components.',
    backContent: 'React Hooks revolutionized the way we write React components. They allow you to use state and other React features without writing a class. Some key hooks include useState for managing local state, useEffect for side effects, useContext for consuming context, and useReducer for complex state logic. Custom hooks can be created to reuse stateful logic across components.'
  },
  { 
    id: 2, 
    title: 'TypeScript Basics', 
    content: 'Explore static typing, interfaces, and generics to enhance your JavaScript development experience with TypeScript.',
    backContent: 'TypeScript is a superset of JavaScript that adds optional static typing. It helps catch errors early in development and improves code maintainability. Key concepts include interfaces for defining object shapes, generics for creating reusable components, and type inference for automatic type detection. TypeScript compiles to plain JavaScript, making it compatible with all JavaScript environments.'
  },
  { 
    id: 3, 
    title: 'CSS Grid Layout', 
    content: 'Master the power of CSS Grid for creating complex, responsive layouts with ease. Learn about grid containers, items, and alignment techniques.',
    backContent: 'CSS Grid Layout is a two-dimensional layout system that revolutionizes web design. It allows for complex layouts that were previously difficult to achieve. Key concepts include grid containers, grid items, grid lines, and grid areas. You can create responsive designs using fr units and the repeat() function. CSS Grid works well in combination with Flexbox for powerful, flexible layouts.'
  },
  { 
    id: 4, 
    title: 'JavaScript Promises', 
    content: 'Understand asynchronous programming with Promises, including chaining, error handling, and the async/await syntax for cleaner code.',
    backContent: 'Promises in JavaScript provide a way to handle asynchronous operations. They represent a value that may not be available immediately but will be resolved at some point in the future. Promises have three states: pending, fulfilled, or rejected. The .then() method is used for handling successful outcomes, while .catch() is used for error handling. The async/await syntax provides a more synchronous-looking way to work with Promises, making asynchronous code easier to read and write.'
  },
  { 
    id: 5, 
    title: 'RESTful API Design', 
    content: 'Learn best practices for designing and implementing RESTful APIs, including resource naming, HTTP methods, and status codes.',
    backContent: 'RESTful API design focuses on creating scalable and maintainable web services. Key principles include using HTTP methods (GET, POST, PUT, DELETE) correctly, organizing APIs around resources, using proper status codes, and implementing versioning. Good RESTful APIs are stateless, cacheable, and provide a uniform interface. Consider using HATEOAS (Hypermedia as the Engine of Application State) for more dynamic, discoverable APIs.'
  },
];

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const handleSwipe = useCallback((id: number, direction: 'left' | 'right') => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    console.log(`Card ${id} swiped ${direction}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CardStack cards={cards} onSwipe={handleSwipe} />
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <>
      <div className="shadow-[-1px_-1px_15px_1px_#0ea5e9] flex-col items-center justify-center flex h-52 rounded-lg text-white bg-gradient-to-r from-indigo-400 to-cyan-400 text-2xl">
        <p className='font-bold md:text-3xl'>Open Your Mind</p>
        {quote && (
          <>
            <span className='text-sm md:text-lg text-center text-gray-200'>" {quote} "</span>
            {author && <span className='text-sm text-center text-gray-200'>- {author}</span>}
          </>
        )}
      </div>
    </>
  );
}

'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import data from '../../public/data.json';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  const totalPages = Math.ceil(data.length / itemsPerPage);


  useEffect(() => {
    const savedTheme = localStorage.getItem('qwe-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('qwe-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      // Left arrow key
      if (event.keyCode === 37) {
        prevPage();
      }
      // Right arrow key
      else if (event.keyCode === 39) {
        nextPage();
      }
      // ESC key
      if (event.keyCode === 27) {
        setSelectedArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentPage, totalPages, selectedArticle]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    const searchWords = e.target.value.toLowerCase().split(' ').filter(word => word.trim() !== '');

    if (searchWords.length) {
      const results = data.filter(article => {
        const questionLower = article.question.toLowerCase();
        const answerLower = article.answer.toLowerCase();

        if (searchWords.length === 1) {
          return questionLower.includes(searchWords[0]) || answerLower.includes(searchWords[0]);
        }

        return searchWords.every(word => questionLower.includes(word) || answerLower.includes(word));
      });

      setFilteredData(results);
    } else {
      setFilteredData(getCurrentData());
    }
  };

  const getCurrentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    setFilteredData(getCurrentData());
  }, [currentPage]);

  useEffect(() => {
    if (selectedArticle) {
      Prism.highlightAll();
    }
  }, [selectedArticle]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="bg-white dark:bg-black flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white dark:bg-black z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <input className="bg-white dark:bg-black fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Theme Toggle Button */}
        <div className="fixed bottom-4 left-4 z-20 bg-white dark:bg-black flex items-center justify-center h-6 w-12 rounded-full lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? 'Jour' : 'Nuit'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-black relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/qwe.svg"
          alt="QWE"
          width={180}
          height={37}
          priority
        />
      </div>


      <div className="bg-white dark:bg-black mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {filteredData.map(article => (
          <div onClick={() => setSelectedArticle(article)} key={article.id} className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 w-60 h-60 overflow-hidden">
            <button >
              {article.question}
            </button>
          </div>
        ))}
      </div>

      {!searchTerm && (
        <div className="bg-white dark:bg-black mt-5 flex justify-between">
          <button disabled={currentPage === 1} onClick={prevPage}>Précédent</button>
          <span className="mx-5">Page {currentPage} sur {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={nextPage}>Suivant</button>
        </div>
      )}

      {isLoading && (
        <div className="bg-white dark:bg-black fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 dark:opacity-50"></div>
          <div className="relative p-8 w-full h-full overflow-y-auto justify-center p-8">
            Chargement...
          </div>
        </div>
      )}

      {selectedArticle && (
        <div className="bg-white dark:bg-black fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 dark:opacity-50" onClick={() => setSelectedArticle(null)}></div>

          <div className="relative p-8 w-full h-full overflow-y-auto">
            <div className="m-0 md:m-20">
              <h2 className="mb-4">{selectedArticle.question}</h2>

              <ReactMarkdown>
                {selectedArticle.answer}
              </ReactMarkdown>
            </div>

            <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 hover:bg-blue-600" onClick={() => setSelectedArticle(null)}>esc</button>
          </div>
        </div>
      )}
      {/* GitHub Link */}
      <a
        href="https://github.com/exaluc/qwe"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-700 transition dark:hover:bg-gray-500 z-30 md:bottom-4 md:right-4 md:p-2 sm:bottom-2 sm:right-2 sm:p-1 sm:text-xs"
      >
        GitHub
      </a>

    </main>
  )
}

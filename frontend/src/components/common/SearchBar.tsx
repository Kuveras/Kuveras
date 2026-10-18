import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, Mic, MicOff } from 'lucide-react';
import { SearchAutocomplete } from './SearchAutocomplete';
import { useUI } from '../../context/UIContext';

const SEARCH_SUGGESTIONS = [
  "Search for kundan jewellery",
  "Search for bridal jewellery",
  "Search for temple jewellery",
  "Search for rani haar",
  "Search for necklace sets",
  "Search for cubic zirconia",
];

interface SearchBarProps {
  onOpenVisualSearch: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onOpenVisualSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emptyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<any>(null);

  const { showToast } = useUI();
  const navigate = useNavigate();

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle suggestion rotation
  useEffect(() => {
    if (isFocused || query.length > 0 || prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setIsAnimating(true);
      animationTimeoutRef.current = setTimeout(() => {
        setSuggestionIndex((prev) => (prev + 1) % SEARCH_SUGGESTIONS.length);
        setIsAnimating(false);
      }, 450);
    }, 2900);

    return () => {
      clearInterval(interval);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isFocused, query, prefersReducedMotion]);

  // Handle click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocused) {
        setQuery('');
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused]);

  // Handle Speech Recognition (Web Speech API)
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Voice search is not supported in this browser.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening... Speak your jewellery search query.');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          setIsFocused(true);
          showToast(`Voice result: "${transcript}"`);
          navigate(`/shop?search=${encodeURIComponent(transcript)}`);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Voice recognition error:', event.error);
        setIsListening(false);
        showToast('Voice search error. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition failed to start:', err);
      setIsListening(false);
      showToast('Voice search is currently unavailable.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsFocused(false);
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (emptyTimeoutRef.current) {
      clearTimeout(emptyTimeoutRef.current);
    }
  };

  const handleBlur = () => {
    if (!query) {
      emptyTimeoutRef.current = setTimeout(() => {
        setIsFocused(false);
      }, 1000);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[760px] mx-auto ${className}`}
    >
      <form
        onSubmit={handleFormSubmit}
        className={`relative flex items-center w-full h-[52px] lg:h-[56px] bg-[#FFFFFF] border rounded-[8px] transition-all duration-200 cursor-pointer ${
          isFocused
            ? 'border-[#C89B3C] ring-2 ring-[#C89B3C]/10 shadow-[0_0_0_2px_rgba(200,155,60,0.10)]'
            : 'border-[#E5DED5] hover:border-[#C89B3C]'
        }`}
      >
        {/* Left Search Icon */}
        <button
          type="submit"
          aria-label="Search jewellery"
          className="pl-4 pr-2 text-[#6F6860] hover:text-[#C89B3C] transition-colors focus:outline-none shrink-0 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Center Input + Rotating Placeholder Overlay */}
        <div className="relative flex-1 h-full flex items-center overflow-hidden">
          {/* Animated Placeholder Overlay when input is empty and not actively typing */}
          {!query && (
            <div
              className={`absolute inset-0 flex items-center pointer-events-none text-[#B7B0A8] text-sm sm:text-base md:text-base font-normal select-none overflow-hidden transition-all duration-400 ${
                isFocused ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              }}
            >
              {prefersReducedMotion ? (
                <span>Search for jewellery</span>
              ) : (
                <span
                  className={`transition-all duration-400 ease-in-out block truncate ${
                    isAnimating
                      ? 'opacity-0 -translate-y-2'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  {SEARCH_SUGGESTIONS[suggestionIndex]}
                </span>
              )}
            </div>
          )}

          {/* Real HTML Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label="Search jewellery"
            autoComplete="off"
            className="w-full h-full bg-transparent text-[#2B2723] text-sm sm:text-base font-normal outline-none pr-3 placeholder-transparent"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            }}
          />
        </div>

        {/* Right Action Icons: Camera & Microphone */}
        <div className="flex items-center gap-1 sm:gap-2 pr-4 shrink-0">
          {/* Camera Visual Search */}
          <button
            type="button"
            onClick={onOpenVisualSearch}
            aria-label="Search by image"
            title="Search by image"
            className="p-2 text-[#756D65] hover:text-[#C89B3C] hover:bg-[#FAF7F0] rounded-full transition-all"
          >
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Microphone Voice Search */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label="Voice search"
            title="Voice search"
            className={`p-2 rounded-full transition-all ${
              isListening
                ? 'text-[#0B5D3B] bg-[#0B5D3B]/10 animate-pulse ring-2 ring-[#0B5D3B]/30'
                : 'text-[#756D65] hover:text-[#C89B3C] hover:bg-[#FAF7F0]'
            }`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B5D3B]" />
            ) : (
              <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </form>

      {/* Real-time Search Autocomplete Dropdown */}
      {isFocused && query.trim().length >= 2 && (
        <SearchAutocomplete
          query={query}
          onClose={() => setIsFocused(false)}
          onSelectQuery={(term) => setQuery(term)}
        />
      )}
    </div>
  );
};

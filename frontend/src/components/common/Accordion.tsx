import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-[#E8E2D9] border-t border-b border-[#E8E2D9]">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between text-left focus:outline-none group py-1"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors font-medium">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#7A736E] group-hover:text-[#C5A059] transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180 text-[#C5A059]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-[#7A736E] leading-relaxed font-sans animate-fade-in pr-4">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

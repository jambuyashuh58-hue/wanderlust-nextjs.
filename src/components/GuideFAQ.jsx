'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function GuideFAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-card">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-muted/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-sm md:text-base">{item.q}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-foreground/80 leading-relaxed">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

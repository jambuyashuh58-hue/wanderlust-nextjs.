'use client';

// Floating chat-entry widget, bottom-right on every public page (see
// SiteChrome.jsx). This is NOT the real WhatsApp Business API -- that needs
// a paid provider (Twilio/360dialog/etc.) and a lot more infra than a
// personal site needs right now. Instead it's a small custom widget that
// asks the qualifying question up front, then either hands off to a real
// WhatsApp chat (wa.me deep link, prefilled from the visitor's side) or, if
// no WhatsApp number is configured yet, falls back to capturing the lead
// through the existing concierge inquiry endpoint so the flow still works
// end to end without any new account.
//
// Configure via env (both public/non-secret, safe to expose client-side):
//   NEXT_PUBLIC_WHATSAPP_NUMBER  -- full international number, digits only, e.g. "905XXXXXXXXX"
//   NEXT_PUBLIC_CALENDLY_URL     -- a Calendly (or any scheduling) booking link
// Either can be left unset; the widget adapts rather than breaking.
import { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

function waLink(message) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.04 2.67C8.65 2.67 2.65 8.67 2.65 16.06c0 2.4.63 4.66 1.73 6.62L2.5 29.33l6.82-1.79a13.3 13.3 0 0 0 6.72 1.82h.01c7.39 0 13.39-6 13.39-13.39 0-3.58-1.39-6.94-3.92-9.47a13.3 13.3 0 0 0-9.48-3.83Zm0 24.51h-.01a11.1 11.1 0 0 1-5.66-1.55l-.41-.24-4.05 1.06 1.08-3.95-.27-.41a11.09 11.09 0 0 1-1.7-5.93c0-6.14 5-11.14 11.13-11.14 2.97 0 5.77 1.16 7.87 3.26a11.05 11.05 0 0 1 3.26 7.88c0 6.14-5 11.14-11.24 11.14Zm6.1-8.34c-.33-.17-1.98-.98-2.29-1.09-.31-.11-.53-.17-.76.17-.22.33-.87 1.09-1.07 1.32-.2.22-.39.25-.72.08-.33-.17-1.4-.52-2.67-1.66-.99-.88-1.65-1.97-1.85-2.3-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.16-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.76-1.83-1.04-2.51-.27-.66-.55-.57-.76-.58-.2-.01-.42-.01-.64-.01-.22 0-.58.08-.89.42-.3.33-1.16 1.14-1.16 2.77s1.19 3.22 1.36 3.44c.17.22 2.34 3.58 5.67 5.02.79.34 1.41.55 1.89.7.79.25 1.51.22 2.08.13.63-.1 1.98-.81 2.26-1.6.28-.78.28-1.45.19-1.6-.08-.14-.3-.22-.63-.39Z" />
    </svg>
  );
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('ask'); // ask | visiting | moving | leadSent
  const [lead, setLead] = useState({ name: '', email: '' });
  const [leadStatus, setLeadStatus] = useState('idle');

  const reset = () => {
    setStep('ask');
    setLead({ name: '', email: '' });
    setLeadStatus('idle');
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const submitLead = async (e) => {
    e.preventDefault();
    setLeadStatus('loading');
    try {
      const res = await fetch('/api/concierge/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          tier_interested: 'paperwork',
          message: 'Submitted via the site chat bubble ("planning to move" flow) requesting a free 15-minute discovery call.',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStep('leadSent');
    } catch {
      setLeadStatus('error');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">Move to Istanbul</span>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="hover:opacity-80">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-3 text-sm">
            {step !== 'ask' && (
              <button type="button" onClick={reset} className="self-start inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}

            {step === 'ask' && (
              <>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                  Hi! Are you just visiting, or planning to move to Istanbul?
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <button type="button" onClick={() => setStep('visiting')} className="px-4 py-2.5 rounded-xl border border-border font-medium hover:border-primary text-left">
                    ✈️ Just visiting
                  </button>
                  <button type="button" onClick={() => setStep('moving')} className="px-4 py-2.5 rounded-xl border border-border font-medium hover:border-primary text-left">
                    🏠 Planning to move
                  </button>
                </div>
              </>
            )}

            {step === 'visiting' && (
              <>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  Great — here's where to start:
                </div>
                <a href="/onboarding" className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white font-semibold text-center">Plan my trip</a>
                <a href="/discover" className="px-4 py-2.5 rounded-xl border border-border font-medium text-center">Discover activities</a>
                {WHATSAPP_NUMBER && (<a
                  href={waLink("Hi! I'm visiting Istanbul and had a quick question.")}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-center text-muted-foreground hover:text-foreground underline underline-offset-2 mt-1"
                >
                  Or message us on WhatsApp
                </a>)}
              </>
            )}

            {step === 'moving' && (
              <>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  We help people relocate to Istanbul every week — visa, housing, banking, all of it. The fastest way in is a free 15-minute discovery call.
                </div>
                {CALENDLY_URL ? (
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white font-semibold text-center">
                    Book my free call
                  </a>
                ) : (
                  <form onSubmit={submitLead} className="flex flex-col gap-2">
                    <input
                      type="text" required placeholder="Your name" value={lead.name}
                      onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                      className="px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email" required placeholder="Your email" value={lead.email}
                      onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                      className="px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" disabled={leadStatus === 'loading'} className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white font-semibold disabled:opacity-60">
                      {leadStatus === 'loading' ? 'Sending…' : 'Request my free call'}
                    </button>
                    {leadStatus === 'error' && <p className="text-xs text-destructive text-center">Something went wrong — email us via the Contact page instead.</p>}
                  </form>
                )}
                {WHATSAPP_NUMBER && (<a
                  href={waLink("Hi! I'm planning to move to Istanbul and I'd like to talk to someone.")}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-center text-muted-foreground hover:text-foreground underline underline-offset-2 mt-1"
                >
                  Or continue on WhatsApp
                </a>)}
                <a href="/concierge" className="text-xs text-center text-muted-foreground hover:text-foreground underline underline-offset-2">
                  See concierge pricing
                </a>
              </>
            )}

            {step === 'leadSent' && (
              <div className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                Got it — we'll reach out at {lead.email} to schedule your call.
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
      </button>
    </div>
  );
}

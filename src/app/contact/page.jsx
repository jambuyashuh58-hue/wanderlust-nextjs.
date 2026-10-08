import { Mail, Instagram } from 'lucide-react';
import PageJsonLd from '@/components/PageJsonLd';

const CONTACT_EMAIL = 'hello@movetoistanbul.online';
const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

export const metadata = {
  title: 'Contact Us | Move to Istanbul',
  description: 'Get in touch with the Move to Istanbul team.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <PageJsonLd type="ContactPage" name="Contact Move to Istanbul" description="Get in touch with the Move to Istanbul team." />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
        <div className="space-y-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary transition-colors">
            <Mail className="w-5 h-5 text-primary" /><span>{CONTACT_EMAIL}</span>
          </a>
          <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary transition-colors">
            <Instagram className="w-5 h-5 text-primary" /><span>@move_istanbul on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

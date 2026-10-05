import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function CityCard({ city }) {
  return (
    <Link href={`/city/${city.name.toLowerCase()}`} className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all block">
      <div className="relative aspect-[4/3] overflow-hidden">
        {city.image_url && <Image src={city.image_url} alt={city.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" /> {city.name}</h3>
        </div>
      </div>
    </Link>
  );
}

import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Lazy-loaded Google Map. Set `site.map.embedUrl` to the exact pin once the address is confirmed.
 * A plain "Open in Google Maps" link sits behind the frame, so there's still a way to find the
 * hospital if the embed is blocked (ad blockers, data savers, slow connections).
 */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-line bg-brand-50",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <a
          href={site.map.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
        >
          <MapPin className="h-8 w-8" aria-hidden="true" />
          Open Living Hope Hospital in Google Maps
        </a>
      </div>
      <iframe
        src={site.map.embedUrl}
        title="Map showing the location of Living Hope Hospital in Parakin, Ile-Ife"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="relative h-full min-h-72 w-full border-0"
      />
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function UTMPreserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on the client
    if (typeof window === 'undefined') return;

    // 1. Get current full URL (including any query string)
    const currentUrl = new URL(window.location.href);
    const currentParams = currentUrl.searchParams;

    // 2. Check if we already have UTM parameters in the URL
    const hasUtm = 
      currentParams.has('utm_source') ||
      currentParams.has('utm_medium') ||
      currentParams.has('utm_campaign');

    // 3. If UTMs are present, save them to sessionStorage for future use
    if (hasUtm) {
      const utmData = {
        utm_source: currentParams.get('utm_source') || '',
        utm_medium: currentParams.get('utm_medium') || '',
        utm_campaign: currentParams.get('utm_campaign') || '',
        // add other UTM parameters if needed
      };
      sessionStorage.setItem('utmParams', JSON.stringify(utmData));
      return;
    }

    // 4. If no UTMs in URL, try to restore from sessionStorage
    const stored = sessionStorage.getItem('utmParams');
    if (stored) {
      try {
        const utmData = JSON.parse(stored);
        const newParams = new URLSearchParams(currentParams);

        // Only add if not already present (to avoid duplicates)
        if (!newParams.has('utm_source') && utmData.utm_source) {
          newParams.set('utm_source', utmData.utm_source);
          newParams.set('utm_medium', utmData.utm_medium);
          newParams.set('utm_campaign', utmData.utm_campaign);
        }

        // If we added parameters, update the URL without reloading
        if (newParams.toString() !== currentParams.toString()) {
          const newUrl = pathname + '?' + newParams.toString();
          window.history.replaceState({}, '', newUrl);
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, [pathname, searchParams]); // Re-run when route changes

  // This component does not render anything
  return null;
}
import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that updates og:image and twitter:image meta tags
 * to point to the app's opengraph image with the correct Replit domain.
 */
export function metaImagesPlugin(): Plugin {
  return {
    name: 'vite-plugin-meta-images',
    transformIndexHtml(html) {
      const baseUrl = getDeploymentUrl();
      if (!baseUrl) {
        log('[meta-images] no Replit deployment domain found, skipping meta tag updates');
        return html;
      }

      // Check if opengraph image exists in public directory
      const publicDir = path.resolve(process.cwd(), 'client', 'public');
      const opengraphPngPath = path.join(publicDir, 'opengraph.png');
      const opengraphJpgPath = path.join(publicDir, 'opengraph.jpg');
      const opengraphJpegPath = path.join(publicDir, 'opengraph.jpeg');

      let imageExt: string | null = null;
      if (fs.existsSync(opengraphPngPath)) {
        imageExt = 'png';
      } else if (fs.existsSync(opengraphJpgPath)) {
        imageExt = 'jpg';
      } else if (fs.existsSync(opengraphJpegPath)) {
        imageExt = 'jpeg';
      }

      if (!imageExt) {
        log('[meta-images] OpenGraph image not found, skipping meta tag updates');
        return html;
      }

      const imageUrl = `${baseUrl}/opengraph.${imageExt}`;

      // Only rewrite tags whose content is NOT already an absolute https URL
      // to the canonical production domain — that way explicit author choices
      // (e.g. /assets/og-pdr-dashboard.png hosted at photodaterescue.com) win.
      const isCanonicalAbsolute = (content: string): boolean =>
        /^https:\/\/(www\.)?photodaterescue\.com\//i.test(content);

      const rewriteIfNotCanonical = (
        pattern: RegExp,
        attrName: 'property' | 'name',
        tagName: string,
      ): void => {
        html = html.replace(pattern, (match, currentContent: string) => {
          if (isCanonicalAbsolute(currentContent)) {
            return match;
          }
          return `<meta ${attrName}="${tagName}" content="${imageUrl}" />`;
        });
      };

      log('[meta-images] updating meta image tags to:', imageUrl);

      rewriteIfNotCanonical(
        /<meta\s+property="og:image"\s+content="([^"]*)"\s*\/>/g,
        'property',
        'og:image',
      );

      rewriteIfNotCanonical(
        /<meta\s+name="twitter:image"\s+content="([^"]*)"\s*\/>/g,
        'name',
        'twitter:image',
      );

      return html;
    },
  };
}

function getDeploymentUrl(): string | null {
  if (process.env.REPLIT_INTERNAL_APP_DOMAIN) {
    const url = `https://${process.env.REPLIT_INTERNAL_APP_DOMAIN}`;
    log('[meta-images] using internal app domain:', url);
    return url;
  }

  if (process.env.REPLIT_DEV_DOMAIN) {
    const url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
    log('[meta-images] using dev domain:', url);
    return url;
  }

  return null;
}

function log(...args: any[]): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(...args);
  }
}

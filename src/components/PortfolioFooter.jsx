import React, { memo, useEffect, useState } from 'react';

// Sharing the single footer style block keeps the gradient CSS from being duplicated across suspense renders.
const FOOTER_STYLES = `
        .footer-shell {
          content-visibility: auto;
          contain: layout paint style;
          contain-intrinsic-size: 200px 140px;
          padding: 1.5rem 0 1.25rem;
          margin: 0;
        }

        .footer-text {
          margin: 0;
        }
      `;

// memo ensures only the timestamp state updates, so React avoids diffing the rest of the footer tree each minute.
const PortfolioFooter = memo(function PortfolioFooter() {
  const [timestamp, setTimestamp] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-shell border-t border-red-500/30 bg-gradient-to-t from-red-950/20 to-transparent">
      <div className="container mx-auto px-6 text-center">
        <p className="footer-text text-gray-400 text-xs md:text-sm tracking-[0.15em] uppercase">
          Copyright {timestamp.getFullYear()} Sayak Majumder{' � '}All rights reserved{' � '}Last updated: {timestamp.toLocaleString()}
        </p>
      </div>

      <style jsx>{FOOTER_STYLES}</style>
    </footer>
  );
});

export default PortfolioFooter;

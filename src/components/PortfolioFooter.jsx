import React, { useEffect, useState } from 'react';

const PortfolioFooter = () => {
  const [timestamp, setTimestamp] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-shell py-8 border-t border-red-500/30 bg-gradient-to-t from-red-950/20 to-transparent">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400">
          Copyright {timestamp.getFullYear()} Sayak Majumder. All rights reserved. Last updated: {timestamp.toLocaleString()}.
        </p>
      </div>

      <style jsx>{`
        .footer-shell {
          content-visibility: auto;
          contain: layout paint style;
          contain-intrinsic-size: 200px 140px;
        }
      `}</style>
    </footer>
  );
};

export default PortfolioFooter;

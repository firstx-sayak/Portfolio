import React from 'react';

const PortfolioFooter = ({ currentDate }) => (
  <footer className="py-8 border-t border-red-500/30 bg-gradient-to-t from-red-950/20 to-transparent">
    <div className="container mx-auto px-6 text-center">
      <p className="text-gray-400">
        Ac {currentDate.getFullYear()} Sayak Majumder. All rights reserved. ??? Last updated: {currentDate.toLocaleString()}
      </p>
    </div>
  </footer>
);

export default PortfolioFooter;

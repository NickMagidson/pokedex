import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-1">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://nickmagidson.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/moon.png"
        alt="Moon logo"
        width={20}
        height={20}
      />
      Built by Nick Magidson →
    </a>
  </footer>
  );
};

export default Footer;
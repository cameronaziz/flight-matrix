import React from 'react';

const Footer = () => (
  <div className="bg-blue">
    <div className="flex justify-between max-w-xl mx-auto p-4 md:p-8 text-sm">
      <p className="text-white">
        Created by{' '}
        <a
          href="https://cameronaziz.com"
          className="font-bold no-underline text-white"
        >
          Cameron Aziz
        </a>
      </p>
      <p>
        <a
          href="https://github.com/cameronaziz"
          className="font-bold no-underline text-white"
        >
          GitHub
        </a>
      </p>
    </div>
  </div>
);

export default Footer;

import React from 'react';
import Link from 'next/link';

const modules = [
  {
    name: 'encounters',
    path: '/encounters',
  },
];

const Modules = () => {
  return (
    <ul>
      {modules.map(({ name, path }) => (
        <li key={`topbar_module_${name}`}>
          <Link href={path}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Modules;

import React from 'react';

export default function SmallLoading({ txtColor = 'text-primary' }) {
  return <span className={`loading loading-spinner ${txtColor}`}></span>;
}

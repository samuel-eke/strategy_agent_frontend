import React from 'react';

export default function TitleStep({ values, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Give it a title</label>
      <input
        type="text"
        value={values.title}
        onChange={onChange('title')}
        placeholder="e.g., Q4 Infrastructure Investment Decision"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

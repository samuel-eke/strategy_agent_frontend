import React from 'react';

export default function DescriptionStep({ values, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Describe in detail the context of what you want to do
      </label>
      <textarea
        value={values.description}
        onChange={onChange('description')}
        rows={6}
        placeholder="Explain the background, goals, and current situation..."
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

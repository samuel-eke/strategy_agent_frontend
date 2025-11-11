import React from 'react';
import { COMMON_CONSTRAINTS } from './constants';

export default function ConstraintsStep({ values, onToggle, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select applicable constraints</label>
      <div className="space-y-2">
        {COMMON_CONSTRAINTS.map((constraint) => (
          <label key={constraint} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={values.constraints.includes(constraint)}
              onChange={() => onToggle('constraints')(constraint)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="capitalize">{constraint.replace(/_/g, ' ')}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

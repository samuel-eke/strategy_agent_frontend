import React from 'react';
import { URGENCY_LEVELS } from './constants';

export default function UrgencyStep({ values, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">How urgent is this decision?</label>
      <div className="space-y-2">
        {URGENCY_LEVELS.map((level) => (
          <label key={level} className="flex items-center space-x-3">
            <input
              type="radio"
              name="urgency"
              value={level}
              checked={values.urgency === level}
              onChange={onChange('urgency')}
              className="h-4 w-4 text-indigo-600 border-gray-300"
            />
            <span className="capitalize">{level}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

import React from 'react';
import { DECISION_TYPES } from './constants';

export default function DecisionTypeStep({ values, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        What kind of decision do you want to make?
      </label>
      <div className="space-y-2">
        {DECISION_TYPES.map((t) => (
          <label key={t} className="flex items-center space-x-3">
            <input
              type="radio"
              name="decisionType"
              value={t}
              checked={values.decision_type === t}
              onChange={onChange('decision_type')}
              className="h-4 w-4 text-indigo-600 border-gray-300"
            />
            <span className="capitalize">{t}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

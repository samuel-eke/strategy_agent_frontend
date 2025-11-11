import React from 'react';

export default function OptionItem({ opt, idx, onChange, onRemove, errors, hideRemove }) {
  return (
    <div key={opt.id} className="p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Option {idx + 1}</span>
        {!hideRemove && (
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={opt.name}
            onChange={onChange(idx, 'name')}
            placeholder="Option name"
            className="block w-full text-sm rounded-md border-gray-300"
          />
          {errors[`option_${idx}_name`] && (
            <p className="text-red-500 text-xs mt-1">{errors[`option_${idx}_name`]}</p>
          )}
        </div>
        <div>
          <textarea
            value={opt.description}
            onChange={onChange(idx, 'description')}
            placeholder="What this option entails..."
            rows={2}
            className="block w-full text-sm rounded-md border-gray-300"
          />
          {errors[`option_${idx}_description`] && (
            <p className="text-red-500 text-xs mt-1">{errors[`option_${idx}_description`]}</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input
              type="number"
              value={opt.estimated_cost}
              onChange={onChange(idx, 'estimated_cost')}
              placeholder="Est. cost"
              className="block w-full text-sm rounded-md border-gray-300"
            />
            {errors[`option_${idx}_cost`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`option_${idx}_cost`]}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              value={opt.estimated_benefit}
              onChange={onChange(idx, 'estimated_benefit')}
              placeholder="Est. benefit"
              className="block w-full text-sm rounded-md border-gray-300"
            />
            {errors[`option_${idx}_benefit`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`option_${idx}_benefit`]}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={opt.timeline}
              onChange={onChange(idx, 'timeline')}
              placeholder="Timeline"
              className="block w-full text-sm rounded-md border-gray-300"
            />
            {errors[`option_${idx}_timeline`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`option_${idx}_timeline`]}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

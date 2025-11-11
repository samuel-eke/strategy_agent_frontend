import React from 'react';
import OptionItem from './OptionItem';

export default function OptionsStep({ values, addOption, removeOption, onChangeOption, errors }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">Define your options</label>
        <button
          type="button"
          onClick={addOption}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
        >
          + Add Option
        </button>
      </div>
      <div className="space-y-6">
        {values.options.map((opt, idx) => (
          <OptionItem
            key={opt.id}
            opt={opt}
            idx={idx}
            onChange={onChangeOption}
            onRemove={removeOption}
            errors={errors}
            hideRemove={values.options.length <= 1}
          />
        ))}
      </div>
      {errors.options && <p className="text-red-500 text-sm mt-2">{errors.options}</p>}
    </div>
  );
}

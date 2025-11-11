import React from 'react';

export default function Summary({ values }) {
  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-3">All set ✅</h2>
        <p className="text-gray-700 mb-4">Your decision details were saved locally (check console).</p>
        <div className="text-sm text-gray-600 space-y-4">
          <div>
            <div className="font-medium">Type</div>
            <div className="mb-2 capitalize">{values.decision_type}</div>
          </div>
          <div>
            <div className="font-medium">Title</div>
            <div className="mb-2">{values.title}</div>
          </div>
          <div>
            <div className="font-medium">Description</div>
            <div className="mb-2 whitespace-pre-wrap">{values.description}</div>
          </div>
          <div>
            <div className="font-medium">Options ({values.options.length})</div>
            {values.options.map((opt) => (
              <div key={opt.id} className="mb-2 pl-4 border-l-2 border-gray-200">
                <div className="font-medium">{opt.name}</div>
                <div className="text-xs text-gray-500">Cost: ${opt.estimated_cost} | Benefit: ${opt.estimated_benefit} | Timeline: {opt.timeline}</div>
                <div className="text-sm">{opt.description}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium">Constraints</div>
            <div className="mb-2">{values.constraints.join(', ')}</div>
          </div>
          <div>
            <div className="font-medium">Stakeholders</div>
            <div className="mb-2">{values.stakeholders.join(', ')}</div>
          </div>
          <div>
            <div className="font-medium">Urgency</div>
            <div className="capitalize">{values.urgency}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

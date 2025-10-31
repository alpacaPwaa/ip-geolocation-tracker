import React from "react";
import type { HistoryItem } from "../types";

interface HistoryListProps {
  history: HistoryItem[];
  selectedIds: Set<string>;
  onItemClick: (ip: string) => void;
  onSelectionChange: (id: string) => void;
  onDelete: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  selectedIds,
  onItemClick,
  onSelectionChange,
  onDelete,
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-300">Search History</h3>
        {selectedIds.size > 0 && (
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded-lg transition-colors"
          >
            Delete ({selectedIds.size})
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-slate-500 text-center py-4">No searches yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {history.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-slate-700 p-2 rounded-md"
            >
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => onSelectionChange(item.id)}
                className="form-checkbox h-5 w-5 bg-slate-600 border-slate-500 rounded text-sky-500 focus:ring-sky-500 cursor-pointer"
              />
              <div
                className="grow cursor-pointer"
                onClick={() => onItemClick(item.ip)}
              >
                <p className="font-mono text-white">{item.ip}</p>
                <p className="text-xs text-slate-400">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;

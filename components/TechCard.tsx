import React from 'react';
import { TechCardProps } from '../types';

export const TechCard: React.FC<TechCardProps> = ({ title, description, icon, tech, onClick }) => {
  return (
    <button
      onClick={() => onClick(tech)}
      className="flex flex-col items-start p-6 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-blue-500 transition-all duration-300 group text-left w-full h-full shadow-lg"
    >
      <div className="p-3 bg-slate-900 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </button>
  );
};

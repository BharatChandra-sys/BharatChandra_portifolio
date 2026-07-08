'use client';
import { HiArrowLeft } from 'react-icons/hi';

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium transition-all duration-300"
    >
      <HiArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Go Back</span>
    </button>
  );
}

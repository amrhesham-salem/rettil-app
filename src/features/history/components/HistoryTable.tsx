import React from 'react';
import type { HistoryRecord } from '../../../types';
import { formatDateTime } from '../../../utils';

interface HistoryTableProps {
  records: HistoryRecord[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ records }) => (
  <div className="relative z-10 w-full max-w-4xl bg-brand-light rounded-[28px] p-4 sm:p-6 shadow-2xl overflow-x-auto">
    <table className="w-full text-right border-collapse min-w-150">
      <thead>
        <tr className="border-b border-border-default text-[15px] font-bold text-[#1F2937]">
          <th className="py-4 px-4 text-right">الاختبار</th>
          <th className="py-4 px-4 text-center">السورة</th>
          <th className="py-4 px-4 text-center">الجزء</th>
          <th className="py-4 px-4 text-center">الحالة</th>
          <th className="py-4 px-4 text-left">التاريخ</th>
        </tr>
      </thead>
      <tbody>
        {records.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border-default/60 last:border-none text-[13px] sm:text-[14px] text-gray-700 hover:bg-black/5 transition-colors"
          >
            <td className="py-4 px-4 font-bold text-[#1F2937]">{item.type}</td>
            <td className="py-4 px-4 text-center font-medium text-gray-800">{item.surah}</td>
            <td className="py-4 px-4 text-center font-medium text-gray-600">{item.juz}</td>
            <td className="py-4 px-4 text-center">
              <span
                className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-[12px] font-bold ${
                  item.status === 'correct'
                    ? 'bg-[#D1EBE1] text-brand-primary'
                    : 'bg-[#F9DEDC] text-[#B3261E]'
                }`}
              >
                {item.status === 'correct' ? 'صح' : 'خطأ'}
              </span>
            </td>
            <td className="py-4 px-4 text-left text-gray-500 font-medium text-[12px] sm:text-[13px]">
              {formatDateTime(item.timestamp)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export default function FormCard({ title, children, subtitle }: FormCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

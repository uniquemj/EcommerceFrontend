export  const InfoItem = ({ label, value, className }: { 
  label: string; 
  value: string; 
  className?: string 
}) => (
  <div className={className}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-900 mt-1">{value}</p>
  </div>
);
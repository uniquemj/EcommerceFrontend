import type{ LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

// export function StatCard({
//   title,
//   value,
//   icon: Icon,
//   iconColor = "text-secondary",
//   bgColor = "bg-secondary/10"
// }: StatCardProps) {
//   return (
//     // <Card className="p-4 shadow-none">
//     //   <CardContent className="flex items-center justify-between p-0 gap-space-8">
//     //     <div>
//     //       <p className="text-sm text-muted-foreground font-medium">{title}</p>
//     //       <h2 className="text-2xl font-bold">{value}</h2>
//     //     </div>
//     //     <div className={`rounded-xl p-3 ${bgColor}`}>
//     //       <Icon size={24} className={iconColor} />
//     //     </div>
//     //   </CardContent>
//     // </Card>
//     // <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden relative">
//     //   {/* Gradient accent (optional) */}
//     //   <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${bgColor.replace('bg-', 'from-')}`}></div>
      
//     //   <CardContent className="p-0 flex flex-col gap-4">
//     //     <div className="flex justify-between items-start gap-space-10">
//     //       <div>
//     //         <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
//     //         <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
//     //       </div>
//     //       <div className={`rounded-lg p-3 ${bgColor} transition-all duration-300 group-hover:scale-110`}>
//     //         <Icon size={24} className={`${iconColor} transition-colors duration-300`} />
//     //       </div>
//     //     </div>

//     //     {/* Optional animated underline */}
//     //     <div className="w-full h-[2px] overflow-hidden">
//     //       <div className={`h-full w-0 group-hover:w-full transition-all duration-500 ${bgColor}`}></div>
//     //     </div>
//     //   </CardContent>
//     // </Card>
//      <div className={`relative overflow-hidden rounded-xl p-6 shadow-lg ${bgColor} text-white`}>
//       {/* Floating circles decoration */}
//       <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10"></div>
//       <div className="absolute right-12 -bottom-6 w-20 h-20 rounded-full bg-white/5"></div>
      
//       <div className="relative z-10">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
//             <h2 className="text-3xl font-bold tracking-tight drop-shadow-sm">{value}</h2>
//           </div>
//           <div className={`rounded-xl p-3 bg-white/20 backdrop-blur-sm border border-white/10`}>
//             <Icon size={24} className={iconColor} />
//           </div>
//         </div>
        
//         {/* Animated progress indicator (example) */}
//         <div className="mt-6">
//           <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-white/80 rounded-full transition-all duration-1000 ease-out"
//               style={{ width: `${Math.min(Number(value)/100 * 100, 100)}%` }}
//             ></div>
//           </div>
//           <p className="text-xs mt-1 text-white/60">Monthly progress</p>
//         </div>
//       </div>
      
//       {/* Shine effect on hover */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
//       </div>
//     </div>
//   );
// }

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-gray-900",  // Default to high-contrast text
  bgColor = "bg-gray-100"       // Default light background
}: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 ${bgColor} shadow-sm hover:shadow-xl transition-shadow duration-300 group`}>
      
      {/* Decorative elements (subtle) */}
      <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-black/5"></div>
      <div className="absolute right-8 -bottom-4 w-14 h-14 rounded-full bg-black/3"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-space-10">
          <div>
            {/* High-contrast text */}
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
          </div>
          
          {/* Icon with contrast-safe background */}
          <div className={`rounded-lg p-3 ${iconColor.includes('text-white') ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Icon size={24} className={iconColor} />
          </div>
        </div>
        
        {/* Progress indicator - now with better contrast */}
        
      </div>
      
      {/* Hover effect - now visibility-safe */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-black/5 rounded-xl"></div>
    </div>
  );
}
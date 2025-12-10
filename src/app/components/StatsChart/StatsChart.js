'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function StatsChart({ watchlist }) { 
  if (!watchlist || watchlist.length === 0) return null;

  const watching = watchlist.filter(a => a.status === 'Watching').length;
  const completed = watchlist.filter(a => a.status === 'Completed').length;
  const planToWatch = watchlist.filter(a => a.status === 'Plan to Watch').length;
  const dropped = watchlist.filter(a => a.status === 'Dropped').length;

  const data = [
    { name: 'Watching', value: watching, color: '#3b82f6' },
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'Plan to Watch', value: planToWatch, color: '#f59e0b' },
    { name: 'Dropped', value: dropped, color: '#ef4444' },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8 transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Watchlist Overview</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">

        <div className="h-64 w-full md:w-1/2 relative">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#333'
                    }}
                />
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Total Anime</p>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white my-2">{watchlist.length}</p>
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-green-500 transition-all duration-1000" 
                        style={{ width: `${(completed / watchlist.length) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    You have completed <strong className="text-green-500">{completed}</strong> series!
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}
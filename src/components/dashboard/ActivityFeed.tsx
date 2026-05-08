import { ReactNode } from "react";

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  type: string;
  icon: ReactNode;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
}

export default function ActivityFeed({ activities, title = "Recent Activity" }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
            <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full whitespace-nowrap flex-shrink-0">
              {activity.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

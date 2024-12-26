import { useEffect, useState } from "react";
import { UserActivity } from "../../types";
import { formatCurrency } from "../../utils/format";
import { Badge } from "@/components/ui/badge";
import { getActivities, getCurrentUser } from "@/utils/storage";


export default function Activities() {
  const userData = getCurrentUser();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities(userData.email).then((data) => {
      const sortedActivities = [...data].sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      setActivities(sortedActivities);
      setLoading(false);
    });
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                money/ ETB
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <div>Loading ...</div>
            ) : (
              activities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          {(() => {
                            const dateObj = new Date(activity.createdAt);

                            const formattedDate =
                              dateObj.toLocaleDateString("en-US");
                            const formattedTime = dateObj.toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            );

                            return `${formattedDate} ${formattedTime}`;
                          })()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Badge
                      variant="secondary"
                      style={{ textAlign: "center" }}
                      className={`px-2 w-[70px] flex align-center justify-center text-center inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.type === "overtime"
                          ? "bg-blue-100 text-blue-800"
                          : activity.type === "salary"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {" "}
                      <span>{activity.type}</span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(activity.salary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {activity.tax}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

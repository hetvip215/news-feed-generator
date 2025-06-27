import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Profile() {
  const { user } = useContext(AuthContext);
  
  const [activity, setActivity] = useState({ keywords: [], clickedArticles: [] });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/activity/my-activity", {
          credentials: "include",
        });
        const data = await res.json();
        setActivity(data);
      } catch (err) {
        console.error("Error fetching activity", err);
      }
    };

    if (user) fetchActivity();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 py-12 flex justify-center items-start">
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>

        {user ? (
          <>
            <div className="space-y-4 text-base">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Username:</span>
                <span className="font-medium">{user.username}</span>
              </div>

              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
            </div>

            {/* 🔍 Interests */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Areas of Interest</h3>
              {activity.keywords.length === 0 ? (
                <p className="text-gray-500 text-sm">No keyword data yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {activity.keywords
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
                    .map((k, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white"
                      >
                        {k.word}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* 📰 Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Recently Viewed</h3>
              {activity.clickedArticles.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent articles.</p>
              ) : (
                <ul className="list-disc list-inside text-sm text-blue-400 space-y-1">
                  {activity.clickedArticles
                    .slice(-5)
                    .reverse()
                    .map((a, i) => (
                      <li key={i}>
                        <a href={a.url} target="_blank" rel="noreferrer" className="hover:underline">
                          {a.title}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

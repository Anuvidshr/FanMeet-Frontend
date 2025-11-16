import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";
import { authUtils } from "../../utils/auth";
import { useTheme } from "../utils/ThemeContext";

// Helper function for date formatting
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((store) => store.requests);

    // Fetch all types of notifications
    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/user/notifications`, {
                withCredentials: true,
                headers: authUtils.getAuthHeaders()
            });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.log("notification err: " + error);
            toast.error("Failed to load notifications");
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Handle notification actions
    const handleNotificationAction = async (action, notificationId) => {
        try {
            const res = await axios.post(
                `${API_BASE_URL}/notifications/${action}/${notificationId}`,
                {},
                {
                    withCredentials: true,
                    headers: authUtils.getAuthHeaders()
                }
            );

            // Remove the processed notification
            const updatedNotifications = notifications.filter(n => n._id !== notificationId);
            dispatch(addRequests(updatedNotifications));
            
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to process action");
        }
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'connection_request': return '👋';
            case 'accepted_request': return '🤝';
            case 'new_message': return '💬';
            case 'new_like': return '❤️';
            case 'new_comment': return '💭';
            default: return '📢';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Notifications
                    </h1>
                    {notifications?.length > 0 && (
                        <button 
                            onClick={() => handleNotificationAction('clear-all')}
                            className="px-4 py-2 text-sm rounded-lg bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 transition-all"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {!notifications && (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}

                    {notifications?.length === 0 && (
                        <div className="text-center py-20 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                            <div className="text-6xl mb-4">🔔</div>
                            <h2 className="text-xl text-gray-300 mb-2">All Caught Up!</h2>
                            <p className="text-gray-400">No new notifications</p>
                        </div>
                    )}

                    {notifications?.map((notification) => (
                        <div
                            key={notification._id}
                            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                {/* Notification Icon */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-200 mb-1">
                                        <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {notification.fromUserId?.firstname}
                                        </span>
                                        {' '}
                                        {notification.message}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {formatDate(notification.createdAt)}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                {notification.type === 'connection_request' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleNotificationAction('accept', notification._id)}
                                            className="px-4 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-sm transition-all"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleNotificationAction('decline', notification._id)}
                                            className="px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm transition-all"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Unread Indicator */}
                            {!notification.read && (
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
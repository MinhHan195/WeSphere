import { useEffect } from "react";

const EventPlugin = () => {
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5178/api/events");

        eventSource.addEventListener("notification", (event) => {
            const data = JSON.parse(event.data);
            console.log("🔔 Thông báo:", data.message);
            // Hiển thị ở UI nếu cần
        });

        return () => {
            eventSource.close(); // đóng kết nối khi component bị hủy
        };
    }, []);
    return null;
};
export default EventPlugin;

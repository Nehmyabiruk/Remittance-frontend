import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Send, Receipt, TrendingUp, DollarSign, Bell, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==================== NOTIFICATION STATES ====================
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);

  const getSafeBalance = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) return parsed;
    }
    return 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    setTotalSent(0);
    setTotalReceived(0);
    setTransactions([]);

    fetchTransactionHistory(token);
    fetchUnreadCount();
  }, [navigate]);

  const fetchTransactionHistory = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/transactions/history", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        const txs = data.transactions;
        setTransactions(txs);

        let sent = 0;
        let received = 0;

        txs.forEach((tx: any) => {
          if (tx.type === "sent") {
            sent += tx.amount || 0;
          } else {
            received += tx.received_amount || tx.amount || 0;
          }
        });

        setTotalSent(sent);
        setTotalReceived(received);
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== NOTIFICATION FUNCTIONS ====================

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/notifications/unread-count", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to fetch unread count");
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setNotifLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/notifications?limit=8", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (err) {
      console.error("Failed to fetch notifications");
    } finally {
      setNotifLoading(false);
    }
  };

  const toggleDropdown = () => {
    const newState = !showDropdown;
    setShowDropdown(newState);
    if (newState) {
      fetchNotifications();
    }
  };

  const markAsRead = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(
        "http://localhost:5000/api/notifications/mark-all-read",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header with Bell and Profile */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! {user?.name || "User"} Here's your account overview.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Bell Icon */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="relative p-3 hover:bg-gray-100 rounded-full transition"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No notifications yet</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                          !notif.is_read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="font-medium text-gray-900">{notif.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold">
              ${getSafeBalance(user?.balance).toFixed(2)}
            </h2>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
        <Link to="/app/send">
          <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
            <Send className="w-4 h-4 mr-2" />
            Send Money Now
          </Button>
        </Link>
      </Card>

      {/* Quick Stats - Changed to Wheat Background */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-[white] border border-amber-200">   {/* Wheat color */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-700 mb-1">Total Sent</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalSent.toFixed(2)}
          </p>
          <p className="text-sm text-green-600 mt-2">This month</p>
        </Card>

        <Card className="p-6 bg-[white] border border-amber-200">   {/* Wheat color */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-700 mb-1">Total Received</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalReceived.toFixed(2)}
          </p>
          <p className="text-sm text-blue-600 mt-2">This month</p>
        </Card>

        <Card className="p-6 bg-[white] border border-amber-200">   {/* Wheat color */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-700 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </Card>
      </div>

      {/* Recent Transactions */}
<Card className="p-6 bg-white shadow-sm border border-gray-100">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
    <Link to="/app/transactions">
      <Button variant="outline" size="sm">View All</Button>
    </Link>
  </div>

  <div className="space-y-4">
    {transactions.length === 0 ? (
      <p className="text-center py-8 text-gray-500">
        No transactions yet. Send money to see history here.
      </p>
    ) : (
      transactions.slice(0, 4).map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                transaction.type === "sent" 
                  ? "bg-red-50" 
                  : "bg-emerald-50"
              }`}
            >
              {transaction.type === "sent" ? (
                <ArrowUpRight className="w-6 h-6 text-red-600" />
              ) : (
                <ArrowDownRight className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {transaction.type === "sent" 
                  ? `Sent to ${transaction.other_party}` 
                  : `Received from ${transaction.other_party}`}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              className={`font-semibold text-lg ${
                transaction.type === "sent" ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {transaction.type === "sent" ? "-" : "+"}
              ${transaction.amount.toFixed(2)}
            </p>
            {transaction.received_amount && transaction.received_amount !== transaction.amount && (
              <p className="text-xs text-gray-500">
                Received: {transaction.received_amount.toFixed(2)} {transaction.receiver_currency}
              </p>
            )}
            <p className={`text-xs mt-1 ${
              transaction.status === "completed" ? "text-emerald-600" : "text-amber-600"
            }`}>
              {transaction.status}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</Card>
</div>
  );
}
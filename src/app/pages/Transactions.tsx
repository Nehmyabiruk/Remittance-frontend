import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  // Fetch real transactions when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTransactions(token);
  }, [navigate]);

  const fetchTransactions = async (token: string) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/transactions/history", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        const txs = data.transactions || [];
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

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesSearch = 
      (transaction.other_party || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Export to CSV
  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const headers = [
      "Date", "Time", "Type", "Party", "Amount Sent", "Currency Sent",
      "Amount Received", "Currency Received", "Exchange Rate", "Description", "Status"
    ];

    const rows = transactions.map((tx) => {
      const date = new Date(tx.date);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tx.type === "sent" ? "Sent" : "Received",
        tx.other_party || "N/A",
        tx.amount.toFixed(2),
        tx.sender_currency || "USD",
        tx.received_amount ? tx.received_amount.toFixed(2) : "",
        tx.receiver_currency || tx.sender_currency || "USD",
        tx.exchange_rate ? tx.exchange_rate.toFixed(4) : "1.0000",
        tx.description || "Money Transfer",
        tx.status || "completed"
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
        <p className="text-gray-600">View and manage all your transactions</p>
      </div>

      {/* Filters - White Card */}
      <Card className="p-6 mb-6 bg-white border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by recipient or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="md:w-48 bg-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="sent">Sent Only</SelectItem>
              <SelectItem value="received">Received Only</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transactions List - White Card */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      transaction.type === "sent" ? "bg-red-50" : "bg-emerald-50"
                    }`}
                  >
                    {transaction.type === "sent" ? (
                      <ArrowUpRight className="w-6 h-6 text-red-600" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {transaction.type === "sent" 
                        ? `Sent to ${transaction.other_party}` 
                        : `Received from ${transaction.other_party}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-4">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function SendMoney() {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverCurrency, setReceiverCurrency] = useState("ETB"); // Changed default to ETB
  const [description, setDescription] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [receivedAmount, setReceivedAmount] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);

  const senderCurrency = "USD";

  // Fetch exchange rate preview
  useEffect(() => {
    const fetchRate = async () => {
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setExchangeRate(null);
        setReceivedAmount(null);
        return;
      }

      setRateLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/transactions/exchange-rate?from=${senderCurrency}&to=${receiverCurrency}`
        );

        const rate = res.data.rate || res.data.data?.rate;
        if (rate) {
          setExchangeRate(rate);
          setReceivedAmount((parseFloat(amount) * rate).toFixed(2));
        } else {
          setExchangeRate(null);
          setReceivedAmount(null);
        }
      } catch (err) {
        console.error("Rate fetch failed", err);
        setExchangeRate(null);
        setReceivedAmount(null);
      } finally {
        setRateLoading(false);
      }
    };

    const timer = setTimeout(fetchRate, 500);
    return () => clearTimeout(timer);
  }, [amount, receiverCurrency]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const res = await axios.post(
        "http://localhost:5000/api/transactions/send",
        {
          receiverEmail,
          amount: parseFloat(amount),
          description,
          receiverCurrency,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success(`Successfully sent $${amount} USD to ${receiverEmail}!`);

        // Reset form
        setReceiverEmail("");
        setAmount("");
        setDescription("");
        setExchangeRate(null);
        setReceivedAmount(null);
      } else {
        setError(res.data.message || "Transfer failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to send money";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Send Money Abroad
      </h2>

      {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}

      <form onSubmit={handleSend} className="space-y-6">
        <div>
          <Label htmlFor="receiverEmail"  bg-white className="text-gray-900 font-medium">
            Receiver Email
          </Label>
          <Input
            id="receiverEmail"
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            placeholder="friend@example.com"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="amount" className="text-gray-900 font-medium">
            Amount (USD)
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500.00"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="receiverCurrency" className="text-gray-900 font-medium">
            Receiver Currency
          </Label>
          <select
            id="receiverCurrency"
            value={receiverCurrency}
            onChange={(e) => setReceiverCurrency(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 mt-1"
            required
          >
            <option value="EUR">EUR – Euro</option>
            <option value="GBP">GBP – British Pound</option>
            <option value="AED">AED – UAE Dirham</option>
            <option value="CAD">CAD – Canadian Dollar</option>
            <option value="CHF">CHF – Swiss Franc</option>
          </select>
        </div>

        {/* Live Preview - White background with black text */}
        {amount && (
          <div className="bg-white border border-gray-200 p-5 rounded-xl">
            {rateLoading ? (
              <p className="text-gray-600">Fetching latest rate...</p>
            ) : exchangeRate ? (
              <p className="text-lg text-gray-900">
                Receiver gets ≈{" "}
                <strong className="text-emerald-600 font-semibold">
                  {receivedAmount} {receiverCurrency}
                </strong>
                <br />
                <span className="text-sm text-gray-600">
                  Rate: 1 {senderCurrency} ≈ {exchangeRate.toFixed(4)} {receiverCurrency}
                </span>
              </p>
            ) : (
              <p className="text-red-600">Could not fetch exchange rate</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="description" className="text-gray-900 font-medium">
            Description (optional)
          </Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Family support"
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !amount || !receiverEmail}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-base font-semibold mt-2"
        >
          {loading ? "Sending Money..." : "Confirm & Send"}
        </Button>
      </form>
    </div>
  );
}
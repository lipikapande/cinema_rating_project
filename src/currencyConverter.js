import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState();
  const [toCurr, setToCurr] = useState("USD");
  const [fromCurr, setFromCurr] = useState("EUR");
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    if (!amount || !fromCurr || !toCurr || fromCurr === toCurr) {
      setConverted(null);
      return;
    }

    async function fetchData() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
      );
      const data = await res.json();
      setConverted(data.rates[toCurr]);
    }

    fetchData();
  }, [amount, toCurr, fromCurr]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted
          ? `${amount} ${fromCurr} = ${converted} ${toCurr}`
          : "Choose different currencies"}
      </p>
    </div>
  );
}

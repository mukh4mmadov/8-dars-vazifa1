import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState({
    value: "USD",
    label: (
      <div className="flex items-center space-x-4">
        <img
          src="https://flagcdn.com/us.svg"
          alt="United States"
          className="w-12 h-8"
        />
        <span className="text-2xl">USD - United States Dollar</span>
      </div>
    ),
  });
  const [toCurrency, setToCurrency] = useState({
    value: "UZS",
    label: (
      <div className="flex items-center space-x-4">
        <img
          src="https://flagcdn.com/uz.svg"
          alt="Uzbekistan"
          className="w-12 h-8"
        />
        <span className="text-2xl">UZS - Uzbekistani Som</span>
      </div>
    ),
  });

  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryOptions = response.data.map((country) => ({
        value: country.currencies ? Object.keys(country.currencies)[0] : "",
        label: (
          <div className="flex items-center space-x-4">
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-12 h-8"
            />
            {country.currencies
              ? `${Object.keys(country.currencies)[0]} - ${
                  country.currencies[Object.keys(country.currencies)[0]].name
                }`
              : "No Currency"}
          </div>
        ),
      }));
      setOptions(countryOptions);
    }
    fetchCountries();
  }, []);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between mb-12 text-2xl font-semibold text-blue-500">
          <button>Convert</button>
          <button>Send</button>
          <button>Charts</button>
          <button>Alerts</button>
        </div>

        <div className="flex items-center space-x-8">
          <input
            type="number"
            placeholder="qiymat"
            className="border border-gray-300 rounded-lg p-6 w-48 text-2xl text-center"
          />

          <Select
            options={options}
            value={fromCurrency}
            onChange={(selectedOption) => setFromCurrency(selectedOption)}
            className="w-72"
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "60px",
                fontSize: "1.5rem",
              }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
              }),
            }}
          />

          <button
            onClick={handleSwap}
            className="p-4 bg-gray-200 rounded-lg hover:bg-gray-300 text-3xl"
          >
            ↔️
          </button>

          <Select
            options={options}
            value={toCurrency}
            onChange={(selectedOption) => setToCurrency(selectedOption)}
            className="w-72"
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "60px",
                fontSize: "1.5rem",
              }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

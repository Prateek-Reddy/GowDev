// src/App.js
import React, { useRef, useState } from "react";

const App = () => {
  const [prediction, setPrediction] = useState(null);

  const typeRef = useRef("L");
  const airTempRef = useRef();
  const processTempRef = useRef();
  const speedRef = useRef();
  const torqueRef = useRef();
  const wearRef = useRef();

  const handlePredict = async () => {
    const payload = {
      Type: typeRef.current.value,
      Air_temperature: parseFloat(airTempRef.current.value),
      Process_temperature: parseFloat(processTempRef.current.value),
      Rotational_speed: parseFloat(speedRef.current.value),
      Torque: parseFloat(torqueRef.current.value),
      Tool_wear: parseFloat(wearRef.current.value),
    };

    try {
      const response = await fetch(
        "https://predictive-maintenance-pipeline.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      setPrediction(result.Prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Predictive Maintenance</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Type</label>
          <select
            ref={typeRef}
            defaultValue="L"
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="H">H</option>
          </select>
        </div>

        {[
          {
            label: "Air Temperature (K)",
            ref: airTempRef,
            defaultValue: 298.4,
          },
          {
            label: "Process Temperature (K)",
            ref: processTempRef,
            defaultValue: 308.2,
          },
          { label: "Rotational Speed (rpm)", ref: speedRef, defaultValue: 200 },
          { label: "Torque (Nm)", ref: torqueRef, defaultValue: 40 },
          { label: "Tool Wear (min)", ref: wearRef, defaultValue: 216 },
        ].map(({ label, ref, defaultValue }) => (
          <div key={label} className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              {label}
            </label>
            <input
              type="number"
              ref={ref}
              defaultValue={defaultValue}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded hover:bg-blue-700"
        >
          Predict Failure
        </button>

        {prediction !== null && (
          <div className="mt-4 text-center text-lg font-semibold">
            {prediction === 1
              ? "⚠️ Will FAIL"
              : prediction === 0
              ? "✅ Will NOT Fail"
              : "❌ Error making prediction"}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

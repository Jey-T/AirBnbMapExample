import { useMemo } from "react";
import Fallback from "./components/Map/Fallback";
import Map from "./components/Map";

function App() {
  const apiKey = useMemo(() => import.meta.env.VITE_API_KEY, []);

  if (!apiKey) {
    return <Fallback />;
  }

  return <Map apiKey={apiKey} />;
}

export default App;

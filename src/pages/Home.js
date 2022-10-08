import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// components
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();
      if (error) {
        setError("Could not fetch smoothies");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setError(null);
      }
    };
    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {error && <div>{error}</div>}
      {smoothies && (
        <div className="smoothies">
          {/* order by button */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard smoothie={smoothie} key={smoothie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

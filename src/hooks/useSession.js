import { useState, useEffect } from "react";
import fakeData from "helpers/fakeData";

const useSession = id => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
  }, []);

  return [session];
};

export { useSession };

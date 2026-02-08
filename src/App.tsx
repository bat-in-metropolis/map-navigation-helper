import styles from "./App.module.css";
import { useGoogleMapsNavigation } from "./hooks/useGoogleMapsNavigation";

export const locationOfPride: {
  lat: number;
  lng: number;
} = {
  lat: 28.6139,
  lng: 77.2083,
};

function App() {
  const { isLoading, navigateToDestination } = useGoogleMapsNavigation(locationOfPride);

  return (
    <div className={styles.appContainer}>
      <p className={styles.welcomeText}>Welcome to Map Navigation Helper</p>
      <button
        className={styles.getDirectionsButton}
        onClick={navigateToDestination}
        disabled={isLoading}
      >
        {isLoading ? "Getting your location..." : "Get Directions"}
      </button>
    </div>
  );
}

export default App;

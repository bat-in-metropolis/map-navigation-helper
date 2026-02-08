import styles from "./App.module.css";

export const locationOfPride: {
  lat: number;
  lng: number;
} = {
  lat: 28.6139,
  lng: 77.2083,
};

function App() {
  const handleOpenGoogleMaps = () => {
    // Using origin parameter to center on India, user's location will be detected
    // On mobile, this URL will automatically open in Google Maps app if installed
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=20.5937,78.9629&destination=${locationOfPride.lat},${locationOfPride.lng}`;
    
    // For better mobile app detection, use location.href instead of window.open
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // On mobile, directly navigate to open in the app
      window.location.href = googleMapsUrl;
    } else {
      // On desktop, open in new tab
      window.open(googleMapsUrl, "_blank");
    }
  }
  return (
    <div className={styles.appContainer}>
      <p className={styles.welcomeText}>Welcome to Map Navigation Helper</p>
      <button
        className={styles.getDirectionsButton}
        onClick={handleOpenGoogleMaps}
      >
        Get Directions
      </button>
    </div>
  );
}

export default App;

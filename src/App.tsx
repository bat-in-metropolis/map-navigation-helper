// import "./App.css";
import styles from "./App.module.css";

function App() {
  return <div className={styles.appContainer}>
    <p className={styles.welcomeText}>Welcome to Map Navigation Helper</p>
    <button className={styles.getDirectionsButton} onClick={() => alert("This is a placeholder for the map navigation helper functionality.")}>Get Directions</button>
  </div>;
}

export default App;

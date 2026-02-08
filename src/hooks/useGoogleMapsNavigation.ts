import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}
export const openGoogleMaps = (url: string) => {
  // For better mobile app detection, use location.href instead of window.open
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    // On mobile, directly navigate to open in the app
    window.location.href = url;
  } else {
    // On desktop, open in new tab
    window.open(url, "_blank");
  }
};

const buildGoogleMapsUrl = (
  destination: Coordinates,
  origin?: { lat: number; lng: number },
) => {
  const baseUrl = "https://www.google.com/maps/dir/?api=1";
  const destinationParam = `destination=${destination.lat},${destination.lng}`;

  if (origin) {
    const originParam = `origin=${origin.lat},${origin.lng}`;
    return `${baseUrl}&${originParam}&${destinationParam}`;
  }

  return `${baseUrl}&${destinationParam}`;
};

export const useGoogleMapsNavigation = (destination: Coordinates) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigateToDestination = () => {
    setIsLoading(true);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("manas position: ", position);
          const { latitude, longitude } = position.coords;

          // Use user's actual location as origin
          const googleMapsUrl = buildGoogleMapsUrl(destination, {
            lat: latitude,
            lng: longitude,
          });

          setIsLoading(false);
          openGoogleMaps(googleMapsUrl);
        },
        (error) => {
          setIsLoading(false);
          console.error("Error getting location:", error);

          // Don't set origin if location permission is denied
          const googleMapsUrl = buildGoogleMapsUrl(destination);

          openGoogleMaps(googleMapsUrl);
          alert(
            "Could not get your location. Please set your starting point in Google Maps.",
          );
        },
      );
    } else {
      setIsLoading(false);
      alert("Geolocation is not supported by your browser.");

      // No origin if geolocation is not supported
      const googleMapsUrl = buildGoogleMapsUrl(destination);

      openGoogleMaps(googleMapsUrl);
    }
  };

  return {
    isLoading,
    navigateToDestination,
  };
};

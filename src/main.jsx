import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  BellRing,
  Camera,
  Crown,
  Eye,
  EyeOff,
  HeartHandshake,
  Lock,
  MapPin,
  Newspaper,
  Phone,
  Search,
  ShoppingBag,
  Shield,
  Siren,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8080/api";

const nearbyCategories = [
  {
    key: "police",
    label: "Police stations",
    query: "police station",
    matcher: "police",
    icon: Shield,
  },
  {
    key: "hospitals",
    label: "Hospitals",
    query: "hospital",
    matcher: "hospital|clinic",
    icon: HeartHandshake,
  },
  {
    key: "restrooms",
    label: "Restrooms",
    query: "public restroom",
    matcher: "toilets",
    icon: Sparkles,
  },
  {
    key: "pharmacies",
    label: "Pharmacies",
    query: "pharmacy",
    matcher: "pharmacy",
    icon: Lock,
  },
];

const essentials = [
  {
    title: "Pepper spray",
    category: "Protection",
    description: "Compact self-defense spray for emergency personal safety.",
    query: "women self defense pepper spray",
    icon: Shield,
  },
  {
    title: "Safety alarm",
    category: "Protection",
    description: "Loud keychain alarm to draw attention quickly.",
    query: "personal safety alarm for women keychain",
    icon: Siren,
  },
  {
    title: "Door stop alarm",
    category: "Travel safety",
    description: "Portable alarm for hostel, hotel, PG, or rental room doors.",
    query: "portable door stop alarm travel safety",
    icon: Lock,
  },
  {
    title: "First aid kit",
    category: "Health",
    description: "Bandages, antiseptic basics, and emergency wound care.",
    query: "compact first aid kit travel",
    icon: HeartHandshake,
  },
  {
    title: "Sanitary pads",
    category: "Sanitation",
    description: "Daily menstrual hygiene essentials for home or travel.",
    query: "sanitary pads for women",
    icon: Sparkles,
  },
  {
    title: "Menstrual cup",
    category: "Sanitation",
    description: "Reusable period-care option for longer days outside.",
    query: "menstrual cup for women",
    icon: Sparkles,
  },
  {
    title: "Hand sanitizer",
    category: "Hygiene",
    description: "Small sanitizer bottles for bag, desk, or travel.",
    query: "pocket hand sanitizer",
    icon: Sparkles,
  },
  {
    title: "Wet wipes",
    category: "Hygiene",
    description: "Useful for public restrooms, travel, and quick cleanup.",
    query: "hygiene wet wipes travel pack",
    icon: Sparkles,
  },
  {
    title: "Mini flashlight",
    category: "Travel safety",
    description: "Small torch for dark streets, parking areas, and power cuts.",
    query: "mini flashlight keychain rechargeable",
    icon: Search,
  },
  {
    title: "Power bank",
    category: "Emergency",
    description: "Keeps your phone alive for maps, calls, SOS, and location sharing.",
    query: "compact power bank fast charging",
    icon: Phone,
  },
  {
    title: "Emergency whistle",
    category: "Protection",
    description: "Simple, lightweight sound tool for attention in crowded areas.",
    query: "emergency safety whistle",
    icon: Volume2,
  },
  {
    title: "Travel pouch",
    category: "Organization",
    description: "Keep medicines, pads, sanitizer, cash, and safety tools together.",
    query: "travel organizer pouch for women essentials",
    icon: ShoppingBag,
  },
];

const tourSteps = [
  {
    title: "Emergency SOS",
    description: "Share your live location, call helplines, and keep quick crisis guidance in one place.",
    icon: Siren,
  },
  {
    title: "Nearby Map",
    description: "Find your location and nearby police stations, hospitals, restrooms, and pharmacies.",
    icon: MapPin,
  },
  {
    title: "Essentials",
    description: "Browse useful protection, sanitation, hygiene, first-aid, and travel-safety products.",
    icon: ShoppingBag,
  },
  {
    title: "Hidden Camera",
    description: "Use your camera to scan for suspicious reflective lens-like spots in rooms or objects.",
    icon: Camera,
  },
  {
    title: "Siren Alert",
    description: "Play a loud attention-grabbing alert when making noise is safe and useful.",
    icon: Volume2,
  },
  {
    title: "Women's News",
    description: "Open current news searches for safety, rights, cyber safety, and public updates.",
    icon: Newspaper,
  },
];

const complaintSteps = [
  {
    title: "If danger is happening now",
    description: "Call 112 first. Move to a public, well-lit place if you can and tell the operator your location clearly.",
    link: "tel:112",
    action: "Call 112",
    icon: Siren,
  },
  {
    title: "File a police complaint or FIR",
    description: "Visit the nearest police station with facts, date, time, place, screenshots, photos, medical records, and witness details.",
    link: "https://www.google.com/maps/search/police+station+near+me",
    action: "Find police station",
    icon: Shield,
  },
  {
    title: "Women-related complaint",
    description: "Use the National Commission for Women online complaint system for harassment, domestic violence, refusal to register FIR, workplace issues, and related matters.",
    link: "https://ncwapps.nic.in/onlinecomplaintsv2/",
    action: "Open NCW complaint",
    icon: HeartHandshake,
  },
  {
    title: "Cyber harassment or fraud",
    description: "For online abuse, blackmail, cyber fraud, impersonation, or image misuse, use the national cybercrime portal or call 1930 for cyber financial fraud.",
    link: "https://cybercrime.gov.in/",
    action: "Open cyber portal",
    icon: Lock,
  },
];

const selfDefenseResources = [
  {
    title: "Self-defence basics",
    description: "Simple beginner videos for stance, distance, voice, and escape-first moves.",
    link: "https://www.youtube.com/results?search_query=women+self+defence+basics+escape+techniques",
    icon: Shield,
  },
  {
    title: "Wrist grab escape",
    description: "Practice common escape motions slowly with space and a trusted partner.",
    link: "https://www.youtube.com/results?search_query=women+self+defense+wrist+grab+escape",
    icon: Users,
  },
  {
    title: "Travel safety tips",
    description: "Videos for staying alert in cabs, hostels, public transport, and unfamiliar areas.",
    link: "https://www.youtube.com/results?search_query=women+travel+safety+self+defense+tips",
    icon: MapPin,
  },
];

const safetyArticles = [
  {
    title: "Women safety news",
    description: "Current public safety reports, local updates, and awareness stories.",
    link: "https://news.google.com/search?q=women%20safety%20India",
    icon: Newspaper,
  },
  {
    title: "Workplace safety",
    description: "Articles on workplace harassment, rights, reporting, and safer work environments.",
    link: "https://news.google.com/search?q=women%20workplace%20safety%20India",
    icon: Users,
  },
  {
    title: "Cyber safety",
    description: "Guides and news on online abuse, scams, privacy, image misuse, and reporting.",
    link: "https://news.google.com/search?q=women%20cyber%20safety%20India",
    icon: Lock,
  },
  {
    title: "Public transport safety",
    description: "Tips and updates for buses, metros, cabs, trains, and late-night travel.",
    link: "https://news.google.com/search?q=women%20public%20transport%20safety%20India",
    icon: MapPin,
  },
];

const helplines = [
  { service: "All-in-one emergency", number: "112", note: "Police, fire, health, and women safety emergency response." },
  { service: "Police", number: "100", note: "Crime, violence, theft, threat, or urgent police assistance." },
  { service: "Women helpline", number: "181", note: "Women in distress and domestic abuse support." },
  { service: "Women police helpline", number: "1091", note: "Women safety support through police helpline systems." },
  { service: "Ambulance", number: "108", note: "Medical emergency ambulance support." },
  { service: "Child helpline", number: "1098", note: "Emergency help for children in distress." },
  { service: "Cyber crime helpline", number: "1930", note: "Report cyber financial fraud quickly." },
  { service: "Mental health helpline", number: "18005990019", note: "KIRAN mental health support helpline." },
];

async function apiFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    throw new Error("Backend is not reachable. Please make sure the server is running.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback =
      response.status === 404
        ? "SOS endpoint was not found. Please restart the backend server."
        : data.error
          ? `${data.error}: ${data.path || "API request failed."}`
          : `Request failed with status ${response.status}.`;
    const error = new Error(data.message || fallback);
    error.fieldErrors = data.fieldErrors || {};
    throw error;
  }
  return data;
}


function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location is not available in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 12000,
    });
  });
}

function distanceKm(from, to) {
  const earthRadius = 6371;
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const lat1 = (from.latitude * Math.PI) / 180;
  const lat2 = (to.latitude * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function MapIntegrationPanel() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [mapStatus, setMapStatus] = useState("Finding your location...");
  const [placesStatus, setPlacesStatus] = useState("");

  const loadLocation = async () => {
    setMapStatus("Finding your location...");
    setPlacesStatus("");
    setPlaces([]);

    try {
      const position = await getCurrentLocation();
      const nextLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };
      setLocation(nextLocation);
      setMapStatus("Location found. Nearby help is loading.");
      loadNearbyPlaces(nextLocation);
    } catch (error) {
      const message =
        error.code === 1
          ? "Location permission was denied. Allow location access to show your map."
          : error.message || "Could not find your location.";
      setMapStatus(message);
    }
  };

  const loadNearbyPlaces = async (currentLocation) => {
    setPlacesStatus("Searching nearby police stations, hospitals, restrooms, and pharmacies...");
    const amenityMatcher = nearbyCategories.map((category) => category.matcher).join("|");
    const query = `
      [out:json][timeout:18];
      (
        node(around:3500,${currentLocation.latitude},${currentLocation.longitude})[amenity~"${amenityMatcher}"];
        way(around:3500,${currentLocation.latitude},${currentLocation.longitude})[amenity~"${amenityMatcher}"];
        relation(around:3500,${currentLocation.latitude},${currentLocation.longitude})[amenity~"${amenityMatcher}"];
      );
      out center tags 40;
    `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!response.ok) throw new Error("Nearby search is temporarily unavailable.");

      const data = await response.json();
      const nextPlaces = data.elements
        .map((place) => {
          const latitude = place.lat ?? place.center?.lat;
          const longitude = place.lon ?? place.center?.lon;
          if (!latitude || !longitude) return null;

          const amenity = place.tags?.amenity || "help";
          const category =
            nearbyCategories.find((item) => new RegExp(item.matcher).test(amenity)) ||
            nearbyCategories[0];

          return {
            id: `${place.type}-${place.id}`,
            name: place.tags?.name || category.label,
            amenity,
            category,
            latitude,
            longitude,
            distance: distanceKm(currentLocation, { latitude, longitude }),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 12);

      setPlaces(nextPlaces);
      setPlacesStatus(
        nextPlaces.length
          ? `${nextPlaces.length} nearby places found within about 3.5 km.`
          : "No nearby places were returned. Try the category search buttons below."
      );
    } catch (error) {
      setPlacesStatus(error.message || "Nearby search is temporarily unavailable.");
    }
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const mapSource = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.025}%2C${location.latitude - 0.018}%2C${location.longitude + 0.025}%2C${location.latitude + 0.018}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`
    : "";

  return (
    <div className="map-workspace">
      <div className="map-stage">
        {location ? (
          <iframe
            title="Your current location map"
            src={mapSource}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="map-placeholder">
            <MapPin size={48} />
            <strong>{mapStatus}</strong>
          </div>
        )}
      </div>

      <aside className="map-panel">
        <div className="location-card">
          <span>Your location</span>
          <strong>{location ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}` : "Waiting for permission"}</strong>
          {location?.accuracy && <p>Accuracy: about {Math.round(location.accuracy)} meters.</p>}
          <button className="submit-button map-button" type="button" onClick={loadLocation}>
            <MapPin size={20} />
            Refresh location
          </button>
        </div>

        <div className="nearby-searches">
          {nearbyCategories.map((category) => {
            const Icon = category.icon;
            const href = location
              ? `https://www.google.com/maps/search/${encodeURIComponent(`${category.query} near ${location.latitude},${location.longitude}`)}`
              : `https://www.google.com/maps/search/${encodeURIComponent(`${category.query} near me`)}`;
            return (
              <a className="nearby-chip" href={href} target="_blank" rel="noreferrer" key={category.key}>
                <Icon size={18} />
                {category.label}
              </a>
            );
          })}
        </div>
      </aside>

      <section className="nearby-results" aria-label="Nearby places">
        <div className="section-heading">
          <Search size={24} />
          <div>
            <h3>Nearby places</h3>
            <p>{placesStatus || mapStatus}</p>
          </div>
        </div>

        <div className="place-grid">
          {places.map((place) => {
            const Icon = place.category.icon;
            return (
              <a
                className="place-card"
                href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`}
                target="_blank"
                rel="noreferrer"
                key={place.id}
              >
                <Icon size={22} />
                <span>{place.category.label}</span>
                <strong>{place.name}</strong>
                <p>{place.distance.toFixed(1)} km away. Open in maps for directions.</p>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function HiddenCameraScanner({ onReminder }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);
  const [scannerOn, setScannerOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [scanStatus, setScanStatus] = useState("Camera scanner is off.");

  const stopScanner = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setScannerOn(false);
    setCandidates([]);
    setScanStatus("Camera scanner is off.");
  };

  useEffect(() => stopScanner, []);

  const scanFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState < 2) {
      frameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const width = 320;
    const height = Math.max(1, Math.round((video.videoHeight / video.videoWidth) * width));
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(video, 0, 0, width, height);
    const { data } = context.getImageData(0, 0, width, height);
    const found = [];

    for (let y = 3; y < height - 3; y += 3) {
      for (let x = 3; x < width - 3; x += 3) {
        const index = (y * width + x) * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const brightness = (red + green + blue) / 3;

        if (brightness < 238) continue;

        const left = ((y * width + x - 2) * 4);
        const right = ((y * width + x + 2) * 4);
        const contrast =
          brightness -
          (data[left] + data[left + 1] + data[left + 2] + data[right] + data[right + 1] + data[right + 2]) / 6;

        if (contrast > 32 && found.every((spot) => Math.hypot(spot.x - x, spot.y - y) > 22)) {
          found.push({
            id: `${x}-${y}`,
            x: (x / width) * 100,
            y: (y / height) * 100,
          });
        }

        if (found.length >= 12) break;
      }
      if (found.length >= 12) break;
    }

    setCandidates(found);
    setScanStatus(
      found.length
        ? `${found.length} reflective spot${found.length === 1 ? "" : "s"} found. Inspect marked areas closely.`
        : "No strong lens-like glints detected in this frame."
    );
    frameRef.current = requestAnimationFrame(scanFrame);
  };

  const startScanner = async () => {
    setCameraError("");
    setScanStatus("Requesting camera access...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setScannerOn(true);
      setScanStatus("Scanner running. Sweep slowly across suspicious objects.");
      frameRef.current = requestAnimationFrame(scanFrame);
    } catch {
      setScannerOn(false);
      setCameraError("Camera permission is needed to scan for reflective lens glints.");
      setScanStatus("Camera scanner is off.");
    }
  };

  return (
    <section className="camera-panel" aria-labelledby="camera-title">
      <div className="section-heading">
        <Camera size={24} />
        <div>
          <h2 id="camera-title">Hidden Camera Scanner</h2>
          <p>Use your camera to look for tiny reflective lens glints.</p>
        </div>
      </div>

      <div className="scanner-shell">
        <div className="scanner-view">
          <video ref={videoRef} playsInline muted />
          {!scannerOn && (
            <div className="scanner-placeholder">
              <Camera size={42} />
              <span>Camera preview</span>
            </div>
          )}
          {scannerOn &&
            candidates.map((spot) => (
              <span
                className="glint-marker"
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              />
            ))}
        </div>
        <canvas ref={canvasRef} className="scan-canvas" />
        <div className="scanner-controls">
          <button
            className="submit-button camera-action"
            type="button"
            onClick={scannerOn ? stopScanner : startScanner}
          >
            {scannerOn ? <EyeOff size={20} /> : <Search size={20} />}
            {scannerOn ? "Stop scanner" : "Start camera scanner"}
          </button>
          <div className="scan-status">
            <strong>{scanStatus}</strong>
            {cameraError && <p>{cameraError}</p>}
          </div>
        </div>
      </div>

      <div className="camera-grid">
        <article className="check-card">
          <Search size={24} />
          <h3>Move slowly</h3>
          <p>Dim the room, shine a flashlight near your phone, and sweep across clocks, vents, chargers, and mirrors.</p>
        </article>
        <article className="check-card">
          <Eye size={24} />
          <h3>Check markers</h3>
          <p>Red markers are bright reflective candidates. They may be glass, metal, LEDs, or a small camera lens.</p>
        </article>
        <article className="check-card">
          <Shield size={24} />
          <h3>Act safely</h3>
          <p>If something looks suspicious, leave if needed, document from a safe distance, and report it.</p>
        </article>
      </div>

      <button className="submit-button camera-action" type="button" onClick={onReminder}>
        <Shield size={20} />
        Show safety reminder
      </button>
    </section>
  );
}

function SirenAlertPanel({ active }) {
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const [sirenOn, setSirenOn] = useState(false);

  const stopSiren = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    audioRef.current?.oscillator.stop();
    audioRef.current?.context.close();
    audioRef.current = null;
    setSirenOn(false);
  };

  useEffect(() => stopSiren, []);

  const startSiren = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.value = 620;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    let high = false;
    timerRef.current = setInterval(() => {
      high = !high;
      oscillator.frequency.setTargetAtTime(high ? 920 : 520, context.currentTime, 0.08);
      gain.gain.setTargetAtTime(high ? 0.24 : 0.14, context.currentTime, 0.04);
    }, 420);

    audioRef.current = { context, oscillator };
    setSirenOn(true);
  };

  const toggleSiren = () => {
    if (sirenOn) {
      stopSiren();
      return;
    }

    startSiren();
  };

  return (
    <section
      className={`siren-panel ${active ? "active-section" : ""} ${sirenOn ? "siren-live" : ""}`}
      aria-labelledby="siren-title"
    >
      <div className="section-heading">
        <Siren size={24} />
        <div>
          <h2 id="siren-title">Siren Alert</h2>
          <p>Play a loud alert sound to draw attention when you need help.</p>
        </div>
      </div>

      <div className="siren-box">
        <span className="siren-icon">
          <Siren size={52} />
        </span>
        <strong>{sirenOn ? "Siren is active" : "Siren is ready"}</strong>
        <p>
          Keep your device volume high. Use this only when making noise is safe for you.
        </p>
        <button className="submit-button siren-button" type="button" onClick={toggleSiren}>
          {sirenOn ? <VolumeX size={20} /> : <Volume2 size={20} />}
          {sirenOn ? "Stop siren" : "Start siren alert"}
        </button>
      </div>
    </section>
  );
}

function App() {
  const [mode, setMode] = useState("sos");
  const [notice, setNotice] = useState("");
  const [popup, setPopup] = useState(null);
  const [sosLoading, setSosLoading] = useState(false);

  const selectTab = (nextMode) => {
    setMode(nextMode);
    setTimeout(() => {
      document.getElementById(`section-${nextMode}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const sendSosAlert = async () => {
    setSosLoading(true);
    setNotice("");
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude, accuracy } = position.coords;
      await apiFetch("/sos-alerts", {
        method: "POST",
        body: JSON.stringify({
          latitude,
          longitude,
          accuracy,
        }),
      });

      setPopup({
        title: "SOS alert sent",
        message: "Your emergency alert was sent with your current location.",
      });
      setNotice("SOS alert sent with your current location.");
    } catch (error) {
      const message =
        error.code === 1
          ? "Location permission was denied. Please allow location access to send SOS."
          : error.message || "Could not send SOS alert.";
      setNotice(message);
    } finally {
      setSosLoading(false);
    }
  };

  return (
    <main className="app-shell">
      {popup && (
        <div className="popup-backdrop" role="dialog" aria-modal="true">
          <div className="success-popup">
            <span className="popup-icon">
              <Sparkles size={26} />
            </span>
            <h2>{popup.title}</h2>
            <p>{popup.message}</p>
            <button className="popup-button" onClick={() => setPopup(null)}>
              Okay
            </button>
          </div>
        </div>
      )}

      <section className="hero">
        <nav className="topbar" aria-label="Primary navigation">
          <div className="brand">
            <span className="brand-mark">
              <Shield size={25} />
            </span>
            <span>ShieldHer</span>
          </div>
          <div className="nav-actions">
            <button
              className={mode === "sos" ? "nav-button danger active" : "nav-button danger"}
              onClick={() => selectTab("sos")}
            >
              <Siren size={18} />
              Emergency SOS
            </button>
            <button
              className={mode === "map" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("map")}
            >
              <MapPin size={18} />
              Nearby Map
            </button>
            <button
              className={mode === "shop" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("shop")}
            >
              <ShoppingBag size={18} />
              Essentials
            </button>
            <button
              className={mode === "camera" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("camera")}
            >
              <Camera size={18} />
              Hidden Camera
            </button>
            <button
              className={mode === "siren" ? "nav-button danger active" : "nav-button danger"}
              onClick={() => selectTab("siren")}
            >
              <Volume2 size={18} />
              Siren Alert
            </button>
            <button
              className={mode === "news" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("news")}
            >
              <Newspaper size={18} />
              Women's News
            </button>
            <button
              className={mode === "guide" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("guide")}
            >
              <Shield size={18} />
              Safety Guide
            </button>
            <button
              className={mode === "about" ? "nav-button active" : "nav-button"}
              onClick={() => selectTab("about")}
            >
              <HeartHandshake size={18} />
              App Tour
            </button>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Feel protected, precious, and prepared.</h1>
            <p>
              A pookie little safety space for emergency contacts, address
              help, hidden-camera checks, siren alerts, and safety news.
            </p>
            <div className="trust-row">
              <span>
                <Shield size={16} />
                Open access
              </span>
              <span>
                <AlertTriangle size={16} />
                Emergency ready
              </span>
              <span>
                <Sparkles size={16} />
                Cute UI
              </span>
            </div>
          </div>

          <div className="mascot-panel" aria-label="ShieldHer visual panel">
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="shield-crest">
              <Crown size={36} />
              <Shield size={82} />
              <HeartHandshake size={38} />
            </div>
            <div className="mini-card top">
              <Phone size={18} />
              Trusted contacts
            </div>
            <div className="mini-card bottom">
              <MapPin size={18} />
              Safe route ready
            </div>
          </div>
        </div>
      </section>

      <section className="workspace">
        <div className="access-card">
          {notice && <div className="notice">{notice}</div>}

          <section
            className={`page-section sos-page tab-section ${mode === "sos" ? "active-section" : ""}`}
            id="section-sos"
            aria-labelledby="sos-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <Siren size={18} />
                Emergency page
              </span>
              <h2 id="sos-title">Emergency SOS</h2>
              <p>
                Fast actions for calling help, sharing your location, staying visible,
                and keeping a clear next step during a stressful moment.
              </p>
            </div>

            <div className="page-grid">
              <div className="tool-panel sos-panel">
              <div className="section-heading">
                <Siren size={24} />
                <div>
                  <h3>Quick help</h3>
                  <p>Use this tab when you need quick help or a trusted contact.</p>
                </div>
              </div>

              <div className="sos-grid">
                <button
                  className="sos-call primary sos-alert-button"
                  type="button"
                  onClick={sendSosAlert}
                  disabled={sosLoading}
                >
                  <BellRing size={24} />
                  {sosLoading ? "Sending alert..." : "Send SOS alert"}
                </button>
                <a className="sos-call primary" href="tel:112">
                  <BellRing size={24} />
                  Call 112 now
                </a>
                <a className="sos-call" href="tel:100">
                  <Phone size={22} />
                  Police helpline
                </a>
                <a className="sos-call" href="tel:1091">
                  <Shield size={22} />
                  Women helpline
                </a>
              </div>

              <div className="sos-note">
                <AlertTriangle size={20} />
                <div>
                  <strong>Stay visible and share your location.</strong>
                  <p>
                    Move toward a public, well-lit place and call your trusted contact
                    as soon as it is safe.
                  </p>
                </div>
              </div>

              <div className="trusted-contact">
                <span>No account required</span>
                <strong>Use SOS, helplines, camera scan, siren, and news freely.</strong>
                <p>
                  The alert button asks for location permission only when you press it.
                </p>
              </div>
              </div>

              <aside className="support-rail" aria-label="Emergency guidance">
                <article className="info-card urgent-card">
                  <AlertTriangle size={24} />
                  <h3>First 30 seconds</h3>
                  <p>Move toward people, light, cameras, shops, security desks, or traffic.</p>
                </article>
                <article className="info-card">
                  <MapPin size={24} />
                  <h3>Location</h3>
                  <p>Say the nearest landmark, road name, building, gate, floor, or shop.</p>
                </article>
                <article className="info-card">
                  <Phone size={24} />
                  <h3>Call script</h3>
                  <p>Speak slowly: I need help, I am at this location, I feel unsafe.</p>
                </article>
              </aside>
            </div>
          </section>

          <section
            className={`page-section map-page tab-section ${mode === "map" ? "active-section" : ""}`}
            id="section-map"
            aria-labelledby="map-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <MapPin size={18} />
                Nearby map
              </span>
              <h2 id="map-title">Find Help Near You</h2>
              <p>
                See your current location on a map and look for nearby police stations,
                hospitals, restrooms, pharmacies, and other useful places.
              </p>
            </div>

            <MapIntegrationPanel />
          </section>

          <section
            className={`page-section shop-page tab-section ${mode === "shop" ? "active-section" : ""}`}
            id="section-shop"
            aria-labelledby="shop-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <ShoppingBag size={18} />
                Essentials shop
              </span>
              <h2 id="shop-title">Protection & Care Essentials</h2>
              <p>
                Useful safety, sanitation, hygiene, health, and travel items in one
                place. Click any product card to search it on Amazon.
              </p>
            </div>

            <div className="shop-layout">
              <aside className="shop-note">
                <Shield size={28} />
                <h3>Pack a small safety kit</h3>
                <p>
                  Keep a few essentials together in your bag so they are easy to
                  reach when you are outside, travelling, or staying somewhere new.
                </p>
                <div className="kit-list">
                  <span>Protection</span>
                  <span>Sanitation</span>
                  <span>First aid</span>
                  <span>Charging</span>
                  <span>Travel hygiene</span>
                </div>
              </aside>

              <div className="product-grid">
                {essentials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      className="product-card"
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(item.query)}`}
                      target="_blank"
                      rel="noreferrer"
                      key={item.title}
                    >
                      <span className="product-icon">
                        <Icon size={24} />
                      </span>
                      <span className="product-category">{item.category}</span>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                      <span className="buy-link">
                        <ShoppingBag size={17} />
                        Search on Amazon
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <div
            className={`page-section tab-section ${mode === "camera" ? "active-section" : ""}`}
            id="section-camera"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <Camera size={18} />
                Scan page
              </span>
              <h2>Hidden Camera Scanner</h2>
              <p>
                A bigger camera workspace with a scanning panel, reflective marker
                detection, and a room-check guide beside it.
              </p>
            </div>
            <HiddenCameraScanner
              onReminder={() =>
                setPopup({
                  title: "Hidden camera scanner",
                  message:
                    "The scanner marks bright reflective candidates. It can miss devices and may flag harmless reflections, so inspect calmly and report anything suspicious.",
                })
              }
            />
          </div>

          <div
            className={`page-section tab-section ${mode === "siren" ? "active-section" : ""}`}
            id="section-siren"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <Volume2 size={18} />
                Sound page
              </span>
              <h2>Siren Alert</h2>
              <p>
                A large one-button sound page designed for drawing attention when
                calling out loud is difficult or unsafe.
              </p>
            </div>
            <SirenAlertPanel active={mode === "siren"} />
          </div>

          <section
            className={`page-section news-page tab-section ${mode === "news" ? "active-section" : ""}`}
            id="section-news"
            aria-labelledby="news-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <Newspaper size={18} />
                News page
              </span>
              <h2 id="news-title">Women's News</h2>
              <p>
                Quick entry points for safety, rights, digital privacy, and workplace
                updates without needing an account.
              </p>
            </div>

            <div className="page-grid">
              <div className="tool-panel news-panel">
            <div className="section-heading">
              <Newspaper size={24} />
              <div>
                <h3>Browse updates</h3>
                <p>Quick links to current women-focused safety and rights updates.</p>
              </div>
            </div>

            <div className="news-grid">
              <a
                className="news-card"
                href="https://news.google.com/search?q=women%20safety%20India"
                target="_blank"
                rel="noreferrer"
              >
                <Shield size={24} />
                <span>Women safety</span>
                <p>Latest reports, public safety updates, and local protection news.</p>
              </a>
              <a
                className="news-card"
                href="https://news.google.com/search?q=women%20rights%20India"
                target="_blank"
                rel="noreferrer"
              >
                <Users size={24} />
                <span>Women rights</span>
                <p>Law, policy, workplace, education, and equality updates.</p>
              </a>
              <a
                className="news-card"
                href="https://news.google.com/search?q=women%20cyber%20safety"
                target="_blank"
                rel="noreferrer"
              >
                <Lock size={24} />
                <span>Cyber safety</span>
                <p>Online harassment, privacy, scams, and digital safety alerts.</p>
              </a>
            </div>
              </div>

              <aside className="support-rail" aria-label="News topics">
                <article className="info-card">
                  <Shield size={24} />
                  <h3>Safety</h3>
                  <p>Track local safety alerts, helplines, public transport, and city updates.</p>
                </article>
                <article className="info-card">
                  <Users size={24} />
                  <h3>Rights</h3>
                  <p>Follow policy, education, workplace, legal, and equality coverage.</p>
                </article>
                <article className="info-card">
                  <Lock size={24} />
                  <h3>Digital life</h3>
                  <p>Watch privacy, cybercrime, online abuse, and safety tool updates.</p>
                </article>
              </aside>
            </div>
          </section>

          <section
            className={`page-section guide-page tab-section ${mode === "guide" ? "active-section" : ""}`}
            id="section-guide"
            aria-labelledby="guide-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <Shield size={18} />
                Safety guide
              </span>
              <h2 id="guide-title">Complaint, FIR & Safety Resources</h2>
              <p>
                Organized guidance for reporting, self-defence learning, safety
                reading, and emergency helpline numbers in one calm page.
              </p>
            </div>

            <div className="guide-layout">
              <section className="guide-block complaint-block" aria-labelledby="complaint-title">
                <div className="section-heading">
                  <AlertTriangle size={24} />
                  <div>
                    <h3 id="complaint-title">Complaint / FIR Guidance</h3>
                    <p>Start with immediate safety, then collect facts and report through the right channel.</p>
                  </div>
                </div>
                <div className="complaint-grid">
                  {complaintSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <article className="guide-card" key={step.title}>
                        <Icon size={24} />
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                        <a href={step.link} target={step.link.startsWith("http") ? "_blank" : undefined} rel={step.link.startsWith("http") ? "noreferrer" : undefined}>
                          {step.action}
                        </a>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="guide-block" aria-labelledby="videos-title">
                <div className="section-heading">
                  <Camera size={24} />
                  <div>
                    <h3 id="videos-title">Self-Defence Videos & Tips</h3>
                    <p>Learn escape-first basics. Practice safely and avoid risky moves unless trained.</p>
                  </div>
                </div>
                <div className="resource-list">
                  {selfDefenseResources.map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <a className="resource-card" href={resource.link} target="_blank" rel="noreferrer" key={resource.title}>
                        <Icon size={22} />
                        <div>
                          <strong>{resource.title}</strong>
                          <p>{resource.description}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <div className="tips-strip">
                  <span>Use your voice early</span>
                  <span>Create distance</span>
                  <span>Move toward people</span>
                  <span>Escape over fighting</span>
                </div>
              </section>

              <section className="guide-block" aria-labelledby="articles-title">
                <div className="section-heading">
                  <Newspaper size={24} />
                  <div>
                    <h3 id="articles-title">Safety Blogs & Articles</h3>
                    <p>Quick reading links for awareness, workplace safety, cyber safety, and transport updates.</p>
                  </div>
                </div>
                <div className="article-grid">
                  {safetyArticles.map((article) => {
                    const Icon = article.icon;
                    return (
                      <a className="article-card" href={article.link} target="_blank" rel="noreferrer" key={article.title}>
                        <Icon size={22} />
                        <strong>{article.title}</strong>
                        <p>{article.description}</p>
                      </a>
                    );
                  })}
                </div>
              </section>

              <section className="guide-block helpline-block" aria-labelledby="helpline-title">
                <div className="section-heading">
                  <Phone size={24} />
                  <div>
                    <h3 id="helpline-title">Emergency Helpline Numbers</h3>
                    <p>Tap a number to call directly from a phone.</p>
                  </div>
                </div>
                <div className="helpline-grid">
                  {helplines.map((item) => (
                    <a className="helpline-card" href={`tel:${item.number}`} key={item.service}>
                      <span>{item.service}</span>
                      <strong>{item.number}</strong>
                      <p>{item.note}</p>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section
            className={`page-section about-page tab-section ${mode === "about" ? "active-section" : ""}`}
            id="section-about"
            aria-labelledby="about-title"
          >
            <div className="page-hero">
              <span className="page-kicker">
                <HeartHandshake size={18} />
                App tour
              </span>
              <h2 id="about-title">About ShieldHer</h2>
              <p>
                ShieldHer is an open safety companion built around quick action,
                practical guidance, and everyday preparedness. No account is needed:
                the important tools stay reachable the moment someone opens the site.
              </p>
            </div>

            <div className="about-layout">
              <section className="about-story" aria-label="About ShieldHer">
                <Shield size={34} />
                <h3>Why this app exists</h3>
                <p>
                  Safety tools should not feel hidden behind forms, tiny buttons, or
                  confusing screens. ShieldHer brings emergency help, nearby places,
                  camera scanning, siren sound, useful products, and news links into
                  one clear space.
                </p>
                <p>
                  It is designed for students, travellers, working women, and anyone
                  who wants fast access to practical support while moving through
                  daily life.
                </p>
              </section>

              <section className="tour-panel" aria-label="App tour steps">
                {tourSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article className="tour-card" key={step.title}>
                      <span className="tour-number">{String(index + 1).padStart(2, "0")}</span>
                      <Icon size={24} />
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  );
                })}
              </section>
            </div>

            <div className="values-grid" aria-label="ShieldHer values">
              <article className="value-card">
                <Sparkles size={24} />
                <h3>Open to all</h3>
                <p>No login, no signup, and no delay before using the main features.</p>
              </article>
              <article className="value-card">
                <AlertTriangle size={24} />
                <h3>Action first</h3>
                <p>The most urgent tools stay visible, large, and easy to press.</p>
              </article>
              <article className="value-card">
                <HeartHandshake size={24} />
                <h3>Care focused</h3>
                <p>The design includes safety, hygiene, health, travel, and awareness.</p>
              </article>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

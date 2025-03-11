import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function LEDController() {
  const [ledStatus, setLedStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPowerUp, setShowPowerUp] = useState(false);
  const canvasRef = useRef(null);

  // Handle LED toggle
  const toggleLed = async () => {
    /*
    const command = ledStatus ? "OFF" : "ON";
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/led", { command });
      setLedStatus(!ledStatus);

      if (!ledStatus) {
        setShowPowerUp(true);
        setTimeout(() => setShowPowerUp(false), 2000);
      }
    } catch (error) {
      console.error("Error sending command:", error);
    } finally {
      setIsLoading(false);
    }
    */
    setLedStatus(!ledStatus);
  };

  // Particle effect background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = ledStatus
          ? `rgba(${255}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.random() * 0.5 + 0.2})`
          : `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${255}, ${Math.random() * 0.3 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ledStatus]);

  return (
    <div className="led-container">
      {/* Particle background */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Main content */}
      <div className="main-content">
        {/* Power-up animation */}
        <AnimatePresence>
          {showPowerUp && (
            <motion.div
              className="power-up-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="power-up-flash"
                animate={{
                  opacity: [0, 0.2, 0],
                  scale: [1, 1.2, 1.5],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title with glitch effect */}
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="title-text">
            <span className="glitch-clip"></span>
            <span className={`title-shadow title-shadow-1 ${ledStatus ? "active" : ""}`}>
              Lumolink
            </span>
            <span className={`title-shadow title-shadow-2 ${ledStatus ? "active" : ""}`}>
              Lumolink
            </span>
            <span style={{ position: 'relative', zIndex: 1 }}>
              Lumolink
            </span>
          </span>
        </motion.h1>

        {/* LED visualization */}
        <div className="led-visualization">
          <motion.div
            className="led-3d"
            animate={{
              rotateY: [0, 10, 0, -10, 0],
              rotateX: [0, 5, 0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          >
            {/* LED Base */}
            <motion.div
              className={`led-base ${ledStatus ? "active" : ""}`}
              animate={{
                boxShadow: ledStatus
                  ? [
                      "0 0 20px 0px rgba(239, 68, 68, 0.7), inset 0 0 20px 0px rgba(239, 68, 68, 0.5)",
                      "0 0 40px 10px rgba(239, 68, 68, 0.5), inset 0 0 40px 5px rgba(239, 68, 68, 0.3)",
                      "0 0 20px 0px rgba(239, 68, 68, 0.7), inset 0 0 20px 0px rgba(239, 68, 68, 0.5)",
                    ]
                  : "0 0 20px 0px rgba(59, 130, 246, 0.3), inset 0 0 10px 0px rgba(59, 130, 246, 0.2)",
              }}
              transition={{
                repeat: ledStatus ? Number.POSITIVE_INFINITY : 0,
                duration: 3,
                ease: "easeInOut",
              }}
            />

            {/* LED Inner Glow */}
            <motion.div
              className={`led-inner ${ledStatus ? "active" : ""}`}
              animate={{
                opacity: ledStatus ? [0.7, 1, 0.7] : 0.3,
                boxShadow: ledStatus
                  ? [
                      "inset 0 0 20px 0px rgba(239, 68, 68, 0.7)",
                      "inset 0 0 40px 10px rgba(239, 68, 68, 0.5)",
                      "inset 0 0 20px 0px rgba(239, 68, 68, 0.7)",
                    ]
                  : "inset 0 0 10px 0px rgba(59, 130, 246, 0.2)",
              }}
              transition={{
                repeat: ledStatus ? Number.POSITIVE_INFINITY : 0,
                duration: 2,
                ease: "easeInOut",
              }}
            />

            {/* LED Center */}
            <motion.div
              className={`led-center ${ledStatus ? "active" : ""}`}
              animate={{
                opacity: ledStatus ? [0.8, 1, 0.8] : 0.5,
              }}
              transition={{
                repeat: ledStatus ? Number.POSITIVE_INFINITY : 0,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />

            {/* LED Highlight */}
            <motion.div
              className={`led-highlight ${ledStatus ? "active" : ""}`}
              animate={{
                opacity: ledStatus ? [0.5, 0.9, 0.5] : 0.2,
              }}
              transition={{
                repeat: ledStatus ? Number.POSITIVE_INFINITY : 0,
                duration: 1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Control button */}
        <motion.button
          onClick={toggleLed}
          disabled={isLoading}
          className={`control-button ${isLoading ? "" : ledStatus ? "on" : "off"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: ledStatus
              ? [
                  "0 0 10px 0px rgba(239, 68, 68, 0.7)",
                  "0 0 20px 5px rgba(239, 68, 68, 0.5)",
                  "0 0 10px 0px rgba(239, 68, 68, 0.7)",
                ]
              : "0 0 10px 0px rgba(59, 130, 246, 0.3)",
            background: ledStatus
              ? "linear-gradient(45deg, #ef4444, #dc2626)"
              : "linear-gradient(45deg, #3b82f6, #2563eb)",
          }}
          transition={{
            boxShadow: {
              repeat: ledStatus ? Number.POSITIVE_INFINITY : 0,
              duration: 2,
              ease: "easeInOut",
            }
          }}
        >
          <span className="button-text">
            {isLoading ? "PROCESSING..." : ledStatus ? "TURN OFF" : "TURN ON"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

// Add styles at the end of the file
const styles = `
  .control-button {
    position: relative;
    padding: 20px 50px;
    margin-top: 2rem;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 3px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: white;
    text-transform: uppercase;
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
  }

  .control-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.4),
      transparent
    );
    transition: 0.5s;
    animation: buttonScan 3s infinite;
  }

  .control-button.on::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(239, 68, 68, 0.4),
      transparent
    );
  }

  @keyframes buttonScan {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }

  .control-button::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: rgba(0, 0, 0, 0.9);
    transition: 0.5s;
  }

  .control-button .button-text {
    position: relative;
    z-index: 1;
    display: inline-block;
    transition: all 0.3s ease;
  }

  .control-button.off {
    box-shadow:
      0 0 10px rgba(59, 130, 246, 0.3),
      0 0 20px rgba(59, 130, 246, 0.3),
      inset 0 0 15px rgba(59, 130, 246, 0.3);
    border: 1px solid rgba(59, 130, 246, 0.5);
  }

  .control-button.off .button-text {
    color: #3b82f6;
    text-shadow:
      0 0 5px rgba(59, 130, 246, 0.5),
      0 0 15px rgba(59, 130, 246, 0.5);
    animation: pulseBlue 2s infinite;
  }

  .control-button.on {
    box-shadow:
      0 0 10px rgba(239, 68, 68, 0.3),
      0 0 20px rgba(239, 68, 68, 0.3),
      inset 0 0 15px rgba(239, 68, 68, 0.3);
    border: 1px solid rgba(239, 68, 68, 0.5);
  }

  .control-button.on .button-text {
    color: #ef4444;
    text-shadow:
      0 0 5px rgba(239, 68, 68, 0.5),
      0 0 15px rgba(239, 68, 68, 0.5);
    animation: pulseRed 2s infinite;
  }

  @keyframes pulseRed {
    0%, 100% { text-shadow: 0 0 5px rgba(239, 68, 68, 0.5), 0 0 15px rgba(239, 68, 68, 0.5); }
    50% { text-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.8); }
  }

  @keyframes pulseBlue {
    0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 15px rgba(59, 130, 246, 0.5); }
    50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.8); }
  }

  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.8) !important;
    box-shadow: none !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }

  .control-button:disabled::before {
    display: none;
  }

  .control-button:disabled .button-text {
    color: rgba(255, 255, 255, 0.5);
    text-shadow: none;
    animation: none;
  }
`;

// Add style tag to head
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
} 
import React, { useEffect, useRef, useState } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "id-ID"; // atau 'en-US' untuk bahasa Inggris

      recognition.current.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Web Speech API not supported in this browser.");
    }
  }, []);

  const handleStart = () => {
    if (recognition.current) {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleStop = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div>
      <h2>Speech to Text Euy Tea Ah Mantap Jiwa</h2>
      <button onClick={isListening ? handleStop : handleStart}>
        {isListening ? "Stop" : "Start"}
      </button>
      <p>{text}</p>
    </div>
  );
};

export default SpeechToText;

import { createContext, useState } from "react";
import run from "../config/vikrantai";

export const Context = createContext({});

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [cumulativeWordCount, setCumulativeWordCount] = useState(0);
  const [showUpgradePoster, setShowUpgradePoster] = useState(false);
  const [showPremiumImage, setShowPremiumImage] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [wordLimit, setWordLimit] = useState(2000); // Default word limit

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    if (cumulativeWordCount > wordLimit) {
      setShowUpgradePoster(true);
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompts(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompts(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    setResultData(newResponse2);

    const wordCount = newResponse2.split(/\s+/).length;
    setCumulativeWordCount((prevCount) => prevCount + wordCount);

    setLoading(false);
    setInput("");
  };

  const closeUpgradePoster = () => setShowUpgradePoster(false);

  const showPremiumFeature = () => setShowPremiumImage(true);

  const purchasePremium = () => {
    setIsPremium(true);
    setWordLimit(10000); // Increase word limit for premium users
    setShowUpgradePoster(false);
    setShowPremiumImage(false);

    // Reset cumulative word count and input field
    setCumulativeWordCount(0);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    cumulativeWordCount,
    showUpgradePoster,
    closeUpgradePoster,
    showPremiumFeature,
    isPremium,
    wordLimit,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
      {showUpgradePoster && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: 1000,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              Upgrade to Premium
            </h1>
            <p style={{ marginBottom: "1rem" }}>
              You reached the 2000-word limit. Unlock more features with a
              premium account!
            </p>
            <button
              onClick={closeUpgradePoster}
              style={{
                padding: "1px",
                margin: "5px",
                fontSize: "1rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <button
              onClick={showPremiumFeature}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              GET PREMIUM
            </button>
          </div>
        </div>
      )}
      {showPremiumImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLTrHJax6s1Rxde04CgaXmhFtq_GKfCxsZA&s"
            alt="Premium Feature"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              height: "400px",
            }}
          />
          <button
            onClick={purchasePremium}
            style={{
              padding: "0.5rem 1rem",
              margin: "5px",
              fontSize: "1rem",
              backgroundColor: "RED",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            BUY NOW
          </button>
        </div>
      )}
    </Context.Provider>
  );
};

export default ContextProvider;

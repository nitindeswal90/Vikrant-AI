import "./Main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../contexts/context";

const MainComponent = () => {
  const {
    onSent,
    recentPrompts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    cumulativeWordCount, // Access cumulative word count
    wordLimit, // Access the dynamic word limit
    isPremium, // Check if the user is premium
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>SMAAART AI</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello Deswal</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest some beautiful places to see on an upcoming trip.</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Can you help me write code for my project? </p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
              <div className="card">
                <p>What are the best practices for web development? </p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>What is the future of AI in different industries? </p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader-container">
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </div>
              ) : (
                <p
                  className="result-text"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                if (e.target.value.length <= wordLimit) {
                  setInput(e.target.value);
                } else {
                  alert(
                    `Word limit exceeded! ${
                      isPremium
                        ? "You have reached your premium word limit of 10,000 words."
                        : "Upgrade to Premium for a higher word limit."
                    }`
                  );
                }
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              disabled={cumulativeWordCount >= wordLimit}
            />
            <div className="icons">
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="Send Icon"
              />
            </div>
          </div>
          <div className="word-count-box">
            <p>
              {cumulativeWordCount} / {wordLimit} words
            </p>{" "}
            {/* Dynamic word limit display */}
          </div>
          <p className="bottom-info">
            SMAAART AI: Your smart assistant for automating tasks, generating
            content, and solving everyday problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;

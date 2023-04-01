import React, { useState, useEffect, useRef } from "react";
import "./settingsTab.css";

function SettingsTab() {
  // References for config inputs.
  const leagueName = useRef(null);
  const accountName = useRef(null);
  const sessionId = useRef(null);
  const tabs = useRef(null);
  const tabIndex = useRef(null);

  // Use state for easily changing config.
  const [config, setConfig] = useState({});

  // Reads the config.
  useEffect(() => {
    window.api.send("readConfig", null);
    window.api.receive("configData", (currentConfig) => {
      setConfig(currentConfig);
      console.log(currentConfig);
    });
  }, []);

  // Writes and reads the config.
  const writeConfig = () => {
    const userConfig = {
      sessionId: sessionId.current.value,
      accountName: accountName.current.value,
      leagueName: leagueName.current.value,
      tabIndex: tabIndex.current.value,
      tabs: tabs.current.value,
    };
    window.api.send("writeConfig", userConfig);
    window.api.receive("configData", (newConfig) => {
      setConfig(newConfig);
    });
  };

  // Selects the text in the clicked input.
  const selectValues = (e) => {
    e.target.select();
  };

  return (
    <div className="tab-content">
      <div className="top-container-settings">
        <div className="default-option-container">
          <div>Session ID</div>
          <input
            className="default-input"
            defaultValue={config.sessionId}
            ref={sessionId}
            onClick={selectValues}
          />
        </div>
        <div className="default-option-container">
          <div>Account Name</div>
          <input
            className="default-input"
            defaultValue={config.accountName}
            ref={accountName}
            spellCheck="false"
            onClick={selectValues}
          />
        </div>
        <div className="default-option-container">
          <div>League Name</div>
          <input
            className="default-input"
            defaultValue={config.leagueName}
            ref={leagueName}
            onClick={selectValues}
          />
        </div>
        <div className="default-option-container">
          <div>Tabs</div>
          <input
            className="default-input"
            defaultValue={config.tabs}
            ref={tabs}
            onClick={selectValues}
          />
        </div>
        <div className="default-option-container">
          <div>TabIndex</div>
          <input
            className="default-input"
            defaultValue={config.tabIndex}
            ref={tabIndex}
            onClick={selectValues}
          />
        </div>
      </div>
      <div className="bottom-container-settings">
        <button id="save" className="default-button" onClick={writeConfig}>
          Save
        </button>
      </div>
    </div>
  );
}

export default SettingsTab;

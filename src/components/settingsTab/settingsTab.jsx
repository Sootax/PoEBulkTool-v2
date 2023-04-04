import React, { useState, useEffect, useRef } from 'react';
import './settingsTab.css';

function SettingsTab() {
  // References for config inputs.
  const accountName = useRef(null);
  const characterName = useRef(null);
  const sessionId = useRef(null);
  const leagueName = useRef(null);
  const expeditionTab = useRef(null);
  const heistTab = useRef(null);
  const compassTab = useRef(null);
  const logFile = useRef(null);

  // Use state for easily changing config.
  const [config, setConfig] = useState({
    accountName: '',
    characterName: '',
    sessionId: '',
    leagueName: '',
    expeditionTab: '',
    heistTab: '',
    compassTab: '',
    logfile: '',
  });

  // Reads the config if it exists or creates a blank config if not.
  useEffect(() => {
    window.api.send('getConfig', 'renderer');
    window.api.receive('getConfig', (newConfig) => {
      if (newConfig) {
        setConfig(newConfig)
      } else {
        window.api.send('setConfig', {renderer: config})
      }
    });
  }, []);

  // Writes and reads the config.
  const writeConfig = () => {
    const rendererConfig = {
      renderer: {
        accountName: accountName.current.value,
        characterName: characterName.current.value,
        sessionId: sessionId.current.value,
        leagueName: leagueName.current.value,
        logFile: logFile.current.value,
        expeditionTab: expeditionTab.current.value,
        heistTab: heistTab.current.value,
        compassTab: compassTab.current.value,
      },
    };
    window.api.send('setConfig', rendererConfig);
    window.api.receive('getConfig', (newConfig) => {
      setConfig(newConfig);
    });
  };

  // Selects the text in the clicked input.
  const selectValues = (e) => {
    e.target.select();
  };

  return (
    <div className="tab-content">
      <div className="settings-container">
        <div className="settings-container-top">
          <div className="settings-left-container">
            <div className="sub-settings-container">
              <label className="main-label">General</label>
              <label className="sub-label">Account Name</label>
              <input
                onClick={selectValues}
                defaultValue={config.accountName}
                className="default-input"
                ref={accountName}
              />
              <label className="sub-label">Character Name</label>
              <input
                onClick={selectValues}
                defaultValue={config.characterName}
                className="default-input"
                ref={characterName}
              />
              <label className="sub-label">Session ID</label>
              <input
                onClick={selectValues}
                defaultValue={config.sessionId}
                className="default-input"
                ref={sessionId}
              />
              <label className="sub-label">League Name</label>
              <input
                onClick={selectValues}
                defaultValue={config.leagueName}
                className="default-input"
                ref={leagueName}
              />
              <label className="sub-label">Logfile Location</label>
              <input
                onClick={selectValues}
                defaultValue={config.logFile}
                className="default-input"
                ref={logFile}
              />
            </div>
          </div>
          <div className="settings-right-container">
            <div className="sub-settings-container">
              <label className="main-label">Expedition</label>
              <label className="sub-label">Tab Index</label>
              <input
                onClick={selectValues}
                defaultValue={config.expeditionTab}
                className="default-input"
                ref={expeditionTab}
              />
            </div>
            <div className="sub-settings-container">
              <label className="main-label">Heist</label>
              <label className="sub-label">Tab Index</label>
              <input
                onClick={selectValues}
                defaultValue={config.heistTab}
                className="default-input"
                ref={heistTab}
              />
            </div>
            <div className="sub-settings-container">
              <label className="main-label">Compasses</label>
              <label className="sub-label">Tab Index</label>
              <input
                onClick={selectValues}
                defaultValue={config.compassTab}
                className="default-input"
                ref={compassTab}
              />
            </div>
          </div>
        </div>
        <div className="settings-container-bottom">
          <button className="default-button" onClick={writeConfig}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;

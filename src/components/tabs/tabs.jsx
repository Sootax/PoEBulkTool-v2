import React, { useState } from "react";

import LeagueTab from "Components/leagueTab/leagueTab.jsx";
import SettingsTab from "Components/settingsTab/settingsTab.jsx";

import "./tabs.css";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Settings");
  const contentTabs = [
    {
      name: "Expedition",
      component: <LeagueTab activeTabInfo={activeTab} key="1" />,
    },
    {
      name: "Compasses",
      component: <LeagueTab activeTabInfo={activeTab} key="2" />,
    },
    {
      name: "Heist",
      component: <LeagueTab activeTabInfo={activeTab} key="3" />,
    },
    {
      name: "Settings",
      component: <SettingsTab activeTabInfo={activeTab} key="4" />,
    },
  ];
  const handleTabChange = (tab) => {
    setActiveTab(tab.target.innerText);
  };
  const tabsMap = contentTabs.map((tab, index) => {
    return (
      <li
        className={activeTab === tab.name ? "active" : ""}
        onClick={handleTabChange}
        key={index}
      >
        {tab.name}
      </li>
    );
  });
  const contentTabsMap = contentTabs.map((tab, index) => {
    return activeTab === tab.name ? tab.component : null;
  });
  return (
    <div className="tabs">
      <ul className="navbar">{tabsMap}</ul>
      {contentTabsMap}
    </div>
  );
}

export default Tabs;

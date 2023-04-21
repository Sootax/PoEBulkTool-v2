function generateStashConfig(config, tabIndex) {
  return {
    sessionId: config.sessionId,
    accountName: config.accountName,
    leagueName: config.leagueName,
    tabIndex: tabIndex,
    tabs: tabIndex,
  };
}

export default generateStashConfig;

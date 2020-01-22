export function selectTab(tabId) {
  return {
    type: 'TAB_SELECTED',
    payload: tabId,
  };
}

export function showTabs(tabIds, id) {
  const tabsToShow = {};
  if (typeof tabIds === 'string') {
    tabIds = [tabIds];
  }
  tabIds.forEach(e => tabsToShow[e] = true);
  return {
    type: 'TAB_SHOWED' + (id || ''),
    payload: tabsToShow,
  };
}

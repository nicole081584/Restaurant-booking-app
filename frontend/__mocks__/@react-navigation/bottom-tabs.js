// __mocks__/@react-navigation/bottom-tabs.js
module.exports = {
  ...jest.requireActual('@react-navigation/bottom-tabs'),
  useBottomTabBarHeight: () => 50, // pretend the tab bar is 50px tall
};

// __mocks__/react-native-reanimated.js

// Create a barebones mock so Jest never touches the real library
module.exports = {
  default: {},
  View: 'View',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  // hooks
  useSharedValue: (init) => ({ value: init }),
  useAnimatedStyle: (cb) => cb(),
  useAnimatedRef: jest.fn,
  // animations
  withTiming: (val) => val,
  withSpring: (val) => val,
  withRepeat: (val) => val,
};

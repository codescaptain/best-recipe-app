import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';

const CollapsibleView = ({ title, children }: { title: any, children: any }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false // useNativeDriver: true olmadan kullanıyoruz
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 800]
  });

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.collapsibleContent, { maxHeight: heightInterpolate }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleContent: {
    overflow: 'hidden'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CollapsibleView;

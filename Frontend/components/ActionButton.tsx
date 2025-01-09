// ActionButton.tsx
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

// Define an interface for the component props
interface ActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  containerStyle: object;
}

const ActionButton = ({ onPress, icon, containerStyle }: ActionButtonProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActionButton;

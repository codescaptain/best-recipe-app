import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accordionContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  header: {
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  contentText: {
    fontSize: 16,
  },
});

export default Accordion;

import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  { id: 'fire', label: 'Fire' },
  { id: 'burglary', label: 'Burglary' },
  { id: 'suspicious', label: 'Suspicious Activity' },
  { id: 'armed', label: 'Armed Person' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What's happening?</Text>

      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.categoryButton}
          onPress={() => setSelectedCategory(cat.id)}
        >
          <Text style={styles.categoryText}>{cat.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.selectedLabel}>
        Selected: {selectedCategory ? selectedCategory : 'none yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3EF',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#16211E',
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DBDFD6',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#16211E',
  },
  selectedLabel: {
    marginTop: 20,
    fontSize: 14,
    color: '#4B5750',
  },
});
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

const CATEGORIES = [
  { id: 'fire', label: 'Fire' },
  { id: 'burglary', label: 'Burglary' },
  { id: 'suspicious', label: 'Suspicious Activity' },
  { id: 'armed', label: 'Armed Person' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');

  const isFormValid = selectedCategory !== null && description.trim().length > 0;

  const handleSubmit = () => {
    Alert.alert(
      'Report submitted',
      `Category: ${selectedCategory}\nDescription: ${description}`,
      [{ text: 'OK', onPress: resetForm }]
    );
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What's happening?</Text>

      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TextInput
        style={styles.descriptionInput}
        placeholder="What did you see? Be specific - location details help."
        placeholderTextColor="#4B5750"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>Alert Neighbors</Text>
      </TouchableOpacity>
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
  categoryButtonSelected: {
    backgroundColor: '#E4EDE9',
    borderColor: '#1F4E4A',
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#16211E',
  },
  categoryTextSelected: {
    color: '#123330',
    fontWeight: '700',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBDFD6',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#16211E',
    minHeight: 90,
    marginTop: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1F4E4A',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#DBDFD6',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
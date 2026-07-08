import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Keyboard, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

const CATEGORIES = [
  { id: 'fire', label: 'Fire' },
  { id: 'burglary', label: 'Burglary' },
  { id: 'suspicious', label: 'Suspicious Activity' },
  { id: 'armed', label: 'Armed Person' },
];

const SEVERITY_COLORS = { 1: '#4B7F52', 2: '#8C9C3F', 3: '#D69A3B', 4: '#C15A2E', 5: '#8C2A2A' };
const SEVERITY_LABELS = { 1: 'Minor', 2: 'Elevated', 3: 'Moderate', 4: 'Serious', 5: 'Critical' };

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(3);

  const isFormValid = selectedCategory !== null && description.trim().length > 0;

  const handleSubmit = () => {
    Alert.alert(
      'Report submitted',
      `Category: ${selectedCategory}\nSeverity: ${severity} - ${SEVERITY_LABELS[severity]}\nDescription: ${description}`,
      [{ text: 'OK', onPress: resetForm }]
    );
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setDescription('');
    setSeverity(3);
  };

  return (
  <Pressable style={styles.container} onPress={Keyboard.dismiss}>
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

        <View style={styles.severityRow}>
          <Text style={styles.severityLabel}>Severity</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={severity}
            onValueChange={setSeverity}
            minimumTrackTintColor={SEVERITY_COLORS[severity]}
            thumbTintColor={SEVERITY_COLORS[severity]}
          />
          <View style={[styles.severityPreview, { backgroundColor: SEVERITY_COLORS[severity] }]}>
            <Text style={styles.severityPreviewText}>
              {severity} · {SEVERITY_LABELS[severity]}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>Alert Neighbors</Text>
        </TouchableOpacity>
      
      </Pressable>
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
  severityRow: {
    marginTop: 16,
  },
  severityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16211E',
    marginBottom: 4,
  },
  severityPreview: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  severityPreviewText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
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
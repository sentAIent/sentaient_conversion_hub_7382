import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export function ComplianceGate({ children }) {
  const [isCompliant, setIsCompliant] = useState(false);
  const [checkedAge, setCheckedAge] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sp_compliance_accepted');
      if (saved === 'true') {
        setIsCompliant(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (checkedAge && checkedTerms) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('sp_compliance_accepted', 'true');
      }
      setIsCompliant(true);
    }
  };

  if (isCompliant) {
    return children;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ACCESS RESTRICTED</Text>
        <Text style={styles.subtitle}>Please confirm your eligibility to play.</Text>
        
        <TouchableOpacity 
          style={[styles.checkboxRow, checkedAge && styles.checkboxRowActive]}
          onPress={() => setCheckedAge(!checkedAge)}
        >
          <View style={[styles.checkbox, checkedAge && styles.checkboxActive]}>
            {checkedAge && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.label}>I am 13 years of age or older (COPPA compliance).</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.checkboxRow, checkedTerms && styles.checkboxRowActive]}
          onPress={() => setCheckedTerms(!checkedTerms)}
        >
          <View style={[styles.checkbox, checkedTerms && styles.checkboxActive]}>
            {checkedTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.label}>I accept the Terms of Service and consent to data collection (GDPR/CCPA).</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, (checkedAge && checkedTerms) ? styles.buttonActive : styles.buttonDisabled]}
          disabled={!checkedAge || !checkedTerms}
          onPress={handleAccept}
        >
          <Text style={styles.buttonText}>ENTER PARADISE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01010a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  card: {
    backgroundColor: 'rgba(10, 15, 25, 0.9)',
    borderWidth: 1,
    borderColor: '#ff0077',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#ff0077',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ff0077',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaddff',
    marginBottom: 30,
    textAlign: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  checkboxRowActive: {
    borderColor: '#00ffff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 6,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: '#00ffff',
    backgroundColor: 'rgba(0,255,255,0.2)',
  },
  checkmark: {
    color: '#00ffff',
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonActive: {
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#01010a',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  }
});

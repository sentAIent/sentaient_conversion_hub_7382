import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LiveCountdownProps {
  expiresAt?: string; // ISO Date String
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // If no explicit expiration, mock a 45 min FOMO countdown
    const targetDate = expiresAt ? new Date(expiresAt).getTime() : Date.now() + 45 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('EXPIRED');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownLabel}>EXPIRES IN</Text>
      <Text style={styles.countdownTime}>{timeLeft}</Text>
    </View>
  );
};

interface ProgressBarProps {
  current: number;
  target: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, target }) => {
  const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  
  return (
    <View style={styles.progressWrapper}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          <Text style={styles.progressCurrent}>{current}</Text> / {target} Check-ins
        </Text>
        <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  countdownLabel: { color: '#ef4444', fontSize: 10, fontWeight: '800', marginRight: 8, letterSpacing: 1 },
  countdownTime: { color: '#ef4444', fontSize: 16, fontWeight: '900', fontVariant: ['tabular-nums'] },
  
  progressWrapper: { width: '100%', marginVertical: 10 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { color: '#cbd5e1', fontSize: 12, fontWeight: '600' },
  progressCurrent: { color: '#00ffcc', fontWeight: '800' },
  progressPercentage: { color: '#00ffcc', fontSize: 12, fontWeight: '800' },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#00ffcc', borderRadius: 4 },
});

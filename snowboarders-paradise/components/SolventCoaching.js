import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export function SolventCoaching({ telemetry, onClose }) {
    const [status, setStatus] = useState('IDLE');
    const [report, setReport] = useState(null);

    const handlePurchase = async () => {
        setStatus('PURCHASING');
        // Simulate payment flow (Stripe link)
        setTimeout(async () => {
            setStatus('ANALYZING');
            try {
                // Post to the local Node.js server, which forwards to Solvent Agent
                const res = await fetch('http://localhost:3001/api/solvent-coaching', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ telemetry })
                });
                const data = await res.json();
                setReport(data.report);
                setStatus('DONE');
            } catch (e) {
                console.error(e);
                setStatus('ERROR');
            }
        }, 2000);
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>

                <Text style={styles.title}>AI Coaching via Solvent</Text>
                
                {status === 'IDLE' && (
                    <View>
                        <Text style={styles.desc}>Pay $4.99 for a personalized breakdown of your telemetry and strategy.</Text>
                        <Text style={styles.telemetryText}>Stats: {JSON.stringify(telemetry)}</Text>
                        <TouchableOpacity style={styles.buyBtn} onPress={handlePurchase}>
                            <Text style={styles.buyBtnText}>Purchase Scouting Report</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {(status === 'PURCHASING' || status === 'ANALYZING') && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>
                            {status === 'PURCHASING' ? 'Processing Payment (Stripe)...' : 'Solvent AI Analyzing Telemetry...'}
                        </Text>
                    </View>
                )}

                {status === 'DONE' && (
                    <View style={styles.reportView}>
                        <Text style={styles.reportTitle}>Your Scouting Report</Text>
                        <Text style={styles.reportText}>{report}</Text>
                        <TouchableOpacity style={styles.buyBtn} onPress={onClose}>
                            <Text style={styles.buyBtnText}>Back to Game</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {status === 'ERROR' && (
                    <Text style={{color: 'red', marginTop: 20}}>Error connecting to Solvent Agent. Is the backend running?</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 300 },
    modal: { width: 500, backgroundColor: '#111', padding: 25, borderRadius: 12, borderWidth: 1, borderColor: '#333' },
    closeBtn: { position: 'absolute', top: 15, right: 15 },
    closeText: { color: '#888', fontSize: 18, fontWeight: 'bold' },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    desc: { color: '#aaa', fontSize: 16, marginBottom: 15 },
    telemetryText: { color: '#555', fontSize: 12, marginBottom: 20 },
    buyBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center' },
    buyBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    loading: { alignItems: 'center', padding: 30 },
    loadingText: { color: '#fff', marginTop: 15 },
    reportView: { marginTop: 10 },
    reportTitle: { color: '#4CAF50', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    reportText: { color: '#fff', fontSize: 14, lineHeight: 22, marginBottom: 20 }
});

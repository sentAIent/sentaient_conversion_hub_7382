import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

// Integration with Cal.com
// Allows players to book 1-on-1 remote coaching sessions with real pro snowboarders

export function ProCoaching({ onClose }) {
    const [bookingState, setBookingState] = useState('LIST'); // LIST, CALENDAR

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Book a Pro Coach (Cal.com)</Text>
                
                {bookingState === 'LIST' ? (
                    <View style={styles.coachList}>
                        <View style={styles.coachCard}>
                            <Text style={styles.coachName}>Travis Rice (Masterclass)</Text>
                            <Text style={styles.coachDesc}>Focus: Backcountry, Big Air</Text>
                            <TouchableOpacity 
                                style={styles.bookBtn} 
                                onPress={() => setBookingState('CALENDAR')}
                            >
                                <Text style={styles.bookBtnText}>View Availability</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.coachCard}>
                            <Text style={styles.coachName}>Marcus Kleveland</Text>
                            <Text style={styles.coachDesc}>Focus: Butters, Knuckle Huck</Text>
                            <TouchableOpacity 
                                style={styles.bookBtn} 
                                onPress={() => setBookingState('CALENDAR')}
                            >
                                <Text style={styles.bookBtnText}>View Availability</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.calendarView}>
                        <Text style={styles.subTitle}>Select a Time</Text>
                        {Platform.OS === 'web' ? (
                            <iframe 
                                src="https://cal.com/rick/30min" 
                                style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#000' }} 
                            />
                        ) : (
                            <View style={styles.mockIframe}>
                                <Text style={styles.mockIframeText}>[Cal.com Embed Initializing...]</Text>
                                <TouchableOpacity 
                                    style={styles.confirmBtn}
                                    onPress={() => {
                                        alert("Session Booked! A calendar invite has been sent.");
                                        onClose();
                                    }}
                                >
                                    <Text style={styles.confirmBtnText}>Confirm 3:00 PM (Mock)</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                        <TouchableOpacity style={styles.backBtn} onPress={() => setBookingState('LIST')}>
                            <Text style={styles.backBtnText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 200
    },
    modalContent: {
        width: 600, height: 500, backgroundColor: '#111', borderRadius: 16, padding: 30,
        borderWidth: 1, borderColor: '#333'
    },
    closeBtn: { position: 'absolute', top: 20, right: 20 },
    closeText: { color: '#888', fontSize: 20, fontWeight: 'bold' },
    title: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 20 },
    subTitle: { color: '#ccc', fontSize: 18, marginBottom: 15 },
    coachCard: {
        backgroundColor: '#222', padding: 20, borderRadius: 12, marginBottom: 15,
        borderWidth: 1, borderColor: '#444'
    },
    coachName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    coachDesc: { color: '#aaa', fontSize: 14, marginBottom: 15 },
    bookBtn: { backgroundColor: '#fff', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    bookBtnText: { color: '#000', fontWeight: 'bold' },
    mockIframe: { flex: 1, backgroundColor: '#000', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    mockIframeText: { color: '#555', marginBottom: 20 },
    confirmBtn: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
    confirmBtnText: { color: '#000', fontWeight: 'bold' },
    backBtn: { alignItems: 'center' },
    backBtnText: { color: '#888', textDecorationLine: 'underline' }
});

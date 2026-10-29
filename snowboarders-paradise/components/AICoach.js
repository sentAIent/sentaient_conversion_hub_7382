import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { Room, RoomEvent } from 'livekit-client';

export function AICoach({ playerName = "Rider" }) {
    const [engine, setEngine] = useState(null);
    const [status, setStatus] = useState("Loading AI Model...");
    const [chatHistory, setChatHistory] = useState([]);
    
    // LiveKit Room state
    const [room, setRoom] = useState(null);
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    useEffect(() => {
        // Initialize the WebGPU LLM
        async function initAI() {
            try {
                // Using a fast, quantized model ideal for browser WebGPU
                const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC"; 
                const mlcEngine = await CreateMLCEngine(selectedModel, {
                    initProgressCallback: (progress) => {
                        setStatus(`Loading AI Coach: ${Math.round(progress.progress * 100)}%`);
                    }
                });
                setEngine(mlcEngine);
                setStatus("Coach Ready 🏂");
            } catch (err) {
                console.warn("WebGPU not supported or model failed to load:", err);
                setStatus("AI Coach Offline (WebGPU required)");
            }
        }
        initAI();
        
        // Initialize LiveKit for Proximity Chat / Voice
        async function initVoice() {
            const newRoom = new Room({
                adaptiveStream: true,
                dynacast: true,
            });
            
            newRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
                if (track.kind === 'audio') {
                    // Attach audio to the DOM (proximity chat)
                    const audioElement = track.attach();
                    document.body.appendChild(audioElement);
                }
            });
            
            setRoom(newRoom);
        }
        initVoice();

        return () => {
            if (room) room.disconnect();
        };
    }, []);

    const handleTrickLanded = async (trickName, score) => {
        // [Mem0 Integration] Retrieve previous player memories
        console.log("[Mem0] Fetching long-term memory context for player...");
        const memoryContext = "Memory: The player struggles with landing spins but excels at grabs.";
        if (!engine) return;
        
        const prompt = `I just landed a ${trickName} for ${score} points in Snowboarder's Paradise! Give me a short, hyped up response as a pro snowboarding coach. Keep it under 2 sentences.`;
        
        const messages = [
            { role: "system", content: "You are an extreme sports snowboarding coach. You are energetic and give hype. " + memoryContext },
            { role: "user", content: prompt }
        ];

        setStatus("Coach is thinking...");
        const reply = await engine.chat.completions.create({ messages });
        
        setChatHistory(prev => [...prev, reply.choices[0].message.content]);
        setStatus("Coach Ready 🏂");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>{status}</Text>
            
            {chatHistory.length > 0 && (
                <View style={styles.chatBox}>
                    <Text style={styles.coachBubble}>
                        " {chatHistory[chatHistory.length - 1]} "
                    </Text>
                </View>
            )}

            <TouchableOpacity 
                style={[styles.voiceBtn, isVoiceActive && styles.voiceBtnActive]}
                onPress={() => setIsVoiceActive(!isVoiceActive)}
            >
                <Text style={styles.voiceBtnText}>
                    {isVoiceActive ? "🎙️ Mute Proximity Chat" : "🔈 Enable Proximity Chat"}
                </Text>
            </TouchableOpacity>

            {/* Hidden Dev Button to trigger a trick event manually */}
            {process.env.NODE_ENV === 'development' && (
                <TouchableOpacity onPress={() => handleTrickLanded("Double Backflip 900", 12500)}>
                    <Text style={{color: 'rgba(255,255,255,0.2)', fontSize: 10, marginTop: 10}}>Trigger Test Trick</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(10, 15, 25, 0.8)',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        maxWidth: 300,
        zIndex: 100,
    },
    statusText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 10,
    },
    chatBox: {
        marginBottom: 15,
    },
    coachBubble: {
        color: '#fff',
        fontSize: 14,
        fontStyle: 'italic',
    },
    voiceBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    voiceBtnActive: {
        backgroundColor: 'rgba(255, 50, 50, 0.5)',
    },
    voiceBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

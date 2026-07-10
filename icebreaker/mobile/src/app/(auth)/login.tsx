import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation RegisterUser($inviteCode: String) {
    registerUser(inviteCode: $inviteCode) {
      id
    }
  }
`;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const router = useRouter();

  const [registerUser] = useMutation(REGISTER_USER);

  const validateEmail = (emailStr: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(emailStr);
  };

  const handleAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        await registerUser({ variables: { inviteCode } });
        // New users go to onboarding to set up profile
        router.replace('/(auth)/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // Existing users go to main app (handled by layout)
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      let errorMessage = 'Authentication failed. Please try again.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains. Please add sentaient.com and your netlify subdomains.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const actionCodeSettings = {
        url: 'https://sentaient.com/icebreaker/login',
        handleCodeInApp: false,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setSuccess('Reset link sent! Check your inbox — and your spam/junk folder.');
    } catch (err: any) {
      console.error("Reset Error:", err);
      let errorMessage = 'Failed to send reset link. Please try again.';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains. Please add sentaient.com and your netlify subdomains.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        {error ? (
          <Animated.View 
            entering={FadeInUp.duration(400)} 
            exiting={FadeOutUp.duration(300)} 
            style={styles.errorToast}
          >
            <Ionicons name="alert-circle" size={24} color="#ef4444" style={{marginRight: 10}} />
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        {success ? (
          <Animated.View 
            entering={FadeInUp.duration(400)} 
            exiting={FadeOutUp.duration(300)} 
            style={styles.successToast}
          >
            <Ionicons name="checkmark-circle" size={24} color="#10b981" style={{marginRight: 10}} />
            <Text style={styles.successText}>{success}</Text>
          </Animated.View>
        ) : null}

        <BlurView intensity={30} tint="dark" style={styles.glassCard}>
          <Text style={styles.title}>ICEBREAKER</Text>
          <Text style={styles.subtitle}>
            {mode === 'signin' && 'Log in to map your network.'}
            {mode === 'signup' && 'Create your account to start mapping.'}
            {mode === 'forgot' && 'Reset your password.'}
          </Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
            if (success) setSuccess('');
          }}
          returnKeyType={mode === 'forgot' ? 'send' : 'next'}
          onSubmitEditing={() => {
            if (mode === 'forgot') {
              handleResetPassword();
            } else {
              passwordInputRef.current?.focus();
            }
          }}
        />

        {mode !== 'forgot' && (
          <View style={styles.passwordContainer}>
            <TextInput
              ref={passwordInputRef}
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) setError('');
              }}
              returnKeyType="go"
              onSubmitEditing={() => handleAuth(mode === 'signup')}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={22} 
                color="rgba(255,255,255,0.5)" 
              />
            </TouchableOpacity>
          </View>
        )}

        {mode === 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="Invite Code (optional)"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={inviteCode}
            onChangeText={setInviteCode}
          />
        )}

        {mode === 'signin' && (
          <>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => handleAuth(false)}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.forgotButton}
              onPress={() => {
                setMode('forgot');
                setError('');
                setSuccess('');
              }}
            >
              <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => {
                setMode('signup');
                setError('');
                setSuccess('');
              }}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}

        {mode === 'signup' && (
          <>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => handleAuth(true)}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => {
                setMode('signin');
                setError('');
                setSuccess('');
              }}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Reset Link</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => {
                setMode('signin');
                setError('');
                setSuccess('');
              }}
              disabled={loading}
            >
              <Text style={styles.secondaryButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </BlurView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  glassCard: {
    padding: 30,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  passwordInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotButtonText: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  secondaryButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  errorToast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    ...(Platform.OS === 'web' ? { boxShadow: '0px 4px 10px rgba(239, 68, 68, 0.3)' as any } : {
      shadowColor: '#ef4444',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    }),
  },
  errorText: {
    color: '#ef4444',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  successToast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 30, 10, 0.8)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    ...(Platform.OS === 'web' ? { boxShadow: '0px 4px 10px rgba(16, 185, 129, 0.3)' as any } : {
      shadowColor: '#10b981',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    }),
  },
  successText: {
    color: '#10b981',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  }
});

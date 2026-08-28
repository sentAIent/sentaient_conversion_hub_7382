import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeBack } from '../hooks/useSafeBack';


const GET_WALLET = gql`
  query GetMyWallet {
    myWallet {
      id
      balance
      transactions {
        id
        amount
        type
        description
        createdAt
      }
    }
  }
`;

const CASH_OUT = gql`
  mutation CashOutWallet {
    cashOutWallet {
      status
      url
    }
  }
`;

export default function WalletScreen() {
  const safeBack = useSafeBack();

  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_WALLET, { fetchPolicy: 'cache-and-network' });
  const [cashOut, { loading: cashOutLoading }] = useMutation(CASH_OUT);

  const handleCashOut = async () => {
    try {
      await cashOut();
      alert('Cash out successful! Your funds are on the way.');
      refetch();
    } catch (e: any) {
      alert(e.message || 'An error occurred while cashing out.');
    }
  };

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const wallet = data?.myWallet;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>
          ${wallet ? (wallet.balance / 100).toFixed(2) : '0.00'}
        </Text>
        
        {wallet && wallet.balance >= 2000 ? (
          <TouchableOpacity 
            style={[styles.cashOutButton, cashOutLoading && { opacity: 0.7 }]} 
            onPress={handleCashOut}
            disabled={cashOutLoading}
          >
            {cashOutLoading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.cashOutButtonText}>Cash Out All</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.cashOutDisabled}>
            <Text style={styles.cashOutDisabledText}>Minimum $20.00 required to cash out</Text>
          </View>
        )}
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {(!wallet || wallet.transactions.length === 0) ? (
          <Text style={styles.emptyText}>No transactions yet.</Text>
        ) : (
          <FlatList
            data={wallet.transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.txRow}>
                <View style={styles.txIcon}>
                  <Ionicons 
                    name={item.amount > 0 ? "arrow-down-circle" : "arrow-up-circle"} 
                    size={24} 
                    color={item.amount > 0 ? "#00E676" : "#FF1744"} 
                  />
                </View>
                <View style={styles.txDetails}>
                  <Text style={styles.txTitle}>{item.description || item.type}</Text>
                  <Text style={styles.txDate}>
                    {new Date(isNaN(Number(item.createdAt)) ? item.createdAt : parseInt(item.createdAt)).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={[styles.txAmount, { color: item.amount > 0 ? "#00E676" : "#fff" }]}>
                  {item.amount > 0 ? '+' : ''}${(item.amount / 100).toFixed(2)}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cashOutButton: {
    backgroundColor: '#00E676',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 10,
  },
  cashOutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cashOutDisabled: {
    paddingVertical: 12,
    marginTop: 10,
  },
  cashOutDisabledText: {
    color: '#666',
    fontSize: 14,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  txIcon: {
    marginRight: 12,
  },
  txDetails: {
    flex: 1,
  },
  txTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  txDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

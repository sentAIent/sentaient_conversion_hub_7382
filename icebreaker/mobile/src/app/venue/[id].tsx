import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { gql, useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';

const GET_STOREFRONT = gql`
  query GetVenueStorefront($venueId: ID!) {
    venueStorefront(venueId: $venueId) {
      id
      name
      description
      products {
        id
        name
        description
        price
        imageUrl
      }
    }
  }
`;

export default function StorefrontScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_STOREFRONT, { variables: { venueId: id } });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const storefront = data?.venueStorefront;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{storefront?.name || 'Storefront'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {!storefront ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>No storefront available for this venue.</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {storefront.description && <Text style={styles.storeDescription}>{storefront.description}</Text>}
          
          <FlatList
            data={storefront.products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <View style={styles.imagePlaceholder}>
                  {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                  ) : (
                    <Ionicons name="cart" size={40} color="#555" />
                  )}
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${(item.price / 100).toFixed(2)}</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No products found.</Text>}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  backButton: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  storeDescription: { color: '#aaa', fontSize: 15, marginBottom: 20, textAlign: 'center' },
  errorText: { color: '#FF1744', fontSize: 16 },
  emptyText: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 40 },
  productCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#222',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden'
  },
  productImage: { width: '100%', height: '100%' },
  productName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productPrice: { color: '#00E676', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  buyButton: { backgroundColor: '#2962FF', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  buyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});

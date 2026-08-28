import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeBack } from '../../hooks/useSafeBack';
import { SkeletonLoader } from '../../components/SkeletonLoader';

import { gql, useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

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
  const safeBack = useSafeBack();

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_STOREFRONT, { variables: { venueId: id } });
  const { addToCart, cartCount } = useCart();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width={24} height={24} borderRadius={12} />
          <SkeletonLoader width={120} height={20} />
          <SkeletonLoader width={24} height={24} borderRadius={12} />
        </View>
        <View style={styles.content}>
          <SkeletonLoader width={200} height={16} style={{ alignSelf: 'center', marginBottom: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.productCard}>
              <SkeletonLoader width="100%" height={150} borderRadius={8} style={{ marginBottom: 10 }} />
              <SkeletonLoader width={100} height={16} style={{ marginBottom: 4 }} />
              <SkeletonLoader width={60} height={14} style={{ marginBottom: 12 }} />
              <SkeletonLoader width="100%" height={36} borderRadius={6} />
            </View>
            <View style={styles.productCard}>
              <SkeletonLoader width="100%" height={150} borderRadius={8} style={{ marginBottom: 10 }} />
              <SkeletonLoader width={100} height={16} style={{ marginBottom: 4 }} />
              <SkeletonLoader width={60} height={14} style={{ marginBottom: 12 }} />
              <SkeletonLoader width="100%" height={36} borderRadius={6} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const storefront = data?.venueStorefront;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{storefront?.name || 'Storefront'}</Text>
        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartButton}>
          <Ionicons name="cart" size={24} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
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
                <TouchableOpacity 
                  style={styles.buyButton}
                  onPress={() => {
                    addToCart({ id: item.id, product: item });
                    router.push('/cart');
                  }}
                >
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
  cartButton: { padding: 4, position: 'relative' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#FF1744', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
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

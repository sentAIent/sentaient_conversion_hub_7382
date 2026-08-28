import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput, FlatList, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeBack } from '../../hooks/useSafeBack';

import { gql, useQuery, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';

const GET_MY_STOREFRONT = gql`
  query GetMyStorefront {
    me {
      id
    }
  }
`;

const GET_VENUE_STOREFRONT = gql`
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

const CREATE_STOREFRONT = gql`
  mutation CreateStorefront($name: String!, $description: String) {
    createStorefront(name: $name, description: $description) {
      id
      name
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($storefrontId: ID!, $name: String!, $price: Int!, $imageUrl: String) {
    addProduct(storefrontId: $storefrontId, name: $name, price: $price, imageUrl: $imageUrl) {
      id
      name
    }
  }
`;

export default function ManageStorefrontScreen() {
  const safeBack = useSafeBack();

  const router = useRouter();
  
  // 1. Get Me to know the user ID
  const { data: meData, loading: meLoading } = useQuery(GET_MY_STOREFRONT);
  const myId = meData?.me?.id;

  // 2. Query Storefront using my ID
  const { data: storeData, loading: storeLoading, refetch } = useQuery(GET_VENUE_STOREFRONT, {
    variables: { venueId: myId },
    skip: !myId,
    fetchPolicy: 'network-only'
  });

  const [createStorefront, { loading: creatingStore }] = useMutation(CREATE_STOREFRONT);
  const [addProduct, { loading: addingProduct }] = useMutation(ADD_PRODUCT);

  const [storeName, setStoreName] = useState('');
  const [storeDesc, setStoreDesc] = useState('');
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');

  const handleCreateStore = async () => {
    try {
      if (!storeName) return alert('Name required');
      await createStorefront({ variables: { name: storeName, description: storeDesc } });
      refetch();
    } catch(e: any) { alert(e.message); }
  };

  const handleAddProduct = async (storefrontId: string) => {
    try {
      if (!prodName || !prodPrice) return alert('Name and Price required');
      await addProduct({ variables: { 
        storefrontId, 
        name: prodName, 
        price: parseInt(prodPrice) * 100, // to cents
        imageUrl: prodImage || null
      }});
      setShowAddProduct(false);
      setProdName('');
      setProdPrice('');
      setProdImage('');
      refetch();
    } catch(e: any) { alert(e.message); }
  };

  const loading = meLoading || storeLoading;
  const storefront = storeData?.venueStorefront;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (router.canGoBack() ? safeBack() : router.replace('/(tabs)/feed'))} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Storefront</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
           <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : !storefront ? (
        <View style={styles.content}>
          <View style={styles.premiumBanner}>
            <Ionicons name="storefront" size={24} color="#00E676" style={{marginRight: 10}} />
            <Text style={styles.premiumText}>Start Selling Natively</Text>
          </View>
          <Text style={styles.label}>Storefront Name</Text>
          <TextInput style={styles.input} placeholder="e.g. Acme Merch" placeholderTextColor="#666" value={storeName} onChangeText={setStoreName} />
          
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} placeholder="Welcome to our shop!" placeholderTextColor="#666" value={storeDesc} onChangeText={setStoreDesc} />
          
          <TouchableOpacity style={[styles.button, creatingStore && {opacity: 0.5}]} onPress={handleCreateStore} disabled={creatingStore}>
             {creatingStore ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Create Storefront</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.storeHeader}>
             <Text style={styles.storeName}>{storefront.name}</Text>
             <TouchableOpacity style={styles.addButton} onPress={() => setShowAddProduct(true)}>
               <Ionicons name="add" size={20} color="#000" />
               <Text style={styles.addButtonText}>Add Product</Text>
             </TouchableOpacity>
          </View>

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
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No products yet. Add one!</Text>}
          />
        </View>
      )}

      {/* Add Product Modal */}
      <Modal visible={showAddProduct} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Product</Text>
            
            <TextInput style={styles.input} placeholder="Product Name" placeholderTextColor="#666" value={prodName} onChangeText={setProdName} />
            <TextInput style={styles.input} placeholder="Price (USD) e.g. 25" placeholderTextColor="#666" keyboardType="numeric" value={prodPrice} onChangeText={setProdPrice} />
            <TextInput style={styles.input} placeholder="Image URL (Optional)" placeholderTextColor="#666" value={prodImage} onChangeText={setProdImage} autoCapitalize="none" />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
               <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#333' }]} onPress={() => setShowAddProduct(false)}>
                 <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#00E676' }]} onPress={() => storefront && handleAddProduct(storefront.id)} disabled={addingProduct}>
                 {addingProduct ? <ActivityIndicator color="#000" /> : <Text style={{ color: '#000', fontWeight: 'bold' }}>Save Product</Text>}
               </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  backButton: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  premiumBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#002613', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#00E676' },
  premiumText: { color: '#00E676', fontWeight: 'bold', fontSize: 16 },
  label: { color: '#ddd', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#222' },
  button: { backgroundColor: '#00E676', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  
  storeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  storeName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  addButtonText: { color: '#000', fontWeight: 'bold', marginLeft: 4 },
  
  productCard: { width: '48%', backgroundColor: '#111', borderRadius: 12, padding: 12, marginBottom: 16 },
  imagePlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: '#222', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%' },
  productName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productPrice: { color: '#00E676', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  emptyText: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 40 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#111', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#333' },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 8, marginHorizontal: 5 }
});

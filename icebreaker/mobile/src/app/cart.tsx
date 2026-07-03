import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStripe } from '../components/StripeWrapper';
import { gql, useMutation } from '@apollo/client';

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount)
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!, $paymentIntentId: String, $shippingAddress: String) {
    createOrder(items: $items, paymentIntentId: $paymentIntentId, shippingAddress: $shippingAddress) {
      id
      status
    }
  }
`;

export default function CartScreen() {
  const { items, cartCount, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [createOrder] = useMutation(CREATE_ORDER);

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    
    try {
      // 1. Fetch Payment Intent client secret
      const { data } = await createPaymentIntent({ variables: { amount: total } });
      const clientSecret = data.createPaymentIntent;
      
      // 2. Initialize Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Icebreaker',
        paymentIntentClientSecret: clientSecret,
        billingDetailsCollectionConfiguration: {
          address: 'full',
          name: 'always',
        },
      });
      
      if (initError) {
        Alert.alert('Error', initError.message);
        setLoading(false);
        return;
      }
      
      // 3. Present Payment Sheet
      const { error: presentError } = await presentPaymentSheet();
      
      if (presentError) {
        Alert.alert('Payment Cancelled', presentError.message);
        setLoading(false);
        return;
      }
      
      // 4. On Success, create order in backend
      const orderItems = items.map(i => ({
        productId: i.product.id,
        quantity: i.quantity,
        priceAtPurchase: i.product.price
      }));
      
      await createOrder({
        variables: {
          items: orderItems,
          paymentIntentId: clientSecret,
          shippingAddress: 'Collected via Stripe'
        }
      });
      
      Alert.alert('Success', 'Your order is confirmed!');
      clearCart();
      router.back();
      
    } catch (e: any) {
      console.error(e);
      Alert.alert('Payment Failed', e.message);
    }
    setLoading(false);
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <View style={styles.imagePlaceholder}>
        {item.product.imageUrl ? (
          <Image source={{ uri: item.product.imageUrl }} style={styles.image} />
        ) : (
          <Ionicons name="cube-outline" size={32} color="#64748b" />
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.product.price)}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.product.id, -1)}>
          <Ionicons name="remove" size={20} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.product.id, 1)}>
          <Ionicons name="add" size={20} color="#f8fafc" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart ({cartCount})</Text>
        <View style={{ width: 28 }} />
      </View>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#334155" />
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => router.back()}>
            <Text style={styles.continueBtnText}>Continue Browsing</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.checkoutBtn, loading && styles.checkoutBtnDisabled]} 
              onPress={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text style={styles.checkoutBtnText}>Checkout {formatPrice(total)}</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1e293b',
  },
  closeBtn: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#334155',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#94a3b8',
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  continueBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#1e293b',
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 16,
  },
  summaryValue: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginBottom: 24,
  },
  totalLabel: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
  },
  totalValue: {
    color: '#3b82f6',
    fontSize: 24,
    fontWeight: '700',
  },
  checkoutBtn: {
    backgroundColor: '#10b981',
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBtnDisabled: {
    opacity: 0.7,
  },
  checkoutBtnText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  }
});

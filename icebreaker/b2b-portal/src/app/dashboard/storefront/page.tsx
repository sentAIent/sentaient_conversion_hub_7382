'use client';
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_STOREFRONT = gql`
  query GetStorefront {
    me {
      id
      storefront {
        id
        name
        description
        products {
          id
          name
          price
          imageUrl
        }
      }
    }
  }
`;

const CREATE_STOREFRONT = gql`
  mutation CreateStorefront($name: String!, $description: String) {
    createStorefront(name: $name, description: $description) {
      id
      name
      description
      products {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($storefrontId: ID!, $name: String!, $price: Int!, $imageUrl: String) {
    addProduct(storefrontId: $storefrontId, name: $name, price: $price, imageUrl: $imageUrl) {
      id
      name
      price
      imageUrl
    }
  }
`;

export default function StorefrontPage() {
  const { data, loading, error, refetch } = useQuery<any>(GET_STOREFRONT);
  
  const [createStorefront] = useMutation(CREATE_STOREFRONT, {
    onCompleted: () => refetch()
  });
  
  const [addProduct] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      refetch();
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', imageUrl: '' });
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });
  
  const [storefrontForm, setStorefrontForm] = useState({ name: '', description: '' });

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  const me = data?.me;
  const storefront = me?.storefront;

  if (!storefront) {
    return (
      <div className="p-8">
        <div className="max-w-lg mx-auto mt-20 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-4">Create Your Storefront</h1>
          <p className="text-white/60 mb-8">You need to set up a storefront before you can add products.</p>
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            await createStorefront({ variables: storefrontForm });
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Storefront Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc]"
                value={storefrontForm.name}
                onChange={(e) => setStorefrontForm({ ...storefrontForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Description</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc]"
                value={storefrontForm.description}
                onChange={(e) => setStorefrontForm({ ...storefrontForm, description: e.target.value })}
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity"
            >
              Create Storefront
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{storefront.name || 'Physical Storefront'}</h1>
          <p className="text-white/60 mt-1">{storefront.description || 'Manage physical products and ship to users directly via Stripe.'}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storefront.products?.length === 0 ? (
          <div className="col-span-full text-center py-12 text-white/40">
            No products added yet. Click "+ Add Product" to get started.
          </div>
        ) : null}
        
        {storefront.products?.map((product: any) => (
          <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-48 bg-zinc-800 relative flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="text-white/40">[No Image]</div>
              )}
              <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-bold z-10">
                ${(product.price / 100).toFixed(2)}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-sm text-white/40">ID: {product.id.slice(0, 8)}</span>
                <button className="text-sm text-[#3b82f6] hover:text-white transition-colors">
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              await addProduct({ 
                variables: {
                  storefrontId: storefront.id,
                  name: newProduct.name,
                  price: Math.round(parseFloat(newProduct.price) * 100),
                  imageUrl: newProduct.imageUrl || null
                }
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Product Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc]"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Price (USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0.01"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc]"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Image URL (optional)</label>
                <input 
                  type="url" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00ffcc]"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

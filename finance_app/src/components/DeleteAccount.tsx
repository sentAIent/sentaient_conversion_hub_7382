"use client";

import { useState } from "react";

export default function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to completely delete your account? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (res.ok) {
        alert("Your account has been deleted. You will now be logged out.");
        window.location.href = "/login";
      } else {
        alert("Failed to delete account. Please try again or contact support.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 border border-red-500 rounded-lg bg-red-50/10">
      <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
      <p className="text-sm text-gray-400 mb-4">
        Permanently delete your account and all associated data. This action is irreversible.
      </p>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
}

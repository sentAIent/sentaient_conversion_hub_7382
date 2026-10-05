#!/bin/bash
if [ -f "firestore.rules" ]; then
    if grep -q "allow read, write: if false;" firestore.rules; then
        echo "Secure rule found in firestore.rules."
        exit 0
    else
        echo "firestore.rules might not be fully secure. Verify manually."
        exit 1
    fi
else
    echo "firestore.rules not found."
    exit 1
fi

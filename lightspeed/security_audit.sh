#!/bin/bash

URLS=(
  "https://sentaient.com"
  "https://cloveh2o.com"
  "https://sentaient.com/interstellar-game"
  "https://sentaient.com/legaleagle/"
  "https://sentaient.com/mindwave.html"
  "https://sentaient.com/contangoquant"
  "https://sentaient.com/fantasyquant"
  "https://sentaient.com/icebreaker"
  "https://sentaient.com/icelogin"
  "https://sentaient.com/icebusiness"
  "https://sentaient.com/iceadmin"
  "https://sentaient.com/autopilot"
  "https://sentaient.com/bottomline"
)

HEADERS_TO_CHECK=(
  "Strict-Transport-Security"
  "X-Frame-Options"
  "X-Content-Type-Options"
  "Content-Security-Policy"
  "Referrer-Policy"
)

echo "============================================="
echo "   Sentaient Security Header Audit Tool      "
echo "============================================="
echo ""

for url in "${URLS[@]}"; do
  echo "Checking: $url"
  
  # Fetch headers silently
  HEADERS=$(curl -sI "$url")
  
  if [ -z "$HEADERS" ]; then
    echo "  [ERROR] Could not fetch headers for $url (Might be offline or redirecting without headers)"
    echo ""
    continue
  fi

  for header in "${HEADERS_TO_CHECK[@]}"; do
    # Use grep to case-insensitively match the header in the response
    if echo "$HEADERS" | grep -i "^${header}:" > /dev/null; then
      echo "  ✅ ${header} is present"
    else
      echo "  ❌ ${header} is MISSING"
    fi
  done
  
  echo ""
done

echo "Audit complete!"

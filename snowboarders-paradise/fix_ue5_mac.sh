#!/bin/bash
echo "Fixing Epic Games permissions and quarantine flags..."
killall "Epic Games Launcher" 2>/dev/null
sudo xattr -cr "/Users/Shared/Epic Games" 2>/dev/null
sudo chown -R $USER "/Users/Shared/Epic Games" 2>/dev/null
chmod -R u+rwX "/Users/Shared/Epic Games" 2>/dev/null
echo "Done! Please try launching from Epic Games Launcher again."

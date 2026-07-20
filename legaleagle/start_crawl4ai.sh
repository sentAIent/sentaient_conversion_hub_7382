#!/bin/bash
echo "Starting Crawl4AI Docker Container..."
echo "This requires Docker to be installed and running."

docker pull unclecode/crawl4ai:latest
docker rm -f crawl4ai 2>/dev/null
docker run -d -p 11235:11235 --name crawl4ai --shm-size=1g unclecode/crawl4ai:latest

echo "Crawl4AI is now running in the background on port 11235."
echo "You can view logs with: docker logs -f crawl4ai"
echo "To stop: docker rm -f crawl4ai"

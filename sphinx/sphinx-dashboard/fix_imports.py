with open("src/components/SphinxMap.tsx", "r") as f:
    content = f.read()

content = content.replace("import GeocodingSearch from './GeocodingSearch';", "import { GeocodingSearch } from './GeocodingSearch';")
content = content.replace("import OfflineDownloaderModal from './OfflineDownloaderModal';", "import { OfflineDownloaderModal } from './OfflineDownloaderModal';")

with open("src/components/SphinxMap.tsx", "w") as f:
    f.write(content)

  async fetchAllOverpass(bboxString = null) {
    let searchBbox = this.bbox;
    if (bboxString) {
      const [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',');
      searchBbox = `${sw_lat},${sw_lon},${ne_lat},${ne_lon}`;
    }

    const now = Date.now();
    if (this.lastOverpassFetch && (now - this.lastOverpassFetch < 15000) && this.cachedOverpassData) {
      console.log('[Sphinx Watchtower] Serving combined Overpass data from 15s cache');
      return this.cachedOverpassData;
    }

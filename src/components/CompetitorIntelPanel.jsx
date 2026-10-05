import React, { useState, useEffect } from 'react';
import { scrapeCompetitor } from '../services/crawleeClient';
import { addCompetitorToSearch, searchCompetitors } from '../services/oramaSearch';
import IntelDataGrid from './IntelDataGrid';

const CompetitorIntelPanel = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for Orama Search and AG Grid
  const [allCompetitors, setAllCompetitors] = useState([]);
  const [displayedCompetitors, setDisplayedCompetitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Crawl
  const handleCrawl = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await scrapeCompetitor(url);
      if (response.success) {
        // Insert into Orama for Edge Search
        const newRecord = await addCompetitorToSearch(response.data);
        
        // Update Grid state
        const updatedList = [newRecord, ...allCompetitors];
        setAllCompetitors(updatedList);
        setDisplayedCompetitors(updatedList);
        setUrl(''); // Reset input
      } else {
        setError(response.error || 'Failed to crawl');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Orama Search Filtering
  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim() === '') {
        setDisplayedCompetitors(allCompetitors);
        return;
      }
      const results = await searchCompetitors(searchTerm);
      
      // Orama returns raw hits in results.hits
      const hitDocs = results.hits.map(hit => hit.document);
      setDisplayedCompetitors(hitDocs);
    };
    
    performSearch();
  }, [searchTerm, allCompetitors]);

  return (
    <div className="p-6 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Competitor Intel Engine</h2>
          <p className="text-sm text-slate-400 mt-1">
            Powered by Crawlee, Orama Edge Search, and AG Grid.
          </p>
        </div>
        
        {/* Orama Edge Search Bar */}
        <div className="w-1/3">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search competitor intel (e.g. 'pricing')..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>
      
      {/* Crawlee Scrape Form */}
      <form onSubmit={handleCrawl} className="flex gap-4 mb-8">
        <input 
          type="url" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://competitor.com"
          required
          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Crawling...' : 'Extract Intel'}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* AG Grid Data Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">
          {displayedCompetitors.length} Competitors Tracked
        </h3>
        <IntelDataGrid rowData={displayedCompetitors} />
      </div>
    </div>
  );
};

export default CompetitorIntelPanel;

import React, { useState } from 'react';
import { runScrapingJob, getScrapingResult } from '../services/maxunClient';

export default function MaxunConnector() {
  const [robotId, setRobotId] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleScrape = async (e) => {
    e.preventDefault();
    setStatus('running');
    setError('');
    setResults(null);

    try {
      const job = await runScrapingJob(robotId, { url: targetUrl });
      
      let isComplete = false;
      let finalResult = null;
      let attempts = 0;

      while (!isComplete && attempts < 10) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 3000));
        const pollData = await getScrapingResult(job.runId);
        
        if (pollData.status === 'completed') {
          isComplete = true;
          finalResult = pollData.data;
        } else if (pollData.status === 'failed') {
          throw new Error('SCRAPING_JOB_FAILED_ON_SERVER');
        }
      }

      if (isComplete) {
        setResults(finalResult);
        setStatus('success');
      } else {
        throw new Error('EXTRACTION_TIMEOUT_REACHED');
      }
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'FATAL_EXTRACTION_ERROR');
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#e5e5e5] border-4 border-black p-8 text-black max-w-2xl font-mono uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter leading-none mb-1">MAXUN_EXTRACTOR</h2>
          <p className="text-xs font-bold text-gray-500">SYS.PROCESS.ROBOT_TRIGGER</p>
        </div>
        <div className="w-12 h-12 bg-black flex items-center justify-center">
          <div className={`w-4 h-4 ${status === 'running' ? 'bg-yellow-400 animate-ping' : 'bg-green-500'}`}></div>
        </div>
      </div>

      <form onSubmit={handleScrape} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-black tracking-widest">ROBOT_ID // IDENTIFIER</label>
          <input
            type="text"
            required
            className="w-full bg-white border-4 border-black px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-200 transition-colors uppercase placeholder:text-gray-400"
            placeholder="IDX-88X-001..."
            value={robotId}
            onChange={(e) => setRobotId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-black tracking-widest">TARGET_URL // VECTOR</label>
          <input
            type="url"
            required
            className="w-full bg-white border-4 border-black px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-200 transition-colors lowercase placeholder:text-gray-400"
            placeholder="https://target-domain.com/data"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'running'}
          className="w-full bg-black text-white hover:bg-yellow-400 hover:text-black font-black text-xl py-4 border-4 border-black transition-colors disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white"
        >
          {status === 'running' ? 'PROCESSING...' : 'INITIALIZE_EXTRACTION'}
        </button>
      </form>

      {error && (
        <div className="mt-8 border-l-8 border-red-600 bg-red-100 p-4 font-bold text-red-600">
          [ERR] {error}
        </div>
      )}

      {results && (
        <div className="mt-8 border-4 border-black bg-white">
          <div className="bg-black text-white px-4 py-2 font-black text-sm">OUTPUT_BUFFER</div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-xs font-bold leading-relaxed">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

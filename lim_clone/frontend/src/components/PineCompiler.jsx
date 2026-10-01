import React, { useState } from 'react';

export const compilePineScript = (scriptText, priceData) => {
  if (!priceData || priceData.length === 0) return { error: 'No price data loaded.', plots: [] };

  try {
    const lines = scriptText.split('\n');
    const variables = {};
    const plots = [];

    const getSeries = (expr) => {
      const cleanExpr = expr.trim();
      if (cleanExpr === 'close') return priceData.map(d => d.close);
      if (cleanExpr === 'open') return priceData.map(d => d.open);
      if (cleanExpr === 'high') return priceData.map(d => d.high);
      if (cleanExpr === 'low') return priceData.map(d => d.low);
      
      if (variables[cleanExpr] !== undefined) return variables[cleanExpr];

      if (!isNaN(cleanExpr)) {
        return priceData.map(() => parseFloat(cleanExpr));
      }
      
      throw new Error(`Unknown symbol or series expression: ${cleanExpr}`);
    };

    const calculateSMA = (series, length) => {
      const result = [];
      for (let i = 0; i < series.length; i++) {
        if (i < length - 1) {
          result.push(series[i]);
        } else {
          let sum = 0;
          for (let j = 0; j < length; j++) {
            sum += series[i - j];
          }
          result.push(sum / length);
        }
      }
      return result;
    };

    const calculateEMA = (series, length) => {
      const result = [];
      const k = 2 / (length + 1);
      let emaPrev = series[0];
      for (let i = 0; i < series.length; i++) {
        emaPrev = series[i] * k + emaPrev * (1 - k);
        result.push(emaPrev);
      }
      return result;
    };

    for (let line of lines) {
      let cleanLine = line.trim();
      if (!cleanLine || cleanLine.startsWith('//') || cleanLine.startsWith('@')) continue;

      if (cleanLine.startsWith('indicator(')) continue;

      if (cleanLine.includes('=')) {
        const parts = cleanLine.split('=');
        const varName = parts[0].trim();
        const expr = parts[1].trim();

        const funcMatch = expr.match(/^(\w+)\(([^)]+)\)$/);
        if (funcMatch) {
          const funcName = funcMatch[1];
          const args = funcMatch[2].split(',').map(a => a.trim());
          const sourceSeries = getSeries(args[0]);
          const length = parseInt(args[1]);

          if (funcName === 'sma') {
            variables[varName] = calculateSMA(sourceSeries, length);
          } else if (funcName === 'ema') {
            variables[varName] = calculateEMA(sourceSeries, length);
          } else {
            throw new Error(`Unsupported function: ${funcName}`);
          }
        } else {
          const opMatch = expr.match(/^(\w+|\d+(?:\.\d+)?)\s*([+\-*/])\s*(\w+|\d+(?:\.\d+)?)$/);
          if (opMatch) {
            const leftSeries = getSeries(opMatch[1]);
            const op = opMatch[2];
            const rightSeries = getSeries(opMatch[3]);

            const result = [];
            for (let i = 0; i < priceData.length; i++) {
              if (op === '+') result.push(leftSeries[i] + rightSeries[i]);
              else if (op === '-') result.push(leftSeries[i] - rightSeries[i]);
              else if (op === '*') result.push(leftSeries[i] * rightSeries[i]);
              else if (op === '/') result.push(leftSeries[i] / rightSeries[i]);
            }
            variables[varName] = result;
          } else {
            variables[varName] = getSeries(expr);
          }
        }
      }

      if (cleanLine.startsWith('plot(')) {
        const plotContent = cleanLine.substring(5, cleanLine.length - 1);
        const args = plotContent.split(',').map(a => a.trim());
        const seriesName = args[0];
        const seriesValues = getSeries(seriesName);

        let color = '#38bdf8';
        let title = 'Plot';

        for (let i = 1; i < args.length; i++) {
          const kv = args[i].split('=');
          if (kv.length === 2) {
            const key = kv[0].trim();
            const val = kv[1].trim().replace(/['"]/g, '');
            if (key === 'color') color = val;
            if (key === 'title') title = val;
          }
        }

        const dataPoints = priceData.map((d, index) => ({
          time: d.time,
          value: seriesValues[index]
        }));

        plots.push({ title, color, dataPoints });
      }
    }

    return { plots, error: null };
  } catch (err) {
    return { error: err.message, plots: [] };
  }
};

const PineCompiler = ({ priceData, onCompile }) => {
  const [script, setScript] = useState(`//@version=5
indicator("My Custom Indicator", overlay=true)
src = close
offset_val = src * 1.02
sma_val = sma(close, 14)

plot(offset_val, color="#e9d5ff", title="2% Offset")
plot(sma_val, color="#fb7185", title="14 SMA")`);

  const [compileError, setCompileError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRun = () => {
    setCompileError(null);
    setSuccess(false);

    if (!priceData || priceData.length === 0) {
      setCompileError('No price data loaded on chart.');
      return;
    }

    const res = compilePineScript(script, priceData);
    if (res.error) {
      setCompileError(res.error);
    } else {
      setSuccess(true);
      onCompile(res.plots);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="panel" style={{ padding: '20px', background: 'rgba(22, 26, 37, 0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3>🌲 Pine Script Editor & Compiler</h3>
        <button 
          onClick={handleRun}
          style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 16px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          ⚡ Compile & Run
        </button>
      </div>

      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        style={{
          width: '100%',
          height: '140px',
          background: '#090d16',
          color: '#34d399',
          fontFamily: 'Courier, monospace',
          fontSize: '0.8rem',
          border: '1px solid #334155',
          borderRadius: '6px',
          padding: '10px',
          boxSizing: 'border-box',
          resize: 'none',
          outline: 'none',
          marginBottom: '8px'
        }}
      />

      {compileError && (
        <div style={{ color: '#f87171', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          ⚠️ Compile Error: {compileError}
        </div>
      )}

      {success && (
        <div style={{ color: '#34d399', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          ✓ Compiled successfully! Indicator overlay updated on chart.
        </div>
      )}
    </div>
  );
};

export default PineCompiler;

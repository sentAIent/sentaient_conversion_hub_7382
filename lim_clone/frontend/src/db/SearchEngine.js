import { create, insert, search } from '@orama/orama';

let oramaInstance = null;

export const initSearchEngine = async () => {
    oramaInstance = await create({
        schema: {
            id: 'string',
            title: 'string',
            author: 'string',
            roi: 'number',
            description: 'string',
            tags: 'string[]',
        }
    });

    // Mock initial indexing of the P2P Marketplace
    const initialStrategies = [
        { id: '1', title: 'High Alpha Crypto Momentum', author: 'QuantGuru', roi: 45.2, description: 'Follows volatile crypto assets.', tags: ['crypto', 'momentum'] },
        { id: '2', title: 'S&P500 Mean Reversion', author: 'TradeBotX', roi: 12.4, description: 'Safe SPY trading.', tags: ['equities', 'safe'] },
        { id: '3', title: 'Volatility Arbitrage', author: 'VegaMaster', roi: 33.1, description: 'Options based volatility surface arb.', tags: ['options', 'volatility'] }
    ];

    for (const strategy of initialStrategies) {
        await insert(oramaInstance, strategy);
    }
    
    console.log("Orama Search Engine Initialized with", initialStrategies.length, "strategies");
};

export const searchStrategies = async (term) => {
    if (!oramaInstance) return [];
    const results = await search(oramaInstance, {
        term: term,
        tolerance: 1 // Allow 1 typo
    });
    return results.hits.map(hit => hit.document);
};

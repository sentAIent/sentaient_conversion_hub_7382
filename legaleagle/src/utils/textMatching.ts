/**
 * Text Matching Utilities
 * 
 * Provides fuzzy text matching for locating contract clauses
 * in documents, even when minor formatting differences exist.
 */

interface MatchResult {
    start: number;
    end: number;
}

interface Token {
    word: string;
    start: number;
    end: number;
}

/**
 * Tokenize text into words with position information
 */
const tokenize = (text: string): Token[] => {
    const tokens: Token[] = [];
    const regex = /[a-z0-9]+/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
        tokens.push({
            word: match[0].toLowerCase(),
            start: match.index,
            end: match.index + match[0].length
        });
    }

    return tokens;
};

/**
 * Find fuzzy match of search text within document
 * 
 * Uses token-based matching with multi-anchor fallback
 * for reliable text location even with formatting differences.
 */
export const findFuzzyMatch = (doc: string, search: string): MatchResult | null => {
    if (!doc || !search || search.length < 3) return null;

    const docTokens = tokenize(doc);
    const searchTokens = tokenize(search);

    if (searchTokens.length === 0) return null;

    /**
     * Find a sequence of tokens in the document
     */
    const findSequence = (sequenceTokens: Token[], searchFromIndex = 0): number => {
        if (sequenceTokens.length === 0) return -1;
        const firstWord = sequenceTokens[0].word;

        for (let i = searchFromIndex; i < docTokens.length; i++) {
            if (docTokens[i].word === firstWord) {
                let match = true;
                for (let j = 1; j < sequenceTokens.length; j++) {
                    if (i + j >= docTokens.length || docTokens[i + j].word !== sequenceTokens[j].word) {
                        match = false;
                        break;
                    }
                }
                if (match) return i;
            }
        }
        return -1;
    };

    // Try full match first
    const fullMatchIndex = findSequence(searchTokens);
    if (fullMatchIndex !== -1) {
        const start = docTokens[fullMatchIndex].start;
        const end = docTokens[fullMatchIndex + searchTokens.length - 1].end;
        return { start, end };
    }

    // For longer texts, try anchor-based matching
    if (searchTokens.length > 6) {
        const startAnchor = searchTokens.slice(0, 3);
        const endAnchor = searchTokens.slice(searchTokens.length - 3);

        const startIndex = findSequence(startAnchor);
        if (startIndex !== -1) {
            const searchLimit = Math.min(docTokens.length, startIndex + searchTokens.length * 2);
            let endIndex = -1;
            const firstEndWord = endAnchor[0].word;

            for (let i = startIndex + 1; i < searchLimit; i++) {
                if (docTokens[i].word === firstEndWord) {
                    let match = true;
                    for (let j = 1; j < endAnchor.length; j++) {
                        if (i + j >= docTokens.length || docTokens[i + j].word !== endAnchor[j].word) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        endIndex = i;
                        break;
                    }
                }
            }

            if (endIndex !== -1) {
                const startPos = docTokens[startIndex].start;
                const endPos = docTokens[endIndex + endAnchor.length - 1].end;
                return { start: startPos, end: endPos };
            }
        }
    }

    // Fallback: prefix matching
    const prefixLen = Math.min(5, searchTokens.length);
    const prefixAnchor = searchTokens.slice(0, prefixLen);
    const prefixIndex = findSequence(prefixAnchor);

    if (prefixIndex !== -1) {
        const startPos = docTokens[prefixIndex].start;
        const estimatedEnd = Math.min(doc.length, startPos + search.length);
        return { start: startPos, end: estimatedEnd };
    }

    return null;
};

/**
 * Verify that text exists in document
 */
export const verifyTextExistence = (doc: string, searchText: string): boolean => {
    if (!searchText) return true;
    const match = findFuzzyMatch(doc, searchText);
    return !!match;
};

/**
 * Highlight text in document by wrapping with markers
 */
export const highlightText = (
    doc: string,
    searchText: string,
    startMarker: string,
    endMarker: string
): string => {
    const match = findFuzzyMatch(doc, searchText);
    if (!match) return doc;

    return (
        doc.slice(0, match.start) +
        startMarker +
        doc.slice(match.start, match.end) +
        endMarker +
        doc.slice(match.end)
    );
};

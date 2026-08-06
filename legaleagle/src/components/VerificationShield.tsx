import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface VerificationShieldProps {
  confidenceScore?: number;
  hallucinations?: string[];
  verificationNotes?: string;
  tierThreshold?: number;
}

export const VerificationShield: React.FC<VerificationShieldProps> = ({ 
  confidenceScore, 
  hallucinations = [], 
  verificationNotes,
  tierThreshold = 70
}) => {
  const [expanded, setExpanded] = useState(false);

  if (confidenceScore === undefined) return null;

  const isPassing = confidenceScore >= tierThreshold;
  const isExcellent = confidenceScore >= 95;
  const hasHallucinations = hallucinations && hallucinations.length > 0;

  let colorClass = 'bg-blue-50 border-blue-200 text-blue-800';
  let Icon = Shield;
  let statusText = 'Verified';

  if (hasHallucinations || !isPassing) {
    colorClass = 'bg-red-50 border-red-200 text-red-800';
    Icon = ShieldAlert;
    statusText = 'Verification Warnings';
  } else if (isExcellent) {
    colorClass = 'bg-green-50 border-green-200 text-green-800';
    Icon = ShieldCheck;
    statusText = 'Highly Verified';
  } else if (isPassing) {
    colorClass = 'bg-yellow-50 border-yellow-200 text-yellow-800';
    Icon = ShieldCheck;
    statusText = 'Verified with Notes';
  }

  return (
    <div className={`rounded-xl border ${colorClass} overflow-hidden mb-6 transition-all duration-300`}>
      <div 
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span className="font-semibold">{statusText}</span>
          <span className="text-sm opacity-80 border-l border-current pl-3 ml-1">
            Confidence Score: {confidenceScore}/100
          </span>
        </div>
        <button className="p-1 rounded hover:bg-black/10 transition-colors">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-black/10 text-sm space-y-4">
          {hasHallucinations && (
            <div>
              <h4 className="font-bold mb-1">Detected Hallucinations / False Info:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {hallucinations.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          
          {verificationNotes && (
            <div>
              <h4 className="font-bold mb-1">Evaluator Notes:</h4>
              <p className="whitespace-pre-wrap opacity-90">{verificationNotes}</p>
            </div>
          )}

          {!hasHallucinations && !verificationNotes && (
            <p className="opacity-90">No additional verification notes available.</p>
          )}
        </div>
      )}
    </div>
  );
};

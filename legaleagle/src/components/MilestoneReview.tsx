import { useState } from 'react';
import { AlertCircle, Check, MessageSquare } from 'lucide-react';

interface MilestoneReviewProps {
  milestoneMessage: string;
  onApprove: (feedback?: string) => void;
}

export const MilestoneReview: React.FC<MilestoneReviewProps> = ({ milestoneMessage, onApprove }) => {
  const [feedback, setFeedback] = useState('');
  const [isProvidingFeedback, setIsProvidingFeedback] = useState(false);

  const handleApprove = () => {
    onApprove(isProvidingFeedback ? feedback : undefined);
  };

  return (
    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm my-6 animate-in fade-in zoom-in duration-300">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full shrink-0 mt-1">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">Agent Paused: User Review Requested</h3>
          <p className="text-indigo-800 mb-4 bg-white/50 p-3 rounded-lg border border-indigo-100 whitespace-pre-wrap font-medium">
            {milestoneMessage}
          </p>
          
          {isProvidingFeedback ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-indigo-800 mb-1">Provide Feedback/Redirection</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                rows={3}
                placeholder="e.g. Focus only on the non-compete clauses..."
              />
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" />
              {isProvidingFeedback ? 'Submit Feedback & Proceed' : 'Approve & Proceed'}
            </button>
            
            {!isProvidingFeedback && (
              <button
                onClick={() => setIsProvidingFeedback(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Add Redirection Feedback
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

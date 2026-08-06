import { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackWidgetProps {
    generationId: string;
    onFeedbackSubmitted?: () => void;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ generationId, onFeedbackSubmitted }) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!rating) return;
        
        setIsSubmitting(true);
        try {
            const res = await fetch('http://localhost:11236/api/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'super-secret-local-key'
                },
                body: JSON.stringify({
                    generationId,
                    rating,
                    comments
                })
            });
            
            if (res.ok) {
                setIsSubmitted(true);
                if (onFeedbackSubmitted) onFeedbackSubmitted();
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Network error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-4 flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-gray-300 font-medium">Thank you for your feedback!</span>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-4 space-y-4">
            <div>
                <h4 className="text-sm font-semibold text-white mb-2">Rate this response</h4>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className={`p-1 rounded-full transition-colors ${
                                star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-500'
                            }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            type="button"
                        >
                            <Star className={`w-6 h-6 ${star <= (hover || rating) ? 'fill-current' : ''}`} />
                        </button>
                    ))}
                </div>
            </div>

            {rating > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                        <label htmlFor="comments" className="block text-xs text-gray-400 mb-1">
                            Additional comments (optional)
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                            <textarea
                                id="comments"
                                rows={2}
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                placeholder="What did you like or dislike?"
                            />
                        </div>
                    </div>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        ) : (
                            <Send className="w-4 h-4 mr-2" />
                        )}
                        Submit Feedback
                    </button>
                </div>
            )}
        </div>
    );
};

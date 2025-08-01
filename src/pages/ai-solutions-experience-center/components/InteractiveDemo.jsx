import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveDemo = ({ type, isActive }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isActive && messages?.length === 0) {
      // Initialize with welcome message
      const welcomeMessage = getWelcomeMessage(type);
      setMessages([{
        id: 1,
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [isActive, type, messages?.length]);

  const getWelcomeMessage = (demoType) => {
    const welcomeMessages = {
      chatbot: "Hello! I'm your AI customer service assistant. I can help you with product information, order status, billing questions, and technical support. How can I assist you today?",
      agent: "Welcome to our autonomous booking system. I can help you schedule appointments, check availability, manage your calendar, and send automated reminders. What would you like to do?",
      automation: "This is our workflow automation demo. I can show you how we streamline processes like data entry, report generation, email campaigns, and task management. Which process interests you?"
    };
    return welcomeMessages?.[demoType] || "Hello! How can I help you today?";
  };

  const getBotResponse = (userMessage, demoType) => {
    const responses = {
      chatbot: {
        'product': "I'd be happy to help with product information! We offer three main AI solutions:\n\n• Autonomous Agents - Handle complex tasks independently\n• Generative Chatbots - Provide intelligent customer support\n• Custom Automation - Streamline your workflows\n\nWhich solution interests you most?",
        'price': "Our pricing is customized based on your specific needs and scale. Here's a general overview:\n\n• Starter Package: $2,500/month\n• Professional: $7,500/month\n• Enterprise: Custom pricing\n\nWould you like me to connect you with our sales team for a detailed quote?",
        'support': "Our support team is available 24/7 through multiple channels:\n\n• Live chat (response time: <2 minutes)\n• Email support (response time: <4 hours)\n• Phone support (business hours)\n• Dedicated account manager (Enterprise clients)\n\nHow can I help you get started?",
        'default': "I understand you're interested in learning more. I can provide information about our AI solutions, pricing, implementation process, or connect you with a specialist. What specific area would you like to explore?"
      },
      agent: {
        'schedule': "I can help you schedule an appointment! I have availability for:\n\n• Tomorrow at 2:00 PM - 30 min consultation\n• Friday at 10:00 AM - 60 min strategy session\n• Next Monday at 3:00 PM - 45 min demo\n\nWhich time works best for you?",
        'calendar': "Let me check your calendar... I see you have:\n\n• Today: 2 meetings scheduled\n• Tomorrow: 1 consultation at 2 PM\n• This week: 5 total appointments\n\nWould you like me to reschedule anything or add a new appointment?",
        'reminder': "I've set up automated reminders for your upcoming appointments:\n\n• Email reminder: 24 hours before\n• SMS reminder: 2 hours before\n• Calendar notification: 15 minutes before\n\nYour preferences have been saved. Is there anything else you'd like me to configure?",
        'default': "I can help you with scheduling, calendar management, automated reminders, and appointment coordination. What would you like me to assist you with?"
      },
      automation: {
        'workflow': "Here's how our automation transforms your workflow:\n\n• Data Entry: 95% reduction in manual input\n• Report Generation: Automated daily/weekly reports\n• Email Campaigns: Smart segmentation and timing\n• Task Management: Intelligent prioritization\n\nWhich process would you like to see automated first?",
        'integration': "Our automation integrates seamlessly with:\n\n• CRM Systems (Salesforce, HubSpot)\n• Email Platforms (Mailchimp, Constant Contact)\n• Project Management (Asana, Trello)\n• Accounting Software (QuickBooks, Xero)\n\nWhat systems are you currently using?",
        'roi': "Based on similar implementations, clients typically see:\n\n• 40-60% time savings on routine tasks\n• 25-35% increase in productivity\n• ROI achieved within 3-6 months\n• 90%+ accuracy improvement\n\nWould you like a customized ROI calculation for your business?",
        'default': "I can demonstrate workflow automation, system integrations, ROI calculations, and implementation timelines. What aspect interests you most?"
      }
    };

    const typeResponses = responses?.[demoType] || responses?.chatbot;
    const lowerMessage = userMessage?.toLowerCase();
    
    for (const [key, response] of Object.entries(typeResponses)) {
      if (key !== 'default' && lowerMessage?.includes(key)) {
        return response;
      }
    }
    
    return typeResponses?.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(inputValue, type),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  if (!isActive) {
    return (
      <div className="bg-muted rounded-lg p-8 text-center">
        <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Select a solution above to start the interactive demo</p>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="Bot" size={16} />
        </div>
        <div>
          <h4 className="font-semibold">AI Assistant Demo</h4>
          <p className="text-xs opacity-80">Try asking about our solutions, pricing, or support</p>
        </div>
        <div className="ml-auto flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs">Online</span>
        </div>
      </div>
      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message?.content}</p>
              <p className={`text-xs mt-1 ${
                message?.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={!inputValue?.trim()}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Try asking: "Tell me about pricing", "How does scheduling work?", or "Show me automation benefits"
        </p>
      </div>
    </div>
  );
};

export default InteractiveDemo;
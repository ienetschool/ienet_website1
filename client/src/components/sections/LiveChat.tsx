import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LiveChatProps {
  hideToggleButton?: boolean;
}

const predefinedResponses: Record<string, string> = {
  hello: "Hello! Welcome to IeNet - your trusted partner for comprehensive IT solutions. I'm here to help you explore our services and answer any questions. How can I assist you today?",
  
  // Service-specific responses
  website: "Our Website Design & Development services include:\n• Custom Website Development\n• Responsive Design\n• E-commerce Solutions\n• CMS Development\n• SEO Optimization\n• Performance Enhancement\n\nWe've delivered 500+ successful projects. Would you like to see our portfolio or get a custom quote?",
  
  mobile: "Our Mobile App Development expertise covers:\n• Native iOS & Android Apps\n• Cross-platform Solutions\n• UI/UX Design\n• App Store Optimization\n• Maintenance & Support\n• Integration Services\n\nWe can discuss your app idea and provide a detailed roadmap. What type of app are you planning?",
  
  cybersecurity: "Our Cybersecurity Solutions protect your digital assets:\n• Threat Assessment & Monitoring\n• Penetration Testing\n• Security Audits\n• Compliance Management\n• Incident Response\n• Employee Training\n\nCybersecurity is critical in today's digital landscape. Would you like a free security assessment?",
  
  cloud: "Our Cloud Infrastructure services include:\n• Cloud Migration\n• AWS/Azure/GCP Setup\n• DevOps Implementation\n• Scalability Solutions\n• Backup & Recovery\n• 24/7 Monitoring\n\nCloud adoption can reduce costs by 30-50%. Interested in learning how we can help your migration?",
  
  ai: "Our AI & Machine Learning solutions offer:\n• Custom AI Development\n• Data Analytics\n• Chatbot Development\n• Process Automation\n• Predictive Analytics\n• Computer Vision\n\nAI can revolutionize your business operations. What specific AI application interests you?",
  
  ecommerce: "Our E-commerce Solutions include:\n• Online Store Development\n• Payment Gateway Integration\n• Inventory Management\n• Multi-vendor Platforms\n• Mobile Commerce\n• Analytics & Reporting\n\nWe've helped businesses increase online sales by 200%+. Ready to start your e-commerce journey?",
  
  // General responses
  services: "IeNet offers comprehensive IT services across 6 main categories:\n\n🌐 Website Design & Development\n📱 Mobile App Development\n🔒 Cybersecurity Solutions\n☁️ Cloud Infrastructure\n🤖 AI & Machine Learning\n🛒 E-commerce Solutions\n\nEach category includes 10+ specialized sub-services. Which area interests you most?",
  
  pricing: "Our pricing is customized based on:\n• Project complexity & scope\n• Technology requirements\n• Timeline & resources\n• Ongoing support needs\n\n💡 We offer:\n• Free consultation & quote\n• Flexible payment plans\n• Competitive rates\n• No hidden costs\n\nWould you like a personalized quote? I can connect you with our specialists.",
  
  portfolio: "Our impressive portfolio includes:\n• 500+ Websites Delivered\n• 200+ Mobile Apps Launched\n• 150+ Security Audits Completed\n• 100+ Cloud Migrations\n• 50+ AI Solutions Deployed\n\nWe've worked with startups to Fortune 500 companies. Would you like to see specific case studies in your industry?",
  
  timeline: "Typical project timelines:\n• Simple Website: 2-4 weeks\n• Complex Web App: 8-16 weeks\n• Mobile App: 12-20 weeks\n• E-commerce Platform: 6-12 weeks\n• AI Solution: 16-24 weeks\n\nWe provide detailed project roadmaps with milestones. What's your target launch date?",
  
  support: "Our comprehensive support includes:\n• 24/7 Technical Support\n• Response time: <2 hours\n• Dedicated Account Manager\n• Regular Health Checks\n• Performance Monitoring\n• Security Updates\n\nSupport packages start from $299/month. What level of support do you need?",
  
  process: "Our proven development process:\n1️⃣ Discovery & Planning\n2️⃣ Design & Prototyping\n3️⃣ Development & Testing\n4️⃣ Deployment & Launch\n5️⃣ Support & Maintenance\n\nWe follow agile methodology with regular client updates. Would you like to start with a free consultation?",
  
  contact: "Get in touch with us:\n📧 info@ienet.online\n📞 WhatsApp: +59 2750 3901\n🌐 Website: ienet.online\n📍 Location: Available globally\n\n⏰ Business Hours:\n• Monday-Friday: 9 AM - 6 PM\n• Emergency Support: 24/7\n\nHow would you prefer to continue our conversation?",
  
  quote: "Ready for a custom quote? I'll need some details:\n• What type of project?\n• Your budget range?\n• Timeline requirements?\n• Specific features needed?\n\nOr I can connect you directly with our specialists for a detailed discussion. What works better for you?",
  
  default: "I'm here to help with any questions about IeNet's services! You can ask me about:\n• Our service offerings\n• Pricing & packages\n• Project timelines\n• Portfolio examples\n• Getting started\n\nOr type 'human' to connect with our team directly."
};

const quickReplies = [
  "Tell me about your services",
  "What are your pricing options?",
  "Show me your portfolio",
  "How long does development take?",
  "I need a custom quote",
  "Connect me with an agent"
];

export default function LiveChat({ hideToggleButton = false }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(hideToggleButton);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm the IeNet virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good')) {
      return predefinedResponses.hello;
    }
    
    // Service-specific queries
    else if (message.includes('website') || message.includes('web development') || message.includes('web design')) {
      return predefinedResponses.website;
    } else if (message.includes('mobile') || message.includes('app') || message.includes('ios') || message.includes('android')) {
      return predefinedResponses.mobile;
    } else if (message.includes('security') || message.includes('cyber') || message.includes('protection') || message.includes('hack')) {
      return predefinedResponses.cybersecurity;
    } else if (message.includes('cloud') || message.includes('aws') || message.includes('azure') || message.includes('server')) {
      return predefinedResponses.cloud;
    } else if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning') || message.includes('automation')) {
      return predefinedResponses.ai;
    } else if (message.includes('ecommerce') || message.includes('e-commerce') || message.includes('online store') || message.includes('shop')) {
      return predefinedResponses.ecommerce;
    }
    
    // General business queries
    else if (message.includes('service') || message.includes('what do you do') || message.includes('offerings')) {
      return predefinedResponses.services;
    } else if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('budget')) {
      return predefinedResponses.pricing;
    } else if (message.includes('portfolio') || message.includes('work') || message.includes('examples') || message.includes('case study')) {
      return predefinedResponses.portfolio;
    } else if (message.includes('time') || message.includes('timeline') || message.includes('how long') || message.includes('duration')) {
      return predefinedResponses.timeline;
    } else if (message.includes('quote') || message.includes('estimate') || message.includes('proposal')) {
      return predefinedResponses.quote;
    } else if (message.includes('process') || message.includes('methodology') || message.includes('how do you work')) {
      return predefinedResponses.process;
    }
    
    // Support and contact
    else if (message.includes('support') || message.includes('help') || message.includes('problem') || message.includes('issue')) {
      return predefinedResponses.support;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('phone') || message.includes('email')) {
      return predefinedResponses.contact;
    } else if (message.includes('agent') || message.includes('human') || message.includes('representative') || message.includes('speak')) {
      return "I'd be happy to connect you with one of our specialists! Please provide your:\n• Name\n• Email address\n• Phone number (optional)\n• Brief description of your needs\n\nOur team will reach out within 30 minutes during business hours (9 AM - 6 PM).";
    }
    
    // Specific inquiries
    else if (message.includes('technology') || message.includes('tech stack') || message.includes('programming')) {
      return "We work with cutting-edge technologies:\n• Frontend: React, Vue, Angular\n• Backend: Node.js, Python, PHP\n• Mobile: React Native, Flutter\n• Cloud: AWS, Azure, Google Cloud\n• Database: MySQL, PostgreSQL, MongoDB\n• AI/ML: TensorFlow, PyTorch\n\nWhat technology are you interested in?";
    } else if (message.includes('industry') || message.includes('sector') || message.includes('experience')) {
      return "We have extensive experience across industries:\n• Healthcare & Medical\n• Finance & Banking\n• E-commerce & Retail\n• Education & E-learning\n• Real Estate\n• Manufacturing\n• Startups to Enterprise\n\nWhat industry are you in?";
    }
    
    // Default response
    else {
      return predefinedResponses.default;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!hideToggleButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            data-testid="live-chat-toggle"
            className={`relative bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isOpen ? 'scale-0' : 'scale-100'
            }`}
          >
            <MessageCircle size={24} />
            {hasNewMessage && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          <Card className="h-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Chat Header */}
            <CardHeader className="bg-primary text-white p-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">IeNet Support</h3>
                  <p className="text-xs text-white/80">
                    {isTyping ? 'Typing...' : 'Online • Typically replies instantly'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          <div>
                            <div className={`px-4 py-2 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{message.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <Bot size={16} className="text-gray-600 dark:text-gray-300" />
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Replies (show only initially) */}
                {messages.length <= 1 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Popular questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.slice(0, 4).map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs px-3 py-1 h-auto rounded-full"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 border-gray-300 dark:border-gray-600 focus:border-primary"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-primary hover:bg-primary/90 text-white px-3"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Powered by IeNet AI Assistant
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
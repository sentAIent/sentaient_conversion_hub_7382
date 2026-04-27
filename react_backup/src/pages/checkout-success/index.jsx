import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    // Get session_id from URL if using Stripe Sessions
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);

        // You could verify the session with your backend here
        // and update order status, send confirmation email, etc.
        if (sessionId) {
            console.log('Payment successful! Session:', sessionId);
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Payment Successful | sentAIent Conversion Hub</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <Header />

            <section className="pt-32 pb-16 px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        {/* Success Animation */}
                        <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                            <Icon name="CheckCircle" size={48} className="text-success relative z-10" />
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Payment Successful! 🎉
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8">
                            Thank you for your purchase! We're excited to work with you on your AI transformation journey.
                        </p>

                        {/* Next Steps */}
                        <div className="bg-card border border-border rounded-xl p-8 mb-8 text-left">
                            <h2 className="text-xl font-bold text-foreground mb-4">What Happens Next?</h2>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Confirmation Email</h3>
                                        <p className="text-sm text-muted-foreground">
                                            You'll receive a confirmation email with your receipt and next steps within 5 minutes.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Kickoff Call Scheduling</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Our team will reach out within 24 hours to schedule your kickoff call and gather initial information.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Get Started</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We'll begin working on your AI solution immediately after our kickoff call.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Questions Box */}
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-center space-x-2 text-primary mb-2">
                                <Icon name="HelpCircle" size={20} />
                                <span className="font-semibold">Have Questions?</span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Email us anytime at <a href="mailto:support@sentaient.com" className="text-primary hover:underline">support@sentaient.com</a>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/free-ai-assessment-portal">
                                <Button
                                    variant="default"
                                    size="lg"
                                    iconName="ClipboardCheck"
                                    iconPosition="left"
                                >
                                    Take AI Assessment
                                </Button>
                            </Link>
                            <Link to="/ai-solutions-experience-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    iconName="Play"
                                    iconPosition="left"
                                >
                                    Explore Solutions
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center space-x-6 mt-12 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <Icon name="Shield" size={16} className="text-success" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="Lock" size={16} className="text-success" />
                                <span>256-bit SSL</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="CreditCard" size={16} className="text-success" />
                                <span>Powered by Stripe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutSuccess;

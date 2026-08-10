import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_PRODUCTS, CHECKOUT_SUCCESS_URL, CHECKOUT_CANCEL_URL } from '../../config/stripe';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Pricing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [billingCycle, setBillingCycle] = useState('one-time'); // 'one-time' or 'monthly'
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const plans = [
        {
            id: 'starter',
            name: 'AI Readiness Audit',
            subtitle: 'Perfect for exploring AI opportunities',
            price: 997,
            priceMonthly: null,
            popular: false,
            stripeProductKey: 'aiReadinessAudit',
            description: 'Comprehensive assessment of your business processes and AI implementation roadmap.',
            features: [
                { text: '2-hour deep-dive session', included: true },
                { text: 'Current process analysis', included: true },
                { text: 'AI opportunity identification', included: true },
                { text: 'Prioritized implementation roadmap', included: true },
                { text: 'ROI projections report', included: true },
                { text: 'Technology stack recommendations', included: true },
                { text: '30-day email support', included: true },
                { text: 'Implementation assistance', included: false },
                { text: 'Ongoing support', included: false },
            ],
            cta: 'Get Your Audit',
            ctaIcon: 'ClipboardCheck',
            deliveryTime: '1 week',
            guarantee: '100% satisfaction guarantee',
        },
        {
            id: 'growth',
            name: 'AI Implementation',
            subtitle: 'Most popular for growing businesses',
            price: 4997,
            priceHigh: 9997,
            priceMonthly: 1497,
            popular: true,
            stripeProductKey: 'aiImplementationStarter',
            description: 'Full AI solution implementation tailored to your specific business needs.',
            features: [
                { text: 'Everything in AI Readiness Audit', included: true },
                { text: 'Custom AI solution development', included: true },
                { text: 'Chatbot or AI agent setup', included: true },
                { text: 'System integrations (CRM, email, etc)', included: true },
                { text: 'Team training (up to 5 people)', included: true },
                { text: '90-day implementation support', included: true },
                { text: 'Performance analytics dashboard', included: true },
                { text: 'Monthly optimization calls', included: true },
                { text: 'Priority support queue', included: true },
            ],
            cta: 'Start Implementation',
            ctaIcon: 'Rocket',
            deliveryTime: '4-8 weeks',
            guarantee: 'ROI guarantee or money back',
        },
        {
            id: 'enterprise',
            name: 'Enterprise Partnership',
            subtitle: 'For organizations with complex needs',
            price: null,
            priceMonthly: 2997,
            popular: false,
            stripeProductKey: 'enterpriseMonthly',
            description: 'Dedicated AI partnership with ongoing development and support.',
            features: [
                { text: 'Everything in AI Implementation', included: true },
                { text: 'Dedicated AI engineer', included: true },
                { text: 'Unlimited AI solutions', included: true },
                { text: 'Custom integrations & APIs', included: true },
                { text: 'Unlimited team training', included: true },
                { text: '24/7 priority support', included: true },
                { text: 'Quarterly strategy reviews', included: true },
                { text: 'SLA guarantees', included: true },
                { text: 'White-label options', included: true },
            ],
            cta: 'Contact Us',
            ctaIcon: 'MessageCircle',
            deliveryTime: 'Ongoing',
            guarantee: 'Cancel anytime',
        },
    ];

    const [checkoutLoading, setCheckoutLoading] = useState(null);

    const handleSelectPlan = async (plan) => {
        setSelectedPlan(plan.id);

        // Enterprise plan - redirect to contact/booking
        if (plan.id === 'enterprise') {
            window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank');
            return;
        }

        // Check if Stripe is configured
        const product = STRIPE_PRODUCTS[plan.stripeProductKey];
        if (!product || STRIPE_PUBLISHABLE_KEY.includes('REPLACE') || product.priceId.includes('REPLACE')) {
            // Fallback to booking if Stripe not configured
            console.warn('Stripe not configured. Redirecting to booking.');
            window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank');
            return;
        }

        // Process Stripe checkout
        setCheckoutLoading(plan.id);
        try {
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: product.priceId, quantity: 1 }],
                mode: product.mode,
                successUrl: CHECKOUT_SUCCESS_URL,
                cancelUrl: CHECKOUT_CANCEL_URL,
                billingAddressCollection: 'auto',
            });

            if (error) throw error;
        } catch (err) {
            console.error('Checkout error:', err);
            // Fallback to booking on error
            window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank');
        } finally {
            setCheckoutLoading(null);
        }
    };

    const faqs = [
        {
            question: 'How quickly can I see results?',
            answer: 'Most clients see their first automation running within 2-4 weeks. Full ROI is typically realized within 60-90 days of implementation.',
        },
        {
            question: 'Do you offer payment plans?',
            answer: 'Yes! We offer flexible payment options including 3-month payment plans for implementation packages. Contact us to discuss.',
        },
        {
            question: 'What if the AI solution doesn\'t work for my business?',
            answer: 'We offer a 100% satisfaction guarantee on our AI Readiness Audit. For implementations, we guarantee measurable ROI or provide additional development at no cost.',
        },
        {
            question: 'What technologies do you work with?',
            answer: 'We work with leading AI platforms including OpenAI, Anthropic, custom LLMs, and integrate with 200+ business tools including Salesforce, HubSpot, Slack, and more.',
        },
        {
            question: 'How is ongoing support handled?',
            answer: 'All packages include email support. Growth and Enterprise plans include dedicated Slack channels and priority response times (<4 hours).',
        },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Pricing - AI Solutions | sentAIent Conversion Hub</title>
                <meta
                    name="description"
                    content="Transparent pricing for AI consulting from sentAIent. From AI readiness audits to full implementation, find the perfect package for your business needs."
                />
                <meta name="keywords" content="AI consulting pricing, AI implementation cost, chatbot development pricing, automation pricing" />
                <meta property="og:title" content="Pricing - AI Solutions | sentAIent" />
                <meta property="og:description" content="Transparent AI consulting pricing. Audits from $997, implementations from $4,997." />
                <link rel="canonical" href="/pricing" />
            </Helmet>

            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Icon name="Sparkles" size={16} />
                            <span>Transparent Pricing</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Invest in AI That <span className="text-primary">Pays for Itself</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Every package includes our ROI guarantee. We don't succeed unless you do.
                            Choose the right level for your business needs.
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <Icon name="Shield" size={16} className="text-success" />
                                <span>Money-back guarantee</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="CreditCard" size={16} className="text-success" />
                                <span>Flexible payments</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="Clock" size={16} className="text-success" />
                                <span>Quick implementation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-2xl border transition-all duration-500 ${plan.popular
                                    ? 'border-primary shadow-brand bg-card scale-105 z-10'
                                    : 'border-border bg-card hover:border-primary/50 hover:shadow-lg'
                                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Plan Header */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center mb-6">
                                        {plan.price ? (
                                            <div>
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-4xl font-bold text-foreground">${plan.price.toLocaleString()}</span>
                                                    {plan.priceHigh && (
                                                        <span className="text-lg text-muted-foreground ml-1">-${plan.priceHigh.toLocaleString()}</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">one-time investment</p>
                                            </div>
                                        ) : plan.priceMonthly ? (
                                            <div>
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-4xl font-bold text-foreground">${plan.priceMonthly.toLocaleString()}</span>
                                                    <span className="text-lg text-muted-foreground ml-1">/month</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">minimum 3-month commitment</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-4xl font-bold text-foreground">Custom</span>
                                                <p className="text-sm text-muted-foreground mt-1">Let's talk about your needs</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground text-center mb-6">
                                        {plan.description}
                                    </p>

                                    {/* CTA Button */}
                                    <Button
                                        variant={plan.popular ? 'default' : 'outline'}
                                        size="lg"
                                        fullWidth
                                        iconName={checkoutLoading === plan.id ? null : plan.ctaIcon}
                                        iconPosition="left"
                                        className={plan.popular ? 'bg-conversion hover:bg-conversion/90' : ''}
                                        onClick={() => handleSelectPlan(plan)}
                                        loading={checkoutLoading === plan.id}
                                        disabled={checkoutLoading !== null}
                                    >
                                        {checkoutLoading === plan.id ? 'Processing...' : plan.cta}
                                    </Button>

                                    {/* Delivery Time */}
                                    <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-muted-foreground">
                                        <Icon name="Calendar" size={12} />
                                        <span>Delivery: {plan.deliveryTime}</span>
                                    </div>

                                    {/* Features List */}
                                    <div className="mt-8 space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-3">
                                                <div className={`mt-0.5 ${feature.included ? 'text-success' : 'text-muted-foreground/50'}`}>
                                                    <Icon name={feature.included ? 'Check' : 'X'} size={16} />
                                                </div>
                                                <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}`}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Guarantee */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <div className="flex items-center justify-center space-x-2 text-sm text-success">
                                            <Icon name="ShieldCheck" size={16} />
                                            <span>{plan.guarantee}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Growing Businesses</h2>
                        <p className="text-lg text-muted-foreground">Join hundreds of companies transforming with AI</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { metric: '200%', label: 'Average ROI', icon: 'TrendingUp' },
                            { metric: '40+', label: 'Hours Saved/Week', icon: 'Clock' },
                            { metric: '95%', label: 'Client Satisfaction', icon: 'Heart' },
                            { metric: '<30 days', label: 'Avg Time to Value', icon: 'Zap' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Icon name={stat.icon} size={24} className="text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-foreground mb-1">{stat.metric}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table - Quick View */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Need Help Deciding?</h2>
                        <p className="text-lg text-muted-foreground">Take our free assessment to get a personalized recommendation</p>
                    </div>

                    <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Not Sure Which Package is Right?</h3>
                        <p className="text-lg opacity-90 mb-6">
                            Our free 5-minute AI Readiness Assessment will analyze your business and recommend the perfect starting point.
                        </p>
                        <Link to="/free-ai-assessment-portal">
                            <Button
                                variant="secondary"
                                size="lg"
                                iconName="ClipboardCheck"
                                iconPosition="left"
                                className="bg-white text-primary hover:bg-white/90"
                            >
                                Take Free Assessment
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 lg:px-8 bg-muted/30">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-muted-foreground">Everything you need to know about working with us</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-semibold text-foreground">{faq.question}</span>
                                    <Icon
                                        name={openFaq === index ? 'ChevronUp' : 'ChevronDown'}
                                        size={20}
                                        className="text-muted-foreground flex-shrink-0 ml-4"
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-muted-foreground">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Schedule a free discovery call to discuss your specific needs and find the right solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="default"
                            size="lg"
                            iconName="Calendar"
                            iconPosition="left"
                            className="bg-conversion hover:bg-conversion/90"
                            onClick={() => window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank')}
                        >
                            Schedule Free Discovery Call
                        </Button>
                        <Link to="/ai-solutions-experience-center">
                            <Button
                                variant="outline"
                                size="lg"
                                iconName="Play"
                                iconPosition="left"
                            >
                                See Live Demos First
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-primary-foreground py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                                    <Icon name="Brain" size={24} color="white" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold">sentAIent</span>
                                    <p className="text-sm opacity-80">Conversion Hub</p>
                                </div>
                            </div>
                            <p className="text-primary-foreground/80 mb-4 max-w-md">
                                Transforming businesses through intelligent AI solutions that amplify human potential
                                and drive sustainable growth.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Solutions</h4>
                            <ul className="space-y-2 text-sm text-primary-foreground/80">
                                <li><Link to="/ai-solutions-experience-center" className="hover:text-primary-foreground transition-colors">AI Solutions</Link></li>
                                <li><Link to="/free-ai-assessment-portal" className="hover:text-primary-foreground transition-colors">Free Assessment</Link></li>
                                <li><Link to="/pricing" className="hover:text-primary-foreground transition-colors">Pricing</Link></li>
                                <li><Link to="/knowledge-nexus-resource-library" className="hover:text-primary-foreground transition-colors">Resources</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-primary-foreground/80">
                                <li><Link to="/about-our-approach-intelligence-center" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
                                <li><Link to="/trust-transparency-hub" className="hover:text-primary-foreground transition-colors">Trust & Security</Link></li>
                                <li><button className="hover:text-primary-foreground transition-colors">Contact</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-primary-foreground/60">
                            © {new Date().getFullYear()} sentAIent Conversion Hub. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</button>
                            <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Pricing;

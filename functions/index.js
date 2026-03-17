const { stripeWebhook } = require('./stripe-webhook');
const { onInquiryCreated } = require('./inquiry-notifier');

// Export all Cloud Functions
exports.stripeWebhook = stripeWebhook;
exports.onInquiryCreated = onInquiryCreated;

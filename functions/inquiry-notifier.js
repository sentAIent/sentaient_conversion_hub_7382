const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

if (!admin.apps.length) {
    admin.initializeApp();
}

/**
 * Configure Transporter for Gmail / Google Workspace
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().email.user || 'sales@sentaient.com',
        pass: functions.config().email.pass
    }
});

/**
 * Triggered on new inquiry document in Firestore.
 */
exports.onInquiryCreated = functions.firestore
    .document('inquiries/{inquiryId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();
        const inquiryId = context.params.inquiryId;

        console.log(`[SALES ALERT] New Inquiry Received! ID: ${inquiryId}`);

        const mailOptions = {
            from: `"sentAIent Sales" <${functions.config().email.user || 'sales@sentaient.com'}>`,
            to: 'sales@sentaient.com',
            subject: `New Corporate Inquiry: ${data.organization || 'Individual'}`,
            html: `
                <h3>New Inquiry Received</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
                <p><strong>Group Size:</strong> ${data.group_size || 'N/A'}</p>
                <p><strong>Details:</strong></p>
                <p>${data.details || 'No additional details provided.'}</p>
                <hr>
                <p><small>Inquiry ID: ${inquiryId}</small></p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`[SALES ALERT] Email notification sent for inquiry ${inquiryId}`);
        } catch (error) {
            console.error(`[SALES ALERT] Failed to send email:`, error);
        }

        return null;
    });

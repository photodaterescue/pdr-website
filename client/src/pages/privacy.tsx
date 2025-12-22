import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-privacy">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-lg">
            Your privacy matters. We collect only what is necessary to run our service effectively and support your experience.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (via Lemon Squeezy checkout)</li>
              <li>Order details (plan, date, amount)</li>
              <li>Licence activation data (device ID, OS type)</li>
              <li>Support emails sent to us</li>
            </ul>
            <p className="mt-4 text-muted-foreground font-medium">
              We do not collect your photos or store your media files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Why We Collect Data</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>deliver your licence,</li>
              <li>provide customer support,</li>
              <li>verify purchases,</li>
              <li>send transactional emails (confirmation, receipts),</li>
              <li>send marketing emails only if you opt in.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Email Marketing</h2>
            <p>
              Customers must explicitly opt in to receive marketing messages. If you do not opt in, you will only receive necessary transactional messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage & Security</h2>
            <p className="mb-4">Data is stored securely through:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Lemon Squeezy (payments + receipts)</li>
              <li>Secure email servers (support requests)</li>
              <li>Internal licence management systems</li>
            </ul>
            <p className="text-muted-foreground">
              You may request data deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. ICO Registration</h2>
            <p>
              Photo Date Rescue Ltd will be registered with the UK ICO as required for handling customer email data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p>
              For support: <a href="/support" className="text-accent hover:underline" data-testid="link-contact-support">contact support</a>. For privacy enquiries: <a href="mailto:admin@photodaterescue.com" className="text-accent hover:underline" data-testid="link-contact-email">admin@photodaterescue.com</a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="footer-link-terms">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-foreground transition-colors" data-testid="footer-link-refund">Refund Policy</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="footer-link-privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

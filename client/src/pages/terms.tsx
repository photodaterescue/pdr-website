import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-terms">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-lg">
            Welcome to Photo Date Rescue ("PDR", "we", "our", "us"). By accessing or using our software or website (photodaterescue.com), you agree to the following Terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What PDR Is</h2>
            <p className="mb-4">
              Photo Date Rescue is a software application designed to repair, organise, and rename photo and video metadata. The service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>a free demo (web-based),</li>
              <li>a paid desktop application,</li>
              <li>optional subscription plans (monthly or yearly),</li>
              <li>an optional lifetime licence (available only after completing one full paid billing cycle).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
            <p className="mb-4">Users:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>are strongly advised to create a full backup of their photos before using the app.</li>
              <li>must ensure they have the legal right to process any images,</li>
              <li>must use the app responsibly and for lawful purposes,</li>
              <li>must keep their licence key secure and private.</li>
            </ul>
            <p className="text-muted-foreground">
              PDR is not responsible for accidental data loss caused by user error, corrupted files, unsupported formats, or unbacked-up data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Software Licence Terms</h2>
            <p className="mb-4">
              When you purchase PDR, you receive a non-transferable, single-user licence. You may:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>install and use the licence on multiple personal devices belonging to you,</li>
              <li>request support via email if activation fails.</li>
            </ul>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>share, sell, lend, or gift your licence to another person,</li>
              <li>resell activation keys,</li>
              <li>reverse engineer, copy, or distribute the software.</li>
            </ul>
            <p className="text-muted-foreground">
              Unauthorised sharing or resale of licences may result in licence deactivation and may be pursued as a breach of intellectual property law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Lifetime Licence Eligibility</h2>
            <p>
              The lifetime licence is only available after a user completes one full paid billing cycle (one full month or one full year). Early upgrades, bypassing the cycle, or using the free demo does not grant access. This ensures customers fully test compatibility and workflow before long-term commitment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payments</h2>
            <p className="mb-4">
              All payments are processed securely through Lemon Squeezy (our merchant of record). You agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lemon Squeezy handles billing, receipts, and tax collection.</li>
              <li>Prices are listed in the currency shown at checkout.</li>
              <li>No VAT is applied unless the company becomes VAT-registered (currently not VAT registered).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Refund Policy</h2>
            <p>
              Refunds are governed by our separate <Link href="/refund-policy" className="text-accent hover:underline" data-testid="link-refund-policy">Refund Policy</Link>, which forms part of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              Our software is provided "as is". To the fullest extent permitted by law, PDR is not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>loss of data,</li>
              <li>indirect or incidental damages,</li>
              <li>corrupted or unsupported files.</li>
            </ul>
            <p className="text-muted-foreground">
              Users must maintain personal backups and test the demo before purchasing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Marketing Consent</h2>
            <p>
              If a user consents to marketing during checkout, PDR may contact them about updates, offers, or new products. Without consent, communications will be strictly limited to transactional emails (orders, receipts, support).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p>
              For support or legal enquiries: <a href="mailto:admin@photodaterescue.com" className="text-accent hover:underline" data-testid="link-contact-email">admin@photodaterescue.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms are governed by UK law.
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

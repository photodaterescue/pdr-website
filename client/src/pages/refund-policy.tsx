import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-refund-policy">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 11, 2025</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <p className="text-lg">
            We aim to deliver software that feels premium, reliable, and genuinely helpful. Because PDR offers a free demo and clear system requirements, refunds are limited.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Refund Window</h2>
            <p>
              Refund requests must be made within 14 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Valid Reasons for Refund</h2>
            <p className="mb-4">A refund may be approved if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>the software fails to function as advertised,</li>
              <li>we cannot resolve a technical issue after support attempts,</li>
              <li>the activation system fails and cannot be restored.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Not Eligible for Refund</h2>
            <p className="mb-4">Refunds will not be issued for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>user error,</li>
              <li>unsupported file types,</li>
              <li>lack of backups resulting in data loss,</li>
              <li>dissatisfaction based on results after full processing (demo exists for testing),</li>
              <li>attempting to misuse licences or circumvent the lifetime eligibility rule.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. How to Request a Refund</h2>
            <p className="mb-4">
              Email: <a href="mailto:admin@photodaterescue.com" className="text-accent hover:underline" data-testid="link-refund-email">admin@photodaterescue.com</a> with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>order number,</li>
              <li>email used at checkout,</li>
              <li>brief explanation of the issue.</li>
            </ul>
            <p className="text-muted-foreground">
              Refunds, if approved, are processed by Lemon Squeezy.
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

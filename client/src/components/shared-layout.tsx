import { ReactNode } from "react";

interface SharedLayoutProps {
  children: ReactNode;
}

export function SharedHeader() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="https://photodaterescue.com" className="brand">
          <img
            src="/assets/pdr-logo-circle.png"
            alt="Photo Date Rescue logo"
            className="brand-mark"
          />
          <span className="brand-wordmark">Photo Date Rescue</span>
        </a>

        <nav className="primary-nav">
          <a href="https://photodaterescue.com/#how-it-works">How it works</a>
          <a href="https://photodaterescue.com/#pricing">Pricing</a>
          <a href="https://photodaterescue.com/#guides">Guides</a>
          <a href="https://photodaterescue.com/#faq">FAQ</a>
          <a href="https://photodaterescue.com/#partners">Affiliates</a>
          <a href="https://photodaterescue.com/#support">Support</a>
        </nav>

        <div className="nav-cta">
          <a className="btn btn-primary" href="/">
            Try free web demo
          </a>
          <a className="btn btn-outline" href="https://photodaterescue.com/#pricing">
            Get desktop app
          </a>
        </div>
      </div>
    </header>
  );
}

export function SharedFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© 2025 Photo Date Rescue. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="https://photodaterescue.com/">Homepage</a>
          <span>·</span>
          <a href="https://photodaterescue.com/#how-it-works">How it works</a>
          <span>·</span>
          <a href="https://photodaterescue.com/#pricing">Pricing</a>
          <span>·</span>
          <a href="https://photodaterescue.com/#guides">Guides</a>
          <span>·</span>
          <a href="https://photodaterescue.com/#faq">FAQ</a>
          <span>·</span>
          <a href="https://photodaterescue.com/#partners">Affiliates</a>
        </nav>
      </div>
    </footer>
  );
}

export function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="shared-layout">
      <SharedHeader />
      <main className="shared-main">
        {children}
      </main>
      <SharedFooter />
    </div>
  );
}

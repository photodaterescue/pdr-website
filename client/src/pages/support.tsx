import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { toast } from "sonner";

export default function Support() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Capture hidden tracking fields
  const getHiddenFields = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get("source") || "web",
      app_version: params.get("app_version") || "",
      os: params.get("os") || "unknown",
      page_referrer: document.referrer || "",
      timestamp: new Date().toISOString(),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const hiddenFields = getHiddenFields();
      
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          category: formData.category || "Something else",
          source: hiddenFields.source,
          app_version: hiddenFields.app_version,
          os: hiddenFields.os,
          page_referrer: hiddenFields.page_referrer,
          timestamp: hiddenFields.timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit support request");
      }

      setSubmitted(true);
      setFormData({ email: "", message: "", category: "" });
      toast.success("Support request received!");
    } catch (error) {
      toast.error("Failed to send support request. Please try again.");
      console.error("Support submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-display font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-mono text-sm">
              <span className="text-sm">PDR</span>
            </div>
            Photo Date Rescue
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Support</h1>
            <p className="text-lg text-muted-foreground">
              We're here to help. Submit your question or issue below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Pre-Form Guidance Block */}
          <Alert className="mb-8 bg-blue-500/10 border-blue-500/20">
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Before contacting support</h3>
              <p className="text-sm text-muted-foreground">
                Most setup, planning, and "is this normal?" questions are answered faster in our Guides.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a href="/guides/cloud-services.html" className="text-sm text-blue-600 hover:text-blue-700 underline" data-testid="link-guides-cloud">
                  Cloud Services
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="/guides/social-apps.html" className="text-sm text-blue-600 hover:text-blue-700 underline" data-testid="link-guides-social">
                  Social Apps
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="/guides/hardware-devices.html" className="text-sm text-blue-600 hover:text-blue-700 underline" data-testid="link-guides-hardware">
                  Hardware Devices
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="/guides" className="text-sm text-blue-600 hover:text-blue-700 underline" data-testid="link-guides-all">
                  View all Guides
                </a>
              </div>
            </div>
          </Alert>

          {/* Success Message */}
          {submitted && (
            <Alert className="mb-8 bg-green-500/10 border-green-500/20">
              <div className="space-y-2">
                <h3 className="font-semibold text-base text-green-700">Thank you!</h3>
                <p className="text-sm text-muted-foreground">
                  Your message has been received. If this is a setup or planning question, you may get a faster answer via the Guides.
                </p>
              </div>
            </Alert>
          )}

          {/* Support Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll respond to your inquiry shortly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-email"
                    className="bg-background border-border"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    What is this about?
                  </label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="App not launching">App not launching</SelectItem>
                      <SelectItem value="Fix crashed / stopped">Fix crashed / stopped</SelectItem>
                      <SelectItem value="License issue">License issue</SelectItem>
                      <SelectItem value="Something else">Something else</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    data-testid="textarea-message"
                    className="bg-background border-border min-h-[150px] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="button-submit-support"
                  className="w-full h-11 text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Support Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Photo Date Rescue Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="footer-link-terms">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-foreground transition-colors" data-testid="footer-link-refund">
              Refund Policy
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="footer-link-privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

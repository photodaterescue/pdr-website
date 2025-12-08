import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Mail, ExternalLink, Code2, Palette, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import heroBg from "@assets/generated_images/abstract_geometric_minimal_shapes_with_soft_lighting.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-background/0 to-background z-10"></div>
            <img 
              src={heroBg} 
              alt="Abstract Background" 
              className="w-full h-full object-cover opacity-50 md:opacity-100 md:object-right"
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-20">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Available for freelance work
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.1] mb-6">
                Crafting digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">experiences</span>
                <span className="text-accent">.</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
                I'm a creative developer who blends art direction with clean code to build immersive web applications.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full h-12 px-8 text-base" onClick={() => scrollToSection('work')}>
                  View Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base" onClick={() => scrollToSection('contact')}>
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-background border-none shadow-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                        <Code2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg">Frontend</h3>
                        <p className="text-sm text-muted-foreground mt-1">React, TypeScript, Tailwind</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background border-none shadow-sm translate-y-8">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
                        <Palette className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg">Design</h3>
                        <p className="text-sm text-muted-foreground mt-1">Figma, UI/UX, Motion</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background border-none shadow-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                        <Terminal className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg">Backend</h3>
                        <p className="text-sm text-muted-foreground mt-1">Node, Postgres, API</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Obsessed with pixel perfection and clean architecture.</h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  I believe that the best digital products are born at the intersection of design and engineering. I don't just write code; I build systems that are scalable, accessible, and delightful to use.
                </p>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  With over 5 years of experience working with startups and agencies, I've honed my skills in creating fast, responsive, and interactive websites that leave a lasting impression.
                </p>
                
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Mail, href: "mailto:hello@example.com" }
                  ].map((Social, i) => (
                    <a 
                      key={i} 
                      href={Social.href} 
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Selected Works</h2>
                <p className="text-muted-foreground max-w-md">
                  A collection of projects that showcase my passion for design and development.
                </p>
              </div>
              <Button variant="ghost" className="hidden md:flex gap-2">
                View All Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group overflow-hidden border-0 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Button size="sm" variant="secondary" className="gap-2">
                        Visit Site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    {/* Placeholder for project image - using a colored div for now */}
                    <div className={`w-full h-full bg-gradient-to-br ${
                      i === 1 ? 'from-pink-500/20 to-rose-500/20' : 
                      i === 2 ? 'from-blue-500/20 to-cyan-500/20' : 
                      'from-amber-500/20 to-orange-500/20'
                    }`} />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="rounded-full font-normal">
                        {i === 1 ? 'E-Commerce' : i === 2 ? 'SaaS Platform' : 'Portfolio'}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">2024</span>
                    </div>
                    <CardTitle className="font-display text-xl">Project Name {i}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      A comprehensive solution for digital nomads to track their expenses and manage their travel itineraries.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <Button variant="ghost" className="md:hidden w-full mt-8 gap-2">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Let's work together</h2>
              <p className="text-white/60">
                Have a project in mind? I'm currently available for freelance work and open to new opportunities.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Name</label>
                  <Input placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Message</label>
                  <Textarea placeholder="Tell me about your project..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent min-h-[120px]" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white h-11 text-base">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

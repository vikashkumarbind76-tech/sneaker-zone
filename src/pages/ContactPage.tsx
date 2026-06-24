import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '1347 Fulton St\nBrooklyn, NY 11216',
    action: () => window.open('https://maps.google.com/?q=1347+Fulton+St,+Brooklyn,+NY+11216', '_blank'),
    actionLabel: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+1 (347) 627-6595',
    action: () => window.location.href = 'tel:+13476276595',
    actionLabel: 'Call Now',
  },
  {
    icon: Clock,
    title: 'Store Hours',
    content: 'Monday - Saturday: 10AM - 8PM\nSunday: 11AM - 6PM',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@sneakerzone.in',
    action: () => window.location.href = 'mailto:info@sneakerzone.in',
    actionLabel: 'Send Email',
  },
];

const ContactPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <CartProvider>
      <Helmet>
        <title>Contact Royal Sneakers & Apparels | Brooklyn</title>
        <meta 
          name="description" 
          content="Get in touch with Royal Sneakers & Apparels. Visit us at 1347 Fulton St, Brooklyn, NY or call (347) 627-6595." 
        />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/contact" />
        <meta property="og:title" content="Contact Royal Sneakers & Apparels | Brooklyn" />
        <meta property="og:description" content="Visit Royal Sneakers & Apparels at 1347 Fulton St, Brooklyn, NY or call (347) 627-6595." />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="pt-24">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-16">
            <div className="container-custom text-center">
              <p className="text-bronze-light font-medium tracking-widest uppercase mb-2">
                Get In Touch
              </p>
              <h1 className="heading-xl mb-4">CONTACT US</h1>
              <p className="text-primary-foreground/70 max-w-xl mx-auto">
                Have questions? We'd love to hear from you. Visit our store or drop us a line.
              </p>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <h2 className="heading-md mb-6">SEND US A MESSAGE</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="product">Product Question</option>
                          <option value="order">Order Status</option>
                          <option value="return">Returns & Exchanges</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <Button type="submit" variant="accent" size="lg">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {contactInfo.map((info, index) => (
                      <div 
                        key={index}
                        className="bg-card p-6 rounded-xl shadow-soft-sm"
                      >
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                          <info.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-display text-xl mb-2">{info.title}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">
                          {info.content}
                        </p>
                        {info.action && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={info.action}
                          >
                            {info.actionLabel}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="aspect-video rounded-xl overflow-hidden shadow-soft-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0824677784284!2d-73.9447891!3d40.6809982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b9e2c0f1c6d%3A0x8b4f3b0c1e0f1c6d!2s1347%20Fulton%20St%2C%20Brooklyn%2C%20NY%2011216!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Royal Sneakers & Apparels Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  );
};

export default ContactPage;

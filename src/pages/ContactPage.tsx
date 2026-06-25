import { useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  subject: z.string().trim().max(150).optional().or(z.literal('')),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message too long'),
});
import { Helmet } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Clock, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const EMAIL = 'vikashkumarbind76@gmail.com';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: EMAIL,
    action: () => (window.location.href = `mailto:${EMAIL}`),
    actionLabel: 'Send Email',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    content: 'Monday - Saturday: 10AM - 8PM\nSunday: 11AM - 6PM',
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
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? 'Invalid input');
      return;
    }
    // Validated payload would be sent to backend here.
    toast.success("Message sent! We'll get back to you soon.");
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
        <title>Contact Sneaker Zone | Online Sneakers & Streetwear</title>
        <meta
          name="description"
          content="Get in touch with Sneaker Zone. Email us at vikashkumarbind76@gmail.com for any questions about our sneakers and streetwear."
        />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/contact" />
        <meta property="og:title" content="Contact Sneaker Zone" />
        <meta property="og:description" content="Email Sneaker Zone at vikashkumarbind76@gmail.com." />
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
                Have questions? We'd love to hear from you. Drop us a line and
                we'll get back to you as soon as we can.
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
                          maxLength={100}
                          autoComplete="name"
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
                          maxLength={255}
                          autoComplete="email"
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
                        maxLength={1000}
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

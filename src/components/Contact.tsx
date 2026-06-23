import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '1347 Fulton St, Brooklyn, NY 11216',
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
    content: 'Mon-Sat: 10AM - 8PM\nSun: 11AM - 6PM',
    action: null,
    actionLabel: null,
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@sneakerzone.in',
    action: () => window.location.href = 'mailto:info@sneakerzone.in',
    actionLabel: 'Send Email',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-accent font-medium tracking-widest uppercase mb-2">
                Get In Touch
              </p>
              <h2 className="heading-lg">CONTACT & LOCATION</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-soft-sm hover:shadow-soft-md transition-shadow"
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

          {/* Map */}
          <div className="relative">
            <div className="aspect-square lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-soft-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.0824677784284!2d-73.9447891!3d40.6809982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b9e2c0f1c6d%3A0x8b4f3b0c1e0f1c6d!2s1347%20Fulton%20St%2C%20Brooklyn%2C%20NY%2011216!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sneaker Zone Location"
              />
            </div>

            {/* Address Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-soft-md">
              <p className="font-display text-lg">Sneaker Zone</p>
              <p className="text-sm text-muted-foreground">1347 Fulton St, Brooklyn, NY 11216</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

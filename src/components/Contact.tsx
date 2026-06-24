import { Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    content: 'Mon - Sat: 10AM - 8PM\nSun: 11AM - 6PM',
    action: null,
    actionLabel: null,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div>
            <p className="text-accent font-medium tracking-widest uppercase mb-2">
              Get In Touch
            </p>
            <h2 className="heading-lg">CONTACT US</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              We're an online store — reach out anytime by email and we'll
              get back to you as soon as we can.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft-sm hover:shadow-soft-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{info.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line mb-4 break-words">
                  {info.content}
                </p>
                {info.action && (
                  <Button variant="outline" size="sm" onClick={info.action}>
                    {info.actionLabel}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { Crown, Instagram, Facebook, Twitter, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '#shop' },
    { name: 'Sneakers', href: '#shop' },
    { name: 'Apparel', href: '#shop' },
    { name: 'Accessories', href: '#shop' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Store Locator', href: '#contact' },
    { name: 'Careers', href: '#' },
  ],
  support: [
    { name: 'FAQ', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Size Guide', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/royals_sneakers_apparels', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#home" className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-bronze-light" />
              <span className="font-display text-2xl tracking-wider">
                ROYAL SNEAKERS
              </span>
            </a>
            <p className="text-primary-foreground/70 max-w-sm">
              Brooklyn's premier destination for authentic sneakers and streetwear. 
              Step into royalty with every visit.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                1347 Fulton St, Brooklyn, NY 11216
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (347) 627-6595
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-bronze/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-lg mb-4">SHOP</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg mb-4">SUPPORT</h3>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Royal Sneakers & Apparels. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

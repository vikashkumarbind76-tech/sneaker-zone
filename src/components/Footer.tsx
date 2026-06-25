import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import sneakerZoneLogo from '@/assets/sneaker-zone-logo.png';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/sneakerzone_india', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={sneakerZoneLogo} alt="Sneaker Zone" width={28} height={28} loading="lazy" className="w-7 h-7 object-contain" />
          <span className="font-display text-xl tracking-wider">SNEAKER ZONE</span>
        </a>

        <a
          href="mailto:vikashkumarbind76@gmail.com"
          className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <Mail className="w-4 h-4" />
          vikashkumarbind76@gmail.com
        </a>

        <div className="flex items-center gap-3">
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-primary-foreground/10 rounded-md flex items-center justify-center hover:bg-bronze/20 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-3 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Sneaker Zone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

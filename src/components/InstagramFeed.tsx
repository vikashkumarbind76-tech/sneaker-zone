import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Instagram posts data
const instagramPosts = [
  { id: 1, likes: 234, comments: 18 },
  { id: 2, likes: 189, comments: 12 },
  { id: 3, likes: 312, comments: 24 },
  { id: 4, likes: 156, comments: 9 },
  { id: 5, likes: 278, comments: 21 },
  { id: 6, likes: 201, comments: 15 },
];

const InstagramFeed = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-widest uppercase mb-2">
            Follow Our Journey
          </p>
          <h2 className="heading-lg mb-4">@SNEAKERZONE_INDIA</h2>
          <Button 
            variant="outline"
            onClick={() => window.open('https://instagram.com/sneakerzone_india', '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </Button>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com/sneakerzone_india"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Placeholder Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <Instagram className="w-8 h-8 text-muted-foreground" />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <div className="flex gap-4 text-cream text-sm">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
                <ExternalLink className="w-5 h-5 text-cream" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;

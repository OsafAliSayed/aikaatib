import { Feather, Twitter, Instagram, Facebook, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Use Cases', 'Roadmap', 'Integrations']
    },
    {
      title: 'Resources',
      links: ['Blog', 'Help Center', 'Documentation', 'API', 'Status']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Contact', 'Partners']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
    }
  ];

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                AIKaatib
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              AI-powered writing assistant that helps you create better blog content, faster and more efficiently.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {footerLinks.map((group, index) => (
            <div key={index} className="col-span-1">
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AIKaatib. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
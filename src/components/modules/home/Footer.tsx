import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Food<span className="text-primary">Hub</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Connecting local home chefs with food lovers. Experience the taste of 
            authentic, healthy, and fresh home-cooked meals delivered to your door.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/meals" className="hover:text-white transition-colors">Browse All Meals</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/become-provider" className="hover:text-white transition-colors">Join as a Provider</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Help & Support</Link></li>
          </ul>
        </div>

        {/* 3. Categories (Optional) */}
        <div>
          <h4 className="text-white font-semibold mb-6">Popular Categories</h4>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Traditional Bengali</li>
            <li className="hover:text-white cursor-pointer transition-colors">Healthy Salads</li>
            <li className="hover:text-white cursor-pointer transition-colors">Homemade Snacks</li>
            <li className="hover:text-white cursor-pointer transition-colors">Diet Special</li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-primary" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <span>support@mealbridge.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>© {new Date().getFullYear()} MealBridge Marketplace. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-100 to-gray-300 relative mt-15">
            <div className="max-w-[1400px] mx-auto px-4 py-6 flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-lg">Job Hunt</h2>
                    <p className="text-sm text-gray-600">© 2024 Your Company. All rights reserved.</p>
                </div>
                <div className="flex gap-4 text-black">
                    <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
                    <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition" />
                    <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700 transition" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

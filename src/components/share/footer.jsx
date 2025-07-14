import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-100 to-gray-300 relative mt-15">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <div className="text-center sm:text-left">
                    <h2 className="font-bold text-lg sm:text-xl">Job Hunt</h2>
                    <p className="text-xs sm:text-sm text-gray-600">© 2024 Your Company. All rights reserved.</p>
                </div>
                <div className="flex gap-4 sm:gap-6 text-black">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-600 transition hover:scale-110" />
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-400 transition hover:scale-110" />
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-700 transition hover:scale-110" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
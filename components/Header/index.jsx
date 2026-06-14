"use client"
import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { config } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = config.NAV_ITEMS;

const NavLink = ({ href, label, isMobile = false }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className="relative"
        >
            <motion.span
                className={`relative ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-2'} text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {label}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-secondary/30 rounded-lg backdrop-blur-sm"
                        layoutId="activeNavBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{ zIndex: -1 }}
                    />
                )}
            </motion.span>
        </Link>
    );
};

const Logo = ({ isMobile = false }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
            <motion.div
                whileHover={{ opacity: 0.5 }}
                whileTap={{ scale: 0.95 }}
            >
                <Image
                    src="/logo.png"
                    width={2000}
                    height={2000}
                    alt="logo"
                    className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full`}
                />
            </motion.div>
            <motion.span
                className={`text-gray-300 font-semibold ${isMobile ? 'hidden' : 'text-base sm:text-lg'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className="hidden sm:inline">{config.developer.name}</span>
            </motion.span>
        </Link>
    </motion.div>
);

const Navigation = ({ isMobile = false, onLinkClick }) => (
    <motion.nav
        className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex space-x-2"}
        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0 : 0.3, duration: 0.5 }}
    >
        {NAV_ITEMS.map((item, index) => (
            <motion.div
                key={item.href}
                initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: isMobile ? index * 0.1 : 0.1 * index }}
                onClick={onLinkClick}
            >
                <NavLink {...item} isMobile={isMobile} />
            </motion.div>
        ))}
    </motion.nav>
);

const ContactButton = ({ isMobile = false, onLinkClick }) => (
    <motion.div
        className={`flex items-center ${isMobile ? 'w-full justify-center mt-4' : 'space-x-6'}`}
        initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: isMobile ? 0.5 : 0.4, duration: 0.5 }}
        onClick={onLinkClick}
    >
        <Link href={`https://github.com/${config.social.github}`} target="_blank" className={isMobile ? 'w-full' : ''}>
            <Button className={`${isMobile ? 'w-full' : ''} rounded-2xl font-semibold bg-white text-gray-900 hover:bg-gray-200 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3`}>
                <span className="hidden sm:inline">GitHub ↗</span>
                <span className="sm:hidden">GitHub</span>
            </Button>
        </Link>
    </motion.div>
);

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <motion.header
                className="py-4 sm:py-6 md:py-9 z-50 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto flex items-center justify-between md:px-64 px-4 sm:px-6">
                    <Logo />
                    <Navigation />
                    <div className="hidden md:block">
                        <ContactButton />
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="mb-8">
                                    <Logo isMobile={true} />
                                </div>
                                <div className="flex-1">
                                    <Navigation isMobile={true} onLinkClick={closeMobileMenu} />
                                </div>
                                <ContactButton isMobile={true} onLinkClick={closeMobileMenu} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

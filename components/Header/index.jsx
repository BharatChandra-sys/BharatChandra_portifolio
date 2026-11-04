"use client"
import React, { useEffect, useRef, useState } from 'react';
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
            aria-current={isActive ? 'page' : undefined}
        >
            <motion.span
                className={`relative ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-2'} text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {label}
                {isActive && (
                    <motion.span
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
        className="flex-shrink-0"
    >
        <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            aria-label={`${config.developer.name} — home`}
        >
            <motion.div
                whileHover={{ opacity: 0.5 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
            >
                <Image
                    src="/logo.png"
                    width={200}
                    height={200}
                    sizes="56px"
                    alt=""
                    className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-full`}
                />
            </motion.div>
            <motion.span
                className={`text-gray-300 font-semibold whitespace-nowrap ${isMobile ? 'hidden' : 'text-base sm:text-lg'}`}
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
        aria-label="Main"
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
        <Button
            className={`${isMobile ? 'w-full' : ''} rounded-2xl font-semibold bg-white text-gray-900 hover:bg-gray-200 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3`}
            asChild
        >
            <a href={`https://github.com/${config.social.github}`} target="_blank" rel="noopener noreferrer">
                <span className="hidden sm:inline">GitHub ↗</span>
                <span className="sm:hidden">GitHub</span>
            </a>
        </Button>
    </motion.div>
);

const FOCUSABLE = 'a[href], button:not([disabled])';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleRef = useRef(null);
    const panelRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // While the menu is open: Escape closes it, Tab stays inside it, and the page
    // behind doesn't scroll. On close, focus returns to the menu button.
    useEffect(() => {
        if (!isMobileMenuOpen) return undefined;

        const toggle = toggleRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        panelRef.current?.querySelector(FOCUSABLE)?.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
                return;
            }
            if (event.key !== 'Tab' || !panelRef.current) return;

            const focusable = [...panelRef.current.querySelectorAll(FOCUSABLE)];
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            toggle?.focus();
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                className="py-4 sm:py-6 md:py-9 z-50 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mx-auto w-full max-w-5xl flex items-center justify-between gap-4 px-4 sm:px-6">
                    <Logo />
                    <Navigation />
                    <div className="hidden md:block">
                        <ContactButton />
                    </div>
                    <button
                        ref={toggleRef}
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
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
                            id="mobile-menu"
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="mb-8 flex items-center justify-between">
                                    <Logo isMobile={true} />
                                    <button
                                        onClick={closeMobileMenu}
                                        className="p-2 text-gray-300 hover:text-white transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <HiX className="w-6 h-6" />
                                    </button>
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

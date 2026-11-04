"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { config } from '@/config';

const SOCIAL_LINKS = [
    { label: 'GitHub', href: `https://github.com/${config.social.github}`, Icon: FaGithub },
    { label: 'LinkedIn', href: config.social.linkedin, Icon: FaLinkedin },
    { label: 'Email', href: `mailto:${config.social.email}`, Icon: HiMail },
];

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-4 sm:py-6 border-t border-secondary/20 flex items-center justify-center"
        >
        <div className="text-center px-4 w-full max-w-4xl mx-auto space-y-3">
                <div className="flex items-center justify-center gap-2">
                    {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                {/* Microdata on the footer copyright line reinforces entity name on every page */}
                <div
                  className="text-xs md:text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 leading-tight"
                  itemScope
                  itemType="https://schema.org/WPFooter"
                >
                    <span className="whitespace-nowrap">
                      © {new Date().getFullYear()}{' '}
                      <span itemScope itemType="https://schema.org/Person">
                        <a
                          itemProp="url"
                          href="https://bharatchandra.me"
                          className="hover:text-primary transition-colors"
                        >
                          <span itemProp="name">{config.developer.name}</span>
                        </a>
                      </span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">All rights reserved</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">
                        <a href="https://bharatchandra.me" className="hover:text-primary transition-colors">bharatchandra.me</a>
                    </span>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;

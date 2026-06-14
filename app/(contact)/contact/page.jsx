/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from '@/components/ui/background-effects';
import ContactForm from './components/ContactForm';
import { config } from '@/config';

const ContactPage = () => {
    const contactInfo = config.contactInfo;

    return (
        <section className="relative flex items-center justify-center py-6" id="contact">
            <BackgroundEffects
                variant="corners"
                colors={{ first: "secondary", second: "secondary" }}
                intensity="10"
                blurAmount="3xl"
            />

            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-12 sm:mb-16 w-full"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                        Let's build something real.
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base px-4">
                        I'm open to AI/ML internships, full-time roles starting 2027,
                        and interesting project collaborations. Reach out directly —
                        I respond to every message.
                    </p>
                </motion.div>

                <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full lg:w-2/3 backdrop-blur-sm bg-secondary/5 p-4 sm:p-6 rounded-2xl border border-secondary/10"
                    >
                        <ContactForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full lg:w-1/3 backdrop-blur-sm bg-secondary/5 p-4 sm:p-6 rounded-2xl border border-secondary/10"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-primary">Contact Information</h3>
                        <div className="space-y-4 sm:space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="p-2 rounded-lg bg-secondary/10 flex-shrink-0">
                                        {info.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                                            {info.label}
                                        </p>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm sm:text-base text-primary hover:underline break-words"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm sm:text-base text-primary break-words">
                                                {info.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
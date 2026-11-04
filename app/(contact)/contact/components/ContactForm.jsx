"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LIMITS } from "@/lib/contact-validation.mjs";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong.');
            }

            toast.success("Message sent! I'll get back to you soon.");
            reset();
        } catch (error) {
            toast.error(error.message || "Failed to send. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot: invisible to people, tempting to bots. Filled in = silently dropped. */}
            <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input {...register("website")} id="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="space-y-4">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-muted-foreground block">
                            Your Name
                        </label>
                        <Input
                            {...register("name", {
                                required: "Name is required",
                                maxLength: { value: LIMITS.name, message: `Name must be under ${LIMITS.name} characters` },
                            })}
                            autoComplete="name"
                            aria-invalid={errors.name ? "true" : "false"}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="rounded-lg border-primary/20 w-full"
                        />
                        {errors.name && (
                            <span role="alert" className="text-xs text-red-500 block mt-1">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
                            Email
                        </label>
                        <Input
                            {...register("email", {
                                required: "Email is required",
                                maxLength: { value: LIMITS.email, message: "Invalid email address" },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            id="email"
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="rounded-lg border-primary/20 w-full"
                        />
                        {errors.email && (
                            <span role="alert" className="text-xs text-red-500 block mt-1">{errors.email.message}</span>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground block">
                        Message
                    </label>
                    <Textarea
                        {...register("message", {
                            required: "Message is required",
                            maxLength: { value: LIMITS.message, message: `Message must be under ${LIMITS.message} characters` },
                        })}
                        aria-invalid={errors.message ? "true" : "false"}
                        id="message"
                        name="message"
                        placeholder="Tell me about your project, role, or collaboration idea..."
                        className="rounded-lg border-primary/20 min-h-[150px] w-full resize-y"
                    />
                    {errors.message && (
                        <span role="alert" className="text-xs text-red-500 block mt-1">{errors.message.message}</span>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                className="w-full rounded-xl py-6 text-base font-semibold mt-6"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
};

export default ContactForm;

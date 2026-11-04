"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MotionConfig } from "framer-motion"

export function ThemeProvider({
    children,
    ...props
}) {
    return (
        <NextThemesProvider {...props}>
            {/* Honour the visitor's "reduce motion" system setting site-wide */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </NextThemesProvider>
    )
}

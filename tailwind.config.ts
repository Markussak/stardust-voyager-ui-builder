
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Game specific colors
				space: {
					dark: '#050510',
					nebula: '#7700AA',
					stars: '#D0E0F0',
					controls: '#3388ff',
					buttons: {
						DEFAULT: '#1a1a2e',
						border: '#4a4a5e',
						hover: '#2c2c4e',
						text: '#c0c0ff',
						glow: '#7a7aff',
					},
					ui: {
						text: '#D0E0F0',
						subtext: '#A0B0C0',
						version: '#8080A0',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'scanline': {
					'0%': { top: '-100%', opacity: '0.1' },
					'50%': { opacity: '0.3' },
					'100%': { top: '100%', opacity: '0.1' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 50%' },
					'100%': { backgroundPosition: '200% 50%' },
				},
				'stars-scroll': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '-100% -100%' },
				},
				'nebula-scroll': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '-200% -100%' },
				},
				'blink': {
					'0%, 49%': { opacity: '1' },
					'50%, 100%': { opacity: '0' },
				},
				'controls-blink': {
					'0%': { opacity: '0.5' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.5' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'scanline': 'scanline 4s linear infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'stars-scroll': 'stars-scroll 100s linear infinite',
				'nebula-scroll': 'nebula-scroll 200s linear infinite',
				'blink': 'blink 2s steps(1) infinite',
				'controls-blink': 'controls-blink 3s linear infinite',
			},
			fontFamily: {
				'pixel': ['"Press Start 2P"', 'cursive'],
				'pixel-mono': ['monospace'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

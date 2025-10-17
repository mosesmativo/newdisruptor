import type { ComponentType } from "react";
import type { StaticImageData } from "next/image";
import { z } from "zod";

export const SignInSchema = z.object({
   email: z.string().min(1, "Email is required").email("Enter a valid email"),
   password: z.string().min(8, "Password must be at least 8 characters"),
   acceptedTerms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms",
   }),
});

export type SignInValues = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
   .object({
      fullName: z.string().min(2, "Full name must be at least 2 characters"),
      email: z
         .string()
         .min(1, "Email is required")
         .email("Enter a valid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(8, "Please confirm your password"),
      acceptedTerms: z.boolean().refine((v) => v === true, {
         message: "You must accept the terms",
      }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

export type SignUpValues = z.infer<typeof SignUpSchema>;

export type User = {
   id: string;
   fullName: string;
   email: string;
   passwordHash: string;
   createdAt: string;
};

// Session payload stored in JWT and returned by getSession
export type Session = {
   sub: string;
   email: string;
   name: string;
};

// Navigation
export type NavItem = {
   label: string;
   href?: string;
   items?: NavItem[];
   icon?: ComponentType<{ className?: string }> | StaticImageData;
};
export type NavGroup = {
   id: string;
   label: string;
   href?: string;
   items?: NavItem[];
   icon?: ComponentType<{ className?: string }> | StaticImageData;
};

// Chat types
export type ChatRole = "user" | "assistant";

export type ChatMessageMeta = {
   liked?: "up" | "down" | null;
};

export type ChatMessage = {
   id: string;
   role: ChatRole;
   content: string;
   createdAt: string;
   meta?: ChatMessageMeta;
};

export type ChatThread = {
   id: string;
   title: string;
   messages: ChatMessage[];
   createdAt: string;
   updatedAt: string;
};

// Dashboard Feature cards
export type Feature = {
   title: string;
   description: string;
   href: string;
   badge?: string;
   ctaLabel?: string;
   variant?: "default" | "ai";
};

export type HeadingProps = {
   title: string;
   description?: string;
};

export type TermsSection = {
   heading: string;
   paragraphs?: string[];
   bullets?: string[];
   orderedList?: string[];
};

export type RelatedBlog = {
   slug: string;
   category: string;
   title: string;
   publishedOn: string;
   readTime: string;
   image: string;
};

export type BlogArticle = {
   id: string;
   slug: string;
   category: string;
   title: string;
   author: string;
   authorAttribution: string;
   publishedOn: string;
   readTime: string;
   heroImage: string;
   pullQuote: string;
   body: string[];
};

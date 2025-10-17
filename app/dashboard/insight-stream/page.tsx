"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { insightArticles } from "@/data/insight-articles";
import leftIcon from "@/public/icons/left.svg";
import rightIcon from "@/public/icons/right.svg";

const heroContent = {
   label: "Latest Insights",
   title: "From The Metaverse To Mixed Reality: The Future Of Human Connection",
};

const accordionSections = [
   { id: "market-insights", title: "Market Insights" },
   { id: "ai-trends", title: "AI Trends" },
   { id: "technology", title: "Technology" },
];

export default function InsightStreamPage() {
   return (
     <DashboardLayout fullWidth contentClassName="w-full pb-24 pt-0">
       <div className="mx-auto flex w-full max-w-[1128px] flex-col gap-6 px-0 pb-24 pt-6">
         <Hero />
         <section className="flex flex-col gap-3 px-6">
           <Accordion
             type="single"
             collapsible
             defaultValue="market-insights"
             className="flex flex-col gap-3"
           >
             {accordionSections.map((section) => {
               const sectionArticles = insightArticles.filter(
                 (article) =>
                   article.category.toLowerCase() ===
                   section.title.toLowerCase()
               );
               const items =
                 sectionArticles.length > 0
                   ? sectionArticles
                   : insightArticles;

               return (
                 <AccordionItem
                   key={section.id}
                   value={section.id}
                   className="rounded-[5px]"
                 >
                   <AccordionTrigger
                     className={cn(
                       "group flex w-full items-center gap-3 rounded-[5px] border border-slate-200 bg-white px-6 py-4 text-left text-[12px] font-medium text-slate-900 transition hover:bg-slate-50",
                       "data-[state=open]:mb-3 data-[state=open]:border-primary data-[state=open]:bg-primary data-[state=open]:text-white"
                     )}
                   >
                     <span className="flex items-center gap-3">
                       <Plus className="plus-icon h-5 w-5 text-primary transition group-data-[state=open]:hidden" />
                       <Minus className="minus-icon hidden h-5 w-5 text-primary transition group-data-[state=open]:inline-flex group-data-[state=open]:text-white" />
                       <span className="text-[14px] font-medium uppercase text-[#0E4942] group-data-[state=open]:text-white">
                         {section.title}
                       </span>
                     </span>
                   </AccordionTrigger>
                   <AccordionContent className="bg-transparent px-0 pb-6 pt-4">
                     <div className="grid gap-6 md:grid-cols-3">
                       {items.map((article) => (
                         <Link
                           key={`${section.id}-${article.id}`}
                           href={`/dashboard/insight-stream/${article.slug}`}
                           className="group flex flex-col gap-4"
                         >
                           <div className="relative aspect-[3/2] w-full overflow-hidden">
                             <Image
                               src={article.image}
                               alt={article.title}
                               fill
                               sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 100vw"
                               className="object-cover transition duration-500 group-hover:scale-[1.02]"
                               priority={
                                 section.id === "market-insights" &&
                                 article.id === "ai-media"
                               }
                             />
                           </div>

                           <div className="flex flex-col gap-2">
                             <p className="text-xs uppercase tracking-[0.3em] text-primary">
                               {article.category}
                             </p>
                             <h3 className="text-lg font-semibold leading-snug text-slate-900">
                               {article.title.length > 40
                                 ? `${article.title.slice(0, 40)}…`
                                 : article.title}
                             </h3>
                             <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
                               {`${article.date} | ${article.readTime}`}
                             </p>
                           </div>
                         </Link>
                       ))}
                     </div>
                   </AccordionContent>
                 </AccordionItem>
               );
             })}
           </Accordion>
         </section>
       </div>
     </DashboardLayout>
   );
}

function Hero() {
   return (
      <section className="relative w-full overflow-hidden rounded-[5px] bg-black text-white">
         <div className="relative h-[30vh] min-h-[280px]">
            <video
               className="pointer-events-none absolute inset-0 h-full w-full object-cover"
               src="/top-heading-video.mp4"
               autoPlay
               muted
               loop
               playsInline
               preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/80" />

            <div className="absolute inset-y-0 inset-x-0 z-10 flex items-center justify-between px-4 lg:px-6 pointer-events-none">
               <Button
                  type="button"
                  variant="ghost"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center bg-transparent text-white hover:bg-transparent hover:text-white/80 sm:h-14 sm:w-14">
                  <Image
                     src={leftIcon}
                     alt=""
                     width={20}
                     height={20}
                     className="h-6 w-6 sm:h-7 sm:w-7"
                     aria-hidden={true}
                  />
               </Button>

               <Button
                  type="button"
                  variant="ghost"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center bg-transparent text-white hover:bg-transparent hover:text-white/80 sm:h-14 sm:w-14">
                  <Image
                     src={rightIcon}
                     alt=""
                     width={20}
                     height={20}
                     className="h-6 w-6 sm:h-7 sm:w-7"
                     aria-hidden={true}
                  />
               </Button>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-6 text-center">
               <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                  {heroContent.label}
               </p>
               <h1 className="max-w-2xl text-2xl font-normal leading-snug md:text-3xl lg:text-[2.25rem]">
                  {heroContent.title}
               </h1>
            </div>
         </div>
      </section>
   );
}

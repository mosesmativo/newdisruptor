import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

const discoveryInsights = [
   {
      image: "/The-Human-AI-Partnership.jpg",
      title: "The Human AI Partnership",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
   {
      image: "/From-Algorithms-to-Empathy.jpg",
      title: "From Algorithms To Empathy",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
   {
      image: "/AI-in-Africa.jpg",
      title: "All In Africa",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
   {
      image: "/The-Human-AI-Partnership-second.jpg",
      title: "The Human AI Partnership",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
   {
      image: "/From-Algorithms-to-Empathy-two.jpg",
      title: "From Algorithms To Empathy",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
   {
      image: "/AI-in-Africa-second.jpg",
      title: "All In Africa",
      category: "MARKET INSIGHTS",
      readTime: "4 MINUTE READ",
   },
] as const;

export default function AudienceDiscoveryPage() {
   return (
      <DashboardLayout fullWidth contentClassName="px-0 pb-24 pt-4">
         <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-4">
            <section className="relative flex min-h-[25vh] w-full items-center justify-center overflow-hidden rounded-[5px]">
               <Image
                  src="/AI-in-Africa.jpg"
                  alt="Audience discovery hero"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1280px) 1120px, 100vw"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
               <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center">
                  <h1 className="space-grotesk text-xl text-white md:text-4xl">
                     Audience Discovery
                  </h1>
               </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 px-4">
               {discoveryInsights.map((insight) => (
                  <Card
                     key={`${insight.title}-${insight.image}`}
                     className="border-0 rounded-none bg-transparent p-0 shadow-none">
                     <div className="relative w-full pb-[75%]">
                        <Image
                           src={insight.image}
                           alt={insight.title}
                           fill
                           className="object-cover"
                           sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 100vw"
                        />
                     </div>
                     <CardHeader className="px-0 pt-4 pb-2">
                        <span className="text-[10px] font-semibold uppercase text-slate-700">
                           {insight.category}
                        </span>
                        <CardTitle className="space-grotesk text-lg font-semibold leading-tight text-black">
                           {insight.title}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="px-0 pb-4 text-[0.7rem] font-semibold uppercase text-slate-500">
                        {insight.readTime}
                     </CardContent>
                  </Card>
               ))}
            </section>
         </div>
      </DashboardLayout>
   );
}

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ChannelFlowHero } from "@/components/channel-flow/channel-flow-hero";
import { ChannelFlowChatPanel } from "@/components/channel-flow/channel-flow-chat-panel";
import NewDashBoard from "@/public/new-dashboard.png"
import Image from "next/image";

export default function ChannelFlowPage() {
   return (
     <DashboardLayout>
       <div className="space-y-8">
         <ChannelFlowHero />

         <div className="relative grid items-start auto-rows-auto gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] px-6">
           <section className="min-h-[520px] rounded-[5px]">
             <div className="h-full w-full">
               <Image
                 src={NewDashBoard.src}
                 alt="New Dashboard"
                 width={1440}
                 height={720}
                 objectFit="cover"
                 className="w-full h-full"
               />
             </div>
           </section>
           <ChannelFlowChatPanel />
         </div>
       </div>
     </DashboardLayout>
   );
}

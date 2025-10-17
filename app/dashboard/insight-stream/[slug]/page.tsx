import type { ReactNode } from "react";

import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  insightArticles,
  getInsightBySlug,
  type InsightContentBlock,
} from "@/data/insight-articles";
import backHomeIcon from "@/public/icons/back-home-icon.svg";

type InsightDetailsPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return insightArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({
  params,
}: InsightDetailsPageProps): Metadata {
  const article = getInsightBySlug(params.slug);

  if (!article) {
    return {
      title: "Insight not found • Disruptor",
    };
  }

  return {
    title: `${article.title} • Insight Stream`,
    description: article.summary,
  };
}

export default function InsightDetailsPage({ params }: InsightDetailsPageProps) {
  const article = getInsightBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const moreInsights = insightArticles.filter(
    (item) => item.slug !== article.slug
  );

  return (
    <DashboardLayout fullWidth contentClassName="w-full pb-24 pt-0">
      <div className="mx-auto flex w-full max-w-[1128px] flex-col gap-6 pb-24 pt-6 px-1">
        <Link
          href="/dashboard/insight-stream"
          className="group inline-flex items-center gap-2 text-[16px] font-medium text-primary"
        >
          <span className="inline-flex items-center justify-center p-1 transition">
            <Image
              src={backHomeIcon}
              alt="close"
              width={46}
              height={46}
              className="h-6 w-6"
            />
          </span>
          Back to Insights
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
          <div className="relative overflow-hidden rounded-[5px] lg:col-span-2">
            <div className="relative h-[30vh] min-h-[30vh] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1128px) 1128px, 100vw"
                className="object-cover filter brightness-[0.95] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center sm:px-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/85">
                  {article.category}
                </span>
                <h1 className="max-w-3xl text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[2.35rem]">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>

          <article className="space-y-8 lg:row-start-2">
            <header className="space-y-3">
              <p className="text-xs font-semibold uppercase text-slate-500">
                {article.date} | {article.readTime.toUpperCase()}
              </p>
              <p className="max-w-[720px] text-base leading-relaxed text-slate-700">
                {article.summary}
              </p>
            </header>

            <div className="space-y-6 text-base leading-relaxed text-slate-700">
              {article.content.map((block, index) => (
                <ContentBlock
                  key={`${article.slug}-block-${index}`}
                  block={block}
                />
              ))}
            </div>

            <footer className="pt-2">
              <SocialSharePanel />
            </footer>
          </article>

          <aside className="space-y-4 lg:row-start-2">
            <Card className="rounded-[5px] border border-slate-200/90 bg-white shadow-none">
              <CardHeader className="pt-5 pb-0">
                <CardTitle className="text-base  text-slate-600">
                  More Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col divide-y divide-slate-100 p-0">
                {moreInsights.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dashboard/insight-stream/${item.slug}`}
                    className="flex items-center gap-4 px-5 py-5 transition hover:bg-slate-50"
                  >
                    <div className="relative size-[68px] overflow-hidden shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="74px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase text-slate-500">
                        {item.category}
                      </span>
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-[11px] font-medium uppercase text-slate-500">
                        {item.date} | {item.readTime.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ContentBlock({ block }: { block: InsightContentBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="text-lg font-semibold text-slate-900">{block.content}</h2>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed text-slate-700">
        {block.items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    );
  }

  return (
    <p className="text-base leading-relaxed text-slate-700">{block.content}</p>
  );
}

function SocialSharePanel() {
  return (
    <div className="flex w-full justify-center sm:justify-start">
      <div className="flex items-center gap-[16px] rounded-[35px] bg-white px-[14px] shadow-[0px_0px_20px_rgba(0,0,0,0.1)] py-2">
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-[#5B6770]">
          Share
        </span>
        <div className="flex items-center gap-1">
          <SocialActionButton label="Share on Twitter">
            <TwitterIcon />
          </SocialActionButton>
          <SocialActionButton label="Share on Facebook">
            <FacebookIcon />
          </SocialActionButton>
          <SocialActionButton label="Share on LinkedIn">
            <LinkedinIcon />
          </SocialActionButton>
          <SocialActionButton label="Share via Email">
            <MailIcon />
          </SocialActionButton>
        </div>
      </div>
    </div>
  );
}

function SocialActionButton({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-[32px] items-center justify-center rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 px-0"
    >
      {children}
    </button>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-[15.6px] w-[19.2px]"}
    >
      <path
        d="M19.2114 1.84803C18.5051 2.16196 17.7451 2.37372 16.9476 2.46849C17.7618 1.98102 18.3862 1.20886 18.6806 0.287739C17.919 0.739721 17.0759 1.06769 16.1778 1.24474C15.459 0.478827 14.4346 -6.33614e-05 13.3009 -6.33614e-05C11.1244 -6.33614e-05 9.35981 1.76458 9.35981 3.94143C9.35981 4.2499 9.39451 4.55057 9.46198 4.83954C6.18618 4.67497 3.28164 3.1061 1.33761 0.721392C0.99833 1.30324 0.804121 1.98023 0.804121 2.70325C0.804121 4.07051 1.49984 5.27709 2.55745 5.98373C1.91165 5.96306 1.30368 5.78562 0.772143 5.49041C0.771753 5.50679 0.771753 5.52356 0.771753 5.54033C0.771753 7.44965 2.13043 9.04231 3.93368 9.40499C3.60298 9.49468 3.25473 9.54304 2.89517 9.54304C2.64091 9.54304 2.39405 9.51847 2.15344 9.47207C2.65534 11.0378 4.11073 12.1777 5.8352 12.2093C4.48628 13.2665 2.78715 13.8967 0.940223 13.8967C0.622393 13.8967 0.308462 13.878 -9.29647e-06 13.8414C1.74474 14.9602 3.8163 15.6122 6.04189 15.6122C13.2919 15.6122 17.256 9.60661 17.256 4.39809C17.256 4.22728 17.2525 4.05686 17.2451 3.88761C18.0149 3.33306 18.6834 2.63851 19.2114 1.84803Z"
        fill="#1DA1F2"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-[15.6px] w-[7.25px]"}
    >
      <path
        d="M7.25451 5.05527H4.78389V3.4349C4.78389 2.82638 5.1872 2.6845 5.47127 2.6845C5.75469 2.6845 7.21476 2.6845 7.21476 2.6845V0.00931035L4.81362 -6.14903e-05C2.14812 -6.14903e-05 1.54153 1.99519 1.54153 3.27203V5.05527H1.27546e-05L1.27546e-05 7.81191H1.54153C1.54153 11.3496 1.54153 15.6122 1.54153 15.6122H4.78389C4.78389 15.6122 4.78389 11.3076 4.78389 7.81191H6.97174L7.25451 5.05527Z"
        fill="#1877F2"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-[17.8px] w-[17.7px]"}
    >
      <path d="M9.5355 8.04919V8.02007C9.52945 8.0299 9.52302 8.03973 9.51659 8.04919H9.5355Z" fill="#0A66C2" />
      <path
        d="M16.4196 0.000149502L1.30974 0.000149502C0.586539 0.000149502 1.15885e-05 0.572686 1.15885e-05 1.27831L1.15885e-05 16.565C1.15885e-05 17.2702 0.586539 17.8428 1.30974 17.8428H16.4196C17.1438 17.8428 17.7304 17.2699 17.7304 16.565V1.27831C17.7304 0.572328 17.1435 0.000149502 16.4196 0.000149502ZM5.37418 14.9367H2.69624V6.87992H5.37418V14.9367ZM4.03539 5.77933H4.01746C3.11919 5.77933 2.53804 5.16051 2.53804 4.38745C2.53804 3.59716 3.13713 2.99557 4.05297 2.99557C4.96917 2.99557 5.53274 3.59716 5.55068 4.38745C5.55068 5.16051 4.96881 5.77933 4.03539 5.77933ZM15.0309 14.9367H12.353V10.6254C12.353 9.54279 11.9655 8.8038 10.9966 8.8038C10.2569 8.8038 9.81637 9.30208 9.62229 9.7835C9.55162 9.95533 9.5344 10.1957 9.5344 10.4368V14.9363H6.85646C6.85646 14.9363 6.89162 7.63469 6.85646 6.87956H9.5344V8.01997C9.89026 7.47111 10.5267 6.68943 11.9483 6.68943C13.71 6.68943 15.0313 7.84132 15.0313 10.3162V14.9367H15.0309Z"
        fill="#0A66C2"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-[13.9px] w-[17.4px]"}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8083 12.1963H2.6123C2.1323 12.1963 1.74116 11.806 1.74116 11.3251V2.83144L8.18763 7.6663C8.3427 7.78303 8.52651 7.84053 8.71032 7.84053C8.89413 7.84053 9.07794 7.78303 9.23301 7.6663L15.6795 2.83144V11.3251C15.6795 11.806 15.2883 12.1963 14.8083 12.1963V12.1963ZM14.2298 1.74267L8.71287 5.88061L3.19591 1.74267H14.2298ZM14.8095 0L2.61344 0C1.17256 0 0 1.17256 0 2.61344L0 11.3249C0 12.7658 1.17256 13.9383 2.61344 13.9383H14.8095C16.2504 13.9383 17.4229 12.7658 17.4229 11.3249V2.61344C17.4229 1.17256 16.2504 0 14.8095 0V0Z"
        fill="#5B6770"
      />
    </svg>
  );
}

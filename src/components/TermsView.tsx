import { TERMS_ARTICLES, TERMS_INTRO } from "@/lib/terms";

export default function TermsView() {
  return (
    <section className="page-gutter py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="display mb-2 text-5xl md:text-6xl">Terms</h1>
        <p className="mb-8 text-lg text-muted">Terms and Conditions</p>

        <div className="space-y-5 text-[0.98rem] leading-relaxed text-cream/85">
          {TERMS_INTRO.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 space-y-10">
          {TERMS_ARTICLES.map((article) => (
            <article key={article.title}>
              <h2 className="display mb-4 text-2xl md:text-3xl">
                {article.title}
              </h2>
              <div className="space-y-4 text-[0.98rem] leading-relaxed text-cream/85">
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

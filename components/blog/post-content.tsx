export function PostContent({ html }: { html: string }) {
  return (
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <article
        className="blog-prose"
        // Content comes from the WordPress REST API (rozper.com) which we trust.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

import type { Metadata } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { BlogHero } from "@/components/blog/hero"
import { BlogPostsSection } from "@/components/blog/posts"
import { BlogTopics } from "@/components/blog/topics"
import { BlogNewsletter } from "@/components/blog/newsletter"
import { fetchAllPosts } from "@/lib/blog-api"

export const metadata: Metadata = {
  title: "Blog · Field notes from the global voice layer | Rozper",
  description:
    "Research, engineering deep-dives, and operator playbooks from the team routing 2.4M+ daily calls across 150+ countries. AI agents, contact center, wholesale voice, and more.",
  keywords:
    "Rozper blog, voice AI research, contact center playbook, wholesale voice, SIP trunking, UCaaS engineering",
  openGraph: {
    title: "Blog · Field notes from the global voice layer | Rozper",
    description:
      "Research, engineering deep-dives, and operator playbooks from the team routing 2.4M+ daily calls across 150+ countries.",
    type: "website",
  },
}

// Refresh the listing every 30 min via ISR.
export const revalidate = 1800

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof fetchAllPosts>>["posts"] = []
  let fetchError: string | null = null
  try {
    const result = await fetchAllPosts()
    posts = result.posts
  } catch (err) {
    console.error("blog: failed to fetch posts", err)
    fetchError = err instanceof Error ? err.message : String(err)
  }

  return (
    <main className="min-h-screen bg-[#0B1220]">
      <Navbar />
      {/* BlogHero and BlogPostsSection both read `?q=` via useSearchParams,
          which Next.js requires to be wrapped in <Suspense> on statically
          rendered pages. */}
      <Suspense fallback={null}>
        <BlogHero />
      </Suspense>
      <Suspense fallback={null}>
        <BlogPostsSection posts={posts} fetchError={fetchError} />
      </Suspense>
      <BlogTopics />
      <BlogNewsletter />
      <Footer />
    </main>
  )
}

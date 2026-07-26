import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { BLOG_POSTS } from '../../data/defaultData';
import { BlogPost } from '../../types';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory !== 'All' && post.category !== activeCategory) return false;
    return true;
  });

  if (selectedPost) {
    return (
      <div className="space-y-8 py-8 animate-in fade-in duration-200">
        <button
          type="button"
          onClick={() => setSelectedPost(null)}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
        >
          ← Back to All Articles
        </button>

        <Card className="p-8 space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="info">{selectedPost.category}</Badge>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readingTimeMinutes} min read
              </span>
              <span className="text-xs text-zinc-400">• Published {selectedPost.publishedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pt-2">
              <UserCheck className="w-4 h-4 text-indigo-500" />
              <span>By {selectedPost.author}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-zinc-700 dark:text-zinc-300">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2">
            {selectedPost.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-8">
      {/* Header Banner */}
      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Articles & Educational Documentation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          AI Evaluation & LLM Engineering Blog
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
          In-depth technical guides, evaluation methodologies, prompt engineering strategies, and research observations authored by Haruna Kuforiji.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="p-6 space-y-4 flex flex-col justify-between hover:border-indigo-500/50 transition-all cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="info">{post.category}</Badge>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

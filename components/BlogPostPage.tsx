

import React from 'react';
import type { BlogPost } from './blogData';

interface BlogPostPageProps {
    post: BlogPost;
    allPosts: BlogPost[];
    onSelectPost: (post: BlogPost) => void;
    onBack: () => void;
}

const RelatedArticleCard: React.FC<{ post: BlogPost; onSelectPost: (post: BlogPost) => void }> = ({ post, onSelectPost }) => {
    return (
        <div onClick={() => onSelectPost(post)} className="group cursor-pointer" role="link">
            <div className="overflow-hidden rounded-lg mb-4">
                <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-sm font-semibold text-gray-800 uppercase tracking-wider">{post.category}</p>
            <h4 className="font-bold text-lg mt-1 group-hover:text-gray-700 transition-colors">{post.title}</h4>
        </div>
    );
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, allPosts, onSelectPost, onBack }) => {
    const currentIndex = allPosts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    const relatedPosts = allPosts
        .filter(p => p.id !== post.id) // Exclude current post
        .sort((a, b) => (a.category === post.category ? -1 : b.category === post.category ? 1 : 0)) // Prioritize same category
        .slice(0, 3);

    const navButtonClasses = "py-2 px-5 rounded-lg font-semibold border-2 border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white transition-colors duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="text-black hover:text-gray-700 font-semibold transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al blog
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <article>
                    <header className="mb-8">
                        <p className="text-base font-semibold text-gray-800 uppercase tracking-wider">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight my-3">{post.title}</h1>
                        <div className="text-sm text-gray-500">
                            <span>Por {post.author}</span> &bull; <span>{post.date}</span>
                        </div>
                    </header>
                    
                    <div className="mb-8">
                        <img src={post.headerImageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-black prose-h2:font-bold prose-h2:text-2xl prose-blockquote:border-gray-300 prose-blockquote:text-gray-600 prose-strong:text-black">
                        {post.content}
                    </div>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16 pt-12 border-t">
                        <h2 className="text-3xl font-bold text-center mb-8">Artículos Relacionados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {relatedPosts.map(related => (
                                <RelatedArticleCard key={related.id} post={related} onSelectPost={onSelectPost} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Post Navigation */}
                <nav className="mt-16 pt-8 border-t flex justify-between items-center">
                    {prevPost ? (
                        <button onClick={() => onSelectPost(prevPost)} className={navButtonClasses}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Anterior
                        </button>
                    ) : <div />}
                    {nextPost ? (
                        <button onClick={() => onSelectPost(nextPost)} className={navButtonClasses}>
                            Siguiente
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    ) : <div />}
                </nav>
            </div>
        </div>
    );
};

export default BlogPostPage;

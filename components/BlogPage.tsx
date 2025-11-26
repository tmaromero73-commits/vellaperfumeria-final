
import React, { useState } from 'react';
import type { BlogPost } from './blogData';

interface BlogPageProps {
    posts: BlogPost[];
    onSelectPost: (post: BlogPost) => void;
}

// --- Components for Grid View ---

const FeaturedBlogCard: React.FC<{ post: BlogPost, onSelectPost: (post: BlogPost) => void }> = ({ post, onSelectPost }) => {
    return (
        <div 
            onClick={() => onSelectPost(post)} 
            className="group cursor-pointer md:grid md:grid-cols-2 md:gap-12 items-center mb-16 border-b border-fuchsia-100 pb-12 animate-fade-in"
            role="article"
            aria-labelledby={`featured-blog-title-${post.id}`}
        >
            <div className="overflow-hidden rounded-2xl shadow-lg relative">
                <img src={post.headerImageUrl} alt={post.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="mt-8 md:mt-0">
                 <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)] text-fuchsia-900 text-xs font-bold uppercase tracking-wider mb-4 border border-fuchsia-200">
                    {post.category}
                 </span>
                <h2 id={`featured-blog-title-${post.id}`} className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2 group-hover:text-[var(--color-primary-solid)] transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center text-xs font-bold text-fuchsia-800 border border-fuchsia-200">VP</div>
                        <span>{post.author}</span>
                    </div>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                </div>
                <div className="mt-6">
                     <span className="inline-flex items-center font-bold text-[var(--color-primary-solid)] hover:text-fuchsia-800 transition-colors border-b-2 border-transparent hover:border-[var(--color-primary-solid)]">
                        Leer artículo completo 
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

const BlogCard: React.FC<{ post: BlogPost, onSelectPost: (post: BlogPost) => void }> = ({ post, onSelectPost }) => {
    return (
        <div 
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col group cursor-pointer border border-fuchsia-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full ring-1 ring-black/5"
            onClick={() => onSelectPost(post)}
            role="article"
            aria-labelledby={`blog-title-${post.id}`}
        >
            <div className="relative h-56 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary-solid)] shadow-sm border border-fuchsia-100">
                    {post.category}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-medium text-fuchsia-400 mb-2 uppercase tracking-wide">{post.date}</div>
                <h3 id={`blog-title-${post.id}`} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary-solid)] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--color-primary-solid)] group-hover:underline">Leer más</span>
                    <svg className="w-5 h-5 text-fuchsia-300 group-hover:text-[var(--color-primary-solid)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
        </div>
    );
};

// --- Components for Timeline View ---

const TimelineView: React.FC<{ posts: BlogPost[], onSelectPost: (post: BlogPost) => void }> = ({ posts, onSelectPost }) => {
    return (
        <div className="relative py-8 md:py-16">
            {/* Central Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-fuchsia-200"></div>
            
            {/* Left Line for Mobile */}
            <div className="md:hidden absolute left-6 w-0.5 h-full bg-fuchsia-200"></div>

            <div className="flex flex-col space-y-12">
                {posts.map((post, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div key={post.id} className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            
                            {/* Content Card */}
                            <div className="w-full md:w-5/12 pl-16 md:pl-0 md:px-0">
                                <div 
                                    onClick={() => onSelectPost(post)}
                                    className={`bg-white rounded-2xl shadow-sm border border-fuchsia-100 cursor-pointer hover:shadow-xl hover:border-fuchsia-300 transition-all duration-300 group overflow-hidden transform hover:-translate-y-1 ${isLeft ? 'md:mr-10' : 'md:ml-10'}`}
                                >
                                    <div className="h-56 overflow-hidden relative">
                                         <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary-solid)] shadow-sm">
                                            {post.category}
                                         </div>
                                         <div className="absolute bottom-4 left-4 text-white">
                                             <div className="text-xs font-bold opacity-90 uppercase tracking-widest mb-1">{post.date}</div>
                                             <h3 className="text-lg font-bold leading-tight group-hover:text-fuchsia-200 transition-colors">{post.title}</h3>
                                         </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                                        <div className="flex items-center font-bold text-sm text-[var(--color-primary-solid)]">
                                            Leer historia
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Center Dot (Absolute positioning for responsiveness) */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-4 bg-white border-2 border-[var(--color-primary-solid)] rounded-full shadow-md z-10 mt-6 md:mt-0">
                                <div className="w-1.5 h-1.5 bg-[var(--color-primary-solid)] rounded-full"></div>
                            </div>
                            
                            {/* Date Marker for Desktop */}
                            <div className={`hidden md:flex absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'left-[53%] text-left' : 'right-[53%] text-right'} w-5/12 text-sm font-semibold text-fuchsia-400 uppercase tracking-widest`}>
                                {post.date}
                            </div>

                            {/* Spacer for grid alignment on desktop */}
                            <div className="hidden md:block w-5/12"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');
    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12 animate-fade-in">
                <span className="text-[var(--color-primary-solid)] font-bold tracking-wider uppercase text-sm border-b-2 border-[var(--color-primary)] pb-1">Beauty Blog</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mt-6 mb-4">Inspiración y Estilismo</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-light leading-relaxed">
                    Descubre las últimas tendencias, tutoriales y secretos de belleza en nuestra galería.
                </p>
                
                {/* Toggle Controls */}
                <div className="mt-8 inline-flex bg-gray-100 p-1 rounded-full relative shadow-inner">
                    <div 
                        className={`absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300 ease-out`}
                        style={{ 
                            left: viewMode === 'grid' ? '4px' : '50%', 
                            width: 'calc(50% - 4px)' 
                        }}
                    ></div>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 ${viewMode === 'grid' ? 'text-[var(--color-primary-solid)]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Cuadrícula
                    </button>
                    <button 
                        onClick={() => setViewMode('timeline')}
                        className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 ${viewMode === 'timeline' ? 'text-[var(--color-primary-solid)]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Timeline
                    </button>
                </div>
            </div>
            
            {viewMode === 'grid' ? (
                <div className="animate-fade-in">
                    {featuredPost && <FeaturedBlogCard post={featuredPost} onSelectPost={onSelectPost} />}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map(post => (
                            <BlogCard key={post.id} post={post} onSelectPost={onSelectPost} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <TimelineView posts={posts} onSelectPost={onSelectPost} />
                </div>
            )}
            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default BlogPage;




import React from 'react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const ChevronRightIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <div className="mx-2" aria-hidden="true">
                <ChevronRightIcon />
              </div>
            )}
            {/* Allow link if it's NOT the last item OR if it has a target (external link) */}
            {(item.href || item.onClick) && (index < items.length - 1 || item.target) ? (
              item.href ? (
                   <a 
                      href={item.href}
                      target={item.target || '_self'}
                      className="hover:text-[var(--color-primary-solid)] hover-underline-effect"
                   >
                      {item.label}
                   </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-[var(--color-primary-solid)] hover-underline-effect"
                >
                  {item.label}
                </button>
              )
            ) : (
              <span className="font-semibold text-brand-primary" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

import React, { lazy, Suspense } from 'react';
const ResearchStudio = lazy(() => import('./ResearchStudio.jsx'));

export default function ResearchPlanner({ lang, tree, showGuide = false }) {
  return <section className="tools-workspace research-local-planner" data-local-research={tree || 'all'}>
    <Suspense fallback={<p className="tool-note" role="status">…</p>}>
      <ResearchStudio lang={lang} initialTree={tree} showGuide={showGuide} />
    </Suspense>
  </section>;
}

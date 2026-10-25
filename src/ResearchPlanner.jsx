import React, { lazy, Suspense } from 'react';
const AdvancedTools = lazy(() => import('./AdvancedTools.jsx'));

export default function ResearchPlanner({ lang, tree }) {
  return <section className="tools-workspace research-local-planner" data-local-research={tree || 'all'}>
    <Suspense fallback={<p className="tool-note" role="status">…</p>}>
      <AdvancedTools tab="research" lang={lang} initialTree={tree} hideSource />
    </Suspense>
  </section>;
}

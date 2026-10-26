import React, { lazy, Suspense } from 'react';
const AdvancedTools = lazy(() => import('./AdvancedTools.jsx'));
export default function CardBuildingTools({ lang }) {
  return <section className="tools-workspace" data-card-tool="buildings">
    <Suspense fallback={<p role="status" className="tool-note">…</p>}><AdvancedTools tab="buildings" lang={lang} /></Suspense>
  </section>;
}

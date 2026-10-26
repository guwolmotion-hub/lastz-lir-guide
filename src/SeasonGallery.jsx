import React, { useRef, useState } from 'react';
import './season-gallery.css';

const copy = {
  ko: ['원문 게임 화면', '사진을 누르면 크게 볼 수 있습니다. 사진 속 문구는 한국어 원문이며, 설명은 선택한 언어로 제공됩니다.', '닫기', '이미지 확대'],
  en: ['Original game screenshots', 'Select a screenshot to enlarge it. Images retain the Korean original; the guide text is translated.', 'Close', 'Enlarge image'],
  es: ['Capturas originales del juego', 'Pulsa una imagen para ampliarla. Las capturas conservan el coreano original; la guía está traducida.', 'Cerrar', 'Ampliar imagen'],
  hi: ['मूल गेम के स्क्रीनशॉट', 'बड़ा देखने के लिए चित्र दबाएँ। चित्रों में मूल कोरियाई पाठ है; समझाने वाला पाठ चुनी हुई भाषा में है।', 'बंद करें', 'चित्र बड़ा करें'],
};

export default function SeasonGallery({ images, lang }) {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  if (!images?.length) return null;
  const labels = copy[lang];
  const open = item => { setSelected(item); dialog.current.showModal(); };
  return <section className="season-gallery" aria-label={labels[0]}>
    <h4>{labels[0]}</h4><p>{labels[1]}</p>
    <div className="season-photos">{images.map(item => <figure key={item.src}>
      <button type="button" onClick={() => open(item)} aria-label={`${labels[3]}: ${item.caption}`}>
        <img src={`${import.meta.env.BASE_URL}season2/${item.src}.webp`} alt={item.caption} loading="lazy" width={item.width} height={item.height} />
        <span aria-hidden="true">↗</span>
      </button><figcaption>{item.caption}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} className="season-photo-dialog" onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
      <div className="season-photo-toolbar"><p>{selected?.caption}</p><button type="button" onClick={() => dialog.current.close()}>{labels[2]} ×</button></div>
      {selected && <img src={`${import.meta.env.BASE_URL}season2/${selected.src}.webp`} alt={selected.caption} />}
    </dialog>
  </section>;
}

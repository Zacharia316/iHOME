import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rvbwyltdlpmswkqiybht.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Ynd5bHRkbHBtc3drcWl5Ymh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MTczNjUsImV4cCI6MjA5NzA5MzM2NX0.zb17uLLK0dSnvNznbALm1x60yEZB5rBoWVKopIdOJIE'
);

const C = {
  bg: '#0A0C10',
  bg2: '#0D1117',
  glass: 'rgba(255,255,255,0.035)',
  glassBorder: 'rgba(255,255,255,0.07)',
  glassHi: 'rgba(255,255,255,0.06)',
  blue: '#2DD4FF',
  orange: '#FF7A3D',
  green: '#4ADE80',
  text: '#F1F3F7',
  muted: '#7C8696',
};

/* ---------------- Icons ---------------- */
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.4 16.4 21 21" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="1.8" fill={C.bg} />
      <circle cx="15" cy="12" r="1.8" fill={C.bg} />
      <circle cx="11" cy="18" r="1.8" fill={C.bg} />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12 20.5 2.5M16 7 19 10M13 10 15.5 12.5" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5h12V10" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z" />
      <path d="M8 4v14M14 6v14" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" strokeWidth="2.5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 12.5h18M7 9.5V6.5h4v3M3 18v3M21 18v3" />
    </>
  ),
  heart: <path d="M12 21s-7-4.35-9.33-8.6A5.4 5.4 0 0 1 12 5.2a5.4 5.4 0 0 1 9.33 7.2C19 16.65 12 21 12 21z" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  mic: (
    <>
      <path d="M12 1.5a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-7 0v-6A3.5 3.5 0 0 1 12 1.5z" />
      <path d="M19 11a7 7 0 0 1-14 0M12 18v4M8.5 22h7" />
    </>
  ),
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  sparkle: <path d="M12 2l1.8 5.4L19.2 9l-5.4 1.8L12 16.2 10.2 10.8 4.8 9l5.4-1.6z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  message: <path d="M21 11.5a8.38 8.38 0 0 1-9 8.34A8.38 8.38 0 0 1 7.5 18.6L3 21l1.6-4.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 1 1 21 11.5z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a7 7 0 0 1 14 0v1" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  bell: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  video: (
    <>
      <path d="M22.5 8.5l-5 3v-5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h13.5a1 1 0 0 0 1-1v-5l5 3z" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l7 4v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4z" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="M20 6 9 17l-5-5" />,
  upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5M12 3v12" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
};

const Icon = ({ name, size = 20, style, fill = 'none' }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
    style={style}
  >
    {PATHS[name]}
  </svg>
);

/* ---------------- Signature element: Shoebill Eye ---------------- */
const Eye = ({ size = 44, thinking = false }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', flexShrink: 0, position: 'relative',
    background: `conic-gradient(from 200deg, ${C.orange}, #2a160c 35%, #060a10 55%, ${C.blue}, ${C.orange})`,
    boxShadow: thinking ? `0 0 18px ${C.blue}77, 0 0 30px ${C.orange}33` : `0 0 10px rgba(45,212,255,0.18)`,
    animation: thinking ? 'eyePulse 1.3s ease-in-out infinite' : 'none',
    transition: 'box-shadow 0.4s ease',
  }}>
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width: '40%', height: '40%', borderRadius: '50%', background: '#05080c',
      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)',
    }} />
  </div>
);

/* ---------------- Data ---------------- */
const PROPERTIES = [
  { id: 1, title: 'Modern 2 Bedroom Apartment', price: 450, type: 'rent', beds: 2, baths: 2, location: 'Avondale, Harare', tag: 'Featured', match: 88, accent: 'blue' },
  { id: 2, title: '3 Bedroom Family House', price: 680, type: 'rent', beds: 3, baths: 2, location: 'Borrowdale, Harare', tag: 'Featured', match: 92, accent: 'orange' },
  { id: 3, title: '2 Bed Cottage with Garden', price: 550, type: 'shortstay', beds: 2, baths: 1, location: 'Greendale, Harare', tag: 'Featured', match: 81, accent: 'blue' },
  { id: 4, title: 'Furnished Studio Apartment', price: 420, type: 'rent', beds: 2, baths: 2, location: 'Avenues, Harare', tag: 'Recommended', match: 95, accent: 'orange' },
  { id: 5, title: '2 Bed Apartment, City View', price: 480, type: 'rent', beds: 2, baths: 1, location: 'Westgate, Harare', tag: 'Recommended', match: 90, accent: 'blue' },
  { id: 6, title: 'Vacant Residential Stand', price: 25000, type: 'land', beds: 0, baths: 0, location: 'Mount Pleasant, Harare', tag: null, match: 70, accent: 'orange', total: true },
  { id: 7, title: 'Office Suite, Ground Floor', price: 900, type: 'commercial', beds: 0, baths: 1, location: 'CBD, Harare', tag: null, match: 75, accent: 'blue' },
  { id: 8, title: '4 Bed House with Pool', price: 185000, type: 'sale', beds: 4, baths: 3, location: 'Highlands, Harare', tag: null, match: 60, accent: 'orange', total: true },
];

const CATEGORIES = [
  { id: 'rent', label: 'For Rent', icon: 'key' },
  { id: 'sale', label: 'For Sale', icon: 'home' },
  { id: 'land', label: 'Land', icon: 'map' },
  { id: 'commercial', label: 'Commercial', icon: 'building' },
  { id: 'shortstay', label: 'Short Stay', icon: 'bed' },
];

const SUGGESTIONS = [
  'Find me a 2 bedroom apartment under $500 in Harare',
  'Show me land for sale',
  'What can Shoebill AI do?',
  'Compare 2 bed apartments in Avondale',
];

const fmt = (p, total) => total ? `$${p.toLocaleString()}` : `$${p}/mo`;

/* ---------------- Local fallback "AI" ---------------- */
function localShoebillReply(query) {
  const q = query.toLowerCase();
  if (/what.*(do|help)|capab|feature/.test(q)) {
    return {
      reply: "I can search properties in natural language, match listings to your budget and lifestyle, compare options side by side, track your dream home, and give you neighborhood insights. Try asking me for something specific!",
      ids: [],
    };
  }
  let pool = [...PROPERTIES];
  if (/rent|apartment|flat/.test(q)) pool = pool.filter(p => p.type === 'rent');
  else if (/land|stand|plot/.test(q)) pool = pool.filter(p => p.type === 'land');
  else if (/buy|sale|purchase|house/.test(q)) pool = pool.filter(p => p.type === 'sale' || p.type === 'rent');
  else if (/office|commercial|shop/.test(q)) pool = pool.filter(p => p.type === 'commercial');
  else if (/short stay|cottage|airbnb|holiday/.test(q)) pool = pool.filter(p => p.type === 'shortstay');

  const bedMatch = q.match(/(\d+)\s*-?\s*bed/);
  if (bedMatch) pool = pool.filter(p => p.beds === parseInt(bedMatch[1]));

  const priceMatch = q.match(/under\s*\$?\s*(\d+)/) || q.match(/\$\s*(\d+)/);
  if (priceMatch) pool = pool.filter(p => p.price <= parseInt(priceMatch[1]));

  const locs = ['avondale', 'borrowdale', 'greendale', 'avenues', 'westgate', 'highlands', 'cbd', 'mount pleasant', 'harare'];
  const loc = locs.find(l => q.includes(l));
  if (loc && loc !== 'harare') pool = pool.filter(p => p.location.toLowerCase().includes(loc));

  pool.sort((a, b) => b.match - a.match);
  const top = pool.slice(0, 3);

  if (top.length === 0) {
    const fallback = PROPERTIES.slice(0, 3);
    return { reply: "I couldn't find an exact match, but here are some popular listings you might like instead.", ids: fallback.map(p => p.id) };
  }
  return { reply: `I found ${pool.length} matching ${pool.length === 1 ? 'property' : 'properties'}. Here ${pool.length === 1 ? 'it is' : `are the top ${top.length}`} based on your search.`, ids: top.map(p => p.id) };
}

async function shoebillReply(query, history) {
  const systemPrompt =
    `You are Shoebill AI, the intelligent property assistant inside the iHome app. ` +
    `Be warm, concise (max 2 sentences), and helpful. ` +
    `Property database (JSON): ${JSON.stringify(PROPERTIES.map(({ id, title, price, type, beds, baths, location, total }) => ({ id, title, price, type, beds, baths, location, total })))}. ` +
    `When the user asks about properties, pick matching IDs from this database only (max 3). ` +
    `Respond with ONLY a JSON object, no markdown, in this exact shape: {"reply": string, "ids": number[]}. ` +
    `If the question isn't about properties (e.g. "what can you do"), return an empty ids array.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'openai',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: query },
        ],
      }),
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content ?? '';
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (typeof parsed.reply !== 'string' || !Array.isArray(parsed.ids)) throw new Error('bad shape');
    return parsed;
  } catch (e) {
    return localShoebillReply(query);
  }
}

/* ---------------- Property cards ---------------- */
const ImgPlaceholder = ({ accent, tall }) => (
  <div style={{
    height: tall ? 110 : 64, borderRadius: 14, flexShrink: 0,
    background: accent === 'blue'
      ? 'linear-gradient(135deg, #0c2630 0%, #0a0c10 100%)'
      : 'linear-gradient(135deg, #2b1709 0%, #0a0c10 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `1px solid ${C.glassBorder}`,
  }}>
    <Icon name="home" size={tall ? 26 : 20} style={{ color: accent === 'blue' ? C.blue : C.orange, opacity: 0.5 }} />
  </div>
);

function FeaturedCard({ p, fav, toggleFav }) {
  return (
    <div style={{
      minWidth: 180, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 18,
      padding: 10, backdropFilter: 'blur(12px)',
    }}>
      <div style={{ position: 'relative' }}>
        <ImgPlaceholder accent={p.accent} tall />
        {p.tag && (
          <span style={{
            position: 'absolute', top: 8, left: 8, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999,
            background: 'rgba(45,212,255,0.15)', color: C.blue, border: `1px solid ${C.blue}44`,
          }}>{p.tag.toUpperCase()}</span>
        )}
        <button onClick={() => toggleFav(p.id)} style={{
          position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(10,12,16,0.6)', border: `1px solid ${C.glassBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: fav ? C.orange : C.muted,
          cursor: 'pointer',
        }}>
          <Icon name="heart" size={13} fill={fav ? C.orange : 'none'} />
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ color: C.blue, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15 }}>{fmt(p.price, p.total)}</div>
        <div style={{ color: C.text, fontSize: 13, marginTop: 2, fontWeight: 500, lineHeight: 1.3 }}>{p.title}</div>
        <div style={{ color: C.muted, fontSize: 11.5, marginTop: 4 }}>{p.location}</div>
      </div>
    </div>
  );
}

function ListCard({ p, fav, toggleFav }) {
  return (
    <div style={{
      display: 'flex', gap: 12, background: C.glass, border: `1px solid ${C.glassBorder}`,
      borderRadius: 16, padding: 10, alignItems: 'center', backdropFilter: 'blur(12px)',
    }}>
      <ImgPlaceholder accent={p.accent} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.text, fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
        <div style={{ color: C.muted, fontSize: 11.5, marginTop: 3 }}>{p.location}</div>
        {p.beds > 0 && <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{p.beds} Beds &middot; {p.baths} Baths</div>}
      </div>
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ color: C.blue, fontWeight: 700, fontSize: 14, fontFamily: 'Sora, sans-serif' }}>{fmt(p.price, p.total)}</div>
        <button onClick={() => toggleFav(p.id)} style={{ color: fav ? C.orange : C.muted, lineHeight: 0, cursor: 'pointer', background: 'none', border: 'none' }}>
          <Icon name="heart" size={15} fill={fav ? C.orange : 'none'} />
        </button>
      </div>
    </div>
  );
}

function ChatPropertyCard({ p }) {
  return (
    <div style={{
      minWidth: 150, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.glassBorder}`,
      borderRadius: 14, padding: 8, flexShrink: 0,
    }}>
      <div style={{ position: 'relative' }}>
        <ImgPlaceholder accent={p.accent} />
        <span style={{
          position: 'absolute', top: 6, left: 6, fontSize: 9.5, fontWeight: 700, padding: '2px 6px',
          borderRadius: 999, background: 'rgba(74,222,128,0.15)', color: C.green, border: `1px solid ${C.green}44`,
        }}>{p.match}% MATCH</span>
      </div>
      <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, marginTop: 6, fontFamily: 'Sora, sans-serif' }}>{fmt(p.price, p.total)}</div>
      <div style={{ color: C.text, fontSize: 11.5, marginTop: 2, lineHeight: 1.25 }}>{p.title}</div>
      <div style={{ color: C.muted, fontSize: 10.5, marginTop: 2 }}>{p.location}</div>
    </div>
  );
}

/* ---------------- Bottom nav ---------------- */
function BottomNav({ items, active, onSelect }) {
  return (
    <div style={{
      position: 'sticky', bottom: 0, display: 'flex', justifyContent: 'space-around',
      padding: '10px 6px 14px', background: 'rgba(10,12,16,0.75)', backdropFilter: 'blur(16px)',
      borderTop: `1px solid ${C.glassBorder}`,
    }}>
      {items.map(item => {
        const isActive = item.id === active;
        return (
          <button key={item.id} onClick={() => onSelect(item.id)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? C.blue : C.muted, minWidth: 50, background: 'none', border: 'none', cursor: 'pointer' }}>
            <Icon name={item.icon} size={20} />
            <span style={{ fontSize: 10.5, fontWeight: 500 }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Home screen ---------------- */
function HomeScreen({ onAskAI, favs, toggleFav, activeCat, setActiveCat, search, setSearch }) {
  const pool = activeCat ? PROPERTIES.filter(p => p.type === activeCat) : PROPERTIES;
  const featured = pool.filter(p => p.tag === 'Featured');
  const recommended = pool.filter(p => p.tag !== 'Featured');
  const featuredList = featured.length ? featured : pool.slice(0, 3);
  const recommendedList = recommended.length ? recommended : pool.slice(0, 3);

  return (
    <div style={{ padding: '20px 18px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ color: C.orange }}>i</span><span style={{ color: C.text }}>Home</span>
          </div>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 1 }}>Find your perfect home</div>
        </div>
        <button onClick={onAskAI} aria-label="Ask Shoebill AI" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Eye size={42} /></button>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`,
        borderRadius: 16, padding: '12px 14px', backdropFilter: 'blur(12px)',
      }}>
        <Icon name="search" size={18} style={{ color: C.muted }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search properties, locations..."
          style={{ background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 13.5, flex: 1 }} />
        <Icon name="sliders" size={17} style={{ color: C.orange }} />
      </div>

      {/* Categories */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
        {CATEGORIES.map(c => {
          const active = activeCat === c.id;
          return (
            <button key={c.id} onClick={() => setActiveCat(active ? null : c.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 66,
                padding: '12px 8px', borderRadius: 14, background: active ? 'rgba(45,212,255,0.1)' : C.glass,
                border: `1px solid ${active ? C.blue + '66' : C.glassBorder}`, color: active ? C.blue : C.muted,
                backdropFilter: 'blur(12px)', cursor: 'pointer',
              }}>
              <Icon name={c.icon} size={18} />
              <span style={{ fontSize: 10.5, fontWeight: 500, color: active ? C.text : C.muted }}>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15.5, fontWeight: 700, color: C.text, margin: 0 }}>Featured Properties</h2>
          <span style={{ color: C.blue, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2 }}>See all <Icon name="chevronRight" size={13} /></span>
        </div>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {featuredList.map(p => <FeaturedCard key={p.id} p={p} fav={favs.has(p.id)} toggleFav={toggleFav} />)}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15.5, fontWeight: 700, color: C.text, margin: 0 }}>Recommended For You</h2>
          <span style={{ color: C.blue, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2 }}>See all <Icon name="chevronRight" size={13} /></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recommendedList.map(p => <ListCard key={p.id} p={p} fav={favs.has(p.id)} toggleFav={toggleFav} />)}
        </div>
      </section>

      {/* AI CTA */}
      <button onClick={onAskAI} style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(45,212,255,0.08), rgba(255,122,61,0.06))',
        border: `1px solid ${C.glassBorder}`, backdropFilter: 'blur(12px)', textAlign: 'left', cursor: 'pointer',
      }}>
        <Eye size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>Let Shoebill AI find your perfect match</div>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 2 }}>Describe what you're looking for, in plain language</div>
        </div>
        <Icon name="chevronRight" size={18} style={{ color: C.blue, flexShrink: 0 }} />
      </button>
    </div>
  );
}

/* ---------------- Chat screen ---------------- */
function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const send = async (text) => {
    if (!text.trim() || thinking) return;
    const userMsg = { role: 'user', content: text };
    const history = messages.map(m => ({ role: m.role, content: m.content }));
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);
    const { reply, ids } = await shoebillReply(text, history);
    const results = (ids || []).map(id => PROPERTIES.find(p => p.id === id)).filter(Boolean);
    setMessages(prev => [...prev, { role: 'assistant', content: reply, results }]);
    setThinking(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 14px',
        borderBottom: `1px solid ${C.glassBorder}`, position: 'sticky', top: 0,
        background: 'rgba(10,12,16,0.75)', backdropFilter: 'blur(16px)', zIndex: 5,
      }}>
        <button onClick={onBack} style={{ color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="chevronLeft" size={20} /></button>
        <Eye size={38} thinking={thinking} />
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15 }}>Shoebill AI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
            <span style={{ color: C.muted, fontSize: 11 }}>{thinking ? 'Thinking…' : 'Online'}</span>
          </div>
        </div>
        <Icon name="dots" size={18} style={{ color: C.muted }} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '30px 10px' }}>
            <Eye size={64} />
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 17 }}>Hello, I'm Shoebill AI</div>
              <div style={{ color: C.muted, fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>Your intelligent property assistant.<br />How can I help you today?</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 6 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  textAlign: 'left', fontSize: 12.5, color: C.text, padding: '10px 14px', borderRadius: 12,
                  background: C.glass, border: `1px solid ${C.glassBorder}`, backdropFilter: 'blur(10px)', cursor: 'pointer',
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, animation: 'fadeIn 0.25s ease' }}>
            <div style={{
              maxWidth: '80%', padding: '10px 14px', borderRadius: 16, fontSize: 13, lineHeight: 1.45,
              background: m.role === 'user' ? `linear-gradient(135deg, ${C.blue}, #1a8fb0)` : C.glass,
              color: m.role === 'user' ? '#04141a' : C.text,
              border: m.role === 'user' ? 'none' : `1px solid ${C.glassBorder}`,
              backdropFilter: m.role === 'user' ? 'none' : 'blur(10px)',
              fontWeight: m.role === 'user' ? 500 : 400,
            }}>{m.content}</div>
            {m.results && m.results.length > 0 && (
              <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', width: '100%' }}>
                {m.results.map(p => <ChatPropertyCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div style={{ display: 'flex', gap: 5, padding: '12px 16px', background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 16, alignSelf: 'flex-start' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, borderRadius: '50%', background: C.muted,
                animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px 16px',
        borderTop: `1px solid ${C.glassBorder}`, background: 'rgba(10,12,16,0.75)', backdropFilter: 'blur(16px)',
      }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: C.glass,
          border: `1px solid ${C.glassBorder}`, borderRadius: 999, padding: '10px 14px',
        }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Ask anything about properties..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 13 }} />
          <Icon name="mic" size={17} style={{ color: C.muted }} />
        </div>
        <button onClick={() => send(input)} disabled={thinking} style={{
          width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${C.orange}, ${C.blue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#04141a',
          opacity: thinking ? 0.6 : 1, cursor: 'pointer', border: 'none',
        }}>
          <Icon name="send" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Placeholder screen ---------------- */
function Placeholder({ icon, label }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: C.muted, padding: 30 }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18, background: C.glass, border: `1px solid ${C.glassBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)',
      }}>
        <Icon name={icon} size={26} style={{ color: C.blue }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: C.text, fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15 }}>{label}</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>Coming soon in the full build</div>
      </div>
    </div>
  );
}

/* ---------------- Auth: Sign In ---------------- */
function SignInScreen({ onSignIn, onGoCreate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onSignIn({ email, id: data.user.id });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 24px 32px' }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>
          <span style={{ color: C.orange }}>i</span><span style={{ color: C.text }}>Home</span>
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>Welcome back</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>Email</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 14, padding: '13px 16px' }}>
            <Icon name="user" size={16} style={{ color: C.muted, flexShrink: 0 }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
              type="email" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 14 }} />
          </div>
        </div>

        {/* Password */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 14, padding: '13px 16px' }}>
            <Icon name="key" size={16} style={{ color: C.muted, flexShrink: 0 }} />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              type={showPass ? 'text' : 'password'} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 14 }} />
            <button onClick={() => setShowPass(v => !v)} style={{ color: C.muted, fontSize: 11, background: 'none', border: 'none' }}>{showPass ? 'Hide' : 'Show'}</button>
          </div>
        </div>

        {error && <div style={{ color: '#f87171', fontSize: 12, textAlign: 'center' }}>{error}</div>}

        <div style={{ textAlign: 'right', marginTop: -6 }}>
          <span style={{ color: C.blue, fontSize: 12, cursor: 'pointer' }}>Forgot password?</span>
        </div>

        {/* Sign in btn */}
        <button onClick={handle} style={{
          marginTop: 8, padding: '15px', borderRadius: 16, fontWeight: 700, fontSize: 15,
          fontFamily: 'Sora, sans-serif', color: '#04141a', border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${C.orange}, ${C.blue})`,
        }}>{loading ? 'Signing in…' : 'Sign In'}</button>

        <div style={{ textAlign: 'center', color: C.muted, fontSize: 13, marginTop: 8 }}>
          Don't have an account?{' '}
          <span onClick={onGoCreate} style={{ color: C.blue, fontWeight: 600, cursor: 'pointer' }}>Create one</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Auth: Create Account ---------------- */
const ROLES = [
  {
    id: 'tenant',
    label: 'Tenant',
    icon: 'key',
    desc: 'Browse properties and contact landlords to rent or buy.',
    accent: C.blue,
  },
  {
    id: 'landlord',
    label: 'Landlord',
    icon: 'home',
    desc: 'List your properties with photos and manage tenants.',
    accent: C.orange,
  },
  {
    id: 'investor',
    label: 'Investor',
    icon: 'building',
    desc: 'Discover and co-invest in real estate opportunities.',
    accent: C.green,
  },
];

function CreateAccountScreen({ onCreated, onGoSignIn }) {
  const [step, setStep] = useState(1); // 1 = details, 2 = role
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');

  const handleStep1 = () => {
    if (!email.trim() || !username.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setStep(2);
  };

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!role) { setError('Please choose an account type.'); return; }
    setError('');
    setLoading(true);
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, role } },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    // Also upsert profile row
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, username, role, email });
    }
    onCreated({ email, username, role, id: data.user?.id });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 24px 32px' }}>
      {/* Logo + back */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        {step === 2 && (
          <button onClick={() => { setStep(1); setError(''); }} style={{ color: C.muted, marginRight: 12, background: 'none', border: 'none' }}>
            <Icon name="chevronLeft" size={22} />
          </button>
        )}
        <div style={{ flex: 1, textAlign: step === 2 ? 'left' : 'center' }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: step === 2 ? 20 : 36, fontWeight: 800, letterSpacing: '-0.03em' }}>
            {step === 2
              ? <><span style={{ color: C.orange }}>Choose</span><span style={{ color: C.text }}> your role</span></>
              : <><span style={{ color: C.orange }}>i</span><span style={{ color: C.text }}>Home</span></>
            }
          </div>
          <div style={{ color: C.muted, fontSize: 12.5, marginTop: 4 }}>
            {step === 1 ? 'Create your account' : 'How will you use iHome?'}
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {[1, 2].map(s => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: s <= step ? `linear-gradient(90deg, ${C.orange}, ${C.blue})` : C.glassBorder,
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      {step === 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Email', val: email, set: setEmail, type: 'email', ph: 'you@email.com', icon: 'user' },
            { label: 'Username', val: username, set: setUsername, type: 'text', ph: 'yourname', icon: 'user' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>{f.label}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 14, padding: '13px 16px' }}>
                <Icon name={f.icon} size={16} style={{ color: C.muted, flexShrink: 0 }} />
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} type={f.type}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 14 }} />
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 14, padding: '13px 16px' }}>
              <Icon name="key" size={16} style={{ color: C.muted, flexShrink: 0 }} />
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters"
                type={showPass ? 'text' : 'password'} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 14 }} />
              <button onClick={() => setShowPass(v => !v)} style={{ color: C.muted, fontSize: 11, background: 'none', border: 'none' }}>{showPass ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          {error && <div style={{ color: '#f87171', fontSize: 12, textAlign: 'center' }}>{error}</div>}

          <button onClick={handleStep1} style={{
            marginTop: 8, padding: '15px', borderRadius: 16, fontWeight: 700, fontSize: 15,
            fontFamily: 'Sora, sans-serif', color: '#04141a', border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${C.orange}, ${C.blue})`,
          }}>Continue</button>

          <div style={{ textAlign: 'center', color: C.muted, fontSize: 13, marginTop: 4 }}>
            Already have an account?{' '}
            <span onClick={onGoSignIn} style={{ color: C.blue, fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ROLES.map(r => {
            const selected = role === r.id;
            return (
              <button key={r.id} onClick={() => setRole(r.id)} style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 16px', borderRadius: 18, textAlign: 'left',
                background: selected ? `rgba(${r.accent === C.blue ? '45,212,255' : r.accent === C.orange ? '255,122,61' : '74,222,128'},0.08)` : C.glass,
                border: `1.5px solid ${selected ? r.accent + '88' : C.glassBorder}`,
                backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: selected ? `rgba(${r.accent === C.blue ? '45,212,255' : r.accent === C.orange ? '255,122,61' : '74,222,128'},0.15)` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${selected ? r.accent + '55' : C.glassBorder}`,
                  color: selected ? r.accent : C.muted,
                }}>
                  <Icon name={r.icon} size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: selected ? r.accent : C.text, fontWeight: 700, fontSize: 15, fontFamily: 'Sora, sans-serif' }}>{r.label}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{r.desc}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${selected ? r.accent : C.glassBorder}`,
                  background: selected ? r.accent : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {selected && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#04141a' }} />}
                </div>
              </button>
            );
          })}

          {error && <div style={{ color: '#f87171', fontSize: 12, textAlign: 'center' }}>{error}</div>}

          <button onClick={handleCreate} style={{
            marginTop: 8, padding: '15px', borderRadius: 16, fontWeight: 700, fontSize: 15,
            fontFamily: 'Sora, sans-serif', color: '#04141a', border: 'none', cursor: 'pointer',
            background: role ? `linear-gradient(135deg, ${C.orange}, ${C.blue})` : C.glassBorder,
            transition: 'background 0.3s',
          }}>{loading ? 'Creating…' : 'Create Account'}</button>
        </div>
      )}
    </div>
  );
}


/* ============================================================
   LANDLORD SCREENS
   ============================================================ */

/* Badge components */
const LandlordBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999,
    background: 'rgba(255,122,61,0.12)', border: '1px solid rgba(255,122,61,0.35)',
    color: C.orange, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em',
  }}>
    <Icon name="shield" size={11} /> LANDLORD
  </span>
);

const InvestorBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999,
    background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)',
    color: C.green, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em',
  }}>
    <Icon name="tag" size={11} /> INVESTOR
  </span>
);

/* Property listing card shown to all users (buyer/tenant view) */
function PropertyListingCard({ listing, onPress, onSeeAll }) {
  const hasInvestor = !!listing.investorTag;
  const accent = listing.accent || 'blue';
  const mediaCount = (listing.media || []).length;
  const firstMedia = listing.media?.[0];

  return (
    <div style={{
      background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 20,
      overflow: 'hidden', backdropFilter: 'blur(14px)',
    }}>
      {/* Header: poster info */}
      <div style={{ padding: '12px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: accent === 'blue'
            ? 'linear-gradient(135deg, #0c2630, #0a0c10)'
            : 'linear-gradient(135deg, #2b1709, #0a0c10)',
          border: `2px solid ${accent === 'blue' ? C.blue + '55' : C.orange + '55'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="user" size={16} style={{ color: accent === 'blue' ? C.blue : C.orange }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ color: C.text, fontWeight: 700, fontSize: 13, fontFamily: 'Sora, sans-serif' }}>
              {listing.posterUsername || 'Landlord'}
            </span>
            <LandlordBadge />
          </div>
          {hasInvestor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <Icon name="link" size={10} style={{ color: C.muted }} />
              <span style={{ color: C.muted, fontSize: 11 }}>in partnership with </span>
              <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>{listing.investorTag}</span>
              <InvestorBadge />
            </div>
          )}
        </div>
        {onSeeAll && (
          <button onClick={onSeeAll} style={{
            background: 'none', border: 'none', color: C.blue, fontSize: 11.5,
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0,
          }}>
            See all <Icon name="chevronRight" size={12} />
          </button>
        )}
      </div>

      {/* Main pressable media area */}
      <button onClick={() => onPress(listing)} style={{
        width: '100%', background: 'none', border: 'none', padding: 0, display: 'block', cursor: 'pointer',
      }}>
        <div style={{
          height: 180, margin: '0 14px', borderRadius: 14, overflow: 'hidden', position: 'relative',
          background: accent === 'blue'
            ? 'linear-gradient(135deg, #0c2630 0%, #0a0c10 100%)'
            : 'linear-gradient(135deg, #2b1709 0%, #0a0c10 100%)',
          border: `1px solid ${C.glassBorder}`,
        }}>
          {firstMedia?.type === 'video' ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="play" size={48} style={{ color: accent === 'blue' ? C.blue : C.orange, opacity: 0.7 }} />
            </div>
          ) : firstMedia?.url ? (
            <img src={firstMedia.url} alt={listing.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="home" size={40} style={{ color: accent === 'blue' ? C.blue : C.orange, opacity: 0.3 }} />
            </div>
          )}
          {/* Media count badge */}
          {mediaCount > 1 && (
            <div style={{
              position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.65)',
              borderRadius: 999, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Icon name="grid" size={11} style={{ color: C.text }} />
              <span style={{ color: C.text, fontSize: 11, fontWeight: 600 }}>{mediaCount}</span>
            </div>
          )}
          {/* Tap hint */}
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }} />
        </div>
      </button>

      {/* Property info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14, fontFamily: 'Sora, sans-serif', lineHeight: 1.3 }}>
              {listing.title}
            </div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>{listing.location}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 10 }}>
            <div style={{ color: C.blue, fontWeight: 800, fontSize: 16, fontFamily: 'Sora, sans-serif' }}>
              ${listing.price?.toLocaleString()}{listing.priceType === 'rent' ? '/mo' : ''}
            </div>
            {listing.priceType === 'mortgage' && (
              <div style={{ color: C.muted, fontSize: 10.5, marginTop: 1 }}>{listing.mortgageTerm}yr mortgage</div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {listing.propertyKind && (
            <span style={{ fontSize: 11, color: C.muted, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.glassBorder}`, borderRadius: 999, padding: '3px 9px' }}>
              {listing.propertyKind}
            </span>
          )}
          {listing.beds > 0 && (
            <span style={{ fontSize: 11, color: C.muted, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.glassBorder}`, borderRadius: 999, padding: '3px 9px' }}>
              {listing.beds} bed · {listing.baths} bath
            </span>
          )}
          <span style={{ fontSize: 11, color: C.muted, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.glassBorder}`, borderRadius: 999, padding: '3px 9px', textTransform: 'capitalize' }}>
            {listing.listingType}
          </span>
        </div>

        {listing.description && (
          <div style={{ color: C.muted, fontSize: 12, marginTop: 10, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {listing.description}
          </div>
        )}
      </div>
    </div>
  );
}

/* Property detail screen — 2-col media grid */
function PropertyDetailScreen({ listing, onBack }) {
  const [activeMedia, setActiveMedia] = useState(null);
  const media = listing.media || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 14px',
        borderBottom: `1px solid ${C.glassBorder}`, position: 'sticky', top: 0,
        background: 'rgba(10,12,16,0.9)', backdropFilter: 'blur(16px)', zIndex: 5,
      }}>
        <button onClick={onBack} style={{ color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15, lineHeight: 1.2 }}>
            {listing.title}
          </div>
          <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{listing.location}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Poster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #2b1709, #0a0c10)',
            border: `2px solid ${C.orange}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="user" size={18} style={{ color: C.orange }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: C.text, fontWeight: 700, fontSize: 14, fontFamily: 'Sora, sans-serif' }}>
                {listing.posterUsername || 'Landlord'}
              </span>
              <LandlordBadge />
            </div>
            {listing.investorTag && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <span style={{ color: C.muted, fontSize: 11 }}>with </span>
                <span style={{ color: C.green, fontSize: 11, fontWeight: 600 }}>{listing.investorTag}</span>
                <InvestorBadge />
              </div>
            )}
          </div>
        </div>

        {/* Price & details */}
        <div style={{
          background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 16,
          padding: '14px 16px', marginBottom: 16,
        }}>
          <div style={{ color: C.blue, fontWeight: 800, fontSize: 22, fontFamily: 'Sora, sans-serif' }}>
            ${listing.price?.toLocaleString()}{listing.priceType === 'rent' ? '/mo' : ''}
          </div>
          {listing.priceType === 'mortgage' && (
            <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>Over {listing.mortgageTerm} years</div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {[
              listing.propertyKind,
              listing.beds > 0 ? `${listing.beds} bed` : null,
              listing.baths > 0 ? `${listing.baths} bath` : null,
              listing.listingType,
            ].filter(Boolean).map(tag => (
              <span key={tag} style={{
                fontSize: 12, color: C.text, background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${C.glassBorder}`, borderRadius: 999, padding: '4px 10px',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        {listing.description && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Description</div>
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{listing.description}</div>
          </div>
        )}

        {/* Media grid */}
        {media.length > 0 && (
          <div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>
              Photos & Videos ({media.length})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {media.map((item, i) => (
                <button key={i} onClick={() => setActiveMedia(item)} style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  borderRadius: 12, overflow: 'hidden', position: 'relative',
                  aspectRatio: '1', display: 'block',
                }}>
                  <div style={{
                    width: '100%', height: '100%', minHeight: 130,
                    background: i % 2 === 0
                      ? 'linear-gradient(135deg, #0c2630, #0a0c10)'
                      : 'linear-gradient(135deg, #2b1709, #0a0c10)',
                    border: `1px solid ${C.glassBorder}`, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {item.type === 'video' ? (
                      <>
                        {item.url && <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} muted />}
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="play" size={32} style={{ color: C.text }} />
                        </div>
                      </>
                    ) : item.url ? (
                      <img src={item.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    ) : (
                      <Icon name="camera" size={24} style={{ color: i % 2 === 0 ? C.blue : C.orange, opacity: 0.4 }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen media viewer */}
      {activeMedia && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={() => setActiveMedia(null)} style={{
            position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: `1px solid ${C.glassBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.text,
            cursor: 'pointer',
          }}>
            <Icon name="x" size={18} />
          </button>
          {activeMedia.type === 'video' ? (
            <video src={activeMedia.url} controls autoPlay
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12 }} />
          ) : activeMedia.url ? (
            <img src={activeMedia.url} alt=""
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain' }} />
          ) : (
            <div style={{ color: C.muted, fontSize: 14 }}>No preview available</div>
          )}
        </div>
      )}
    </div>
  );
}

/* Landlord: all properties by this landlord */
function LandlordListingsScreen({ landlordName, listings, onBack, onViewListing }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 14px',
        borderBottom: `1px solid ${C.glassBorder}`, position: 'sticky', top: 0,
        background: 'rgba(10,12,16,0.9)', backdropFilter: 'blur(16px)', zIndex: 5,
      }}>
        <button onClick={onBack} style={{ color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15 }}>
            {landlordName}'s Properties
          </div>
          <div style={{ color: C.muted, fontSize: 12 }}>{listings.length} listing{listings.length !== 1 ? 's' : ''}</div>
        </div>
        <LandlordBadge />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {listings.map((l, i) => (
          <PropertyListingCard key={i} listing={l} onPress={onViewListing} />
        ))}
      </div>
    </div>
  );
}

/* ── Landlord Profile Screen ── */
function LandlordProfileScreen({ user, onPostProperty }) {
  const mockMyListings = PROPERTIES.slice(0, 3).map(p => ({
    ...p, posterUsername: user?.username || 'You', priceType: p.total ? 'sale' : 'rent',
    propertyKind: 'Apartment', listingType: p.type, media: [], investorTag: null,
  }));

  return (
    <div style={{ padding: '24px 18px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Profile header */}
      <div style={{
        background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 20,
        padding: '20px 18px', backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2b1709, #0a0c10)',
          border: `3px solid ${C.orange}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="user" size={30} style={{ color: C.orange }} />
        </div>
        <div>
          <div style={{ color: C.text, fontWeight: 800, fontFamily: 'Sora, sans-serif', fontSize: 18 }}>
            {user?.username || 'Landlord'}
          </div>
          <div style={{ color: C.muted, fontSize: 12.5, marginTop: 2 }}>{user?.email}</div>
          <div style={{ marginTop: 8 }}><LandlordBadge /></div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
          {[
            { label: 'Listings', val: mockMyListings.length },
            { label: 'Views', val: '1.2k' },
            { label: 'Inquiries', val: 8 },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 16 }}>{s.val}</div>
              <div style={{ color: C.muted, fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Post property CTA */}
      <button onClick={onPostProperty} style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 18,
        background: `linear-gradient(135deg, rgba(255,122,61,0.12), rgba(45,212,255,0.06))`,
        border: `1.5px solid ${C.orange}55`, backdropFilter: 'blur(12px)', textAlign: 'left', cursor: 'pointer',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 14, flexShrink: 0,
          background: `rgba(255,122,61,0.15)`, border: `1px solid ${C.orange}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.orange,
        }}>
          <Icon name="plus" size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 14, fontFamily: 'Sora, sans-serif' }}>Post a Property</div>
          <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>Upload photos, set price, go live</div>
        </div>
        <Icon name="chevronRight" size={18} style={{ color: C.orange, flexShrink: 0 }} />
      </button>

      {/* My listings */}
      <div>
        <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15, marginBottom: 12 }}>
          My Listings
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockMyListings.map((p, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, background: C.glass, border: `1px solid ${C.glassBorder}`,
              borderRadius: 14, padding: 10, alignItems: 'center', backdropFilter: 'blur(10px)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 10, flexShrink: 0,
                background: p.accent === 'blue' ? 'linear-gradient(135deg,#0c2630,#0a0c10)' : 'linear-gradient(135deg,#2b1709,#0a0c10)',
                border: `1px solid ${C.glassBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="home" size={20} style={{ color: p.accent === 'blue' ? C.blue : C.orange, opacity: 0.5 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ color: C.muted, fontSize: 11.5, marginTop: 2 }}>{p.location}</div>
              </div>
              <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, fontFamily: 'Sora, sans-serif', flexShrink: 0 }}>
                ${p.price?.toLocaleString()}{!p.total ? '/mo' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Post Property (Admin Panel) ── */
const PROPERTY_KINDS = ['Apartment', 'House', 'Duplex', 'Single Room', 'Cabin', 'Villa', 'Office', 'Land', 'Warehouse'];
const LISTING_TYPES = [
  { id: 'rent', label: 'Rental' },
  { id: 'sale', label: 'For Sale' },
  { id: 'mortgage', label: 'Mortgage' },
  { id: 'shortstay', label: 'Short Stay' },
];

function PostPropertyScreen({ user, onBack, onPosted }) {
  const [media, setMedia] = useState([]); // [{ file, url, type }]
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('rent'); // rent | sale | mortgage
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [propertyKind, setPropertyKind] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [investorQuery, setInvestorQuery] = useState('');
  const [investorResults, setInvestorResults] = useState([]);
  const [investorTag, setInvestorTag] = useState(null);
  const [searchingInvestor, setSearchingInvestor] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleMediaPick = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
    }));
    setMedia(prev => [...prev, ...newMedia]);
  };

  const removeMedia = (i) => {
    setMedia(prev => prev.filter((_, idx) => idx !== i));
  };

  const searchInvestor = async (q) => {
    setInvestorQuery(q);
    if (!q.trim()) { setInvestorResults([]); return; }
    setSearchingInvestor(true);
    const { data } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('role', 'investor')
      .ilike('username', `%${q}%`)
      .limit(5);
    setInvestorResults(data || []);
    setSearchingInvestor(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !price || !location.trim() || !propertyKind) {
      setError('Please fill in title, price, location and property kind.'); return;
    }
    setError('');
    setSubmitting(true);
    // In real build: upload media to Supabase Storage then insert property row
    // For now we just call onPosted with the assembled listing
    const listing = {
      title, description, location, price: parseFloat(price),
      priceType, mortgageTerm: priceType === 'mortgage' ? mortgageTerm : null,
      propertyKind, beds: parseInt(beds) || 0, baths: parseInt(baths) || 0,
      listingType: priceType,
      media: media.map(m => ({ url: m.url, type: m.type })),
      investorTag: investorTag?.username || null,
      posterUsername: user?.username || 'Landlord',
      accent: 'orange',
    };
    setTimeout(() => { setSubmitting(false); onPosted(listing); }, 800);
  };

  const Field = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ color: C.muted, fontSize: 12, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );

  const inputStyle = {
    background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 12,
    padding: '12px 14px', color: C.text, fontSize: 13.5, outline: 'none', width: '100%',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 14px',
        borderBottom: `1px solid ${C.glassBorder}`, position: 'sticky', top: 0,
        background: 'rgba(10,12,16,0.9)', backdropFilter: 'blur(16px)', zIndex: 5,
      }}>
        <button onClick={onBack} style={{ color: C.muted, background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15 }}>Post a Property</div>
          <div style={{ color: C.muted, fontSize: 12 }}>Fill in the details below</div>
        </div>
        <LandlordBadge />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Media upload */}
        <Field label={`Media (${media.length} selected)`}>
          <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {/* Add button */}
            <button onClick={() => fileInputRef.current?.click()} style={{
              minWidth: 80, height: 80, borderRadius: 12, flexShrink: 0,
              background: C.glass, border: `1.5px dashed ${C.glassBorder}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, color: C.muted, cursor: 'pointer',
            }}>
              <Icon name="upload" size={20} />
              <span style={{ fontSize: 10 }}>Add</span>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple
              onChange={handleMediaPick} style={{ display: 'none' }} />
            {/* Previews */}
            {media.map((m, i) => (
              <div key={i} style={{ position: 'relative', minWidth: 80, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0, border: `1px solid ${C.glassBorder}` }}>
                {m.type === 'video' ? (
                  <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="video" size={24} style={{ color: C.blue }} />
                  </div>
                ) : (
                  <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <button onClick={() => removeMedia(i)} style={{
                  position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)', border: 'none', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: C.text, cursor: 'pointer', padding: 0,
                }}>
                  <Icon name="x" size={11} />
                </button>
              </div>
            ))}
          </div>
        </Field>

        {/* Title */}
        <Field label="Property Title">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Modern 2 Bedroom Apartment" style={inputStyle} />
        </Field>

        {/* Listing type */}
        <Field label="Listing Type">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {LISTING_TYPES.map(t => (
              <button key={t.id} onClick={() => setPriceType(t.id)} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: priceType === t.id ? `rgba(255,122,61,0.15)` : C.glass,
                border: `1px solid ${priceType === t.id ? C.orange + '77' : C.glassBorder}`,
                color: priceType === t.id ? C.orange : C.muted, cursor: 'pointer',
              }}>{t.label}</button>
            ))}
          </div>
        </Field>

        {/* Price */}
        <Field label={priceType === 'rent' ? 'Rent per Month ($)' : priceType === 'mortgage' ? 'Mortgage Amount ($)' : priceType === 'shortstay' ? 'Price per Night ($)' : 'Sale Price ($)'}>
          <input value={price} onChange={e => setPrice(e.target.value)}
            placeholder="0.00" type="number" style={inputStyle} />
        </Field>

        {/* Mortgage term */}
        {priceType === 'mortgage' && (
          <Field label="Mortgage Term (years)">
            <input value={mortgageTerm} onChange={e => setMortgageTerm(e.target.value)}
              placeholder="e.g. 20" type="number" style={inputStyle} />
          </Field>
        )}

        {/* Property kind */}
        <Field label="Property Type">
          <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {PROPERTY_KINDS.map(k => (
              <button key={k} onClick={() => setPropertyKind(k)} style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
                background: propertyKind === k ? 'rgba(45,212,255,0.12)' : C.glass,
                border: `1px solid ${propertyKind === k ? C.blue + '66' : C.glassBorder}`,
                color: propertyKind === k ? C.blue : C.muted, cursor: 'pointer',
              }}>{k}</button>
            ))}
          </div>
        </Field>

        {/* Beds / Baths */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Bedrooms">
            <input value={beds} onChange={e => setBeds(e.target.value)} placeholder="0" type="number" style={inputStyle} />
          </Field>
          <Field label="Bathrooms">
            <input value={baths} onChange={e => setBaths(e.target.value)} placeholder="0" type="number" style={inputStyle} />
          </Field>
        </div>

        {/* Location */}
        <Field label="Location">
          <input value={location} onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Borrowdale, Harare" style={inputStyle} />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Describe the property, features, nearby amenities..."
            rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }} />
        </Field>

        {/* Tag investor */}
        <Field label="Tag an Investor (optional)">
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 12, padding: '12px 14px' }}>
              <Icon name="tag" size={15} style={{ color: C.muted, flexShrink: 0 }} />
              {investorTag ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: C.green, fontWeight: 600, fontSize: 13 }}>@{investorTag.username}</span>
                  <InvestorBadge />
                  <button onClick={() => { setInvestorTag(null); setInvestorQuery(''); }} style={{ color: C.muted, background: 'none', border: 'none', marginLeft: 'auto' }}>
                    <Icon name="x" size={14} />
                  </button>
                </div>
              ) : (
                <input value={investorQuery} onChange={e => searchInvestor(e.target.value)}
                  placeholder="Search investor by username..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 13.5 }} />
              )}
            </div>
            {/* Dropdown results */}
            {investorResults.length > 0 && !investorTag && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, zIndex: 20,
                background: '#0D1117', border: `1px solid ${C.glassBorder}`, borderRadius: 12, overflow: 'hidden',
              }}>
                {searchingInvestor && (
                  <div style={{ padding: '10px 14px', color: C.muted, fontSize: 12 }}>Searching…</div>
                )}
                {investorResults.map(r => (
                  <button key={r.id} onClick={() => { setInvestorTag(r); setInvestorResults([]); }} style={{
                    width: '100%', textAlign: 'left', padding: '11px 14px', background: 'none',
                    border: 'none', borderBottom: `1px solid ${C.glassBorder}`, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Icon name="user" size={14} style={{ color: C.muted }} />
                    <span style={{ color: C.text, fontSize: 13 }}>@{r.username}</span>
                    <InvestorBadge />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>

        {error && <div style={{ color: '#f87171', fontSize: 12.5, textAlign: 'center' }}>{error}</div>}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={submitting} style={{
          padding: '15px', borderRadius: 16, fontWeight: 700, fontSize: 15,
          fontFamily: 'Sora, sans-serif', color: '#04141a', border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${C.orange}, ${C.blue})`,
          opacity: submitting ? 0.7 : 1, marginTop: 4,
        }}>{submitting ? 'Posting…' : 'Post Property'}</button>
      </div>
    </div>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [authScreen, setAuthScreen] = useState('signin'); // 'signin' | 'create' | null
  const [user, setUser] = useState(null); // { email, username, role }
  const [screen, setScreen] = useState('home');
  const [detailListing, setDetailListing] = useState(null);
  const [landlordListings, setLandlordListings] = useState(null);
  const [favs, setFavs] = useState(new Set());
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState('');
  const [postedListings, setPostedListings] = useState([]);

  const toggleFav = (id) => setFavs(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const homeNav = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'add', icon: 'plus', label: 'Add Property' },
    { id: 'messages', icon: 'message', label: 'Messages' },
    { id: 'profile', icon: 'user', label: 'Profile' },
  ];
  const chatNav = [
    { id: 'chat', icon: 'message', label: 'Chat' },
    { id: 'saved', icon: 'bookmark', label: 'Saved' },
    { id: 'alerts', icon: 'bell', label: 'Alerts' },
    { id: 'history', icon: 'clock', label: 'History' },
  ];

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
    @keyframes eyePulse { 0%,100% { box-shadow: 0 0 10px rgba(45,212,255,0.18); } 50% { box-shadow: 0 0 22px ${C.blue}88, 0 0 36px ${C.orange}44; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bounce { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
    input::placeholder { color: ${C.muted}; }
    textarea::placeholder { color: ${C.muted}; }
    button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    h2 { margin: 0; }
  `;

  const Wrapper = ({ children }) => (
    <div style={{ minHeight: '100vh', background: '#060708', display: 'flex', justifyContent: 'center', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{globalStyles}</style>
      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`, color: C.text, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );

  // If viewing a property detail
  if (detailListing) {
    return <Wrapper><PropertyDetailScreen listing={detailListing} onBack={() => setDetailListing(null)} /></Wrapper>;
  }

  // If viewing all landlord listings
  if (landlordListings) {
    return (
      <Wrapper>
        <LandlordListingsScreen
          landlordName={landlordListings.name}
          listings={landlordListings.listings}
          onBack={() => setLandlordListings(null)}
          onViewListing={(l) => { setLandlordListings(null); setDetailListing(l); }}
        />
      </Wrapper>
    );
  }

  // If posting a new property (landlord only)
  if (screen === 'post') {
    return (
      <Wrapper>
        <PostPropertyScreen
          user={user}
          onBack={() => setScreen('profile')}
          onPosted={(listing) => {
            setPostedListings(prev => [listing, ...prev]);
            setScreen('profile');
          }}
        />
      </Wrapper>
    );
  }

  // Demo listing from mock data
  const demoListings = PROPERTIES.slice(0, 2).map(p => ({
    ...p, posterUsername: 'Aurora', priceType: p.total ? 'sale' : 'rent',
    propertyKind: 'Apartment', listingType: p.type, media: [],
    investorTag: p.id === 1 ? 'ACE Real Estate Ventures' : null, accent: p.accent,
  }));

  let body;
  if (screen === 'home') {
    body = (
      <>
        <HomeScreen onAskAI={() => setScreen('chat')} favs={favs} toggleFav={toggleFav}
          activeCat={activeCat} setActiveCat={setActiveCat} search={search} setSearch={setSearch} />
        {/* Landlord listing cards in home feed */}
        <div style={{ padding: '0 18px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ color: C.text, fontWeight: 700, fontFamily: 'Sora, sans-serif', fontSize: 15 }}>From Landlords</div>
          {[...postedListings, ...demoListings].map((l, i) => (
            <PropertyListingCard
              key={i}
              listing={l}
              onPress={(listing) => setDetailListing(listing)}
              onSeeAll={() => setLandlordListings({ name: l.posterUsername, listings: [...postedListings, ...demoListings].filter(x => x.posterUsername === l.posterUsername) })}
            />
          ))}
        </div>
      </>
    );
  } else if (screen === 'chat') {
    body = <ChatScreen onBack={() => setScreen('home')} />;
  } else if (screen === 'profile' && user?.role === 'landlord') {
    body = <LandlordProfileScreen user={user} onPostProperty={() => setScreen('post')} />;
  } else {
    const map = {
      search: { icon: 'search', label: 'Property Search' },
      add: { icon: 'plus', label: 'Add a Property' },
      messages: { icon: 'message', label: 'Messages' },
      profile: { icon: 'user', label: 'Your Profile' },
      saved: { icon: 'bookmark', label: 'Saved Searches' },
      alerts: { icon: 'bell', label: 'AI Alerts' },
      history: { icon: 'clock', label: 'Chat History' },
    };
    body = <Placeholder {...(map[screen] || { icon: 'home', label: screen })} />;
  }

  const navItems = screen === 'chat' ? chatNav : homeNav;
  const navActive = screen === 'chat' ? 'chat' : (screen === 'home' ? 'home' : screen);
  const onNavSelect = (id) => {
    if (id === 'chat') return setScreen('chat');
    if (id === 'home') return setScreen('home');
    setScreen(id);
  };

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
    @keyframes eyePulse { 0%,100% { box-shadow: 0 0 10px rgba(45,212,255,0.18); } 50% { box-shadow: 0 0 22px ${C.blue}88, 0 0 36px ${C.orange}44; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bounce { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
    input::placeholder { color: ${C.muted}; }
    button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
    h2 { margin: 0; }
  `;

  // Auth screens
  if (authScreen === 'signin') {
    return (
      <Wrapper>
        <SignInScreen
          onSignIn={(u) => { setUser(u); setAuthScreen(null); }}
          onGoCreate={() => setAuthScreen('create')}
        />
      </Wrapper>
    );
  }

  if (authScreen === 'create') {
    return (
      <Wrapper>
        <CreateAccountScreen
          onCreated={(u) => { setUser(u); setAuthScreen(null); }}
          onGoSignIn={() => setAuthScreen('signin')}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {body}
      </div>
      <BottomNav items={navItems} active={navActive} onSelect={onNavSelect} />
    </Wrapper>
  );
}

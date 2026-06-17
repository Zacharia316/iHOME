import React, { useState, useRef, useEffect } from 'react';

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
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.4" y2="16.4" /></>,
  sliders: <><line x1="4" y1="6" x2="20" y2="6" /><circle cx="9" cy="6" r="1.8" fill={C.bg} /><line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="1.8" fill={C.bg} /><line x1="4" y1="18" x2="20" y2="18" /><circle cx="11" cy="18" r="1.8" fill={C.bg} /></>,
  key: <><circle cx="8" cy="15" r="4" /><line x1="11" y1="12" x2="20.5" y2="2.5" /><line x1="16" y1="7" x2="19" y2="10" /><line x1="13" y1="10" x2="15.5" y2="12.5" /></>,
  home: <><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9.5h12V10" /></>,
  map: <><path d="M3 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z" /><line x1="8" y1="4" x2="8" y2="18" /><line x1="14" y1="6" x2="14" y2="20" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="8" y1="7" x2="8" y2="7.01" /><line x1="12" y1="7" x2="12" y2="7.01" /><line x1="16" y1="7" x2="16" y2="7.01" /><line x1="8" y1="11" x2="8" y2="11.01" /><line x1="12" y1="11" x2="12" y2="11.01" /><line x1="16" y1="11" x2="16" y2="11.01" /><line x1="8" y1="15" x2="8" y2="15.01" /><line x1="12" y1="15" x2="12" y2="15.01" /><line x1="16" y1="15" x2="16" y2="15.01" /></>,
  bed: <><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" /><path d="M3 12.5h18" /><path d="M7 9.5V6.5h4v3" /><line x1="3" y1="18" x2="3" y2="21" /><line x1="21" y1="18" x2="21" y2="21" /></>,
  heart: <path d="M12 21s-7-4.35-9.33-8.6A5.4 5.4 0 0 1 12 5.2a5.4 5.4 0 0 1 9.33 7.2C19 16.65 12 21 12 21z" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  mic: <><path d="M12 1.5a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-7 0v-6A3.5 3.5 0 0 1 12 1.5z" /><path d="M19 11a7 7 0 0 1-14 0" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="8.5" y1="22" x2="15.5" y2="22" /></>,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  sparkle: <path d="M12 2l1.8 5.4L19.2 9l-5.4 1.8L12 16.2 10.2 10.8 4.8 9l5.4-1.6z" />,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  message: <path d="M21 11.5a8.38 8.38 0 0 1-9 8.34A8.38 8.38 0 0 1 7.5 18.6L3 21l1.6-4.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 1 1 21 11.5z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a7 7 0 0 1 14 0v1" /></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  bell: <><path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></>,
  dots: <><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></>,
};

const Icon = ({ name, size = 20, style, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={style}>
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
        <button onClick={() => toggleFav(p.id)} style={{ color: fav ? C.orange : C.muted, lineHeight: 0 }}>
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
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: isActive ? C.blue : C.muted, minWidth: 50 }}>
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
        <button onClick={onAskAI} aria-label="Ask Shoebill AI"><Eye size={42} /></button>
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
                backdropFilter: 'blur(12px)',
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
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15.5, fontWeight: 700, color: C.text }}>Featured Properties</h2>
          <span style={{ color: C.blue, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2 }}>See all <Icon name="chevronRight" size={13} /></span>
        </div>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {featuredList.map(p => <FeaturedCard key={p.id} p={p} fav={favs.has(p.id)} toggleFav={toggleFav} />)}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15.5, fontWeight: 700, color: C.text }}>Recommended For You</h2>
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
        border: `1px solid ${C.glassBorder}`, backdropFilter: 'blur(12px)', textAlign: 'left',
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
        <button onClick={onBack} style={{ color: C.muted }}><Icon name="chevronLeft" size={20} /></button>
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
                  background: C.glass, border: `1px solid ${C.glassBorder}`, backdropFilter: 'blur(10px)',
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
          opacity: thinking ? 0.6 : 1,
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

/* ---------------- App ---------------- */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [favs, setFavs] = useState(new Set());
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState('');

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

  let body;
  if (screen === 'home') {
    body = <HomeScreen onAskAI={() => setScreen('chat')} favs={favs} toggleFav={toggleFav}
      activeCat={activeCat} setActiveCat={setActiveCat} search={search} setSearch={setSearch} />;
  } else if (screen === 'chat') {
    body = <ChatScreen onBack={() => setScreen('home')} />;
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
    body = <Placeholder {...map[screen]} />;
  }

  const navItems = screen === 'chat' ? chatNav : (screen === 'home' ? homeNav : homeNav);
  const navActive = screen === 'chat' ? 'chat' : (screen === 'home' ? 'home' : screen);
  const onNavSelect = (id) => {
    if (id === 'chat') return setScreen('chat');
    if (id === 'home') return setScreen('home');
    setScreen(id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060708', display: 'flex', justifyContent: 'center', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        @keyframes eyePulse { 0%,100% { box-shadow: 0 0 10px rgba(45,212,255,0.18); } 50% { box-shadow: 0 0 22px ${C.blue}88, 0 0 36px ${C.orange}44; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        input::placeholder { color: ${C.muted}; }
        button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{
        width: '100%', maxWidth: 430, minHeight: '100vh', background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`,
        color: C.text, display: 'flex', flexDirection: 'column', position: 'relative',
      }}
      className="sm:my-6 sm:rounded-[2.25rem] sm:min-h-0 sm:h-[860px] sm:border sm:shadow-2xl"
      >
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {body}
        </div>
        <BottomNav items={navItems} active={navActive} onSelect={onNavSelect} />
      </div>
    </div>
  );
}

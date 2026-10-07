import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import logo from './assets/logo.jpeg';

const projects = [
  {
    title: 'The Meridian Residences',
    type: 'Signature Residences',
    location: 'Aurangabad, Maharashtra',
    tag: 'Signature Address',
    number: '01',
    description: 'A refined residential address designed around natural light, generous spaces and effortless everyday living—crafted for families who value comfort, privacy and lasting presence.',
    image: 'https://images.unsplash.com/photo-1775733924031-521cd86c69cc?auto=format&fit=crop&fm=jpg&q=82&w=1800',
    alt: 'Modern residential tower with balconies and greenery',
  },
  {
    title: 'Nest Avenue Luxe',
    type: 'Contemporary Residences',
    location: 'Pune, Maharashtra',
    tag: 'New Launch',
    number: '02',
    description: 'Contemporary homes in a connected urban setting, balancing sophisticated design, practical planning and a lifestyle built for modern Pune.',
    image: 'https://images.unsplash.com/photo-1768555353297-76ad9b0ba91d?auto=format&fit=crop&fm=jpg&q=82&w=1800',
    alt: 'Contemporary commercial building with a glass facade',
  },
  {
    title: 'Vista Greens Estate',
    type: 'Premium Villa Community',
    location: 'Nashik, Maharashtra',
    tag: 'Coming Soon',
    number: '03',
    description: 'An elevated villa community where architecture meets open green spaces, offering a private, spacious setting for a more considered way of living.',
    image: 'https://images.unsplash.com/photo-1765883977051-03119d268af0?auto=format&fit=crop&fm=jpg&q=82&w=1800',
    alt: 'Modern apartment architecture with a refined geometric facade',
  },
];


const projectDetails = [
  {
    id: 'meridian-detail',
    ...projects[0],
    eyebrow: '01 / SIGNATURE RESIDENCES',
    headline: ['A signature address,', 'shaped for elevated living.'],
    intro: 'The Meridian Residences is envisioned as a refined urban home for people who appreciate considered architecture, generous comfort and a sense of arrival.',
    highlights: ['Elegant contemporary façade', 'Thoughtfully planned residences', 'Daylight-led living spaces', 'Private, family-focused community'],
    amenities: ['Grand arrival lobby', 'Fitness & wellness studio', 'Landscaped leisure spaces', 'Children’s play zone', 'Residents’ lounge', 'Secure parking & access'],
  },
  {
    id: 'avenue-detail',
    ...projects[1],
    eyebrow: '02 / CONTEMPORARY RESIDENCES',
    headline: ['Modern city living,', 'with a quieter rhythm.'],
    intro: 'Nest Avenue Luxe brings a polished residential experience to a connected urban setting, balancing contemporary design with spaces made for everyday ease.',
    highlights: ['Connected urban setting', 'Contemporary architectural language', 'Flexible spaces for modern families', 'Curated lifestyle amenities'],
    amenities: ['Arrival lounge', 'Co-working corner', 'Fitness studio', 'Rooftop leisure zone', 'Multipurpose room', 'Controlled access & security'],
  },
  {
    id: 'vista-detail',
    ...projects[2],
    eyebrow: '03 / PREMIUM VILLA COMMUNITY',
    headline: ['More space to breathe.', 'More room to belong.'],
    intro: 'Vista Greens Estate is imagined as a premium villa community where architecture, landscape and privacy come together for a more relaxed way of life.',
    highlights: ['Low-density villa setting', 'Green-first master planning', 'Private outdoor areas', 'Calm, family-oriented environment'],
    amenities: ['Clubhouse lounge', 'Landscaped greens', 'Walking & jogging paths', 'Outdoor recreation area', 'Children’s play garden', 'Gated community access'],
  },
];


const galleries = [
  {
    title: 'The Meridian Residences',
    eyebrow: '01 / VISUAL JOURNAL',
    images: [
      ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=88&w=1800','Arrival / Evening'],
      ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=88&w=1400','Living / Natural Light'],
      ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=88&w=1400','Interiors / Material Detail'],
      ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=88&w=1800','Architecture / Perspective'],
    ]
  },
  {
    title: 'Nest Avenue Luxe',
    eyebrow: '02 / VISUAL JOURNAL',
    images: [
      ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=88&w=1800','Facade / Urban Rhythm'],
      ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=88&w=1400','Residence / Living Space'],
      ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=88&w=1400','Detail / Crafted Calm'],
      ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=88&w=1800','Exterior / Golden Hour'],
    ]
  },
  {
    title: 'Vista Greens Estate',
    eyebrow: '03 / VISUAL JOURNAL',
    images: [
      ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=88&w=1800','Arrival / Landscape'],
      ['https://images.unsplash.com/photo-1600585154363-67a7f4c0a6c1?auto=format&fit=crop&q=88&w=1400','Villa / Garden Edge'],
      ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=88&w=1400','Interiors / Quiet Luxury'],
      ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=88&w=1800','Landscape / Open Living'],
    ]
  }
];

const services = [
  ['01', 'Residential Development', 'Thoughtful homes with intelligent planning, refined materials and lasting value.'],
  ['02', 'Commercial Spaces', 'Distinctive workplaces and retail environments designed around how people move and connect.'],
  ['03', 'Turnkey Execution', 'From first sketch to final handover, one focused team keeps every detail aligned.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [formStatus, setFormStatus] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  const buildWhatsAppUrl = (payload) => {
    const text = [
      'Hello Nest View Infra,',
      `I am interested in ${payload.project_name}.`,
      '',
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      payload.message ? `Message: ${payload.message}` : '',
      `Source: ${payload.source_page}`,
    ].filter(Boolean).join('\n');
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };
  const cursor = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      }
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal, .cinematic');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = Number(el.dataset.parallax || 0.08);
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
        el.style.setProperty('--parallax-y', `${offset}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phonePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

  const submit = async (e, projectName = 'General Enquiry') => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').replace(/[()\s-]/g, '');

    if (email && !emailPattern.test(email)) {
      setFormStatus((prev) => ({ ...prev, [projectName]: { type: 'error', message: 'Please enter a valid email address.' } }));
      form.querySelector('[name="email"]')?.focus();
      return;
    }
    if (phone && !phonePattern.test(phone)) {
      setFormStatus((prev) => ({ ...prev, [projectName]: { type: 'error', message: 'Please enter a valid 10-digit Indian mobile number.' } }));
      form.querySelector('[name="phone"]')?.focus();
      return;
    }

    setFormStatus((prev) => ({ ...prev, [projectName]: { type: 'sending', message: 'Sending your enquiry…' } }));

    const params = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    };

    const payload = {
      name: String(data.get('name') || '').trim(),
      email,
      phone: String(data.get('phone') || '').trim(),
      message: String(data.get('message') || '').trim(),
      project_name: projectName,
      source_page: window.location.pathname || '/',
      source_url: window.location.href,
      referrer: document.referrer || '',
      submitted_at: new Date().toISOString(),
      ...utm,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.message || 'Submission failed');
      form.reset();
      setFormStatus((prev) => ({ ...prev, [projectName]: { type: 'success', message: 'Enquiry sent. Our team will get back to you shortly.', whatsappUrl: buildWhatsAppUrl(payload) } }));
    } catch (error) {
      setFormStatus((prev) => ({ ...prev, [projectName]: { type: 'error', message: 'We could not send the enquiry right now. Please try again or contact us directly.' } }));
    }
  };

  return (
    <div className="site">
      <div className="cursor" ref={cursor} />
      <div className="topline" />
      <header className="nav-wrap">
        <nav className="nav">
          <button className="brand" onClick={() => go('home')} aria-label="Nest View Infra home">
            <img src={logo} alt="Nest View Infra" />
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
              <button key={item} onClick={() => go(item)}>{item}</button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => go('contact')}>Start a conversation <span>↗</span></button>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <span></span><span></span>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-copy">
            <p className="eyebrow reveal">NEST VIEW INFRA <i /> EST. 2026</p>
            <h1 className="reveal">Spaces that feel<br /><em>like home.</em></h1>
            <p className="hero-text reveal">We create considered addresses where architecture, nature and everyday life come together with effortless elegance.</p>
            <div className="hero-actions reveal">
              <button className="primary-btn" onClick={() => go('projects')}>Explore our spaces <span>↓</span></button>
              <button className="text-btn" onClick={() => go('about')}>Our philosophy <span>↗</span></button>
            </div>
          </div>
          <div className="hero-photo" aria-hidden="true"><img src={projects[0].image} alt="" /><div className="hero-photo-shade" /></div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun" />
            <div className="building building-back"><i/><i/><i/><i/></div>
            <div className="building building-main"><i/><i/><i/><i/><i/><i/></div>
            <div className="building building-front"><i/><i/><i/></div>
            <div className="ground-line" />
            <div className="hero-stamp">WE BUILD<br /><strong>YOU LIVE.</strong></div>
          </div>
          <div className="scroll-note">SCROLL TO DISCOVER <span>↓</span></div>
        </section>

        <section id="about" className="section intro">
          <div className="section-kicker reveal"><span>01</span> THE NEST VIEW DIFFERENCE</div>
          <div className="intro-grid">
            <h2 className="reveal">Not just built.<br /><span>Beautifully considered.</span></h2>
            <div className="intro-body reveal">
              <p>At Nest View Infra, we believe a building is more than structure. It is the backdrop to mornings, milestones, conversations and quiet moments.</p>
              <p>Our work pairs disciplined execution with an instinct for warmth — creating places that look exceptional today and belong for years to come.</p>
              <button className="line-link" onClick={() => go('contact')}>Talk to our team <span>→</span></button>
            </div>
          </div>
          <div className="numbers reveal">
            <div><strong>12+</strong><span>Design principles</span></div>
            <div><strong>100%</strong><span>Detail focused</span></div>
            <div><strong>1</strong><span>Clear promise</span></div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="projects-head">
            <div className="section-kicker reveal"><span>02</span> SELECTED PROJECTS</div>
            <p className="section-note reveal">A growing collection of spaces shaped by light, proportion and purpose.</p>
          </div>
          <div className="project-stage">
            <div className="project-art">
              <img
                className="project-image"
                src={projects[activeProject].image}
                alt={projects[activeProject].alt}
                loading={activeProject === 0 ? 'eager' : 'lazy'}
              />
              <div className="project-image-overlay" />
              <div className="art-label">NVI / {projects[activeProject].number}</div>
              <div className="image-caption">ARCHITECTURE / LIGHT / LIVING</div>
            </div>
            <div className="project-info reveal">
              <p className="project-tag">{projects[activeProject].tag}</p>
              <p className="project-number">0{activeProject + 1} / 03</p>
              <h3>{projects[activeProject].title}</h3>
              <p className="project-type">{projects[activeProject].type} · {projects[activeProject].location}</p>
              <p className="project-desc">{projects[activeProject].description}</p>
              <button className="line-link" onClick={() => go(projectDetails[activeProject].id)}>Explore details <span>↗</span></button>
            </div>
          </div>
          <div className="project-tabs">
            {projects.map((p, i) => (
              <button className={`project-card ${activeProject === i ? 'active' : ''}`} onClick={() => setActiveProject(i)} key={p.title}>
                <span className="project-card-image">
                  <img src={p.image} alt="" loading="lazy" />
                </span>
                <span className="project-card-copy">
                  <small>{p.number} / {p.tag}</small>
                  <strong>{p.title}</strong>
                  <em>{p.type}</em>
                </span>
                <b className="project-card-arrow">↗</b>
              </button>
            ))}
          </div>
        </section>

        <section className="project-details-wrap">
          {projectDetails.map((project, index) => (
            <section id={project.id} className="project-detail" key={project.id}>
              <div className="project-detail-image">
                <img src={project.image} alt={project.alt} loading="lazy" />
                <div className="project-detail-image-shade" />
                <span>{project.eyebrow}</span>
              </div>
              <div className="project-detail-content">
                <div className="section-kicker"><span>{String(index + 1).padStart(2, '0')}</span> PROJECT DETAIL</div>
                <h2>{project.headline.map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}<em>{line}</em></React.Fragment>)}</h2>
                <p className="project-detail-intro">{project.intro}</p>

                <div className="detail-columns">
                  <div>
                    <h3>Project highlights</h3>
                    <ul className="detail-list">
                      {project.highlights.map(item => <li key={item}><span>✦</span>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3>Amenities</h3>
                    <ul className="amenity-grid">
                      {project.amenities.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="detail-enquiry">
                  <div>
                    <small>PRIVATE ENQUIRY</small>
                    <h3>Request the {project.title} brochure.</h3>
                    <p>Share your details and our team can arrange a project conversation, brochure and next-step information.</p>
                  </div>
                  <form onSubmit={(e) => submit(e, project.title)} noValidate>
                    <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="honeypot" aria-hidden="true" />
                    <div className="detail-form-row">
                      <input name="name" aria-label="Full name" required placeholder="Full name" autoComplete="name" />
                      <input name="phone" aria-label="Phone number" required placeholder="Phone number" type="tel" inputMode="numeric" pattern="(?:\+91[\s-]?)?[6-9]\d{9}" autoComplete="tel" />
                    </div>
                    <input name="email" aria-label="Email address" required placeholder="Email address" type="email" autoComplete="email" />
                    <button className="primary-btn" type="submit" disabled={formStatus[project.title]?.type === 'sending'}>{formStatus[project.title]?.type === 'sending' ? 'Sending…' : 'Request details'} <span>↗</span></button>
                    {formStatus[project.title]?.message && <div className={`form-status ${formStatus[project.title].type}`}><p>{formStatus[project.title].message}</p>{formStatus[project.title].whatsappUrl && <a className="whatsapp-btn" href={formStatus[project.title].whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp <span>↗</span></a>}</div>}
                  </form>
                </div>
              </div>
            </section>
          ))}
        </section>

        <section className="luxury-gallery cinematic" id="gallery">
          <div className="gallery-heading">
            <div>
              <div className="section-kicker"><span>03</span> THE VISUAL JOURNAL</div>
              <h2>See the <em>feeling.</em></h2>
            </div>
            <p>Architecture, material and light captured as a collection of moments—not just spaces.</p>
          </div>
          <div className="gallery-project-nav" role="tablist" aria-label="Project gallery">
            {galleries.map((gallery, i) => (
              <button key={gallery.title} className={activeProject === i ? 'active' : ''} onClick={() => setActiveProject(i)}>{gallery.title}<span>0{i+1}</span></button>
            ))}
          </div>
          <div className="gallery-grid">
            {galleries[activeProject].images.map(([src, caption], i) => (
              <button key={src} className={`gallery-tile tile-${i+1}`} onClick={() => setLightbox({src, caption, title:galleries[activeProject].title})} aria-label={`Open ${caption}`}>
                <img src={src} alt={caption} loading="lazy" data-parallax={i === 0 || i === 3 ? '0.035' : '0.02'} />
                <span className="gallery-overlay"><small>{String(i+1).padStart(2,'0')}</small><strong>{caption}</strong><b>↗</b></span>
              </button>
            ))}
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-kicker reveal"><span>03</span> WHAT WE DO</div>
          <div className="services-heading reveal">
            <h2>From first line<br /><span>to final key.</span></h2>
            <p>One vision, carried through every stage. Our process keeps creativity and execution moving in the same direction.</p>
          </div>
          <div className="service-list">
            {services.map(([num, title, text]) => (
              <article className="service reveal" key={num}>
                <span className="service-num">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="service-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="statement">
          <div className="statement-inner reveal">
            <span className="quote-mark">“</span>
            <p>Good architecture gives you a place.<br /><em>Great architecture gives you a feeling.</em></p>
            <span className="statement-line" />
            <small>NEST VIEW INFRA / PHILOSOPHY</small>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-kicker reveal"><span>04</span> LET'S BUILD SOMETHING</div>
          <div className="contact-grid">
            <div className="contact-copy reveal">
              <h2>Your next<br /><span>address starts here.</span></h2>
              <p>Tell us what you are imagining. We will bring the right people, ideas and details to the table.</p>
              <div className="contact-meta">
                <a href="mailto:nestview.infra955@gmail.com">nestview.infra955@gmail.com</a>
                <a href="tel:+919767678181">+91 9767678181 / 7741995599</a>
                <span>India · By appointment</span>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={(e) => submit(e, 'General Enquiry')} noValidate>
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="honeypot" aria-hidden="true" />
              <label>Name<input name="name" required placeholder="Your name" autoComplete="name" /></label>
              <label>Email<input name="email" required type="email" placeholder="you@example.com" autoComplete="email" /></label>
              <label>Phone<input name="phone" required type="tel" inputMode="numeric" placeholder="10-digit mobile number" pattern="(?:\+91[\s-]?)?[6-9]\d{9}" autoComplete="tel" /></label>
              <label>Tell us a little about your project<textarea name="message" required placeholder="Project, location, timeline..." rows="4"></textarea></label>
              <button className="primary-btn" type="submit" disabled={formStatus['General Enquiry']?.type === 'sending'}>{formStatus['General Enquiry']?.type === 'sending' ? 'Sending…' : 'Send enquiry'} <span>↗</span></button>
              {formStatus['General Enquiry']?.message && <div className={`form-status ${formStatus['General Enquiry'].type}`}><p>{formStatus['General Enquiry'].message}</p>{formStatus['General Enquiry'].whatsappUrl && <a className="whatsapp-btn" href={formStatus['General Enquiry'].whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp <span>↗</span></a>}</div>}
            </form>
          </div>
        </section>
      </main>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close gallery">×</button>
        <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
          <img src={lightbox.src} alt={lightbox.caption} />
          <div><small>{lightbox.title}</small><strong>{lightbox.caption}</strong></div>
        </div>
      </div>}

      <footer className="footer">
        <div className="footer-brand"><img src={logo} alt="Nest View Infra" /><p>We Build. You Live.</p></div>
        <div className="footer-links"><button onClick={() => go('about')}>About</button><button onClick={() => go('projects')}>Projects</button><button onClick={() => go('services')}>Services</button><button onClick={() => go('contact')}>Contact</button></div>
        <p className="copyright">© 2026 Nest View Infra. Crafted with intent.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

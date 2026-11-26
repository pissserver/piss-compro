import {
    AnimatePresence,
    motion,
    MotionConfig,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import {
    ArrowRight,
    Building2,
    ChevronRight,
    Clock3,
    Compass,
    Film,
    Home,
    MapPin,
    Menu,
    Moon,
    ShoppingBasket,
    Sparkles,
    Sun,
    X,
    type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
    activityItems,
    advantages,
    commodityCards,
    contactDetails,
    facilityItems,
    marketEmail,
    marketAddress,
    marketImages,
    marketWhatsAppUrl,
    mapsUrl,
    marketStoryVideo,
    navItems,
    socialLinks,
    stats,
} from "./data/site";
import { useHeaderScroll } from "./hooks/useHeaderScroll";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

const reveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

const revealLeft: Variants = {
    hidden: { opacity: 0, x: -28 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

const revealRight: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

const heroReveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.12 },
    },
};

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "pasar-sidotopo-theme-v2";

const navigationIcons: Record<string, LucideIcon> = {
    "#beranda": Home,
    "#tentang": Compass,
    "#video": Film,
    "#komoditas": ShoppingBasket,
    "#fasilitas": Building2,
    "#kontak": MapPin,
};

const heroHeadlines = [
    { lead: "Ruang niaga pangan yang ", emphasis: "menghidupi kota." },
    { lead: "Pusat komoditas segar ", emphasis: "Surabaya." },
    { lead: "Rantai pasok pangan ", emphasis: "bertemu di Sidotopo." },
    { lead: "Beragam komoditas, ", emphasis: "satu denyut perdagangan." },
];

function App() {
    const prefersReducedMotion = useReducedMotion();
    const isScrolled = useHeaderScroll();
    const scrollProgress = useScrollProgress();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(() =>
        window.localStorage.getItem(THEME_STORAGE_KEY) === "light"
            ? "light"
            : "dark",
    );

    useSmoothScroll(!prefersReducedMotion);

    useEffect(() => {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        document.documentElement.style.colorScheme = theme;
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", theme === "dark" ? "#0c111b" : "#f5f6f8");
    }, [theme]);

    return (
        <MotionConfig reducedMotion="user">
            <div className="app-shell" data-theme={theme}>
                <motion.div
                    className="scroll-progress"
                    style={{ scaleX: scrollProgress }}
                />
                <Header
                    isScrolled={isScrolled}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    theme={theme}
                    onToggleTheme={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                />

                <main>
                    <HeroSection
                        prefersReducedMotion={Boolean(prefersReducedMotion)}
                    />
                    <AboutSection />
                    <FacilitySection />
                    <CommoditySection />
                    <StatsSection />
                    <MarketVideoSection />
                    <AdvantageSection />
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </MotionConfig>
    );
}

function Header({
    isScrolled,
    isMenuOpen,
    setIsMenuOpen,
    theme,
    onToggleTheme,
}: {
    isScrolled: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
    theme: Theme;
    onToggleTheme: () => void;
}) {
    const ThemeIcon = theme === "dark" ? Sun : Moon;
    const themeAction =
        theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap";

    return (
        <header
            className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}
        >
            <nav className="nav-bar">
                <a href="#beranda" className="brand-wrap">
                    <span className="brand-mark">P</span>
                    <span className="brand-name">
                        Pasar Induk Surabaya Sidotopo
                    </span>
                </a>

                <div className="nav-links">
                    {navItems.map((item) => {
                        const Icon = navigationIcons[item.href];
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className="nav-link"
                            >
                                <Icon size={15} aria-hidden="true" />
                                {item.label}
                            </a>
                        );
                    })}
                </div>

                <div className="nav-actions">
                    <a href="#kontak" className="primary-button small-button">
                        Hubungi Kami
                        <ArrowRight size={15} />
                    </a>
                </div>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label={themeAction}
                    title={themeAction}
                >
                    <ThemeIcon size={18} aria-hidden="true" />
                    <span>{theme === "dark" ? "Terang" : "Gelap"}</span>
                </button>

                <button
                    type="button"
                    className="menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {isMenuOpen && (
                <div className="mobile-menu" id="mobile-navigation">
                    {navItems.map((item) => {
                        const Icon = navigationIcons[item.href];
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="mobile-menu-item"
                            >
                                <Icon size={17} aria-hidden="true" />
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </header>
    );
}

function HeroSection({
    prefersReducedMotion,
}: {
    prefersReducedMotion: boolean;
}) {
    const [imageIndex, setImageIndex] = useState(0);
    const [headlineIndex, setHeadlineIndex] = useState(0);
    const activeHeadline = heroHeadlines[headlineIndex];
    const fullHeroTitle = `${activeHeadline.lead}${activeHeadline.emphasis}`;
    const [typedTitle, setTypedTitle] = useState(
        prefersReducedMotion
            ? `${heroHeadlines[0].lead}${heroHeadlines[0].emphasis}`
            : "",
    );
    const activeImage = activityItems[imageIndex];

    useEffect(() => {
        if (prefersReducedMotion) {
            setHeadlineIndex(0);
            setTypedTitle(`${heroHeadlines[0].lead}${heroHeadlines[0].emphasis}`);
            return undefined;
        }

        setHeadlineIndex(0);
        setTypedTitle("");
        let currentHeadlineIndex = 0;
        let currentLength = 0;
        let isDeleting = false;
        let pauseTicks = 0;
        const timer = window.setInterval(() => {
            if (pauseTicks > 0) {
                pauseTicks -= 1;
                return;
            }

            const headline = heroHeadlines[currentHeadlineIndex];
            const headlineText = `${headline.lead}${headline.emphasis}`;
            currentLength += isDeleting ? -1 : 1;
            setTypedTitle(headlineText.slice(0, currentLength));
            if (currentLength === headlineText.length) {
                isDeleting = true;
                pauseTicks = 24;
            } else if (currentLength === 0) {
                isDeleting = false;
                currentHeadlineIndex =
                    (currentHeadlineIndex + 1) % heroHeadlines.length;
                setHeadlineIndex(currentHeadlineIndex);
                pauseTicks = 8;
            }
        }, 45);

        return () => window.clearInterval(timer);
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion || activityItems.length < 2) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setImageIndex((currentIndex) => (currentIndex + 1) % activityItems.length);
        }, 5500);

        return () => window.clearInterval(timer);
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const nextImage = new Image();
        nextImage.src = activityItems[(imageIndex + 1) % activityItems.length].image;
    }, [imageIndex, prefersReducedMotion]);

    return (
        <section id="beranda" className="hero-shell">
            <AnimatePresence initial={false}>
                <motion.img
                    key={activeImage.image}
                    className="hero-background"
                    src={activeImage.image}
                    alt=""
                    aria-hidden="true"
                    fetchPriority={imageIndex === 0 ? "high" : "auto"}
                    initial={
                        prefersReducedMotion
                            ? false
                            : { opacity: 0, x: 18, scale: 1.015 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: 0, x: -18, scale: 1.015 }
                    }
                    transition={{
                        duration: prefersReducedMotion ? 0 : 0.85,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
            </AnimatePresence>
            <div className="hero-backdrop" aria-hidden="true" />
            <div className="hero-content">
                <motion.div
                    className="hero-copy"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.p
                        variants={heroReveal}
                        className="eyebrow"
                    >
                        Sentra pangan · Surabaya
                    </motion.p>
                    <motion.h1 variants={heroReveal} className="hero-title">
                        <span aria-hidden="true">
                            {typedTitle.slice(0, activeHeadline.lead.length)}
                            <em>{typedTitle.slice(activeHeadline.lead.length)}</em>
                            {!prefersReducedMotion && (
                                <span className="typing-caret" />
                            )}
                        </span>
                        <span className="sr-only">{fullHeroTitle}</span>
                    </motion.h1>
                    <motion.p variants={heroReveal} className="hero-subtitle">
                        Mempertemukan pedagang, pemasok, dan masyarakat dalam
                        satu ekosistem perdagangan yang aktif setiap hari.
                    </motion.p>

                    <motion.div variants={heroReveal} className="hero-actions">
                        <a href="#komoditas" className="primary-button">
                            Jelajahi komoditas
                            <ArrowRight size={16} />
                        </a>
                        <a href="#tentang" className="secondary-button">
                            Tentang Sidotopo
                        </a>
                    </motion.div>

                    <motion.div variants={heroReveal} className="hero-proof">
                        <span><Clock3 size={15} aria-hidden="true" /> Perdagangan 24 jam</span>
                        <span><Sparkles size={15} aria-hidden="true" /> 100+ jenis komoditas</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="hero-visual"
                >
                    <div className="hero-image-label">
                        <span className="hero-label-dot" />
                        Aktivitas pasar · Sidotopo
                    </div>
                    <div className="hero-stat-card">
                        <span>Ekosistem aktif</span>
                        <strong>120+</strong>
                        <span>pedagang beraktivitas</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section id="tentang" className="section-shell light-shell">
            <div className="content-grid about-grid">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealLeft}
                >
                    <p className="eyebrow">Tentang Sidotopo</p>
                    <h2 className="section-title">
                        Simpul perdagangan yang menghidupi kota.
                    </h2>
                    <div className="rich-text">
                        <p>
                            Pasar Induk Surabaya Sidotopo mempertemukan pedagang,
                            pemasok, dan pembeli dalam satu kawasan niaga yang
                            bergerak sepanjang hari. Dari hasil bumi hingga
                            kebutuhan pokok, komoditas mengalir untuk memenuhi
                            kebutuhan kota.
                        </p>
                    </div>
                    <a href="#fasilitas" className="text-link">
                        Kenali kawasan kami <ArrowRight size={15} aria-hidden="true" />
                    </a>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealRight}
                    className="image-stack"
                >
                    <div className="glow-orb glow-orb-left" />
                    <img
                        src={marketImages.marketTrade}
                        alt="Transaksi penjual dan pembeli di ruang usaha"
                        className="feature-image"
                    />
                    <div className="stat-badge">
                        <p>
                            <Clock3 size={13} aria-hidden="true" /> Berdenyut
                            setiap hari
                        </p>
                        <strong>
                            24<span>/7</span>
                        </strong>
                        <span>perdagangan pangan</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function MarketVideoSection() {
    return (
        <section id="video" className="section-shell video-shell">
            <div className="wrap video-layout">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    className="video-intro"
                >
                    <p className="eyebrow">
                        <Film size={15} aria-hidden="true" /> Cerita dari
                        Sidotopo
                    </p>
                    <h2 className="section-title">
                        Pasar yang terus bergerak, dalam satu video.
                    </h2>
                    <p className="section-summary">
                        Lihat lebih dekat suasana dan aktivitas di Pasar Induk
                        Surabaya Sidotopo. Tekan putar untuk memulai video dan
                        menyalakan suara.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="market-video-frame"
                >
                    <video
                        controls
                        preload="none"
                        playsInline
                        poster={marketImages.videoPoster}
                        aria-label="Video profil Pasar Induk Surabaya Sidotopo"
                    >
                        <source src={marketStoryVideo} type="video/mp4" />
                        Browser Anda tidak mendukung pemutaran video.
                    </video>
                    <div className="video-caption">
                        <span className="video-caption-icon">
                            <Film size={17} aria-hidden="true" />
                        </span>
                        <span>Profil Pasar Induk Surabaya Sidotopo</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StatsSection() {
    return (
        <section className="section-shell proof-shell">
            <div className="wrap">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    className="stats-heading"
                >
                    <div>
                        <p className="eyebrow eyebrow-light">Skala Sidotopo</p>
                        <h2 className="section-title">
                            Fondasi kuat untuk perdagangan yang terus bergerak.
                        </h2>
                    </div>
                    <p className="stats-summary">
                        Ruang dan jaringan usaha yang menopang kebutuhan pangan
                        Surabaya setiap hari.
                    </p>
                </motion.div>

                <div className="stats-grid">
                    {stats.map(({ icon: Icon, ...stat }, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                            className="stat-card"
                        >
                            <div className="stat-card-icon">
                                <Icon size={19} aria-hidden="true" />
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CommoditySection() {
    return (
        <section id="komoditas" className="section-shell light-shell">
            <div className="wrap">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    className="section-header"
                >
                    <div>
                        <p className="eyebrow">Komoditas utama</p>
                        <h2 className="section-title">
                            Banyak pilihan, satu ekosistem perdagangan.
                        </h2>
                    </div>
                    <p className="section-summary">
                        Dari hasil bumi hingga bahan pokok, lebih dari 100 jenis
                        komoditas menjadi bagian dari perputaran niaga harian.
                    </p>
                </motion.div>

                <div className="commodity-grid">
                    {commodityCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.article
                                key={card.title}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.5,
                                }}
                                className="commodity-card"
                            >
                                <div className="commodity-image-wrap">
                                    <img
                                        className="commodity-image"
                                        src={card.image}
                                        alt={`${card.title} di Pasar Induk Surabaya Sidotopo`}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="commodity-card-top">
                                    <span className="commodity-icon">
                                        <Icon size={22} aria-hidden="true" />
                                    </span>
                                    <span className="commodity-badge">{card.badge}</span>
                                </div>
                                <div className="commodity-content">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                                <span className="commodity-arrow" aria-hidden="true">
                                    <ChevronRight size={18} />
                                </span>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FacilitySection() {
    return (
        <section id="fasilitas" className="section-shell sage-shell">
            <div className="content-grid facility-grid">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealLeft}
                    className="facility-visual"
                >
                    <img
                        src={marketImages.marketVendor}
                        alt="Lapak dan display komoditas di area perdagangan"
                        className="facility-image"
                        loading="lazy"
                    />
                    <div className="facility-bubble">
                        <p className="mini-label">Fasilitas pasar</p>
                        <p className="facility-bubble-copy">
                            Ruang usaha, peluang perdagangan.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealRight}
                >
                    <p className="eyebrow">Fasilitas</p>
                    <h2 className="section-title">
                        Dirancang untuk mendukung aktivitas tanpa henti.
                    </h2>

                    <div className="facility-list">
                        {facilityItems.map((facility, index) => {
                            const Icon = facility.icon;
                            return (
                                <motion.div
                                    key={facility.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.35 }}
                                    variants={reveal}
                                    transition={{ delay: index * 0.06 }}
                                    className="facility-item"
                                >
                                    <div className="facility-icon">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3>{facility.title}</h3>
                                        <p>{facility.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <a href="#kontak" className="primary-button dark-button">
                        Temukan fasilitas
                        <ArrowRight size={16} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function AdvantageSection() {
    return (
        <section id="keunggulan" className="section-shell warm-shell">
            <div className="wrap">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    className="section-header compact-header"
                >
                    <p className="eyebrow dark-text">Why us</p>
                    <h2 className="section-title">
                        Lebih dari pasar. Sebuah ekosistem yang terus tumbuh.
                    </h2>
                </motion.div>

                <div className="advantage-grid">
                    {advantages.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.5,
                                }}
                                className="advantage-card"
                            >
                                <div className="advantage-icon">
                                    <Icon size={20} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="kontak" className="section-shell contact-shell">
            <div className="wrap contact-layout">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealLeft}
                    className="contact-copy"
                >
                    <p className="eyebrow eyebrow-light">
                        <MapPin size={14} aria-hidden="true" /> Terhubung dengan Sidotopo
                    </p>
                    <h2 className="section-title contact-title">
                        Ada ruang untuk tumbuh bersama.
                    </h2>
                    <p className="contact-summary">
                        Hubungi tim Pasar Induk Sidotopo untuk informasi
                        kawasan, fasilitas, dan peluang kerja sama.
                    </p>

                    <div className="contact-list">
                        {contactDetails.map(
                            ({ icon: Icon, label, value, href }) => (
                                <div key={label} className="contact-item">
                                    <span className="contact-icon">
                                        <Icon size={19} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="mini-label light-label">
                                            {label}
                                        </p>
                                        {href ? (
                                            <a
                                                className="contact-text"
                                                href={href}
                                            >
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="contact-text">
                                                {value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    <a
                        href={`mailto:${marketEmail}`}
                        className="primary-button contact-button"
                    >
                        Hubungi tim kami
                        <ArrowRight size={16} aria-hidden="true" />
                    </a>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealRight}
                    className="map-card"
                >
                    <div className="map-image-wrap">
                        <img
                            src={marketImages.marketStalls}
                            alt="Area perdagangan bahan pangan"
                            loading="lazy"
                        />
                    </div>
                    <div className="map-meta">
                        <div>
                            <p className="mini-label map-label">
                                <MapPin size={13} aria-hidden="true" /> Kunjungi kami
                            </p>
                            <p className="map-title">
                                Pasar Induk Surabaya Sidotopo
                            </p>
                        </div>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="map-action"
                        >
                            <MapPin size={15} aria-hidden="true" />
                            Buka peta
                        </a>
                    </div>
                    <p className="map-address">{marketAddress}</p>
                </motion.div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid wrap">
                <div>
                    <div className="brand-wrap footer-brand">
                        <span className="brand-mark">P</span>
                        <span className="brand-name">
                            Pasar Induk Surabaya Sidotopo
                        </span>
                    </div>
                    <p className="footer-copy">
                        Ruang niaga Sidotopo—tempat komoditas, pelaku usaha, dan
                        kehidupan kota saling terhubung.
                    </p>
                </div>

                <div>
                    <p className="footer-label">Navigasi</p>
                    <div className="footer-links">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="footer-label">Kontak</p>
                    <div className="footer-contact">
                        <p>{marketAddress}</p>
                        <p>
                            <a
                                href={marketWhatsAppUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                WhatsApp · +62 852 2505 7885
                            </a>
                        </p>
                        <p>
                            <a href={`mailto:${marketEmail}`}>{marketEmail}</a>
                        </p>
                    </div>
                    <div
                        className="footer-social-links"
                        aria-label="Media sosial"
                    >
                        {socialLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="wrap footer-bottom-inner">
                    <p>
                        © {new Date().getFullYear()} Pasar Induk Surabaya
                        Sidotopo.
                    </p>
                    <p>
                        Pasar Induk Surabaya Sidotopo · Perdagangan yang
                        menghidupi kota.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default App;

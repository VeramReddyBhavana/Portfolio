import { useState, useEffect, useRef } from "react";

const data = {
  name: "Bhavana Veram Reddy",
  title: "Python Developer & Data Engineer",
  tagline: "Turning raw data into actionable insight",
  bio: "Python Developer and graduate student at UMBC. I write clean, efficient Python for ETL pipelines, data automation, ML workflows, and backend scripting — with a working knowledge of MATLAB for numerical computing.",
  location: "Baltimore, MD",
  email: "ll60898@umbc.edu",
  phone: "+1 (667) 445-9877",
  availability: "May 2026",

  skills: [
    { cat: "Languages", icon: "⌨", items: ["Python", "SQL", "C++", "JavaScript", "React", "MATLAB (basic)"] },
    { cat: "Python Libraries", icon: "🐍", items: ["pandas", "NumPy", "scikit-learn", "SQLAlchemy", "Gradio", "face_recognition"] },
    { cat: "Databases", icon: "🗄", items: ["PostgreSQL", "MySQL"] },
    { cat: "Visualization", icon: "📊", items: ["Tableau", "Power BI", "MATLAB Plots"] },
    { cat: "Dev Tools", icon: "🛠", items: ["Git", "Azure", "Azure Databricks", "Microsoft Office"] },
    { cat: "Scientific Computing", icon: "🧮", items: ["MATLAB (basic)", "Numerical Analysis", "Data Modeling", "Algorithm Prototyping"] },
  ],

  experience: [
    {
      company: "Young Progressives Initiative",
      role: "Database Intern",
      period: "Nov 2025 – Present",
      location: "Baltimore, MD",
      current: true,
      points: [
        "Designing a PostgreSQL relational database to analyze social, economic, and academic factors affecting high school student performance.",
        "Developing Python-based ETL pipelines using pandas and SQLAlchemy to integrate educational and Census datasets.",
        "Conducting exploratory data analysis to identify patterns in GPA, attendance, and college readiness.",
        "Building interpretable predictive models using scikit-learn to evaluate drivers of student outcomes.",
        "Creating dashboards in Tableau and Power BI to visualize regional disparities in student performance.",
      ],
    },
    {
      company: "Microsoft",
      role: "Software Engineering Intern",
      period: "Apr 2023 – Jun 2023",
      location: "Hyderabad, India",
      current: false,
      points: [
        "Built front-end components for an internal application providing GST reports to auditors.",
        "Improved workflows and usability by enhancing UI components and automation scripts.",
        "Collaborated with cross-functional teams in an agile development environment.",
      ],
    },
  ],

  projects: [
    {
      title: "Federated Learning for Hospital Readmission Prediction",
      desc: "Privacy-aware ML model to predict 30-day hospital readmission risk. Deployed via an interactive Gradio interface simulating real-world clinical environments.",
      tech: ["Federated Learning", "Python", "Gradio", "scikit-learn"],
      color: "#c84b31",
      num: "01",
    },
    {
      title: "Face Mask Detection",
      desc: "Real-time computer vision system using MTCNN for face detection and MobileNetV2 for classification. Deployed for live-stream mask compliance monitoring.",
      tech: ["Computer Vision", "MTCNN", "MobileNetV2", "Python"],
      color: "#2d6a4f",
      num: "02",
    },
    {
      title: "Face Recognition Attendance System",
      desc: "Automated attendance tracking with facial recognition. Trained a Linear SVM classifier achieving high accuracy across a multi-user dataset — eliminating manual roll-calls.",
      tech: ["Face Recognition", "Linear SVM", "Python", "Automation"],
      color: "#1a4a7a",
      num: "03",
    },
  ],

  education: [
    {
      degree: "MPS in Data Science",
      minor: "Minor: Project Management",
      school: "University of Maryland, Baltimore County",
      year: "Graduating May 2026",
      gpa: null,
    },
    {
      degree: "B.E. in Information Technology",
      minor: null,
      school: "Army Institute of Technology, Pune",
      year: "Graduated Jun 2024",
      gpa: "CGPA: 8.91 / 10.0",
    },
  ],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,8,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.35s ease",
      padding: "0 2.5rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.1rem", letterSpacing: "0.02em", fontWeight: 700 }}>BVR</span>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l} style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
              <a href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#e8735a"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
              >{l}</a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${data.email}`} style={{ padding: "0.55rem 1.4rem", border: "1px solid rgba(232,115,90,0.6)", color: "#e8735a", textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.25s", borderRadius: 2 }}
          onMouseEnter={e => { e.target.style.background = "#e8735a"; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#e8735a"; }}
        >Hire Me</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 3000); return () => clearInterval(id); }, []);
  const roles = ["Python Developer", "Data Engineer", "ML Engineer", "Backend Developer"];

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(135deg, #08080c 0%, #0f0f1a 50%, #0a0a10 100%)",
      position: "relative", overflow: "hidden", padding: "0 2.5rem",
    }}>
      {/* Animated grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Glow blobs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,75,49,0.12) 0%, transparent 70%)", top: "10%", right: "5%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,106,79,0.08) 0%, transparent 70%)", bottom: "10%", left: "10%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 80, paddingBottom: 60 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8735a", marginBottom: "1.2rem", opacity: 0, animation: "fadeUp 0.8s 0.1s ease forwards" }}>
              Available · Baltimore, MD
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,5vw,5.5rem)", lineHeight: 1.05, fontWeight: 700, color: "#fff", marginBottom: "0.5rem", opacity: 0, animation: "fadeUp 0.8s 0.2s ease forwards" }}>
              {data.name.split(" ")[0]}<br />
              <span style={{ color: "#e8735a", fontStyle: "italic" }}>{data.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem", opacity: 0, animation: "fadeUp 0.8s 0.3s ease forwards" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", fontSize: "0.9rem" }}>—</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem", color: "rgba(255,255,255,0.7)", transition: "all 0.5s" }}>
                {roles[tick % roles.length]}
              </span>
            </div>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", maxWidth: "45ch", marginBottom: "3rem", opacity: 0, animation: "fadeUp 0.8s 0.4s ease forwards" }}>
              {data.bio}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.8s 0.5s ease forwards" }}>
              <a href="#projects" style={btnPrimary}>View Projects</a>
              <a href={`mailto:${data.email}`} style={btnOutline}>Get In Touch</a>
            </div>
          </div>

          {/* Stats card side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", opacity: 0, animation: "fadeUp 0.8s 0.4s ease forwards" }}>
            {[
              { label: "Current GPA equiv.", val: "8.91", sub: "B.E. Information Technology" },
              { label: "Internships", val: "2", sub: "Microsoft · YPI" },
              { label: "ML Projects", val: "3+", sub: "Computer Vision, Federated Learning" },
              { label: "Availability", val: "May '26", sub: "Open to full-time roles" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8, padding: "1.2rem 1.5rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "border-color 0.3s, background 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,115,90,0.3)"; e.currentTarget.style.background = "rgba(232,115,90,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.3rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{s.sub}</div>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#e8735a" }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)", animation: "pulse 2s infinite" }} />
      </div>
    </section>
  );
}

const btnPrimary = {
  display: "inline-block", padding: "0.85rem 2.2rem",
  background: "#e8735a", color: "#fff", textDecoration: "none",
  fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
  borderRadius: 3, border: "1px solid #e8735a", transition: "all 0.25s",
};
const btnOutline = {
  display: "inline-block", padding: "0.85rem 2.2rem",
  background: "transparent", color: "rgba(255,255,255,0.7)", textDecoration: "none",
  fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
  borderRadius: 3, border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.25s",
};

function SectionHeader({ num, title, light }) {
  return (
    <FadeIn>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "3.5rem" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#e8735a", letterSpacing: "0.1em" }}>{num}</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 700, color: light ? "#fff" : "#0d0d12", margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: light ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
      </div>
    </FadeIn>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 2.5rem", background: "#f7f4ef" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader num="01" title="Technical Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2, background: "rgba(0,0,0,0.08)" }}>
          {data.skills.map((s, i) => (
            <FadeIn key={s.cat} delay={i * 0.07}>
              <div style={{
                background: "#f7f4ef", padding: "2rem",
                cursor: "default", transition: "background 0.2s",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                onMouseLeave={e => e.currentTarget.style.background = "#f7f4ef"}
              >
                <div style={{ position: "absolute", bottom: -10, right: -10, fontSize: 60, opacity: 0.04, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0d0d12", userSelect: "none" }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontSize: 22, marginBottom: "0.8rem" }}>{s.icon}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8735a", marginBottom: "0.4rem" }}>{s.cat}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#0d0d12", marginBottom: "1rem" }}>{s.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {s.items.map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", padding: "0.3rem 0.7rem", background: "rgba(0,0,0,0.06)", color: "#5a5550", letterSpacing: "0.04em" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(null);
  return (
    <section id="experience" style={{ padding: "7rem 2.5rem", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader num="02" title="Work Experience" />
        <div>
          {data.experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                borderTop: i === 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}>
                <div
                  style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", padding: "2.5rem 0", cursor: "pointer" }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(0,0,0,0.35)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>{exp.period}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#0d0d12", marginBottom: "0.3rem" }}>{exp.company}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>{exp.location}</div>
                    {exp.current && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.7rem", border: "1px solid #e8735a", color: "#e8735a" }}>Current</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#0d0d12", lineHeight: 1.2, marginBottom: "0.5rem" }}>{exp.role}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(0,0,0,0.35)", letterSpacing: "0.08em" }}>Click to {open === i ? "collapse" : "expand"}</div>
                    </div>
                    <div style={{ fontSize: "1.2rem", color: "#e8735a", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", marginTop: 4, flexShrink: 0 }}>↓</div>
                  </div>
                </div>
                <div style={{
                  maxHeight: open === i ? 500 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                }}>
                  <ul style={{ paddingBottom: "2.5rem", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: "1rem", fontSize: "0.95rem", lineHeight: 1.75, color: "#3a3530", paddingLeft: 220 + 48 }}>
                        <span style={{ color: "#e8735a", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", flexShrink: 0, marginTop: 3 }}>→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" style={{ padding: "7rem 2.5rem", background: "#08080c" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader num="03" title="Projects" light />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
          {data.projects.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  background: hovered === i ? "#111118" : "#0d0d14",
                  padding: "2.5rem",
                  cursor: "default",
                  transition: "background 0.25s",
                  position: "relative", overflow: "hidden",
                  borderTop: `3px solid ${hovered === i ? p.color : "transparent"}`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontFamily: "'Playfair Display', serif", fontSize: "6rem", fontWeight: 700, color: "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none" }}>{p.num}</div>
                <div style={{ width: 42, height: 42, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", borderRadius: 4 }}>
                  <span style={{ color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", fontWeight: 500 }}>{p.num}</span>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.07em", padding: "0.25rem 0.65rem", border: `1px solid ${p.color}60`, color: p.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding: "7rem 2.5rem", background: "#f7f4ef" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader num="04" title="Education" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 2, background: "rgba(0,0,0,0.08)" }}>
          {data.education.map((e, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "3rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#e8735a" }} />
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(0,0,0,0.35)", letterSpacing: "0.1em", marginBottom: "1rem" }}>{e.year}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#0d0d12", lineHeight: 1.3, marginBottom: "0.5rem" }}>{e.degree}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#e8735a", fontWeight: 500, marginBottom: "0.5rem" }}>{e.school}</div>
                {e.minor && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em" }}>{e.minor}</div>}
                {e.gpa && (
                  <div style={{ marginTop: "1.2rem", display: "inline-block", padding: "0.4rem 1rem", background: "rgba(232,115,90,0.08)", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#e8735a", letterSpacing: "0.08em" }}>
                    {e.gpa}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" style={{ padding: "8rem 2.5rem", background: "#08080c", textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8735a", marginBottom: "1.5rem" }}>Open to Opportunities</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Let's Work<br /><em style={{ color: "#e8735a" }}>Together</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Seeking full-time Python Developer and data engineering roles. Comfortable with scripting, ETL pipelines, ML workflows, and scientific computing. Available from May 2026.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href={`mailto:${data.email}`} style={btnPrimary}>Email Me</a>
            <button onClick={() => copy(data.phone)} style={{ ...btnOutline, cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)" }}>
              {copied ? "Copied!" : data.phone}
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "3rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {[
              { label: "Location", val: data.location },
              { label: "Status", val: "Open to Work" },
              { label: "Available", val: data.availability },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>{c.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{c.val}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #08080c; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; } 50% { opacity:0.8; } }
      `}</style>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <footer style={{ padding: "2rem 2.5rem", background: "#08080c", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)" }}>© 2026 Bhavana Veram Reddy</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)" }}>Data Science · Baltimore, MD</span>
      </footer>
    </>
  );
}

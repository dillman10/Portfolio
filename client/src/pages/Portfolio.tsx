import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Code,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Timer,
} from "lucide-react";
import { portfolioData } from "@/portfolio-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (
          visible?.target &&
          visible.target instanceof HTMLElement &&
          visible.target.id
        ) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProofIcon({ name }: { name: string }) {
  const common = { className: "h-4 w-4", strokeWidth: 1.8 };
  if (name === "clock") return <Timer {...common} />;
  if (name === "cloud") return <Cloud {...common} />;
  return <Code {...common} />;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const resolved =
    theme === "system"
      ? window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <button
      type="button"
      data-testid="button-theme-toggle"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card/40 backdrop-blur transition hover:bg-card"
    >
      <span className="sr-only">Toggle theme</span>
      {resolved === "dark" ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      )}
    </button>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.25 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const current = ref.current;
      if (!current) return;
      const r = current.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    }

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [x, y]);

  const mask = useTransform([sx, sy], ([mx, my]) => {
    return `radial-gradient(220px 220px at ${mx}px ${my}px, rgba(59,130,246,0.35), rgba(59,130,246,0.10) 40%, transparent 70%)`;
  });

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: mask as unknown as string,
        WebkitMaskImage: mask as unknown as string,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_70%_10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_30%_80%,rgba(34,211,238,0.14),transparent_55%)]" />
    </motion.div>
  );
}

function CaseStudyDialog({
  project,
}: {
  project: (typeof portfolioData.projects)[number];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          data-testid={`button-case-study-${project.id}`}
          className="group h-9 px-3"
        >
          Read case study
          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle data-testid={`text-case-study-title-${project.id}`}>
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-sm leading-relaxed">
          <section className="space-y-1">
            <div
              className="text-xs font-mono text-muted-foreground"
              data-testid={`text-case-study-section-problem-${project.id}`}
            >
              Problem
            </div>
            <div>{project.caseStudy.problem}</div>
          </section>

          <section className="space-y-1">
            <div
              className="text-xs font-mono text-muted-foreground"
              data-testid={`text-case-study-section-role-${project.id}`}
            >
              My role
            </div>
            <div>{project.caseStudy.role}</div>
          </section>

          <section className="space-y-1">
            <div
              className="text-xs font-mono text-muted-foreground"
              data-testid={`text-case-study-section-process-${project.id}`}
            >
              Process + decisions
            </div>
            <div>{project.caseStudy.process}</div>
          </section>

          <section className="space-y-1">
            <div
              className="text-xs font-mono text-muted-foreground"
              data-testid={`text-case-study-section-results-${project.id}`}
            >
              Results
            </div>
            <div>{project.caseStudy.results}</div>
          </section>

          <section className="space-y-1">
            <div
              className="text-xs font-mono text-muted-foreground"
              data-testid={`text-case-study-section-next-${project.id}`}
            >
              Improve next
            </div>
            <div>{project.caseStudy.nextSteps}</div>
          </section>

          <div className="pt-1">
            <a
              data-testid={`link-project-${project.id}`}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Project link{" "}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Portfolio() {
  const sections = useMemo(() => ["projects", "about", "contact"], []);
  const active = useActiveSection(sections);
  const [copied, setCopied] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const emailHref = `mailto:${portfolioData.email}`;

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();

    const name = contactName.trim();
    const senderEmail = contactEmail.trim();
    const message = contactMessage.trim();

    const subject = name
      ? `Hiring Inquiry from ${name}`
      : "Hiring Inquiry";

    const bodyParts: string[] = [];
    if (name) bodyParts.push(`Name: ${name}`);
    if (senderEmail) bodyParts.push(`Email: ${senderEmail}`);
    if (message) {
      bodyParts.push("");
      bodyParts.push(message);
    }

    const body = bodyParts.length > 0 ? bodyParts.join("\n") : "";

    const params = new URLSearchParams();
    params.set("subject", subject);
    if (body) params.set("body", body);
    if (senderEmail) params.set("reply-to", senderEmail);

    window.location.href = `mailto:${portfolioData.email}?${params.toString()}`;

    setContactName("");
    setContactEmail("");
    setContactMessage("");
  }

  return (
    <div className="min-h-dvh bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.08] dark:opacity-[0.09]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),transparent_35%)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <a
            href="#"
            data-testid="link-home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg border bg-card">
              <span className="font-mono text-[11px] text-muted-foreground">
                DS
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold" data-testid="text-name">
                {portfolioData.name}
              </div>
              <div
                className="text-xs text-muted-foreground"
                data-testid="text-role"
              >
                {portfolioData.role}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {sections.map((id) => (
              <button
                key={id}
                type="button"
                data-testid={`button-nav-${id}`}
                onClick={() => scrollToId(id)}
                className={cn(
                  "text-sm text-muted-foreground transition hover:text-foreground",
                  active === id && "text-foreground",
                )}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={emailHref}
              data-testid="button-email-me"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Email me
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 md:pb-18 md:pt-16">
            <div className="pointer-events-none absolute -inset-x-8 -top-24 h-64 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_60%)]" />

            <div className="relative rounded-2xl border bg-card/40 p-6 backdrop-blur md:p-10">
              <CursorGlow />

              <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                    className="space-y-3"
                  >
                    <div
                      className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground"
                      data-testid="chip-availability"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Open to interviews · Remote or SF
                    </div>

                    <h1
                      className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
                      data-testid="text-hero-headline"
                    >
                      {portfolioData.hero.headline}
                    </h1>
                    <p
                      className="max-w-prose text-balance text-muted-foreground"
                      data-testid="text-hero-subheadline"
                    >
                      {portfolioData.hero.subheadline}
                    </p>
                  </motion.div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      data-testid="button-hero-contact"
                      className="h-11 px-5"
                      onClick={() => scrollToId("contact")}
                    >
                      Contact
                      <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.8} />
                    </Button>
                    <Button
                      data-testid="button-hero-view-projects"
                      variant="secondary"
                      className="h-11 px-5"
                      onClick={() => scrollToId("projects")}
                    >
                      View projects
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {portfolioData.hero.proof.map((p, i) => (
                      <div
                        key={i}
                        data-testid={`chip-proof-${i}`}
                        className="inline-flex items-center gap-2 rounded-full border bg-background/55 px-3 py-1 text-xs text-muted-foreground"
                      >
                        <ProofIcon name={p.icon} />
                        <span className="font-mono text-[12px] text-foreground/90">
                          {p.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border bg-background/55 p-4">
                    <div
                      className="text-xs font-mono text-muted-foreground"
                      data-testid="text-hero-fast-scan"
                    >
                      10-second scan
                    </div>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li data-testid="text-hero-scan-1">
                        Ships end-to-end features.
                      </li>
                      <li data-testid="text-hero-scan-2">
                        Optimizes performance + reliability.
                      </li>
                      <li data-testid="text-hero-scan-3">
                        Communicates clearly. Owns outcomes.
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded-xl border bg-background/55 p-4">
                    <div className="space-y-1">
                      <div
                        className="text-xs font-mono text-muted-foreground"
                        data-testid="text-hero-cta-label"
                      >
                        Quick contact
                      </div>
                      <div className="text-sm" data-testid="text-hero-email">
                        {portfolioData.email}
                      </div>
                      <div className="text-sm" data-testid="text-hero-phone">
                        <a
                          href={`tel:${portfolioData.phone.replace(/\s/g, "")}`}
                          className="transition hover:text-foreground"
                        >
                          {portfolioData.phone}
                        </a>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      data-testid="button-copy-email"
                      className="h-9"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            portfolioData.email,
                          );
                          setCopied(true);
                        } catch {
                          setCopied(false);
                        }
                      }}
                    >
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <h2
                className="text-2xl font-semibold tracking-tight"
                data-testid="text-projects-heading"
              >
                Projects
              </h2>
              <p
                className="max-w-prose text-sm text-muted-foreground"
                data-testid="text-projects-subheading"
              >
                Three problems. Clear constraints. Measurable outcomes.
              </p>
            </div>
            <a
              href={emailHref}
              data-testid="button-projects-lets-talk"
              className="hidden items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-foreground transition hover:bg-muted md:inline-flex"
            >
              Let’s talk <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {portfolioData.projects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Card className="group h-full overflow-hidden border bg-card/50 p-5 transition hover:bg-card hover:shadow-sm">
                  <div className="flex h-full flex-col">
                    <div className="space-y-2">
                      <div
                        className="text-sm font-semibold"
                        data-testid={`text-project-title-${p.id}`}
                      >
                        {p.title}
                      </div>
                      <div
                        className="text-sm text-muted-foreground"
                        data-testid={`text-project-impact-${p.id}`}
                      >
                        {p.impact}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm">
                      {p.metrics.map((m, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2"
                          data-testid={`text-project-metric-${p.id}-${idx}`}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          data-testid={`chip-project-stack-${p.id}-${s}`}
                          className="font-mono text-[11px]"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                      <CaseStudyDialog project={p} />
                      <a
                        href={p.link}
                        data-testid={`button-project-open-${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-lg border bg-background px-3 text-sm transition hover:bg-muted"
                      >
                        Open
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 pb-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div className="space-y-3">
              <h2
                className="text-2xl font-semibold tracking-tight"
                data-testid="text-about-heading"
              >
                About
              </h2>
              <p
                className="max-w-prose text-sm leading-relaxed text-muted-foreground"
                data-testid="text-about-bio"
              >
                {portfolioData.about.bio}
              </p>
            </div>

            <div className="rounded-2xl border bg-card/50 p-5">
              <div
                className="text-xs font-mono text-muted-foreground"
                data-testid="text-skills-label"
              >
                Skills
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {portfolioData.about.skills.map((s, idx) => (
                  <div
                    key={s}
                    data-testid={`chip-skill-${idx}`}
                    className="rounded-lg border bg-background/60 px-3 py-2 text-xs text-foreground/90"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 pb-18">
          <div className="rounded-2xl border bg-card/50 p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
              <div className="space-y-3">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  data-testid="text-contact-heading"
                >
                  Contact
                </h2>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid="text-contact-subheading"
                >
                  Fastest way: email. I’ll reply within 24–48 hours.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={emailHref}
                    data-testid="button-contact-email"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.8} />
                    Email
                  </a>
                  <a
                    href={portfolioData.github}
                    data-testid="button-contact-github"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm transition hover:bg-muted"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.8} />
                    GitHub
                  </a>
                  <a
                    href={portfolioData.linkedin}
                    data-testid="button-contact-linkedin"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 text-sm transition hover:bg-muted"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.8} />
                    LinkedIn
                  </a>
                </div>

              </div>

              <form className="space-y-3" onSubmit={handleContactSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-mono text-muted-foreground"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      data-testid="input-contact-name"
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-mono text-muted-foreground"
                    >
                      Your Email
                    </label>
                    <Input
                      id="contact-email"
                      data-testid="input-contact-email"
                      type="email"
                      placeholder="you@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-mono text-muted-foreground"
                  >
                    What You're Hiring For
                  </label>
                  <Textarea
                    id="contact-message"
                    data-testid="input-contact-message"
                    placeholder="Role, timeline, tech stack, etc."
                    className="min-h-28"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button
                    data-testid="button-contact-submit"
                    type="submit"
                    className="h-11 px-5"
                  >
                    <Mail className="mr-2 h-4 w-4" strokeWidth={1.8} />
                    Send
                  </Button>
                  <div
                    className="text-xs text-muted-foreground"
                    data-testid="status-contact-form"
                  >
                    Opens your email client
                  </div>
                </div>
              </form>
            </div>
          </div>

          <footer className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 px-1 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div data-testid="text-footer-left">
              {portfolioData.name} · {new Date().getFullYear()}
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

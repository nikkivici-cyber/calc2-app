import { r } from './build';

// Formula sheet. Each section renders as one block; `keywords` help the search box.
export type FormulaItem = { label?: string; tex: string; note?: string };
export type FormulaSection = {
  id: string;
  group: string;
  title: string;
  intro?: string;
  keywords?: string;
  items: FormulaItem[];
};

export const FORMULA_GROUPS = [
  'Trig Identities',
  'Integration Basics',
  'Techniques',
  'Applications',
  'Sequences & Series',
  'Parametric & Polar',
];

export const FORMULA_SECTIONS: FormulaSection[] = [
  // ───────────── Trig identities ─────────────
  {
    id: 'pythagorean',
    group: 'Trig Identities',
    title: 'Pythagorean Identities',
    intro: 'Used constantly to simplify integrands or convert between functions during substitutions.',
    keywords: 'sin cos tan sec cot csc squared',
    items: [
      { tex: r`\sin^2 x + \cos^2 x = 1` },
      { tex: r`1 + \tan^2 x = \sec^2 x`, note: r`Divide the first identity by $\cos^2 x$.` },
      { tex: r`1 + \cot^2 x = \csc^2 x`, note: r`Divide the first identity by $\sin^2 x$.` },
    ],
  },
  {
    id: 'double-angle',
    group: 'Trig Identities',
    title: 'Double-Angle Formulas',
    intro: "Crucial for reducing powers or handling integrals where angles don't match.",
    keywords: 'sin 2x cos 2x',
    items: [
      { label: 'Sine', tex: r`\sin 2x = 2\sin x\cos x`, note: 'Extremely useful backward and forward for integration.' },
      {
        label: 'Cosine — three forms (memorize all three, especially the last two)',
        tex: r`\begin{gathered}\cos 2x = \cos^2 x - \sin^2 x \\ \cos 2x = 2\cos^2 x - 1 \\ \cos 2x = 1 - 2\sin^2 x\end{gathered}`,
      },
    ],
  },
  {
    id: 'half-angle',
    group: 'Trig Identities',
    title: 'Half-Angle / Power-Reducing Formulas',
    intro: r`The most important identities in Calc II integration. To integrate $\sin^2 x$ or $\cos^2 x$, use these to drop to single powers.`,
    keywords: 'power reducing sin^2 cos^2 tan^2 even powers',
    items: [
      { label: 'Sine squared', tex: r`\sin^2 x = \frac{1 - \cos 2x}{2}` },
      { label: 'Cosine squared', tex: r`\cos^2 x = \frac{1 + \cos 2x}{2}` },
      { label: 'Tangent squared', tex: r`\tan^2 x = \frac{1 - \cos 2x}{1 + \cos 2x}` },
    ],
  },
  {
    id: 'sum-difference',
    group: 'Trig Identities',
    title: 'Sum and Difference Formulas',
    intro: 'Less frequent than power-reducing formulas, but they appear in advanced integration techniques and proofs.',
    keywords: 'angle addition',
    items: [
      { tex: r`\sin(x \pm y) = \sin x\cos y \pm \cos x\sin y` },
      { tex: r`\cos(x \pm y) = \cos x\cos y \mp \sin x\sin y` },
      { tex: r`\tan(x \pm y) = \frac{\tan x \pm \tan y}{1 \mp \tan x\tan y}` },
    ],
  },
  {
    id: 'product-to-sum',
    group: 'Trig Identities',
    title: 'Product-to-Sum Formulas',
    intro: r`Lifesavers for integrating products like $\sin(mx)\cos(nx)$.`,
    keywords: 'sin mx cos nx products',
    items: [
      { tex: r`\sin x\cos y = \tfrac12\big[\sin(x + y) + \sin(x - y)\big]` },
      { tex: r`\sin x\sin y = \tfrac12\big[\cos(x - y) - \cos(x + y)\big]` },
      { tex: r`\cos x\cos y = \tfrac12\big[\cos(x + y) + \cos(x - y)\big]` },
    ],
  },

  // ───────────── Integration basics ─────────────
  {
    id: 'derivatives',
    group: 'Integration Basics',
    title: 'Derivatives to Recognize',
    intro: 'Spotting these inside an integrand tells you what to substitute.',
    keywords: 'differentiation chain rule inverse trig',
    items: [
      { tex: r`\frac{d}{dx}\tan x = \sec^2 x \qquad \frac{d}{dx}\sec x = \sec x\tan x` },
      { tex: r`\frac{d}{dx}\cot x = -\csc^2 x \qquad \frac{d}{dx}\csc x = -\csc x\cot x` },
      { tex: r`\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1 - x^2}} \qquad \frac{d}{dx}\arctan x = \frac{1}{1 + x^2}` },
      { tex: r`\frac{d}{dx}\ln|x| = \frac1x \qquad \frac{d}{dx}a^x = a^x\ln a` },
    ],
  },
  {
    id: 'basic-integrals',
    group: 'Integration Basics',
    title: 'Basic Integrals',
    keywords: 'antiderivative table power rule ln exponential',
    items: [
      { tex: r`\int x^n\,dx = \frac{x^{n+1}}{n + 1} + C\ \ (n \ne -1) \qquad \int\frac{dx}{x} = \ln|x| + C` },
      { tex: r`\int e^x\,dx = e^x + C \qquad \int a^x\,dx = \frac{a^x}{\ln a} + C` },
      { tex: r`\int\sin x\,dx = -\cos x + C \qquad \int\cos x\,dx = \sin x + C` },
      { tex: r`\int\sec^2 x\,dx = \tan x + C \qquad \int\csc^2 x\,dx = -\cot x + C` },
      { tex: r`\int\sec x\tan x\,dx = \sec x + C \qquad \int\csc x\cot x\,dx = -\csc x + C` },
    ],
  },
  {
    id: 'trig-integrals-table',
    group: 'Integration Basics',
    title: 'Integrals of tan, cot, sec, csc',
    keywords: 'ln sec tan',
    items: [
      { tex: r`\int\tan x\,dx = \ln|\sec x| + C \qquad \int\cot x\,dx = \ln|\sin x| + C` },
      { tex: r`\int\sec x\,dx = \ln|\sec x + \tan x| + C` },
      { tex: r`\int\csc x\,dx = -\ln|\csc x + \cot x| + C` },
    ],
  },
  {
    id: 'inverse-trig-integrals',
    group: 'Integration Basics',
    title: 'Inverse Trig & Related Integrals',
    keywords: 'arctan arcsin a^2 + x^2 table',
    items: [
      { tex: r`\int\frac{dx}{a^2 + x^2} = \frac1a\arctan\frac xa + C` },
      { tex: r`\int\frac{dx}{\sqrt{a^2 - x^2}} = \arcsin\frac xa + C` },
      { tex: r`\int\frac{dx}{a^2 - x^2} = \frac{1}{2a}\ln\left|\frac{x + a}{x - a}\right| + C` },
      { tex: r`\int\frac{dx}{\sqrt{x^2 \pm a^2}} = \ln\left|x + \sqrt{x^2 \pm a^2}\right| + C` },
    ],
  },
  {
    id: 'u-sub',
    group: 'Integration Basics',
    title: 'Substitution (5.5)',
    keywords: 'u-sub chain rule change of limits',
    items: [
      { tex: r`\int f\big(g(x)\big)g'(x)\,dx = \int f(u)\,du,\quad u = g(x)` },
      { label: 'Definite: change the limits', tex: r`\int_a^b f\big(g(x)\big)g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du` },
    ],
  },

  // ───────────── Techniques ─────────────
  {
    id: 'parts',
    group: 'Techniques',
    title: 'Integration by Parts (7.1)',
    intro: r`Choose $u$ by **LIATE**: Logarithmic, Inverse trig, Algebraic, Trig, Exponential.`,
    keywords: 'IBP LIATE tabular product rule',
    items: [
      { tex: r`\int u\,dv = uv - \int v\,du` },
      { label: 'Definite', tex: r`\int_a^b u\,dv = \big[uv\big]_a^b - \int_a^b v\,du` },
      { note: r`If the original integral reappears (e.g. $\int e^x\sin x\,dx$), call it $I$ and solve for $I$.`, tex: r`I = \ldots - I \ \Rightarrow\ 2I = \ldots` },
    ],
  },
  {
    id: 'trig-integrals',
    group: 'Techniques',
    title: 'Trigonometric Integrals (7.2)',
    keywords: 'powers of sine cosine tangent secant odd even',
    items: [
      { label: r`$\int\sin^m x\cos^n x\,dx$`, tex: r`\begin{gathered}\text{odd } m\text{: save } \sin x,\ \sin^2 x = 1 - \cos^2 x,\ u = \cos x \\ \text{odd } n\text{: save } \cos x,\ \cos^2 x = 1 - \sin^2 x,\ u = \sin x \\ \text{both even: half-angle formulas}\end{gathered}` },
      { label: r`$\int\tan^m x\sec^n x\,dx$`, tex: r`\begin{gathered}\text{even } n\text{: save } \sec^2 x,\ u = \tan x \\ \text{odd } m\text{: save } \sec x\tan x,\ u = \sec x\end{gathered}` },
    ],
  },
  {
    id: 'trig-sub',
    group: 'Techniques',
    title: 'Trigonometric Substitution (7.3)',
    intro: 'After integrating, draw a reference triangle to convert back to x.',
    keywords: 'square root a^2 - x^2 reference triangle',
    items: [
      { label: r`$\sqrt{a^2 - x^2}$`, tex: r`x = a\sin\theta,\quad dx = a\cos\theta\,d\theta,\quad \sqrt{\ \ } = a\cos\theta` },
      { label: r`$\sqrt{a^2 + x^2}$`, tex: r`x = a\tan\theta,\quad dx = a\sec^2\theta\,d\theta,\quad \sqrt{\ \ } = a\sec\theta` },
      { label: r`$\sqrt{x^2 - a^2}$`, tex: r`x = a\sec\theta,\quad dx = a\sec\theta\tan\theta\,d\theta,\quad \sqrt{\ \ } = a\tan\theta` },
    ],
  },
  {
    id: 'partial-fractions',
    group: 'Techniques',
    title: 'Partial Fractions (7.4)',
    intro: 'Long division first if deg(top) ≥ deg(bottom). Then factor the denominator completely.',
    keywords: 'rational functions decomposition repeated irreducible quadratic',
    items: [
      { label: 'Distinct linear factors', tex: r`\frac{P(x)}{(x - a)(x - b)} = \frac{A}{x - a} + \frac{B}{x - b}` },
      { label: 'Repeated linear factor', tex: r`\frac{P(x)}{(x - a)^2} = \frac{A}{x - a} + \frac{B}{(x - a)^2}` },
      { label: 'Irreducible quadratic', tex: r`\frac{P(x)}{(x - a)(x^2 + c)} = \frac{A}{x - a} + \frac{Bx + C}{x^2 + c}` },
      { tex: r`\int\frac{A}{x - a}\,dx = A\ln|x - a| + C` },
    ],
  },
  {
    id: 'strategy',
    group: 'Techniques',
    title: 'Integration Strategy (7.5)',
    keywords: 'which technique method checklist tables',
    items: [
      { tex: r`\begin{gathered}\text{1. Simplify (algebra, identities, split)} \\ \text{2. Obvious } u\text{-substitution?} \\ \text{3. Classify: parts / trig / trig sub / partial fractions} \\ \text{4. Rewrite, new substitution, or table}\end{gathered}` },
      { label: 'Complete the square', tex: r`x^2 + bx + c = \left(x + \tfrac b2\right)^2 + \left(c - \tfrac{b^2}{4}\right)` },
    ],
  },
  {
    id: 'improper',
    group: 'Techniques',
    title: 'Improper Integrals (7.8)',
    keywords: 'infinite limits unbounded p-test convergence',
    items: [
      { tex: r`\int_a^\infty f(x)\,dx = \lim_{t\to\infty}\int_a^t f(x)\,dx` },
      { label: 'Blows up at b', tex: r`\int_a^b f(x)\,dx = \lim_{t\to b^-}\int_a^t f(x)\,dx` },
      { label: 'p-tests', tex: r`\int_1^\infty\frac{dx}{x^p} \text{ conv.} \iff p > 1 \qquad \int_0^1\frac{dx}{x^p} \text{ conv.} \iff p < 1` },
    ],
  },

  // ───────────── Applications ─────────────
  {
    id: 'net-change',
    group: 'Applications',
    title: 'Velocity & Net Change (6.1)',
    keywords: 'displacement distance position rate',
    items: [
      { label: 'Displacement', tex: r`\int_a^b v(t)\,dt` },
      { label: 'Total distance', tex: r`\int_a^b |v(t)|\,dt` },
      { label: 'Net change', tex: r`Q(b) = Q(a) + \int_a^b Q'(t)\,dt` },
    ],
  },
  {
    id: 'area',
    group: 'Applications',
    title: 'Area Between Curves (6.2)',
    keywords: 'region top bottom right left',
    items: [
      { tex: r`A = \int_a^b\big[f(x) - g(x)\big]\,dx \quad (\text{top} - \text{bottom})` },
      { tex: r`A = \int_c^d\big[p(y) - q(y)\big]\,dy \quad (\text{right} - \text{left})` },
    ],
  },
  {
    id: 'volume',
    group: 'Applications',
    title: 'Volumes (6.3, 6.4)',
    keywords: 'disk washer shell slicing revolution solid',
    items: [
      { label: 'Slicing', tex: r`V = \int_a^b A(x)\,dx` },
      { label: 'Disk', tex: r`V = \pi\int_a^b R(x)^2\,dx` },
      { label: 'Washer', tex: r`V = \pi\int_a^b\big(R(x)^2 - r(x)^2\big)\,dx` },
      { label: 'Shell', tex: r`V = 2\pi\int_a^b(\text{radius})(\text{height})\,dx` },
    ],
  },
  {
    id: 'arc-length',
    group: 'Applications',
    title: 'Arc Length (6.5)',
    keywords: 'length of curve',
    items: [
      { tex: r`L = \int_a^b\sqrt{1 + \big[f'(x)\big]^2}\,dx` },
      { tex: r`L = \int_c^d\sqrt{1 + \big[g'(y)\big]^2}\,dy\quad\text{for } x = g(y)` },
    ],
  },
  {
    id: 'physics',
    group: 'Applications',
    title: 'Mass, Work & Springs (6.7)',
    keywords: "density work hooke's law spring pumping",
    items: [
      { label: 'Mass', tex: r`m = \int_a^b\rho(x)\,dx` },
      { label: 'Work', tex: r`W = \int_a^b F(x)\,dx` },
      { label: "Hooke's law", tex: r`F(x) = kx,\qquad W = \int_{x_1}^{x_2}kx\,dx`, note: 'x = stretch beyond natural length, in meters.' },
      { label: 'Pumping liquid', tex: r`W = \int\rho g\,A(y)\,(\text{distance lifted})\,dy` },
    ],
  },

  // ───────────── Sequences & series ─────────────
  {
    id: 'sequences',
    group: 'Sequences & Series',
    title: 'Sequence Limits (11.1)',
    keywords: 'limit r^n e growth rates',
    items: [
      { tex: r`\lim_{n\to\infty}r^n = 0 \ \ (|r| < 1) \qquad \lim_{n\to\infty}\left(1 + \frac an\right)^n = e^a` },
      { label: 'Growth rates', tex: r`\ln n \ll n^p \ll b^n \ll n! \ll n^n` },
    ],
  },
  {
    id: 'geometric',
    group: 'Sequences & Series',
    title: 'Geometric, p-Series, Telescoping (11.2–11.3)',
    keywords: 'sum geometric ratio harmonic',
    items: [
      { label: 'Geometric', tex: r`\sum_{n=0}^\infty ar^n = \frac{a}{1 - r} \quad (|r| < 1)`, note: 'Sum = first term ÷ (1 − r).' },
      { label: 'p-series', tex: r`\sum_{n=1}^\infty\frac{1}{n^p} \text{ converges} \iff p > 1` },
      { label: 'Telescoping', tex: r`S = \lim_{N\to\infty}S_N` },
    ],
  },
  {
    id: 'tests',
    group: 'Sequences & Series',
    title: 'Convergence Tests (11.3–11.7)',
    keywords: 'divergence integral comparison limit ratio root alternating',
    items: [
      { label: 'Divergence', tex: r`\lim a_n \ne 0 \Rightarrow \sum a_n \text{ diverges}` },
      { label: 'Integral', tex: r`\sum f(n) \sim \int_1^\infty f(x)\,dx` },
      { label: 'Limit comparison', tex: r`\lim\frac{a_n}{b_n} = c \in (0, \infty) \Rightarrow \text{same behavior}` },
      { label: 'Ratio / Root', tex: r`L = \lim\left|\frac{a_{n+1}}{a_n}\right| \ \text{ or } \ \lim\sqrt[n]{|a_n|}` , note: 'L < 1 converges absolutely; L > 1 diverges; L = 1 inconclusive.' },
      { label: 'Alternating Series Test', tex: r`b_{n+1} \le b_n,\ b_n \to 0 \Rightarrow \sum(-1)^nb_n \text{ conv.}` },
      { label: 'AST error bound', tex: r`|S - S_N| \le b_{N+1}` },
    ],
  },
  {
    id: 'power-series',
    group: 'Sequences & Series',
    title: 'Power Series (11.8–11.9)',
    keywords: 'radius interval of convergence differentiate integrate',
    items: [
      { tex: r`\sum c_n(x - a)^n \text{ converges for } |x - a| < R`, note: 'Test the endpoints separately.' },
      { tex: r`\frac{1}{1 - x} = \sum_{n=0}^\infty x^n,\quad |x| < 1` },
      { label: 'Term by term (same R)', tex: r`\frac{d}{dx}\sum c_nx^n = \sum nc_nx^{n-1} \qquad \int\sum c_nx^n = C + \sum\frac{c_nx^{n+1}}{n + 1}` },
    ],
  },
  {
    id: 'taylor',
    group: 'Sequences & Series',
    title: 'Taylor & Maclaurin Series (11.10)',
    keywords: 'maclaurin e^x sin cos ln arctan',
    items: [
      { tex: r`f(x) = \sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x - a)^n` },
      { tex: r`e^x = \sum_{n=0}^\infty\frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \cdots \quad (R = \infty)` },
      { tex: r`\sin x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n + 1)!} = x - \frac{x^3}{3!} + \cdots` },
      { tex: r`\cos x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \cdots` },
      { tex: r`\ln(1 + x) = \sum_{n=1}^\infty\frac{(-1)^{n+1}x^n}{n} \quad (R = 1)` },
      { tex: r`\arctan x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{2n + 1} \quad (R = 1)` },
    ],
  },

  // ───────────── Parametric & polar ─────────────
  {
    id: 'parametric',
    group: 'Parametric & Polar',
    title: 'Parametric Curves (10.1–10.2)',
    keywords: 'dy/dx tangent second derivative arc length',
    items: [
      { label: 'Slope', tex: r`\frac{dy}{dx} = \frac{dy/dt}{dx/dt}`, note: 'Horizontal tangent: dy/dt = 0. Vertical tangent: dx/dt = 0.' },
      { label: 'Second derivative', tex: r`\frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}` },
      { label: 'Arc length', tex: r`L = \int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt` },
    ],
  },
  {
    id: 'polar',
    group: 'Parametric & Polar',
    title: 'Polar Coordinates (10.3)',
    keywords: 'conversion r theta rose cardioid',
    items: [
      { tex: r`x = r\cos\theta \qquad y = r\sin\theta` },
      { tex: r`r^2 = x^2 + y^2 \qquad \tan\theta = \frac yx` },
      { label: 'Shapes', tex: r`\begin{gathered}r = a\cos(n\theta)\text{: } n \text{ petals (odd } n),\ 2n \text{ (even } n) \\ r = a(1 \pm \cos\theta)\text{: cardioid}\end{gathered}` },
    ],
  },
  {
    id: 'polar-calculus',
    group: 'Parametric & Polar',
    title: 'Polar Area & Length (10.4)',
    keywords: 'area sector length',
    items: [
      { label: 'Area', tex: r`A = \frac12\int_\alpha^\beta r^2\,d\theta` },
      { label: 'Between curves', tex: r`A = \frac12\int_\alpha^\beta\big(r_{\text{out}}^2 - r_{\text{in}}^2\big)\,d\theta` },
      { label: 'Arc length', tex: r`L = \int_\alpha^\beta\sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta` },
    ],
  },
];

// One markup string per section, so each section renders as a single math block.
export function sectionMarkup(s: FormulaSection): string {
  // Display math is already a block, so only add a line break after an intro or a note.
  let out = s.intro ? `${s.intro}\n` : '';
  for (const it of s.items) {
    const label = it.label ? `**${it.label}**` : '';
    out += `${label}$$${it.tex}$$${it.note ? `${it.note}\n` : ''}`;
  }
  return out;
}

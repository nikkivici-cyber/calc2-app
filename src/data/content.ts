import type { PracticeQuestion, Subtopic, Unit } from './types';

// String.raw keeps LaTeX backslashes readable (no "\\int" escaping).
// Never write "${" in these strings — it would start a template interpolation.
const r = String.raw;

const U1 = { unit_id: 'unit_1_integration', unit_title: 'Unit 1: Integration Techniques' };
const U2 = { unit_id: 'unit_2_applications', unit_title: 'Unit 2: Applications of Integration' };
const U3 = { unit_id: 'unit_3_series', unit_title: 'Unit 3: Sequences & Series' };

const SUBTOPICS: Subtopic[] = [
  // ───────────────────────── Unit 1 ─────────────────────────
  {
    ...U1,
    subtopic_id: 'calc2_1_1',
    title: 'Integration by Parts',
    overview: {
      formula: r`$$\int u \, dv = uv - \int v \, du$$`,
      key_takeaway: r`Use the **LIATE** rule to choose $u$: **L**ogarithmic, **I**nverse trig, **A**lgebraic, **T**rigonometric, **E**xponential. Pick $u$ from whichever type appears first — it should get simpler when differentiated.`,
    },
    sample_question: {
      question: r`Evaluate: $$\int x \cos(x) \, dx$$`,
      steps: [
        r`**Identify $u$ and $dv$:** Let $u = x$ (Algebraic) and $dv = \cos(x)\,dx$ (Trig). A comes before T in LIATE.`,
        r`**Compute $du$ and $v$:** $du = dx$, and $v = \int \cos(x)\,dx = \sin(x)$.`,
        r`**Apply the formula:** $$\int x\cos(x)\,dx = x\sin(x) - \int \sin(x)\,dx$$`,
        r`**Final integration:** $$x\sin(x) - (-\cos(x)) + C = x\sin(x) + \cos(x) + C$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_ibp_01',
        question: r`Evaluate: $$\int x e^x \, dx$$`,
        options: [r`$x e^x - e^x + C$`, r`$x e^x + e^x + C$`, r`$\frac{x^2}{2} e^x + C$`, r`$e^x (x + 1) + C$`],
        correct_index: 0,
        explanation: r`Set $u = x \Rightarrow du = dx$ and $dv = e^x dx \Rightarrow v = e^x$. Then $\int x e^x dx = x e^x - \int e^x dx = x e^x - e^x + C$.`,
      },
      {
        id: 'q_ibp_02',
        question: r`Evaluate: $$\int \ln(x) \, dx$$`,
        options: [r`$x\ln(x) - x + C$`, r`$\frac{1}{x} + C$`, r`$x\ln(x) + x + C$`, r`$\frac{(\ln x)^2}{2} + C$`],
        correct_index: 0,
        explanation: r`Trick: write it as $\int \ln(x)\cdot 1\,dx$. Let $u = \ln x$ (L) so $du = \frac{1}{x}dx$, and $dv = dx$ so $v = x$. Then $x\ln x - \int x\cdot\frac{1}{x}dx = x\ln x - x + C$.`,
      },
      {
        id: 'q_ibp_03',
        question: r`Evaluate: $$\int x^2 e^x \, dx$$`,
        options: [r`$e^x(x^2 - 2x + 2) + C$`, r`$e^x(x^2 + 2x + 2) + C$`, r`$x^2 e^x - 2e^x + C$`, r`$\frac{x^3}{3} e^x + C$`],
        correct_index: 0,
        explanation: r`Apply parts **twice**. First $u = x^2$, $dv = e^x dx$: $x^2e^x - \int 2x e^x dx$. Then $\int 2xe^x dx = 2(xe^x - e^x)$. Total: $x^2e^x - 2xe^x + 2e^x + C = e^x(x^2 - 2x + 2) + C$.`,
      },
    ],
  },
  {
    ...U1,
    subtopic_id: 'calc2_1_2',
    title: 'Trigonometric Integrals',
    overview: {
      formula: r`$$\sin^2 x = \frac{1 - \cos 2x}{2}, \qquad \cos^2 x = \frac{1 + \cos 2x}{2}$$`,
      key_takeaway: r`For $\int \sin^m x \cos^n x\,dx$: if a power is **odd**, save one factor and convert the rest with $\sin^2 x + \cos^2 x = 1$, then substitute. If both powers are **even**, use the half-angle identities above.`,
    },
    sample_question: {
      question: r`Evaluate: $$\int \sin^3 x \, dx$$`,
      steps: [
        r`**Odd power of sine — save one $\sin x$:** $$\int \sin^2 x \,\sin x\,dx = \int (1 - \cos^2 x)\sin x\,dx$$`,
        r`**Substitute:** Let $u = \cos x$, so $du = -\sin x\,dx$. $$-\int (1 - u^2)\,du$$`,
        r`**Integrate:** $$-\left(u - \frac{u^3}{3}\right) + C$$`,
        r`**Back-substitute:** $$-\cos x + \frac{\cos^3 x}{3} + C$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_trig_01',
        question: r`Evaluate: $$\int \sin^2 x \, dx$$`,
        options: [r`$\frac{x}{2} - \frac{\sin 2x}{4} + C$`, r`$\frac{x}{2} + \frac{\sin 2x}{4} + C$`, r`$\frac{\sin^3 x}{3} + C$`, r`$-\frac{\cos^2 x}{2} + C$`],
        correct_index: 0,
        explanation: r`Even power → half-angle: $\int \frac{1 - \cos 2x}{2}dx = \frac{x}{2} - \frac{\sin 2x}{4} + C$.`,
      },
      {
        id: 'q_trig_02',
        question: r`Evaluate: $$\int \cos^3 x \, dx$$`,
        options: [r`$\sin x - \frac{\sin^3 x}{3} + C$`, r`$\frac{\cos^4 x}{4} + C$`, r`$\sin x + \frac{\sin^3 x}{3} + C$`, r`$-\sin x + \frac{\sin^3 x}{3} + C$`],
        correct_index: 0,
        explanation: r`Save one $\cos x$: $\int (1 - \sin^2 x)\cos x\,dx$. With $u = \sin x$, $du = \cos x\,dx$: $\int (1 - u^2)du = u - \frac{u^3}{3} + C = \sin x - \frac{\sin^3 x}{3} + C$.`,
      },
      {
        id: 'q_trig_03',
        question: r`Evaluate: $$\int \sec^2 x \tan x \, dx$$`,
        options: [r`$\frac{\tan^2 x}{2} + C$`, r`$\frac{\sec^3 x}{3} + C$`, r`$\sec x \tan x + C$`, r`$\ln|\sec x| + C$`],
        correct_index: 0,
        explanation: r`Let $u = \tan x$, so $du = \sec^2 x\,dx$. Then $\int u\,du = \frac{u^2}{2} + C = \frac{\tan^2 x}{2} + C$.`,
      },
    ],
  },
  {
    ...U1,
    subtopic_id: 'calc2_1_3',
    title: 'Trigonometric Substitution',
    overview: {
      formula: r`$$\sqrt{a^2 - x^2}:\ x = a\sin\theta \qquad \sqrt{a^2 + x^2}:\ x = a\tan\theta \qquad \sqrt{x^2 - a^2}:\ x = a\sec\theta$$`,
      key_takeaway: r`Match the radical to a Pythagorean identity so the square root disappears. Afterwards, draw a **reference triangle** to convert back from $\theta$ to $x$.`,
    },
    sample_question: {
      question: r`Evaluate: $$\int \frac{dx}{x^2\sqrt{4 - x^2}}$$`,
      steps: [
        r`**Choose the substitution:** $\sqrt{a^2 - x^2}$ with $a = 2$, so let $x = 2\sin\theta$, $dx = 2\cos\theta\,d\theta$.`,
        r`**Simplify the radical:** $\sqrt{4 - 4\sin^2\theta} = 2\cos\theta$.`,
        r`**Rewrite the integral:** $$\int \frac{2\cos\theta\,d\theta}{4\sin^2\theta \cdot 2\cos\theta} = \frac{1}{4}\int \csc^2\theta\,d\theta = -\frac{1}{4}\cot\theta + C$$`,
        r`**Back to $x$:** From the triangle (opposite $x$, hypotenuse $2$, adjacent $\sqrt{4-x^2}$): $\cot\theta = \frac{\sqrt{4 - x^2}}{x}$. $$-\frac{\sqrt{4 - x^2}}{4x} + C$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_tsub_01',
        question: r`Which substitution is best for $$\int \sqrt{x^2 + 9}\,dx \ ?$$`,
        options: [r`$x = 3\tan\theta$`, r`$x = 3\sin\theta$`, r`$x = 3\sec\theta$`, r`$x = 9\tan\theta$`],
        correct_index: 0,
        explanation: r`The form $\sqrt{x^2 + a^2}$ with $a = 3$ uses $x = 3\tan\theta$, since $9\tan^2\theta + 9 = 9\sec^2\theta$.`,
      },
      {
        id: 'q_tsub_02',
        question: r`Evaluate: $$\int \frac{dx}{\sqrt{x^2 + 1}}$$`,
        options: [r`$\ln\left|x + \sqrt{x^2 + 1}\right| + C$`, r`$\arctan x + C$`, r`$\arcsin x + C$`, r`$\sqrt{x^2 + 1} + C$`],
        correct_index: 0,
        explanation: r`With $x = \tan\theta$: $\int \frac{\sec^2\theta}{\sec\theta}d\theta = \int\sec\theta\,d\theta = \ln|\sec\theta + \tan\theta| + C = \ln\left|\sqrt{x^2+1} + x\right| + C$.`,
      },
      {
        id: 'q_tsub_03',
        question: r`Evaluate: $$\int \frac{dx}{(1 + x^2)^{3/2}}$$`,
        options: [r`$\frac{x}{\sqrt{1 + x^2}} + C$`, r`$\frac{1}{\sqrt{1 + x^2}} + C$`, r`$\arctan x + C$`, r`$-\frac{2}{\sqrt{1 + x^2}} + C$`],
        correct_index: 0,
        explanation: r`With $x = \tan\theta$: $\int \frac{\sec^2\theta}{\sec^3\theta}d\theta = \int\cos\theta\,d\theta = \sin\theta + C$. From the triangle, $\sin\theta = \frac{x}{\sqrt{1+x^2}}$.`,
      },
    ],
  },
  {
    ...U1,
    subtopic_id: 'calc2_1_4',
    title: 'Partial Fractions',
    overview: {
      formula: r`$$\frac{px + q}{(x - a)(x - b)} = \frac{A}{x - a} + \frac{B}{x - b}$$`,
      key_takeaway: r`Factor the denominator first (and do long division if the numerator's degree is $\ge$ the denominator's). Each linear factor gets $\frac{A}{x-a}$; a **repeated** factor $(x-a)^2$ needs both $\frac{A}{x-a} + \frac{B}{(x-a)^2}$.`,
    },
    sample_question: {
      question: r`Evaluate: $$\int \frac{dx}{x^2 - 1}$$`,
      steps: [
        r`**Factor and set up:** $$\frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}$$`,
        r`**Clear denominators:** $1 = A(x+1) + B(x-1)$.`,
        r`**Solve with smart $x$ values:** $x = 1$ gives $A = \frac{1}{2}$; $x = -1$ gives $B = -\frac{1}{2}$.`,
        r`**Integrate each piece:** $$\frac{1}{2}\ln|x - 1| - \frac{1}{2}\ln|x + 1| + C = \frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + C$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_pf_01',
        question: r`Decompose: $$\frac{5x + 1}{(x - 1)(x + 2)}$$`,
        options: [r`$\frac{2}{x-1} + \frac{3}{x+2}$`, r`$\frac{3}{x-1} + \frac{2}{x+2}$`, r`$\frac{2}{x-1} - \frac{3}{x+2}$`, r`$\frac{5}{x-1} + \frac{1}{x+2}$`],
        correct_index: 0,
        explanation: r`$5x + 1 = A(x+2) + B(x-1)$. At $x = 1$: $6 = 3A \Rightarrow A = 2$. At $x = -2$: $-9 = -3B \Rightarrow B = 3$.`,
      },
      {
        id: 'q_pf_02',
        question: r`Evaluate: $$\int \frac{dx}{x(x + 1)}$$`,
        options: [r`$\ln\left|\frac{x}{x+1}\right| + C$`, r`$\ln|x(x+1)| + C$`, r`$\ln\left|\frac{x+1}{x}\right| + C$`, r`$\ln|x| \cdot \ln|x+1| + C$`],
        correct_index: 0,
        explanation: r`$\frac{1}{x(x+1)} = \frac{1}{x} - \frac{1}{x+1}$, so the integral is $\ln|x| - \ln|x+1| + C = \ln\left|\frac{x}{x+1}\right| + C$.`,
      },
      {
        id: 'q_pf_03',
        question: r`What is the correct partial fraction **form** for $$\frac{x + 3}{x^2(x + 1)} \ ?$$`,
        options: [r`$\frac{A}{x} + \frac{B}{x^2} + \frac{C}{x+1}$`, r`$\frac{A}{x} + \frac{B}{x+1}$`, r`$\frac{A}{x^2} + \frac{B}{x+1}$`, r`$\frac{A}{x} + \frac{B}{x^2} + \frac{C}{(x+1)^2}$`],
        correct_index: 0,
        explanation: r`$x^2$ is a **repeated** linear factor, so it needs a term for each power: $\frac{A}{x} + \frac{B}{x^2}$. The single factor $(x+1)$ gets $\frac{C}{x+1}$.`,
      },
    ],
  },
  {
    ...U1,
    subtopic_id: 'calc2_1_5',
    title: 'Improper Integrals',
    overview: {
      formula: r`$$\int_a^{\infty} f(x)\,dx = \lim_{t \to \infty} \int_a^t f(x)\,dx \qquad \int_1^{\infty} \frac{dx}{x^p} \text{ converges} \iff p > 1$$`,
      key_takeaway: r`Replace the bad endpoint (an infinite bound **or** a vertical asymptote) with a variable $t$, integrate normally, then take the limit. If the limit is finite the integral **converges**; otherwise it **diverges**.`,
    },
    sample_question: {
      question: r`Evaluate: $$\int_1^{\infty} \frac{1}{x^2}\,dx$$`,
      steps: [
        r`**Rewrite as a limit:** $$\lim_{t\to\infty} \int_1^t x^{-2}\,dx$$`,
        r`**Integrate:** $$\lim_{t\to\infty} \left[-\frac{1}{x}\right]_1^t = \lim_{t\to\infty}\left(-\frac{1}{t} + 1\right)$$`,
        r`**Take the limit:** $\frac{1}{t} \to 0$, so the integral **converges to $1$**. (Consistent with the p-test: $p = 2 > 1$.)`,
      ],
    },
    practice_questions: [
      {
        id: 'q_imp_01',
        question: r`Evaluate: $$\int_1^{\infty} \frac{1}{x}\,dx$$`,
        options: [r`Diverges`, r`$1$`, r`$0$`, r`$\ln 2$`],
        correct_index: 0,
        explanation: r`$\lim_{t\to\infty}[\ln x]_1^t = \lim_{t\to\infty} \ln t = \infty$. This is the p-test with $p = 1$, which is **not** $> 1$.`,
      },
      {
        id: 'q_imp_02',
        question: r`Evaluate: $$\int_0^{\infty} e^{-x}\,dx$$`,
        options: [r`$1$`, r`$0$`, r`$e$`, r`Diverges`],
        correct_index: 0,
        explanation: r`$\lim_{t\to\infty}\left[-e^{-x}\right]_0^t = \lim_{t\to\infty}(-e^{-t} + 1) = 1$.`,
      },
      {
        id: 'q_imp_03',
        question: r`Evaluate: $$\int_0^{1} \frac{1}{\sqrt{x}}\,dx$$`,
        options: [r`$2$`, r`$\frac{1}{2}$`, r`Diverges`, r`$1$`],
        correct_index: 0,
        explanation: r`The integrand blows up at $x = 0$. $\lim_{t\to 0^+}\left[2\sqrt{x}\right]_t^1 = 2 - 0 = 2$, so it converges.`,
      },
    ],
  },

  // ───────────────────────── Unit 2 ─────────────────────────
  {
    ...U2,
    subtopic_id: 'calc2_2_1',
    title: 'Area Between Curves',
    overview: {
      formula: r`$$A = \int_a^b \big[f(x) - g(x)\big]\,dx, \quad f(x) \ge g(x) \text{ on } [a, b]$$`,
      key_takeaway: r`Find the intersection points to get the bounds, then integrate **top minus bottom**. If the curves cross inside the interval, split the integral at each crossing.`,
    },
    sample_question: {
      question: r`Find the area between $y = x$ and $y = x^2$.`,
      steps: [
        r`**Find intersections:** $x = x^2 \Rightarrow x(x - 1) = 0 \Rightarrow x = 0, 1$.`,
        r`**Which is on top?** Test $x = \frac{1}{2}$: $\frac{1}{2} > \frac{1}{4}$, so $y = x$ is on top.`,
        r`**Set up:** $$A = \int_0^1 (x - x^2)\,dx$$`,
        r`**Evaluate:** $$\left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_area_01',
        question: r`Find the area enclosed by $y = x^2$ and $y = 4$.`,
        options: [r`$\frac{32}{3}$`, r`$\frac{16}{3}$`, r`$8$`, r`$\frac{64}{3}$`],
        correct_index: 0,
        explanation: r`Intersections at $x = \pm 2$. $\int_{-2}^{2}(4 - x^2)\,dx = \left[4x - \frac{x^3}{3}\right]_{-2}^{2} = \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) = \frac{32}{3}$.`,
      },
      {
        id: 'q_area_02',
        question: r`Find the area between $y = x$ and $y = x^3$ for $0 \le x \le 1$.`,
        options: [r`$\frac{1}{4}$`, r`$\frac{1}{2}$`, r`$\frac{3}{4}$`, r`$\frac{1}{12}$`],
        correct_index: 0,
        explanation: r`On $[0,1]$, $x \ge x^3$. $\int_0^1 (x - x^3)\,dx = \frac{1}{2} - \frac{1}{4} = \frac{1}{4}$.`,
      },
    ],
  },
  {
    ...U2,
    subtopic_id: 'calc2_2_2',
    title: 'Volumes of Revolution',
    overview: {
      formula: r`$$\text{Disk: } V = \pi\int_a^b [R(x)]^2dx \qquad \text{Washer: } V = \pi\int_a^b \big(R^2 - r^2\big)dx \qquad \text{Shell: } V = 2\pi\int_a^b x\,f(x)\,dx$$`,
      key_takeaway: r`**Disks/washers** use slices **perpendicular** to the axis of rotation; **shells** use slices **parallel** to it. Choose whichever gives the easier integral.`,
    },
    sample_question: {
      question: r`Rotate the region under $y = \sqrt{x}$, $0 \le x \le 4$, about the $x$-axis. Find the volume.`,
      steps: [
        r`**Choose a method:** Slicing perpendicular to the $x$-axis gives disks of radius $R(x) = \sqrt{x}$.`,
        r`**Set up:** $$V = \pi\int_0^4 (\sqrt{x})^2\,dx = \pi\int_0^4 x\,dx$$`,
        r`**Evaluate:** $$\pi\left[\frac{x^2}{2}\right]_0^4 = \pi \cdot 8 = 8\pi$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_vol_01',
        question: r`Rotate $y = x$, $0 \le x \le 3$, about the $x$-axis. Find the volume.`,
        options: [r`$9\pi$`, r`$3\pi$`, r`$27\pi$`, r`$\frac{9\pi}{2}$`],
        correct_index: 0,
        explanation: r`Disk method: $\pi\int_0^3 x^2\,dx = \pi \cdot \frac{27}{3} = 9\pi$. (It's a cone: $\frac{1}{3}\pi r^2 h = \frac{1}{3}\pi(9)(3) = 9\pi$.)`,
      },
      {
        id: 'q_vol_02',
        question: r`The region between $y = x$ and $y = x^2$ is rotated about the $x$-axis. Find the volume.`,
        options: [r`$\frac{2\pi}{15}$`, r`$\frac{\pi}{6}$`, r`$\frac{\pi}{15}$`, r`$\frac{\pi}{30}$`],
        correct_index: 0,
        explanation: r`Washer with $R = x$, $r = x^2$ on $[0,1]$: $\pi\int_0^1 (x^2 - x^4)\,dx = \pi\left(\frac{1}{3} - \frac{1}{5}\right) = \frac{2\pi}{15}$.`,
      },
      {
        id: 'q_vol_03',
        question: r`Rotate the region under $y = x^2$, $0 \le x \le 1$, about the $y$-axis using shells.`,
        options: [r`$\frac{\pi}{2}$`, r`$\frac{\pi}{4}$`, r`$\frac{\pi}{5}$`, r`$\frac{2\pi}{3}$`],
        correct_index: 0,
        explanation: r`$V = 2\pi\int_0^1 x \cdot x^2\,dx = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$.`,
      },
    ],
  },
  {
    ...U2,
    subtopic_id: 'calc2_2_3',
    title: 'Arc Length',
    overview: {
      formula: r`$$L = \int_a^b \sqrt{1 + \big[f'(x)\big]^2}\,dx$$`,
      key_takeaway: r`Differentiate, square, add $1$, and look for a perfect square or a simple substitution — most exam problems are designed so the square root simplifies.`,
    },
    sample_question: {
      question: r`Find the length of $y = \frac{2}{3}x^{3/2}$ from $x = 0$ to $x = 3$.`,
      steps: [
        r`**Differentiate:** $f'(x) = x^{1/2}$, so $[f'(x)]^2 = x$.`,
        r`**Set up:** $$L = \int_0^3 \sqrt{1 + x}\,dx$$`,
        r`**Evaluate:** $$\left[\frac{2}{3}(1 + x)^{3/2}\right]_0^3 = \frac{2}{3}(8 - 1) = \frac{14}{3}$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_arc_01',
        question: r`Find the length of $y = 2x + 1$ from $x = 0$ to $x = 3$.`,
        options: [r`$3\sqrt{5}$`, r`$\sqrt{5}$`, r`$6$`, r`$3$`],
        correct_index: 0,
        explanation: r`$f'(x) = 2$, so $L = \int_0^3 \sqrt{1 + 4}\,dx = 3\sqrt{5}$. (Check with the distance formula from $(0,1)$ to $(3,7)$: $\sqrt{9 + 36} = 3\sqrt{5}$.)`,
      },
      {
        id: 'q_arc_02',
        question: r`Which integral gives the arc length of $y = x^2$ from $x = 0$ to $x = 1$?`,
        options: [r`$\int_0^1 \sqrt{1 + 4x^2}\,dx$`, r`$\int_0^1 \sqrt{1 + x^4}\,dx$`, r`$\int_0^1 \sqrt{1 + 2x}\,dx$`, r`$\int_0^1 (1 + 4x^2)\,dx$`],
        correct_index: 0,
        explanation: r`$f'(x) = 2x$, so $[f'(x)]^2 = 4x^2$. Don't square the original function, and don't forget the square root.`,
      },
    ],
  },

  // ───────────────────────── Unit 3 ─────────────────────────
  {
    ...U3,
    subtopic_id: 'calc2_3_1',
    title: 'Convergence Tests',
    overview: {
      formula: r`$$\text{Ratio Test: } L = \lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right| \quad \begin{cases} L < 1 & \text{converges} \\ L > 1 & \text{diverges} \\ L = 1 & \text{inconclusive} \end{cases}$$`,
      key_takeaway: r`Checklist: (1) **Divergence test** — if $a_n \not\to 0$, it diverges. (2) **Geometric** $\sum ar^n$ converges iff $|r| < 1$. (3) **p-series** $\sum \frac{1}{n^p}$ converges iff $p > 1$. (4) Factorials or $n$th powers → **Ratio Test**.`,
    },
    sample_question: {
      question: r`Does $$\sum_{n=1}^{\infty} \frac{n}{2^n}$$ converge?`,
      steps: [
        r`**Pick a test:** There's an exponential $2^n$, so use the Ratio Test.`,
        r`**Form the ratio:** $$\frac{a_{n+1}}{a_n} = \frac{n+1}{2^{n+1}} \cdot \frac{2^n}{n} = \frac{n+1}{2n}$$`,
        r`**Take the limit:** $L = \lim_{n\to\infty} \frac{n+1}{2n} = \frac{1}{2}$.`,
        r`**Conclude:** $L = \frac{1}{2} < 1$, so the series **converges**.`,
      ],
    },
    practice_questions: [
      {
        id: 'q_conv_01',
        question: r`Does $$\sum_{n=1}^{\infty} \frac{1}{n^2}$$ converge?`,
        options: [r`Converges (p-series, $p = 2 > 1$)`, r`Diverges (p-series)`, r`Diverges (Divergence Test)`, r`The Ratio Test proves it converges`],
        correct_index: 0,
        explanation: r`It's a p-series with $p = 2 > 1$. Note the Ratio Test gives $L = 1$ here, which is **inconclusive**.`,
      },
      {
        id: 'q_conv_02',
        question: r`Does $$\sum_{n=1}^{\infty} \frac{n}{n + 1}$$ converge?`,
        options: [r`Diverges (Divergence Test)`, r`Converges (p-series)`, r`Converges (Ratio Test)`, r`Converges to $1$`],
        correct_index: 0,
        explanation: r`$\lim_{n\to\infty} \frac{n}{n+1} = 1 \neq 0$, so the series diverges by the Divergence (nth-term) Test.`,
      },
      {
        id: 'q_conv_03',
        question: r`Find the sum: $$\sum_{n=0}^{\infty} \left(\frac{2}{3}\right)^n$$`,
        options: [r`$3$`, r`$2$`, r`$\frac{3}{2}$`, r`Diverges`],
        correct_index: 0,
        explanation: r`Geometric with $a = 1$, $r = \frac{2}{3}$: $\frac{a}{1 - r} = \frac{1}{1/3} = 3$.`,
      },
      {
        id: 'q_conv_04',
        question: r`The harmonic series $$\sum_{n=1}^{\infty} \frac{1}{n}$$ has terms that approach $0$. Does it converge?`,
        options: [r`No — it diverges (p-series, $p = 1$)`, r`Yes — because $\frac{1}{n} \to 0$`, r`Yes — it converges to $\ln 2$`, r`Inconclusive`],
        correct_index: 0,
        explanation: r`$a_n \to 0$ is **necessary but not sufficient**. The harmonic series is a p-series with $p = 1$, which diverges. (The **alternating** harmonic series converges to $\ln 2$.)`,
      },
    ],
  },
  {
    ...U3,
    subtopic_id: 'calc2_3_2',
    title: 'Power Series & Radius of Convergence',
    overview: {
      formula: r`$$\sum_{n=0}^{\infty} c_n (x - a)^n \quad \text{converges for } |x - a| < R$$`,
      key_takeaway: r`Apply the Ratio Test to $|c_n(x-a)^n|$ and solve $L < 1$ for $|x - a|$ to get $R$. The Ratio Test says nothing at the **endpoints** — test each one separately.`,
    },
    sample_question: {
      question: r`Find the interval of convergence of $$\sum_{n=1}^{\infty} \frac{x^n}{n}$$`,
      steps: [
        r`**Ratio Test:** $$\left|\frac{x^{n+1}}{n+1}\cdot\frac{n}{x^n}\right| = |x|\frac{n}{n+1} \to |x|$$`,
        r`**Radius:** Need $|x| < 1$, so $R = 1$.`,
        r`**Endpoint $x = 1$:** $\sum \frac{1}{n}$ is the harmonic series → **diverges**.`,
        r`**Endpoint $x = -1$:** $\sum \frac{(-1)^n}{n}$ is alternating harmonic → **converges**. Interval: $[-1, 1)$.`,
      ],
    },
    practice_questions: [
      {
        id: 'q_ps_01',
        question: r`Find the radius of convergence of $$\sum_{n=0}^{\infty} \frac{x^n}{n!}$$`,
        options: [r`$R = \infty$`, r`$R = 0$`, r`$R = 1$`, r`$R = e$`],
        correct_index: 0,
        explanation: r`$\left|\frac{x^{n+1}}{(n+1)!}\cdot\frac{n!}{x^n}\right| = \frac{|x|}{n+1} \to 0 < 1$ for **every** $x$. (This is the series for $e^x$.)`,
      },
      {
        id: 'q_ps_02',
        question: r`Find the radius of convergence of $$\sum_{n=0}^{\infty} n!\,x^n$$`,
        options: [r`$R = 0$`, r`$R = \infty$`, r`$R = 1$`, r`$R = \frac{1}{e}$`],
        correct_index: 0,
        explanation: r`$\left|\frac{(n+1)!\,x^{n+1}}{n!\,x^n}\right| = (n+1)|x| \to \infty$ unless $x = 0$. It only converges at its center.`,
      },
      {
        id: 'q_ps_03',
        question: r`Find the radius of convergence of $$\sum_{n=0}^{\infty} \frac{(x - 2)^n}{3^n}$$`,
        options: [r`$R = 3$`, r`$R = \frac{1}{3}$`, r`$R = 2$`, r`$R = 1$`],
        correct_index: 0,
        explanation: r`It's geometric with ratio $\frac{x-2}{3}$. Converges when $\left|\frac{x-2}{3}\right| < 1$, i.e. $|x - 2| < 3$.`,
      },
    ],
  },
  {
    ...U3,
    subtopic_id: 'calc2_3_3',
    title: 'Taylor & Maclaurin Series',
    overview: {
      formula: r`$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n \qquad (a = 0 \text{: Maclaurin})$$`,
      key_takeaway: r`Memorize the big four: $e^x = \sum \frac{x^n}{n!}$, $\sin x = \sum \frac{(-1)^n x^{2n+1}}{(2n+1)!}$, $\cos x = \sum \frac{(-1)^n x^{2n}}{(2n)!}$, $\frac{1}{1-x} = \sum x^n$ ($|x|<1$). Build new series by **substituting**, multiplying, differentiating or integrating these.`,
    },
    sample_question: {
      question: r`Find the Maclaurin series for $f(x) = e^x$.`,
      steps: [
        r`**Compute derivatives:** $f^{(n)}(x) = e^x$ for every $n$.`,
        r`**Evaluate at $0$:** $f^{(n)}(0) = e^0 = 1$.`,
        r`**Plug into the formula:** $$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$`,
      ],
    },
    practice_questions: [
      {
        id: 'q_tay_01',
        question: r`Which is the Maclaurin series for $\sin x$?`,
        options: [
          r`$x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$`,
          r`$1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$`,
          r`$x + \frac{x^3}{3!} + \frac{x^5}{5!} + \cdots$`,
          r`$1 + x + \frac{x^2}{2!} + \cdots$`,
        ],
        correct_index: 0,
        explanation: r`$\sin x$ is odd, so only odd powers appear, with alternating signs. The other choices are the series for $\cos x$, $\sinh x$ and $e^x$.`,
      },
      {
        id: 'q_tay_02',
        question: r`What is the coefficient of $x^2$ in the Maclaurin series of $\cos x$?`,
        options: [r`$-\frac{1}{2}$`, r`$\frac{1}{2}$`, r`$-1$`, r`$0$`],
        correct_index: 0,
        explanation: r`$\cos x = 1 - \frac{x^2}{2!} + \cdots$, so the coefficient is $-\frac{1}{2}$. Check: $\frac{f''(0)}{2!} = \frac{-\cos 0}{2} = -\frac{1}{2}$.`,
      },
      {
        id: 'q_tay_03',
        question: r`Find the Maclaurin series for $$\frac{1}{1 + x}$$`,
        options: [r`$\sum_{n=0}^{\infty} (-1)^n x^n$`, r`$\sum_{n=0}^{\infty} x^n$`, r`$\sum_{n=0}^{\infty} \frac{(-1)^n x^n}{n!}$`, r`$\sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}$`],
        correct_index: 0,
        explanation: r`Substitute $-x$ into $\frac{1}{1-x} = \sum x^n$: $\frac{1}{1-(-x)} = \sum (-x)^n = \sum (-1)^n x^n$, valid for $|x| < 1$. (The $\sum \frac{(-1)^{n+1}x^n}{n}$ choice is the series for $\ln(1+x)$.)`,
      },
    ],
  },
];

export const UNITS: Unit[] = [U1, U2, U3].map((u) => ({
  ...u,
  subtopics: SUBTOPICS.filter((s) => s.unit_id === u.unit_id),
}));

// The daily plan: one subtopic per day, in this order.
export const PLAN: Subtopic[] = SUBTOPICS;

export function dayNumber(subtopicId: string): number {
  return PLAN.findIndex((s) => s.subtopic_id === subtopicId) + 1;
}

export function getSubtopic(id: string): Subtopic | undefined {
  return SUBTOPICS.find((s) => s.subtopic_id === id);
}

export type QuestionWithSource = PracticeQuestion & { subtopic: Subtopic };

// Master question list — the Bookmark Bank filters this by bookmarked ids.
export const ALL_QUESTIONS: QuestionWithSource[] = SUBTOPICS.flatMap((s) =>
  s.practice_questions.map((q) => ({ ...q, subtopic: s })),
);

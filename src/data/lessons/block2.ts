import { lesson, r, type UnitInfo } from '../build';
import { BLOCK2_QUESTIONS } from '../questions/block2';

export const BLOCK2: UnitInfo = {
  unit_id: 'block_2',
  unit_title: 'Block 2: Advanced Integration Techniques',
};

export const BLOCK2_LESSONS = [
  // ─────────────────────────── 7.1 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.1',
    title: 'Integration by Parts',
    formula: r`$$\begin{gathered}\int u\,dv = uv - \int v\,du \\ \int_a^b u\,dv = \big[uv\big]_a^b - \int_a^b v\,du\end{gathered}$$`,
    takeaway: r`Integration by parts "undoes" the product rule. Choose $u$ with **LIATE** — **L**ogarithmic, **I**nverse trig, **A**lgebraic, **T**rigonometric, **E**xponential — whichever type appears **first** becomes $u$; everything else (including $dx$) is $dv$. Good choices make $\int v\,du$ **simpler** than the original. Sometimes you apply parts twice; if the original integral reappears, solve for it algebraically.`,
    sample: {
      question: r`Evaluate: $$\int x\cos x\,dx$$`,
      steps: [
        r`**Classify the factors.** $x$ is **A**lgebraic, $\cos x$ is **T**rig. In LIATE, A comes before T, so $u = x$.`,
        r`**Assign the parts:** $$u = x \qquad dv = \cos x\,dx$$`,
        r`**Differentiate $u$ and integrate $dv$:** $$du = dx \qquad v = \int\cos x\,dx = \sin x$$ (No $+C$ needed for $v$.)`,
        r`**Plug into $uv - \int v\,du$:** $$\int x\cos x\,dx = x\sin x - \int \sin x\,dx$$ The new integral has no $x$ factor — it's simpler, so our choice was right.`,
        r`**Finish the easy integral:** $\int\sin x\,dx = -\cos x$. So $$x\sin x - (-\cos x) + C = x\sin x + \cos x + C$$`,
        r`**Check:** $\frac{d}{dx}[x\sin x + \cos x] = (\sin x + x\cos x) - \sin x = x\cos x$ ✓`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.1'],
  }),

  // ─────────────────────────── 7.2 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.2',
    title: 'Trigonometric Integrals',
    formula: r`$$\begin{gathered}\sin^2 x + \cos^2 x = 1 \\ \sin^2 x = \frac{1 - \cos 2x}{2} \\ \cos^2 x = \frac{1 + \cos 2x}{2} \\ 1 + \tan^2 x = \sec^2 x\end{gathered}$$`,
    takeaway: r`For $\int\sin^m x\cos^n x\,dx$: **odd power of sine** → save one $\sin x$, convert the rest to cosines, let $u = \cos x$. **Odd power of cosine** → save one $\cos x$, convert the rest to sines, let $u = \sin x$. **Both even** → half-angle identities. For $\tan$/$\sec$: **even power of sec** → save $\sec^2 x$, let $u = \tan x$; **odd power of tan** → save $\sec x\tan x$, let $u = \sec x$.`,
    sample: {
      question: r`Evaluate: $$\int\sin^3 x\,dx$$`,
      steps: [
        r`**Identify the case.** The power of sine is $3$ — odd. So save one $\sin x$ for $du$: $$\int\sin^3 x\,dx = \int\sin^2 x\cdot\sin x\,dx$$`,
        r`**Convert the even part** with $\sin^2 x = 1 - \cos^2 x$: $$\int(1 - \cos^2 x)\sin x\,dx$$ Now everything is cosine, except the saved $\sin x$.`,
        r`**Substitute.** Let $u = \cos x$, so $du = -\sin x\,dx$, i.e. $\sin x\,dx = -du$: $$\int(1 - u^2)(-du) = -\int(1 - u^2)\,du$$`,
        r`**Integrate:** $$-\left(u - \frac{u^3}{3}\right) + C = -u + \frac{u^3}{3} + C$$`,
        r`**Back-substitute** $u = \cos x$: $$-\cos x + \frac{\cos^3 x}{3} + C$$`,
        r`**Check:** $\frac{d}{dx}\left[-\cos x + \frac{\cos^3 x}{3}\right] = \sin x - \cos^2 x\sin x = \sin x(1 - \cos^2 x) = \sin^3 x$ ✓`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.2'],
  }),

  // ─────────────────────────── 7.3 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.3',
    title: 'Trigonometric Substitutions',
    formula: r`$$\begin{array}{lll} \sqrt{a^2 - x^2} & x = a\sin\theta & a^2 - a^2\sin^2\theta = a^2\cos^2\theta \\ \sqrt{a^2 + x^2} & x = a\tan\theta & a^2 + a^2\tan^2\theta = a^2\sec^2\theta \\ \sqrt{x^2 - a^2} & x = a\sec\theta & a^2\sec^2\theta - a^2 = a^2\tan^2\theta \end{array}$$`,
    takeaway: r`Match the radical to one of the three forms so a Pythagorean identity removes the square root. **Steps:** (1) choose the substitution and find $dx$; (2) simplify the radical; (3) integrate in $\theta$; (4) draw a **reference triangle** from the substitution (e.g. $\sin\theta = \frac{x}{a}$: opposite $x$, hypotenuse $a$) to convert back to $x$.`,
    sample: {
      question: r`Evaluate: $$\int\frac{dx}{x^2\sqrt{4 - x^2}}$$`,
      steps: [
        r`**Choose the substitution.** $\sqrt{4 - x^2}$ has the form $\sqrt{a^2 - x^2}$ with $a = 2$, so $$x = 2\sin\theta \qquad dx = 2\cos\theta\,d\theta$$`,
        r`**Simplify the radical:** $$\sqrt{4 - 4\sin^2\theta} = \sqrt{4(1 - \sin^2\theta)} = \sqrt{4\cos^2\theta} = 2\cos\theta$$`,
        r`**Substitute everything** ($x^2 = 4\sin^2\theta$): $$\int\frac{2\cos\theta\,d\theta}{4\sin^2\theta\cdot 2\cos\theta} = \frac14\int\frac{d\theta}{\sin^2\theta} = \frac14\int\csc^2\theta\,d\theta$$`,
        r`**Integrate:** $\int\csc^2\theta\,d\theta = -\cot\theta$, so we get $-\frac14\cot\theta + C$.`,
        r`**Reference triangle.** $\sin\theta = \frac{x}{2}$ ⟹ opposite $= x$, hypotenuse $= 2$, adjacent $= \sqrt{4 - x^2}$ (Pythagoras). So $$\cot\theta = \frac{\text{adjacent}}{\text{opposite}} = \frac{\sqrt{4 - x^2}}{x}$$`,
        r`**Answer:** $$-\frac{\sqrt{4 - x^2}}{4x} + C$$`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.3'],
  }),

  // ─────────────────────────── 7.4 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.4',
    title: 'Partial Fractions',
    formula: r`$$\begin{gathered}\frac{px + q}{(x - a)(x - b)} = \frac{A}{x - a} + \frac{B}{x - b} \\ \frac{\ldots}{(x-a)^2} \to \frac{A}{x-a} + \frac{B}{(x-a)^2} \\ \frac{\ldots}{x^2 + c} \to \frac{Ax + B}{x^2 + c}\end{gathered}$$`,
    takeaway: r`**(1)** If the numerator's degree is $\ge$ the denominator's, do **long division** first. **(2)** Factor the denominator completely. **(3)** Write one term per factor: distinct linear → $\frac{A}{x-a}$; repeated linear → one term per power; irreducible quadratic → $\frac{Ax+B}{\ldots}$. **(4)** Multiply through by the denominator and solve for the constants (plug in the roots — "cover-up"). **(5)** Integrate each term: $\int\frac{A}{x - a}dx = A\ln|x - a|$.`,
    sample: {
      question: r`Evaluate: $$\int\frac{dx}{x^2 - 1}$$`,
      steps: [
        r`**Degree check:** numerator degree $0$ < denominator degree $2$. No division needed.`,
        r`**Factor:** $x^2 - 1 = (x - 1)(x + 1)$ — two distinct linear factors. $$\frac{1}{(x-1)(x+1)} = \frac{A}{x - 1} + \frac{B}{x + 1}$$`,
        r`**Clear denominators** (multiply both sides by $(x-1)(x+1)$): $$1 = A(x + 1) + B(x - 1)$$`,
        r`**Plug in the roots.** $x = 1$: $1 = A(2) + 0 \Rightarrow A = \frac12$. $x = -1$: $1 = 0 + B(-2) \Rightarrow B = -\frac12$.`,
        r`**Integrate each piece:** $$\int\left(\frac{1/2}{x - 1} - \frac{1/2}{x + 1}\right)dx = \frac12\ln|x - 1| - \frac12\ln|x + 1| + C$$`,
        r`**Combine with log rules** (optional): $$\frac12\ln\left|\frac{x - 1}{x + 1}\right| + C$$`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.4'],
  }),

  // ─────────────────────────── 7.5 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.5',
    title: 'Other Integration Strategies (incl. Tables)',
    formula: r`$$\begin{gathered}\textbf{1. Simplify} \text{ (algebra, identities, split fractions)} \\ \textbf{2. Obvious } u\textbf{-sub?} \\ \textbf{3. Classify: } \text{parts, trig powers, trig sub, partial fractions} \\ \textbf{4. Rewrite \& retry} \text{ (new substitution, table formula)}\end{gathered}$$`,
    takeaway: r`On an exam nobody tells you which technique to use. Ask in order: **Can I simplify** (algebra, trig identity, split the fraction)? **Is there an obvious substitution** (a function and its derivative)? **What kind of integrand is it** — product of different types → parts; powers of trig → trig integrals; $\sqrt{a^2 \pm x^2}$ → trig sub; rational function → partial fractions (complete the square for irreducible quadratics)? **Still stuck?** Try a creative substitution ($w = \sqrt x$, $w = e^x$), or match a **table formula** exactly, adjusting constants with a $u$-substitution.`,
    sample: {
      question: r`Evaluate: $$\int\frac{dx}{1 + e^x}$$`,
      steps: [
        r`**Try the obvious first.** $u = 1 + e^x$ gives $du = e^x\,dx$, but there's no $e^x$ in the numerator. Not directly.`,
        r`**Rewrite.** Multiply top and bottom by $e^{-x}$: $$\frac{1}{1 + e^x}\cdot\frac{e^{-x}}{e^{-x}} = \frac{e^{-x}}{e^{-x} + 1}$$`,
        r`**Now spot the substitution.** Let $u = e^{-x} + 1$, so $du = -e^{-x}\,dx$, i.e. $e^{-x}dx = -du$.`,
        r`**Rewrite and integrate:** $$\int\frac{e^{-x}\,dx}{e^{-x} + 1} = -\int\frac{du}{u} = -\ln|u| + C$$`,
        r`**Back-substitute:** $$-\ln\left(1 + e^{-x}\right) + C$$ (Absolute value not needed: $1 + e^{-x} > 0$.)`,
        r`**Equivalent form:** $-\ln(1 + e^{-x}) = -\ln\frac{e^x + 1}{e^x} = x - \ln(1 + e^x)$. Check: $\frac{d}{dx}[x - \ln(1 + e^x)] = 1 - \frac{e^x}{1 + e^x} = \frac{1}{1 + e^x}$ ✓`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.5'],
  }),

  // ─────────────────────────── 7.8 ───────────────────────────
  lesson(BLOCK2, {
    section: '7.8',
    title: 'Improper Integrals',
    formula: r`$$\begin{gathered}\int_a^\infty f(x)\,dx = \lim_{t\to\infty}\int_a^t f(x)\,dx \\ \int_a^b f(x)\,dx = \lim_{t\to b^-}\int_a^t f(x)\,dx \ \ (f \text{ blows up at } b) \\ \int_1^\infty\frac{dx}{x^p} \text{ conv.} \iff p > 1\end{gathered}$$`,
    takeaway: r`An integral is improper if a limit is **infinite** or the integrand is **unbounded** somewhere on $[a, b]$ — check the interior too (e.g. $\frac1x$ on $[-1, 1]$)! Replace the bad point by $t$, integrate normally, take the limit. Finite limit ⟹ **converges**; infinite or nonexistent ⟹ **diverges**. Two bad points? Split so each piece has one, and **both** must converge. Know the p-tests: $\int_1^\infty\frac{dx}{x^p}$ converges iff $p > 1$; $\int_0^1\frac{dx}{x^p}$ converges iff $p < 1$.`,
    sample: {
      question: r`Evaluate: $$\int_1^\infty\frac{1}{x^2}\,dx$$`,
      steps: [
        r`**Identify why it's improper:** the upper limit is $\infty$. The integrand $\frac1{x^2}$ is fine on $[1, \infty)$.`,
        r`**Rewrite as a limit:** $$\lim_{t\to\infty}\int_1^t x^{-2}\,dx$$`,
        r`**Integrate on $[1, t]$:** antiderivative of $x^{-2}$ is $-x^{-1}$: $$\int_1^t x^{-2}\,dx = \left[-\frac1x\right]_1^t = -\frac1t + 1$$`,
        r`**Take the limit:** $$\lim_{t\to\infty}\left(1 - \frac1t\right) = 1 - 0 = 1$$`,
        r`**Conclude:** the integral **converges to $1$**. This matches the p-test: $p = 2 > 1$.`,
      ],
    },
    questions: BLOCK2_QUESTIONS['7.8'],
  }),
];

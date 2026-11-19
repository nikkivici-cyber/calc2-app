import { lesson, r, type UnitInfo } from '../build';
import { BLOCK3_QUESTIONS } from '../questions/block3';

export const BLOCK3: UnitInfo = {
  unit_id: 'block_3',
  unit_title: 'Block 3: Sequences & Infinite Series',
};

export const BLOCK3_LESSONS = [
  // ─────────────────────────── 11.1 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.1',
    title: 'Sequences and Their Limits',
    formula: r`$$\begin{gathered}\lim_{n\to\infty} r^n = \begin{cases} 0 & |r| < 1 \\ 1 & r = 1 \\ \text{diverges} & r > 1 \text{ or } r \le -1 \end{cases} \\ \lim_{n\to\infty}\left(1 + \frac{a}{n}\right)^n = e^a\end{gathered}$$`,
    takeaway: r`A sequence $\{a_n\}$ **converges** if $a_n$ approaches one number $L$. Tools: **(1)** for rational expressions, divide by the highest power of $n$; **(2)** if $a_n = f(n)$, you may use L'Hôpital on $f(x)$; **(3)** for $(-1)^n$ or $\sin n$ factors, use the **Squeeze Theorem**; **(4)** growth ranking for large $n$: $\ln n \ll n^p \ll b^n \ll n! \ll n^n$.`,
    sample: {
      question: r`Find $$\lim_{n\to\infty}\frac{3n^2 + 1}{5n^2 - n}$$`,
      steps: [
        r`**Identify the type.** It's a ratio of polynomials in $n$, both of degree $2$. Plugging in "$\infty$" gives $\frac\infty\infty$ — we need algebra.`,
        r`**Divide every term by the highest power, $n^2$:** $$\frac{3n^2 + 1}{5n^2 - n} = \frac{3 + \frac{1}{n^2}}{5 - \frac{1}{n}}$$`,
        r`**Use $\frac{1}{n^k} \to 0$** for any $k > 0$: $\frac{1}{n^2} \to 0$ and $\frac1n \to 0$.`,
        r`**Evaluate:** $$\lim_{n\to\infty}\frac{3 + 0}{5 - 0} = \frac35$$`,
        r`**Shortcut:** when the degrees are equal, the limit is the ratio of leading coefficients: $\frac35$. (Top degree smaller ⟹ $0$; top degree bigger ⟹ diverges.)`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.1'],
  }),

  // ─────────────────────────── 11.2 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.2',
    title: 'Infinite Series: Geometric & Telescoping',
    formula: r`$$\begin{gathered}\sum_{n=0}^\infty ar^n = a + ar + ar^2 + \cdots = \frac{a}{1 - r} \ \ (|r| < 1) \\ S = \lim_{N\to\infty} S_N,\ \ S_N = \sum_{n=1}^N a_n\end{gathered}$$`,
    takeaway: r`A series' sum is the **limit of its partial sums** $S_N$. **Geometric:** find the **first term** $a$ (plug in the starting index!) and the **ratio** $r$; it converges to $\frac{\text{first term}}{1 - r}$ only if $|r| < 1$. **Telescoping:** split with partial fractions, write out $S_N$, and watch the middle terms cancel.`,
    sample: {
      question: r`Find the sum: $$\sum_{n=1}^\infty\frac{1}{n(n + 1)}$$`,
      steps: [
        r`**Not geometric** (no constant ratio). The factored denominator suggests partial fractions.`,
        r`**Partial fractions:** $\frac{1}{n(n+1)} = \frac{A}{n} + \frac{B}{n + 1}$ ⟹ $1 = A(n + 1) + Bn$. $n = 0$: $A = 1$; $n = -1$: $B = -1$. $$\frac{1}{n(n+1)} = \frac1n - \frac{1}{n + 1}$$`,
        r`**Write out the partial sum $S_N$:** $$S_N = \left(1 - \tfrac12\right) + \left(\tfrac12 - \tfrac13\right) + \left(\tfrac13 - \tfrac14\right) + \cdots + \left(\tfrac1N - \tfrac{1}{N+1}\right)$$`,
        r`**Cancel.** Each $-\frac1k$ cancels the $+\frac1k$ right after it. Only the first and last survive: $$S_N = 1 - \frac{1}{N + 1}$$`,
        r`**Take the limit:** $$S = \lim_{N\to\infty}\left(1 - \frac{1}{N+1}\right) = 1$$ The series converges to $1$.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.2'],
  }),

  // ─────────────────────────── 11.3 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.3',
    title: 'The Divergence and Integral Tests',
    formula: r`$$\begin{gathered}\textbf{Divergence: } \lim_{n\to\infty}a_n \ne 0 \Rightarrow \sum a_n \text{ diverges} \\ \textbf{Integral: } \sum_{n=1}^\infty f(n) \text{ and } \int_1^\infty f(x)\,dx \\ \text{both converge or both diverge}\end{gathered}$$`,
    takeaway: r`**Divergence test** can only prove **divergence**. If $a_n \to 0$, it tells you **nothing** (e.g. $\sum\frac1n$ diverges even though $\frac1n\to0$). **Integral test** needs $f$ **positive, continuous, decreasing**; the integral's value is **not** the series' sum — it only tells you convergence. Main result: the **p-series** $\sum\frac{1}{n^p}$ converges iff $p > 1$.`,
    sample: {
      question: r`Does $$\sum_{n=2}^\infty\frac{1}{n\ln n}$$ converge or diverge?`,
      steps: [
        r`**Divergence test first:** $\frac{1}{n\ln n} \to 0$. Inconclusive — need another test.`,
        r`**Integral test hypotheses** for $f(x) = \frac{1}{x\ln x}$ on $[2, \infty)$: positive ✓ (both $x$ and $\ln x > 0$); continuous ✓; decreasing ✓ (the denominator $x\ln x$ increases).`,
        r`**Set up the integral:** $$\int_2^\infty\frac{dx}{x\ln x} = \lim_{t\to\infty}\int_2^t\frac{dx}{x\ln x}$$`,
        r`**Substitute** $u = \ln x$, $du = \frac{dx}{x}$: $$\int\frac{du}{u} = \ln|u| = \ln(\ln x)$$`,
        r`**Evaluate:** $$\lim_{t\to\infty}\big[\ln(\ln t) - \ln(\ln 2)\big] = \infty$$ ($\ln\ln t$ grows very slowly, but without bound.)`,
        r`**Conclude:** the integral diverges, so by the Integral Test the series **diverges**.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.3'],
  }),

  // ─────────────────────────── 11.4 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.4',
    title: 'Comparison Tests',
    formula: r`$$\begin{gathered}\textbf{Direct: } 0 \le a_n \le b_n \Rightarrow \begin{cases}\sum b_n \text{ conv.} \Rightarrow \sum a_n \text{ conv.} \\ \sum a_n \text{ div.} \Rightarrow \sum b_n \text{ div.}\end{cases} \\ \textbf{Limit: } \lim\frac{a_n}{b_n} = c,\ 0 < c < \infty \Rightarrow \text{same behavior}\end{gathered}$$`,
    takeaway: r`Pick a comparison series $b_n$ by keeping only the **dominant terms** of top and bottom (e.g. $\frac{n + 1}{n^3 + 2} \approx \frac{n}{n^3} = \frac{1}{n^2}$). Then use a p-series or geometric series you already understand. **Direct comparison** needs the inequality to point the right way: smaller than convergent ⟹ converges; bigger than divergent ⟹ diverges. If the inequality points the wrong way, use the **Limit Comparison Test** instead.`,
    sample: {
      question: r`Does $$\sum_{n=1}^\infty\frac{n + 1}{n^3 + 2}$$ converge?`,
      steps: [
        r`**Guess the behavior.** For large $n$: numerator $\approx n$, denominator $\approx n^3$, so $a_n \approx \frac{n}{n^3} = \frac{1}{n^2}$. Choose $b_n = \frac{1}{n^2}$ (convergent p-series, $p = 2$).`,
        r`**Limit Comparison:** $$\lim_{n\to\infty}\frac{a_n}{b_n} = \lim_{n\to\infty}\frac{n + 1}{n^3 + 2}\cdot\frac{n^2}{1} = \lim_{n\to\infty}\frac{n^3 + n^2}{n^3 + 2}$$`,
        r`**Evaluate:** divide by $n^3$: $\frac{1 + 1/n}{1 + 2/n^3} \to 1$.`,
        r`**Check the condition:** $c = 1$ is positive and finite ✓.`,
        r`**Conclude:** $\sum\frac{1}{n^2}$ converges, so $\sum\frac{n + 1}{n^3 + 2}$ **converges** too.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.4'],
  }),

  // ─────────────────────────── 11.5 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.5',
    title: 'Alternating Series',
    formula: r`$$\begin{gathered}\sum(-1)^{n+1}b_n \text{ with } b_n > 0 \text{ converges if} \\ b_{n+1} \le b_n \text{ and } b_n \to 0 \\ \text{Error: } |S - S_N| \le b_{N+1}\end{gathered}$$`,
    takeaway: r`**Alternating Series Test (AST):** if the sizes $b_n$ **decrease** and **go to $0$**, the alternating series converges. If $b_n \not\to 0$, it diverges by the Divergence Test. **Error bound:** stopping after $N$ terms, the error is at most the **first omitted term** $b_{N+1}$, and the true sum lies between consecutive partial sums.`,
    sample: {
      question: r`Show that $$\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n} = 1 - \frac12 + \frac13 - \frac14 + \cdots$$ converges, and bound the error of using $S_4$.`,
      steps: [
        r`**Identify $b_n$:** the size of each term (without sign) is $b_n = \frac1n > 0$.`,
        r`**Condition 1 — decreasing:** $b_{n+1} = \frac{1}{n + 1} < \frac1n = b_n$ ✓`,
        r`**Condition 2 — limit 0:** $\lim\frac1n = 0$ ✓`,
        r`**Conclude:** by the AST, the series **converges**. (Its sum is $\ln 2 \approx 0.693$.)`,
        r`**Partial sum:** $S_4 = 1 - \frac12 + \frac13 - \frac14 = \frac{12 - 6 + 4 - 3}{12} = \frac{7}{12} \approx 0.583$.`,
        r`**Error bound:** the first omitted term is $b_5 = \frac15$, so $|S - S_4| \le 0.2$. (Actual error: $0.693 - 0.583 \approx 0.11$ ✓)`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.5'],
  }),

  // ─────────────────────────── 11.6 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.6',
    title: 'Absolute Convergence, Ratio & Root Tests',
    formula: r`$$\begin{gathered}\textbf{Ratio: } L = \lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right| \\ \textbf{Root: } L = \lim_{n\to\infty}\sqrt[n]{|a_n|} \\ \begin{cases} L < 1 & \text{converges absolutely} \\ L > 1 & \text{diverges} \\ L = 1 & \text{inconclusive} \end{cases}\end{gathered}$$`,
    takeaway: r`**Absolutely convergent:** $\sum|a_n|$ converges — then $\sum a_n$ converges too. **Conditionally convergent:** $\sum a_n$ converges but $\sum|a_n|$ doesn't (e.g. alternating harmonic). Use the **Ratio Test** for factorials and exponentials; the **Root Test** when the whole term is raised to the $n$th power. Both give $L = 1$ (useless) for p-series and rational functions — use comparison tests there.`,
    sample: {
      question: r`Does $$\sum_{n=1}^\infty\frac{n^2}{2^n}$$ converge?`,
      steps: [
        r`**Choose a test.** There's an exponential $2^n$ ⟹ Ratio Test.`,
        r`**Write $a_{n+1}$** by replacing $n$ with $n + 1$: $a_{n+1} = \frac{(n+1)^2}{2^{n+1}}$.`,
        r`**Form the ratio** (dividing = multiplying by the flip): $$\frac{a_{n+1}}{a_n} = \frac{(n+1)^2}{2^{n+1}}\cdot\frac{2^n}{n^2} = \frac{(n+1)^2}{n^2}\cdot\frac{2^n}{2^{n+1}}$$`,
        r`**Simplify:** $\frac{2^n}{2^{n+1}} = \frac12$, and $\frac{(n+1)^2}{n^2} = \left(1 + \frac1n\right)^2$. So the ratio is $\frac12\left(1 + \frac1n\right)^2$.`,
        r`**Take the limit:** $L = \frac12(1 + 0)^2 = \frac12$.`,
        r`**Conclude:** $L = \frac12 < 1$ ⟹ the series **converges absolutely**.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.6'],
  }),

  // ─────────────────────────── 11.7 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.7',
    title: 'Strategies for Testing Series',
    formula: r`$$\begin{gathered} a_n \not\to 0 \Rightarrow \text{Divergence} \\ \text{geometric, } p\text{, telescoping} \\ n!,\ b^n \Rightarrow \text{Ratio} \\ (\ldots)^n \Rightarrow \text{Root} \\ \text{rational} \Rightarrow \text{Comparison} \\ (-1)^n \Rightarrow \text{AST} \\ \text{easy } \textstyle\int f \Rightarrow \text{Integral} \end{gathered}$$`,
    takeaway: r`Work through the checklist above **in order** — it's what you do on an exam. Quick pattern matching: **factorials** → Ratio; **whole term to the $n$th power** → Root; **polynomials and roots** → Limit Comparison with a p-series; **alternating sign** → check absolute convergence first, then AST; **$\ln n$ or $e^{-n^2}$ type** with an obvious antiderivative → Integral Test.`,
    sample: {
      question: r`Classify $$\sum_{n=1}^\infty\frac{(-1)^n n}{n^2 + 1}$$ as absolutely convergent, conditionally convergent, or divergent.`,
      steps: [
        r`**Divergence test:** $\frac{n}{n^2 + 1} \to 0$. Inconclusive — keep going.`,
        r`**Absolute convergence first.** $\sum\left|a_n\right| = \sum\frac{n}{n^2 + 1}$. Dominant terms: $\frac{n}{n^2} = \frac1n$.`,
        r`**LCT with $\frac1n$:** $\lim\frac{n}{n^2 + 1}\cdot n = \lim\frac{n^2}{n^2 + 1} = 1$. Since $\sum\frac1n$ diverges, $\sum|a_n|$ **diverges**. Not absolutely convergent.`,
        r`**Now the AST** on $b_n = \frac{n}{n^2 + 1}$. Limit: $b_n \to 0$ ✓`,
        r`**Decreasing?** Let $f(x) = \frac{x}{x^2 + 1}$: $f'(x) = \frac{(x^2 + 1) - x(2x)}{(x^2+1)^2} = \frac{1 - x^2}{(x^2+1)^2} < 0$ for $x > 1$ ✓`,
        r`**Conclude:** converges by AST, but not absolutely ⟹ **conditionally convergent**.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.7'],
  }),

  // ─────────────────────────── 11.8 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.8',
    title: 'Power Series: Radius & Interval of Convergence',
    formula: r`$$\begin{gathered}\sum_{n=0}^\infty c_n(x - a)^n \text{ converges for } |x - a| < R \\ \text{interval: } (a - R,\ a + R) \text{ plus any endpoints that work}\end{gathered}$$`,
    takeaway: r`**(1)** Apply the Ratio Test to $|c_n(x - a)^n|$; $x$ stays in the limit. **(2)** Solve $L < 1$ for $|x - a| < R$ — that's the radius. **(3)** The Ratio Test says nothing at the **endpoints** $x = a \pm R$: plug each in and test the resulting number series separately (p-series, AST, etc.). $R = 0$ means it converges only at $x = a$; $R = \infty$ means everywhere.`,
    sample: {
      question: r`Find the interval of convergence of $$\sum_{n=1}^\infty\frac{x^n}{n}$$`,
      steps: [
        r`**Ratio Test** (keep $x$): $$\left|\frac{x^{n+1}}{n + 1}\cdot\frac{n}{x^n}\right| = |x|\cdot\frac{n}{n + 1}$$`,
        r`**Limit:** $\frac{n}{n+1} \to 1$, so $L = |x|$.`,
        r`**Radius:** need $L < 1$ ⟹ $|x| < 1$. So $R = 1$, and the series converges on $(-1, 1)$ for sure.`,
        r`**Endpoint $x = 1$:** $\sum\frac{1^n}{n} = \sum\frac1n$ — harmonic, **diverges**. Exclude $1$.`,
        r`**Endpoint $x = -1$:** $\sum\frac{(-1)^n}{n}$ — alternating harmonic, **converges** by AST. Include $-1$.`,
        r`**Interval:** $[-1, 1)$.`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.8'],
  }),

  // ─────────────────────────── 11.9 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.9',
    title: 'Representing Functions as Power Series',
    formula: r`$$\begin{gathered}\frac{1}{1 - x} = \sum_{n=0}^\infty x^n = 1 + x + x^2 + \cdots,\ |x| < 1 \\ \frac{d}{dx}\sum c_nx^n = \sum nc_nx^{n-1} \\ \int\sum c_nx^n\,dx = C + \sum\frac{c_nx^{n+1}}{n + 1}\end{gathered}$$`,
    takeaway: r`Start from the geometric series $\frac{1}{1 - \text{(something)}} = \sum(\text{something})^n$, valid when $|\text{something}| < 1$. **Substitute** (replace $x$ by $-x$, $3x$, $x^2$, …), **multiply** by powers of $x$, **differentiate** or **integrate** term by term. Differentiating and integrating keep the same radius $R$ (endpoints may change).`,
    sample: {
      question: r`Find a power series for $\ln(1 + x)$.`,
      steps: [
        r`**Find a related geometric series.** $\frac{d}{dx}\ln(1 + x) = \frac{1}{1 + x}$, and $\frac{1}{1 + x} = \frac{1}{1 - (-x)}$.`,
        r`**Substitute $-x$** into $\frac{1}{1 - u} = \sum u^n$: $$\frac{1}{1 + x} = \sum_{n=0}^\infty(-x)^n = \sum_{n=0}^\infty(-1)^nx^n,\quad |x| < 1$$`,
        r`**Integrate term by term:** $$\ln(1 + x) = \int\frac{dx}{1 + x} = C + \sum_{n=0}^\infty\frac{(-1)^nx^{n+1}}{n + 1}$$`,
        r`**Find $C$** by plugging in $x = 0$: $\ln 1 = 0 = C + 0$, so $C = 0$.`,
        r`**Result:** $$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots,\quad R = 1$$`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.9'],
  }),

  // ─────────────────────────── 11.10 ───────────────────────────
  lesson(BLOCK3, {
    section: '11.10',
    title: 'Taylor and Maclaurin Series',
    formula: r`$$\begin{gathered}f(x) = \sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x - a)^n \\ e^x = \sum\frac{x^n}{n!} \\ \sin x = \sum\frac{(-1)^nx^{2n+1}}{(2n + 1)!} \\ \cos x = \sum\frac{(-1)^nx^{2n}}{(2n)!}\end{gathered}$$`,
    takeaway: r`**Taylor** series is centered at $a$; **Maclaurin** means $a = 0$. To build one: make a table of $f, f', f'', \ldots$ evaluated at $a$, divide the $n$th one by $n!$, and look for a pattern. **Don't forget the $n!$.** Memorize $e^x$, $\sin x$, $\cos x$, $\frac{1}{1 - x}$, and build others by substitution (e.g. $e^{-x^2}$: replace $x$ with $-x^2$). Series also make limits like $\frac{\sin x - x}{x^3}$ easy.`,
    sample: {
      question: r`Find the Maclaurin series for $f(x) = e^x$.`,
      steps: [
        r`**Derivative table.** Every derivative of $e^x$ is $e^x$: $f(x) = f'(x) = f''(x) = \cdots = e^x$.`,
        r`**Evaluate at $a = 0$:** $f^{(n)}(0) = e^0 = 1$ for every $n$.`,
        r`**Coefficients** $\frac{f^{(n)}(0)}{n!} = \frac{1}{n!}$.`,
        r`**Write the series:** $$e^x = \sum_{n=0}^\infty\frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$`,
        r`**Radius:** the Ratio Test gives $\frac{|x|}{n + 1} \to 0$, so $R = \infty$ — valid for every $x$.`,
        r`**Use it:** $e^1 \approx 1 + 1 + \frac12 + \frac16 + \frac1{24} \approx 2.708$ (true value $2.718\ldots$).`,
      ],
    },
    questions: BLOCK3_QUESTIONS['11.10'],
  }),
];

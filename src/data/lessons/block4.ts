import { lesson, r, type UnitInfo } from '../build';
import { BLOCK4_QUESTIONS } from '../questions/block4';

export const BLOCK4: UnitInfo = {
  unit_id: 'block_4',
  unit_title: 'Block 4: Parametric Equations & Polar Coordinates',
};

export const BLOCK4_LESSONS = [
  // ─────────────────────────── 10.1 ───────────────────────────
  lesson(BLOCK4, {
    section: '10.1',
    title: 'Parametric Curves',
    formula: r`$$\begin{gathered}x = f(t),\quad y = g(t),\quad a \le t \le b \\ \cos^2 t + \sin^2 t = 1 \\ \sec^2 t - \tan^2 t = 1\end{gathered}$$`,
    takeaway: r`A parametric curve traces the point $(f(t), g(t))$ as $t$ increases; the **orientation** is the direction of increasing $t$. To identify the curve, **eliminate the parameter**: solve one equation for $t$ and substitute, or use an identity like $\cos^2 t + \sin^2 t = 1$. Watch for **restrictions**: e.g. $x = e^t$ means only $x > 0$ is traced.`,
    sample: {
      question: r`Describe the curve $x = 2\cos t$, $y = 3\sin t$, $0 \le t \le 2\pi$.`,
      steps: [
        r`**Isolate the trig functions:** $\cos t = \frac{x}{2}$ and $\sin t = \frac{y}{3}$.`,
        r`**Use the identity** $\cos^2 t + \sin^2 t = 1$: $$\left(\frac x2\right)^2 + \left(\frac y3\right)^2 = 1 \quad\Longrightarrow\quad \frac{x^2}{4} + \frac{y^2}{9} = 1$$`,
        r`**Identify:** an **ellipse** centered at the origin, reaching $x = \pm2$ and $y = \pm3$.`,
        r`**Starting point** ($t = 0$): $(2\cos0, 3\sin0) = (2, 0)$.`,
        r`**Orientation:** at $t = \frac\pi2$: $(0, 3)$. Moving from $(2,0)$ up to $(0,3)$ means **counterclockwise**.`,
        r`**How much is traced:** $t$ runs a full $2\pi$, so the ellipse is traced exactly **once**.`,
      ],
    },
    questions: BLOCK4_QUESTIONS['10.1'],
  }),

  // ─────────────────────────── 10.2 ───────────────────────────
  lesson(BLOCK4, {
    section: '10.2',
    title: 'Calculus with Parametric Curves',
    formula: r`$$\begin{gathered}\frac{dy}{dx} = \frac{dy/dt}{dx/dt} \\ \frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt} \\ L = \int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt\end{gathered}$$`,
    takeaway: r`**Slope:** divide $y'(t)$ by $x'(t)$. **Horizontal tangent:** $\frac{dy}{dt} = 0$ (and $\frac{dx}{dt} \ne 0$). **Vertical tangent:** $\frac{dx}{dt} = 0$ (and $\frac{dy}{dt} \ne 0$). **Second derivative:** differentiate $\frac{dy}{dx}$ with respect to $t$, then divide by $\frac{dx}{dt}$ **again** — the most common mistake is forgetting this division. **Arc length:** integrate the speed.`,
    sample: {
      question: r`For $x = t^2$, $y = t^3 - 3t$: find $\frac{dy}{dx}$, and the points with horizontal and vertical tangents.`,
      steps: [
        r`**Differentiate each coordinate:** $\frac{dx}{dt} = 2t$, $\frac{dy}{dt} = 3t^2 - 3$.`,
        r`**Slope:** $$\frac{dy}{dx} = \frac{3t^2 - 3}{2t}$$`,
        r`**Horizontal tangents:** $\frac{dy}{dt} = 0 \Rightarrow 3t^2 - 3 = 0 \Rightarrow t = \pm1$. Check $\frac{dx}{dt} = \pm2 \ne 0$ ✓`,
        r`**Points:** $t = 1$: $(1, 1 - 3) = (1, -2)$. $t = -1$: $(1, -1 + 3) = (1, 2)$.`,
        r`**Vertical tangent:** $\frac{dx}{dt} = 0 \Rightarrow t = 0$, where $\frac{dy}{dt} = -3 \ne 0$ ✓. Point: $(0, 0)$.`,
        r`**Example slope** at $t = 2$: $\frac{3(4) - 3}{2(2)} = \frac94$.`,
      ],
    },
    questions: BLOCK4_QUESTIONS['10.2'],
  }),

  // ─────────────────────────── 10.3 ───────────────────────────
  lesson(BLOCK4, {
    section: '10.3',
    title: 'Polar Coordinates & Graphing',
    formula: r`$$\begin{gathered}x = r\cos\theta \\ y = r\sin\theta \\ r^2 = x^2 + y^2 \\ \tan\theta = \frac yx\end{gathered}$$`,
    takeaway: r`A point has many polar names: $(r, \theta) = (r, \theta + 2\pi) = (-r, \theta + \pi)$. When converting $(x, y)$ to polar, **check the quadrant** — $\arctan\frac yx$ alone can be off by $\pi$. **Standard graphs:** $r = a$ circle; $\theta = c$ line through the origin; $r = 2a\cos\theta$ or $2a\sin\theta$ circles through the origin; **roses** $r = a\cos(n\theta)$: $n$ petals if $n$ odd, $2n$ if $n$ even; $r = a(1 \pm \cos\theta)$ **cardioid**; $r = b + a\cos\theta$ with $b < a$ has an **inner loop**. To convert an equation, multiply by $r$ when it helps create $r^2$ or $r\cos\theta$.`,
    sample: {
      question: r`Convert $r = 4\sin\theta$ to Cartesian form and identify the curve.`,
      steps: [
        r`**Goal:** create $r\sin\theta$ (which is $y$) and $r^2$ (which is $x^2 + y^2$).`,
        r`**Multiply both sides by $r$:** $$r^2 = 4r\sin\theta$$`,
        r`**Substitute:** $r^2 = x^2 + y^2$ and $r\sin\theta = y$: $$x^2 + y^2 = 4y$$`,
        r`**Complete the square in $y$:** $x^2 + y^2 - 4y + 4 = 4$ $$x^2 + (y - 2)^2 = 4$$`,
        r`**Identify:** a circle with center $(0, 2)$ and radius $2$. It passes through the origin, as every $r = 2a\sin\theta$ circle does.`,
      ],
    },
    questions: BLOCK4_QUESTIONS['10.3'],
  }),

  // ─────────────────────────── 10.4 ───────────────────────────
  lesson(BLOCK4, {
    section: '10.4',
    title: 'Area and Length in Polar Coordinates',
    formula: r`$$\begin{gathered}A = \frac12\int_\alpha^\beta r^2\,d\theta \\ A = \frac12\int_\alpha^\beta\big(r_{\text{out}}^2 - r_{\text{in}}^2\big)\,d\theta \\ L = \int_\alpha^\beta\sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta\end{gathered}$$`,
    takeaway: r`The polar area element is a thin **sector** with area $\frac12r^2\,d\theta$ — don't forget the $\frac12$. The hardest part is the **limits**: choose $\theta$-values that trace the region **exactly once** (solve $r = 0$ to find where a petal starts and ends; solve $r_1 = r_2$ for intersections). Use symmetry to integrate over part and multiply. You'll almost always need $\sin^2\theta$ or $\cos^2\theta$ half-angle identities.`,
    sample: {
      question: r`Find the area of one petal of $r = \cos(2\theta)$.`,
      steps: [
        r`**Find the petal's limits.** A petal starts and ends where $r = 0$: $\cos 2\theta = 0 \Rightarrow 2\theta = \pm\frac\pi2 \Rightarrow \theta = \pm\frac\pi4$. The petal around $\theta = 0$ is traced for $-\frac\pi4 \le \theta \le \frac\pi4$.`,
        r`**Set up:** $$A = \frac12\int_{-\pi/4}^{\pi/4}\cos^2(2\theta)\,d\theta$$`,
        r`**Half-angle identity** $\cos^2u = \frac{1 + \cos 2u}{2}$ with $u = 2\theta$: $$\cos^2(2\theta) = \frac{1 + \cos 4\theta}{2}$$`,
        r`**Integrate:** $$A = \frac14\int_{-\pi/4}^{\pi/4}(1 + \cos4\theta)\,d\theta = \frac14\left[\theta + \frac{\sin4\theta}{4}\right]_{-\pi/4}^{\pi/4}$$`,
        r`**Evaluate:** $\sin(\pm\pi) = 0$, so $\frac14\left(\frac\pi4 - \left(-\frac\pi4\right)\right) = \frac14\cdot\frac\pi2 = \frac\pi8$.`,
      ],
    },
    questions: BLOCK4_QUESTIONS['10.4'],
  }),
];

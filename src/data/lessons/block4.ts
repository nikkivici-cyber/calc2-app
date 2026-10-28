import { lesson, mc, r, type UnitInfo } from '../build';

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
    questions: [
      mc({
        id: 's10_1_q1',
        question: r`Eliminate the parameter: $x = t + 1$, $y = t^2$.`,
        answer: r`$y = (x - 1)^2$`,
        wrong: [r`$y = x^2 - 1$`, r`$y = x^2 + 1$`, r`$y = (x + 1)^2$`],
        hint: r`Solve the first equation for $t$.`,
        solution: [
          r`From $x = t + 1$: $t = x - 1$.`,
          r`Substitute into $y = t^2$: $y = (x - 1)^2$.`,
          r`A parabola with vertex at $(1, 0)$.`,
        ],
      }),
      mc({
        id: 's10_1_q2',
        question: r`Describe $x = \cos t$, $y = \sin t$, $0 \le t \le \pi$.`,
        answer: r`Upper half of the unit circle, from $(1, 0)$ to $(-1, 0)$ counterclockwise`,
        wrong: [r`Full unit circle, counterclockwise`, r`Upper half of the unit circle, from $(-1, 0)$ to $(1, 0)$`, r`Right half of the unit circle, from $(0, -1)$ to $(0, 1)$`],
        hint: r`Check $t = 0$, $t = \frac\pi2$, $t = \pi$.`,
        solution: [
          r`$x^2 + y^2 = \cos^2 t + \sin^2 t = 1$: on the unit circle.`,
          r`$t = 0$: $(1, 0)$. $t = \frac\pi2$: $(0, 1)$. $t = \pi$: $(-1, 0)$.`,
          r`$y = \sin t \ge 0$ on $[0, \pi]$: only the **upper half**, traced counterclockwise from $(1,0)$ to $(-1,0)$.`,
        ],
      }),
      mc({
        id: 's10_1_q3',
        question: r`Eliminate the parameter: $x = e^t$, $y = e^{2t}$.`,
        answer: r`$y = x^2$ with $x > 0$`,
        wrong: [r`$y = x^2$ for all $x$`, r`$y = 2x$`, r`$y = \sqrt x$`],
        hint: r`$e^{2t} = (e^t)^2$. What values can $e^t$ take?`,
        solution: [
          r`$y = e^{2t} = (e^t)^2 = x^2$.`,
          r`But $x = e^t > 0$ for every $t$, so only the **right half** of the parabola is traced.`,
          r`Answer: $y = x^2$, $x > 0$.`,
        ],
      }),
      mc({
        id: 's10_1_q4',
        question: r`Which parametrization traces the line segment from $(1, 2)$ to $(4, 8)$?`,
        answer: r`$x = 1 + 3t,\ y = 2 + 6t,\ 0 \le t \le 1$`,
        wrong: [r`$x = 1 + 4t,\ y = 2 + 8t,\ 0 \le t \le 1$`, r`$x = 4 + 3t,\ y = 8 + 6t,\ 0 \le t \le 1$`, r`$x = 1 + 3t,\ y = 2 + 6t,\ 0 \le t \le 2$`],
        hint: r`Start point + $t$·(end − start), for $0 \le t \le 1$.`,
        solution: [
          r`Direction: end − start $= (4 - 1, 8 - 2) = (3, 6)$.`,
          r`$(x, y) = (1, 2) + t(3, 6)$: $x = 1 + 3t$, $y = 2 + 6t$.`,
          r`$t = 0$ gives $(1, 2)$; $t = 1$ gives $(4, 8)$ ✓. Running to $t = 2$ would overshoot to $(7, 14)$.`,
        ],
      }),
      mc({
        id: 's10_1_q5',
        question: r`Eliminate the parameter: $x = \sec t$, $y = \tan t$.`,
        answer: r`$x^2 - y^2 = 1$`,
        wrong: [r`$x^2 + y^2 = 1$`, r`$y^2 - x^2 = 1$`, r`$x = y^2 + 1$`],
        hint: r`Use $\sec^2 t - \tan^2 t = 1$.`,
        solution: [
          r`Identity: $1 + \tan^2 t = \sec^2 t$, i.e. $\sec^2 t - \tan^2 t = 1$.`,
          r`Substitute: $x^2 - y^2 = 1$.`,
          r`This is a hyperbola opening left and right.`,
        ],
      }),
    ],
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
    questions: [
      mc({
        id: 's10_2_q1',
        question: r`For $x = t^2$, $y = t^3$, find $\frac{dy}{dx}$ at $t = 2$.`,
        answer: r`$3$`,
        wrong: [r`$\frac13$`, r`$12$`, r`$6$`],
        hint: r`$\frac{dy}{dx} = \frac{3t^2}{2t}$.`,
        solution: [
          r`$\frac{dx}{dt} = 2t$, $\frac{dy}{dt} = 3t^2$.`,
          r`$\frac{dy}{dx} = \frac{3t^2}{2t} = \frac{3t}{2}$.`,
          r`At $t = 2$: $\frac{3(2)}{2} = 3$.`,
          r`(Dividing the other way, $\frac{dx/dt}{dy/dt}$, gives $\frac13$.)`,
        ],
      }),
      mc({
        id: 's10_2_q2',
        question: r`For $x = 2\cos t$, $y = 2\sin t$, find the slope of the tangent line at $t = \frac\pi4$.`,
        answer: r`$-1$`,
        wrong: [r`$1$`, r`$0$`, r`Undefined`],
        hint: r`$\frac{dy}{dx} = \frac{2\cos t}{-2\sin t}$.`,
        solution: [
          r`$\frac{dx}{dt} = -2\sin t$, $\frac{dy}{dt} = 2\cos t$.`,
          r`$\frac{dy}{dx} = \frac{2\cos t}{-2\sin t} = -\cot t$.`,
          r`At $t = \frac\pi4$: $-\cot\frac\pi4 = -1$.`,
          r`Makes sense: on a circle at the point $(\sqrt2, \sqrt2)$, the tangent is perpendicular to the radius (slope $1$), so its slope is $-1$.`,
        ],
      }),
      mc({
        id: 's10_2_q3',
        question: r`For $x = t^2$, $y = t^3$ ($t > 0$), find $\frac{d^2y}{dx^2}$ at $t = 1$.`,
        answer: r`$\frac34$`,
        wrong: [r`$\frac32$`, r`$3$`, r`$6$`],
        hint: r`$\frac{dy}{dx} = \frac{3t}{2}$. Differentiate that in $t$, then divide by $\frac{dx}{dt} = 2t$.`,
        solution: [
          r`$\frac{dy}{dx} = \frac{3t^2}{2t} = \frac{3t}{2}$.`,
          r`$\frac{d}{dt}\left(\frac{3t}{2}\right) = \frac32$.`,
          r`Divide by $\frac{dx}{dt} = 2t$: $\frac{d^2y}{dx^2} = \frac{3/2}{2t} = \frac{3}{4t}$.`,
          r`At $t = 1$: $\frac34$. (Stopping at $\frac32$ forgets the second division by $\frac{dx}{dt}$.)`,
        ],
      }),
      mc({
        id: 's10_2_q4',
        question: r`Where does the curve $x = t^3 - 3t$, $y = t^2 - 4$ have a **horizontal** tangent?`,
        answer: r`$(0, -4)$`,
        wrong: [r`$(0, 0)$`, r`$(-2, -3)$`, r`$(2, -3)$`],
        hint: r`Set $\frac{dy}{dt} = 0$ and check that $\frac{dx}{dt} \ne 0$ there.`,
        solution: [
          r`$\frac{dy}{dt} = 2t = 0 \Rightarrow t = 0$. There, $\frac{dx}{dt} = 3(0)^2 - 3 = -3 \ne 0$ ✓`,
          r`Point at $t = 0$: $x = 0$, $y = -4$ ⟹ $(0, -4)$.`,
          r`The points $(\mp2, -3)$ at $t = \pm1$ are where $\frac{dx}{dt} = 0$ — those are **vertical** tangents.`,
        ],
      }),
      mc({
        id: 's10_2_q5',
        question: r`Find the arc length of $x = t^2$, $y = \frac23t^3$ for $0 \le t \le 1$.`,
        answer: r`$\frac23\left(2\sqrt2 - 1\right)$`,
        wrong: [r`$\frac23\cdot 2\sqrt2$`, r`$\frac13\left(2\sqrt2 - 1\right)$`, r`$2\sqrt2 - 1$`],
        hint: r`$(x')^2 + (y')^2 = 4t^2 + 4t^4 = 4t^2(1 + t^2)$.`,
        solution: [
          r`$\frac{dx}{dt} = 2t$, $\frac{dy}{dt} = 2t^2$.`,
          r`Speed: $\sqrt{4t^2 + 4t^4} = \sqrt{4t^2(1 + t^2)} = 2t\sqrt{1 + t^2}$ (for $t \ge 0$).`,
          r`$L = \int_0^1 2t\sqrt{1 + t^2}\,dt$. Let $u = 1 + t^2$, $du = 2t\,dt$: $\int_1^2 u^{1/2}\,du$.`,
          r`$= \frac23\left[u^{3/2}\right]_1^2 = \frac23\left(2\sqrt2 - 1\right) \approx 1.22$.`,
        ],
      }),
    ],
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
    questions: [
      mc({
        id: 's10_3_q1',
        question: r`Convert the polar point $\left(2, \frac{\pi}{3}\right)$ to Cartesian coordinates.`,
        answer: r`$\left(1, \sqrt3\right)$`,
        wrong: [r`$\left(\sqrt3, 1\right)$`, r`$\left(1, -\sqrt3\right)$`, r`$\left(-1, \sqrt3\right)$`],
        hint: r`$x = r\cos\theta$, $y = r\sin\theta$.`,
        solution: [
          r`$x = 2\cos\frac\pi3 = 2\cdot\frac12 = 1$.`,
          r`$y = 2\sin\frac\pi3 = 2\cdot\frac{\sqrt3}{2} = \sqrt3$.`,
          r`Point: $(1, \sqrt3)$. (Swapping $\sin$ and $\cos$ gives $(\sqrt3, 1)$.)`,
        ],
      }),
      mc({
        id: 's10_3_q2',
        question: r`Convert $(x, y) = (-1, 1)$ to polar coordinates with $r > 0$ and $0 \le \theta < 2\pi$.`,
        answer: r`$\left(\sqrt2, \frac{3\pi}{4}\right)$`,
        wrong: [r`$\left(\sqrt2, -\frac{\pi}{4}\right)$`, r`$\left(\sqrt2, \frac{\pi}{4}\right)$`, r`$\left(\sqrt2, \frac{7\pi}{4}\right)$`],
        hint: r`The point is in quadrant II.`,
        solution: [
          r`$r = \sqrt{(-1)^2 + 1^2} = \sqrt2$.`,
          r`$\tan\theta = \frac{1}{-1} = -1$. A calculator's $\arctan(-1) = -\frac\pi4$ is in quadrant IV — wrong quadrant.`,
          r`$(-1, 1)$ is in quadrant II, so $\theta = \pi - \frac\pi4 = \frac{3\pi}{4}$.`,
          r`Answer: $\left(\sqrt2, \frac{3\pi}{4}\right)$.`,
        ],
      }),
      mc({
        id: 's10_3_q3',
        question: r`Convert $r = 6\cos\theta$ to Cartesian form.`,
        answer: r`$(x - 3)^2 + y^2 = 9$`,
        wrong: [r`$x^2 + (y - 3)^2 = 9$`, r`$x^2 + y^2 = 6$`, r`$(x - 6)^2 + y^2 = 36$`],
        hint: r`Multiply by $r$, then complete the square.`,
        solution: [
          r`$r^2 = 6r\cos\theta \Rightarrow x^2 + y^2 = 6x$.`,
          r`$x^2 - 6x + 9 + y^2 = 9$.`,
          r`$(x - 3)^2 + y^2 = 9$: circle, center $(3, 0)$, radius $3$.`,
        ],
      }),
      mc({
        id: 's10_3_q4',
        question: r`How many petals does the rose $r = 3\sin(4\theta)$ have?`,
        answer: r`$8$`,
        wrong: [r`$4$`, r`$3$`, r`$12$`],
        hint: r`For $r = a\sin(n\theta)$: $n$ petals if $n$ is odd, $2n$ if $n$ is even.`,
        solution: [
          r`$n = 4$ is even.`,
          r`Even $n$ ⟹ $2n = 8$ petals.`,
          r`The $3$ is the petal **length**, not the count.`,
        ],
      }),
      mc({
        id: 's10_3_q5',
        question: r`What type of curve is $r = 2 + 2\cos\theta$?`,
        answer: r`Cardioid`,
        wrong: [r`Limaçon with an inner loop`, r`Circle`, r`Rose`],
        hint: r`Compare the constant term with the coefficient of $\cos\theta$.`,
        solution: [
          r`Form $r = b + a\cos\theta$ with $b = a = 2$.`,
          r`$b = a$ ⟹ **cardioid** (heart shape that touches the origin at $\theta = \pi$).`,
          r`$b < a$ (e.g. $1 + 2\cos\theta$) gives an inner loop; $b > a$ gives a dimpled or convex limaçon.`,
        ],
      }),
    ],
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
    questions: [
      mc({
        id: 's10_4_q1',
        question: r`Find the area enclosed by the cardioid $r = 1 + \cos\theta$.`,
        answer: r`$\frac{3\pi}{2}$`,
        wrong: [r`$3\pi$`, r`$\pi$`, r`$\frac{3\pi}{4}$`],
        hint: r`$A = \frac12\int_0^{2\pi}(1 + \cos\theta)^2\,d\theta$. Expand and use $\cos^2\theta = \frac{1 + \cos2\theta}{2}$.`,
        solution: [
          r`One full trace: $0 \le \theta \le 2\pi$.`,
          r`$(1 + \cos\theta)^2 = 1 + 2\cos\theta + \cos^2\theta$.`,
          r`Over $[0, 2\pi]$: $\int 1 = 2\pi$, $\int 2\cos\theta = 0$, $\int\cos^2\theta = \pi$.`,
          r`$A = \frac12(2\pi + 0 + \pi) = \frac{3\pi}{2}$. (Forgetting the $\frac12$ gives $3\pi$.)`,
        ],
      }),
      mc({
        id: 's10_4_q2',
        question: r`Find the area inside $r = 4\sin\theta$.`,
        answer: r`$4\pi$`,
        wrong: [r`$8\pi$`, r`$16\pi$`, r`$2\pi$`],
        hint: r`This circle is traced once for $0 \le \theta \le \pi$.`,
        solution: [
          r`$r = 4\sin\theta$ is a circle of radius $2$, traced once as $\theta$ goes from $0$ to $\pi$.`,
          r`$A = \frac12\int_0^\pi 16\sin^2\theta\,d\theta = 8\int_0^\pi\sin^2\theta\,d\theta = 8\cdot\frac\pi2$.`,
          r`$A = 4\pi$. Check: $\pi(2)^2 = 4\pi$ ✓`,
          r`Using $0$ to $2\pi$ traces the circle twice and gives $8\pi$.`,
        ],
      }),
      mc({
        id: 's10_4_q3',
        question: r`Find the area of one petal of $r = \sin(3\theta)$.`,
        answer: r`$\frac{\pi}{12}$`,
        wrong: [r`$\frac{\pi}{6}$`, r`$\frac{\pi}{4}$`, r`$\frac{\pi}{3}$`],
        hint: r`One petal: $\sin3\theta = 0$ at $\theta = 0$ and $\theta = \frac\pi3$.`,
        solution: [
          r`Petal limits: $0 \le \theta \le \frac\pi3$.`,
          r`$A = \frac12\int_0^{\pi/3}\sin^2(3\theta)\,d\theta = \frac12\int_0^{\pi/3}\frac{1 - \cos6\theta}{2}\,d\theta$.`,
          r`$= \frac14\left[\theta - \frac{\sin6\theta}{6}\right]_0^{\pi/3} = \frac14\cdot\frac\pi3 = \frac{\pi}{12}$.`,
        ],
      }),
      mc({
        id: 's10_4_q4',
        question: r`Find the length of the curve $r = 2\cos\theta$, $0 \le \theta \le \pi$.`,
        answer: r`$2\pi$`,
        wrong: [r`$4\pi$`, r`$\pi$`, r`$2$`],
        hint: r`$r^2 + (r')^2 = 4\cos^2\theta + 4\sin^2\theta$.`,
        solution: [
          r`$r = 2\cos\theta$, $\frac{dr}{d\theta} = -2\sin\theta$.`,
          r`$r^2 + (r')^2 = 4\cos^2\theta + 4\sin^2\theta = 4$, so the integrand is $\sqrt4 = 2$.`,
          r`$L = \int_0^\pi 2\,d\theta = 2\pi$.`,
          r`Check: it's a circle of radius $1$ — circumference $2\pi$ ✓`,
        ],
      }),
      mc({
        id: 's10_4_q5',
        question: r`Find the area inside $r = 1 + \cos\theta$ and outside $r = 1$.`,
        answer: r`$2 + \frac{\pi}{4}$`,
        wrong: [r`$2 + \frac{\pi}{2}$`, r`$\frac{\pi}{4}$`, r`$4 + \frac{\pi}{2}$`],
        hint: r`They intersect where $\cos\theta = 0$. Use $\frac12\int(r_{\text{out}}^2 - r_{\text{in}}^2)\,d\theta$.`,
        solution: [
          r`Intersections: $1 + \cos\theta = 1 \Rightarrow \cos\theta = 0 \Rightarrow \theta = \pm\frac\pi2$. The cardioid is outside the circle for $-\frac\pi2 < \theta < \frac\pi2$.`,
          r`$A = \frac12\int_{-\pi/2}^{\pi/2}\big[(1 + \cos\theta)^2 - 1\big]\,d\theta = \frac12\int_{-\pi/2}^{\pi/2}(2\cos\theta + \cos^2\theta)\,d\theta$.`,
          r`$\int_{-\pi/2}^{\pi/2}2\cos\theta\,d\theta = 2[\sin\theta]_{-\pi/2}^{\pi/2} = 4$. $\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = \frac\pi2$.`,
          r`$A = \frac12\left(4 + \frac\pi2\right) = 2 + \frac\pi4$.`,
        ],
      }),
    ],
  }),
];

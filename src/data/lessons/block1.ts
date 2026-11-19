import { lesson, r, type UnitInfo } from '../build';
import { BLOCK1_QUESTIONS } from '../questions/block1';

export const BLOCK1: UnitInfo = {
  unit_id: 'block_1',
  unit_title: 'Block 1: Review & Applications of Integration',
};

export const BLOCK1_LESSONS = [
  // ─────────────────────────── 5.5 ───────────────────────────
  lesson(BLOCK1, {
    section: '5.5',
    title: 'Substitution in Integrals (u-sub)',
    formula: r`$$\begin{gathered}\int f\big(g(x)\big)\,g'(x)\,dx = \int f(u)\,du \\ \text{where } u = g(x),\ du = g'(x)\,dx\end{gathered}$$`,
    takeaway: r`Substitution "undoes" the chain rule. Look for an **inside function** $g(x)$ whose derivative $g'(x)$ also appears as a factor (a constant multiple is fine). The recipe is always the same: **(1)** pick $u$, **(2)** find $du$, **(3)** rewrite the *whole* integral in $u$ (no $x$ left over), **(4)** integrate, **(5)** substitute back. For a definite integral, change the limits to $u$-values instead of substituting back.`,
    sample: {
      question: r`Evaluate: $$\int x^2\,(x^3 + 1)^4\,dx$$`,
      steps: [
        r`**Find the inside function.** Something is raised to the 4th power: $(x^3+1)^4$. The inside is $x^3 + 1$, and its derivative is $3x^2$. We have an $x^2$ factor outside — that matches $3x^2$ up to the constant $3$. So let $$u = x^3 + 1$$`,
        r`**Differentiate $u$.** $$\frac{du}{dx} = 3x^2 \quad\Longrightarrow\quad du = 3x^2\,dx$$`,
        r`**Solve for the piece that's in the integral.** The integral contains $x^2\,dx$, not $3x^2\,dx$. Divide both sides by $3$: $$x^2\,dx = \tfrac{1}{3}\,du$$`,
        r`**Rewrite everything in terms of $u$.** Replace $(x^3+1)$ with $u$ and $x^2\,dx$ with $\tfrac13 du$: $$\int (x^3+1)^4 \cdot x^2\,dx = \int u^4 \cdot \tfrac{1}{3}\,du = \tfrac{1}{3}\int u^4\,du$$ There is no $x$ left — a good sign the substitution worked.`,
        r`**Integrate with the power rule** $\int u^n du = \frac{u^{n+1}}{n+1}$: $$\tfrac{1}{3}\cdot\frac{u^5}{5} + C = \frac{u^5}{15} + C$$`,
        r`**Substitute back** $u = x^3 + 1$: $$\int x^2(x^3+1)^4\,dx = \frac{(x^3+1)^5}{15} + C$$`,
        r`**Check by differentiating** (always possible with indefinite integrals): $$\frac{d}{dx}\left[\frac{(x^3+1)^5}{15}\right] = \frac{5(x^3+1)^4 \cdot 3x^2}{15} = x^2(x^3+1)^4 \checkmark$$`,
      ],
    },
    questions: BLOCK1_QUESTIONS['5.5'],
  }),

  // ─────────────────────────── 6.1 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.1',
    title: 'Velocity and Net Change',
    formula: r`$$\begin{gathered}\underbrace{\int_a^b v(t)\,dt}_{\text{displacement}} \\ \underbrace{\int_a^b |v(t)|\,dt}_{\text{total distance}} \\ s(b) = s(a) + \int_a^b v(t)\,dt\end{gathered}$$`,
    takeaway: r`Integrating a **rate** gives the **net change** of the quantity: $Q(b) = Q(a) + \int_a^b Q'(t)\,dt$. For motion, **displacement** lets forward and backward motion cancel; **total distance** does not. To get distance: find where $v(t) = 0$, split the interval there, integrate each piece, and add the **absolute values**.`,
    sample: {
      question: r`An object moves with velocity $v(t) = t^2 - 4t + 3$ (m/s) for $0 \le t \le 3$. Find its **displacement** and its **total distance traveled**.`,
      steps: [
        r`**Antiderivative first** (we'll reuse it): $$F(t) = \frac{t^3}{3} - 2t^2 + 3t$$`,
        r`**Displacement** = net change in position: $$\int_0^3 v(t)\,dt = F(3) - F(0) = (9 - 18 + 9) - 0 = 0 \text{ m}$$ The object ends exactly where it started.`,
        r`**For distance, find where the object stops.** Solve $v(t) = 0$: $$t^2 - 4t + 3 = (t-1)(t-3) = 0 \Rightarrow t = 1,\ t = 3$$`,
        r`**Check the sign on each piece.** At $t = 0.5$: $v = 0.25 - 2 + 3 = 1.25 > 0$ (moving forward). At $t = 2$: $v = 4 - 8 + 3 = -1 < 0$ (moving backward).`,
        r`**Integrate each piece.** $F(1) = \frac13 - 2 + 3 = \frac43$. $$\int_0^1 v\,dt = F(1) - F(0) = \tfrac43$$ $$\int_1^3 v\,dt = F(3) - F(1) = 0 - \tfrac43 = -\tfrac43$$`,
        r`**Add absolute values:** $$\text{distance} = \left|\tfrac43\right| + \left|-\tfrac43\right| = \tfrac83 \text{ m}$$ Forward $\tfrac43$ m, then back $\tfrac43$ m — so displacement $0$ but distance $\tfrac83$.`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.1'],
  }),

  // ─────────────────────────── 6.2 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.2',
    title: 'Regions Between Curves',
    formula: r`$$\begin{gathered}A = \int_a^b \big[\underbrace{f(x)}_{\text{top}} - \underbrace{g(x)}_{\text{bottom}}\big]\,dx \\ \text{or} \\ A = \int_c^d \big[\underbrace{p(y)}_{\text{right}} - \underbrace{q(y)}_{\text{left}}\big]\,dy\end{gathered}$$`,
    takeaway: r`**(1)** Sketch. **(2)** Find intersection points — they're usually your limits. **(3)** Decide which curve is on top (plug in a test point). **(4)** Integrate top − bottom. If the curves **cross** inside the interval, split the integral at the crossing — otherwise areas cancel. If the curves are given as $x = \ldots$ (functions of $y$), integrate in $y$ with right − left.`,
    sample: {
      question: r`Find the area of the region enclosed by $y = x^2$ and $y = 2x$.`,
      steps: [
        r`**Find the intersections.** Set the curves equal: $$x^2 = 2x \Rightarrow x^2 - 2x = 0 \Rightarrow x(x-2) = 0 \Rightarrow x = 0,\ x = 2$$ These are the limits of integration.`,
        r`**Which curve is on top?** Test $x = 1$ (between 0 and 2): line $y = 2(1) = 2$, parabola $y = 1^2 = 1$. The line $y = 2x$ is on top.`,
        r`**Set up top − bottom:** $$A = \int_0^2 (2x - x^2)\,dx$$`,
        r`**Antiderivative:** $$\int (2x - x^2)\,dx = x^2 - \frac{x^3}{3}$$`,
        r`**Evaluate:** $$\left[x^2 - \frac{x^3}{3}\right]_0^2 = \left(4 - \frac{8}{3}\right) - 0 = \frac{4}{3}$$`,
        r`**Sanity check:** area must be positive. If you got $-\frac43$, you subtracted in the wrong order.`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.2'],
  }),

  // ─────────────────────────── 6.3 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.3',
    title: 'Volume by Slicing, Disks & Washers',
    formula: r`$$\begin{gathered}V = \int_a^b A(x)\,dx \\ \text{Disk: } V = \pi\int_a^b R(x)^2\,dx \\ \text{Washer: } V = \pi\int_a^b \big(R(x)^2 - r(x)^2\big)\,dx\end{gathered}$$`,
    takeaway: r`Slice the solid **perpendicular** to the axis. Each slice is a disk (solid) or washer (hole in the middle). $R$ = **outer** radius, $r$ = **inner** radius, both measured as a **distance from the axis of rotation**. If the axis is $y = k$ instead of the $x$-axis, the radius is $|\text{curve} - k|$. Square each radius **separately**: $R^2 - r^2 \ne (R - r)^2$.`,
    sample: {
      question: r`The region between $y = x$ and $y = x^2$ is rotated about the $x$-axis. Find the volume.`,
      steps: [
        r`**Find the region.** $x = x^2 \Rightarrow x = 0, 1$. On $(0,1)$, $x > x^2$, so $y = x$ is on top.`,
        r`**Slice perpendicular to the $x$-axis.** Each slice at position $x$ is a **washer**: the region doesn't touch the axis between $0$ and $1$, so there's a hole.`,
        r`**Radii (distance from the $x$-axis):** outer $R(x) = x$ (top curve), inner $r(x) = x^2$ (bottom curve).`,
        r`**Washer area:** $$A(x) = \pi\big(R^2 - r^2\big) = \pi\big(x^2 - x^4\big)$$`,
        r`**Integrate:** $$V = \pi\int_0^1 (x^2 - x^4)\,dx = \pi\left[\frac{x^3}{3} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac13 - \frac15\right)$$`,
        r`**Simplify:** $\frac13 - \frac15 = \frac{5 - 3}{15} = \frac{2}{15}$, so $V = \frac{2\pi}{15}$.`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.3'],
  }),

  // ─────────────────────────── 6.4 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.4',
    title: 'Volume by Cylindrical Shells',
    formula: r`$$\begin{gathered}V = 2\pi\int_a^b (\text{radius})(\text{height})\,dx \\ \text{about the } y\text{-axis: } V = 2\pi\int_a^b x\,f(x)\,dx\end{gathered}$$`,
    takeaway: r`Shells use slices **parallel** to the axis of rotation. Each thin strip sweeps out a cylinder with surface area $2\pi(\text{radius})(\text{height})$. **Radius** = distance from the strip to the axis; **height** = top − bottom. Use shells when rotating about a vertical axis but your curves are $y = f(x)$ — it avoids solving for $x$.`,
    sample: {
      question: r`The region under $y = 2x - x^2$ (above the $x$-axis) is rotated about the $y$-axis. Find the volume.`,
      steps: [
        r`**Find the region.** $2x - x^2 = x(2 - x) = 0$ at $x = 0$ and $x = 2$. The region sits above $[0, 2]$.`,
        r`**Why shells?** The axis is vertical ($y$-axis). Washers would need $x$ in terms of $y$ (solving a quadratic). Vertical strips + shells avoid that.`,
        r`**Radius and height** of a strip at position $x$: radius $= x$ (distance to the $y$-axis); height $= (2x - x^2) - 0$.`,
        r`**Set up:** $$V = 2\pi\int_0^2 x(2x - x^2)\,dx = 2\pi\int_0^2 (2x^2 - x^3)\,dx$$`,
        r`**Integrate:** $$2\pi\left[\frac{2x^3}{3} - \frac{x^4}{4}\right]_0^2 = 2\pi\left(\frac{16}{3} - 4\right) = 2\pi\cdot\frac{4}{3}$$`,
        r`**Result:** $V = \frac{8\pi}{3}$.`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.4'],
  }),

  // ─────────────────────────── 6.5 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.5',
    title: 'Length of Curves (Arc Length)',
    formula: r`$$\begin{gathered}L = \int_a^b \sqrt{1 + \big[f'(x)\big]^2}\,dx \\ \text{or} \\ L = \int_c^d \sqrt{1 + \big[g'(y)\big]^2}\,dy \text{ for } x = g(y)\end{gathered}$$`,
    takeaway: r`Steps: differentiate, square, add $1$, simplify, then integrate. Exam problems are designed so that $1 + (f')^2$ becomes a **perfect square** or a simple substitution — if the algebra gets ugly, recheck your derivative. Don't square the original function, and don't forget the square root.`,
    sample: {
      question: r`Find the length of $y = \frac{x^3}{6} + \frac{1}{2x}$ from $x = 1$ to $x = 2$.`,
      steps: [
        r`**Differentiate.** Write $\frac{1}{2x} = \frac12 x^{-1}$: $$f'(x) = \frac{x^2}{2} - \frac{1}{2x^2}$$`,
        r`**Square it** using $(a - b)^2 = a^2 - 2ab + b^2$ with $ab = \frac{x^2}{2}\cdot\frac{1}{2x^2} = \frac14$: $$[f'(x)]^2 = \frac{x^4}{4} - \frac12 + \frac{1}{4x^4}$$`,
        r`**Add 1.** Only the middle term changes sign: $$1 + [f'(x)]^2 = \frac{x^4}{4} + \frac12 + \frac{1}{4x^4} = \left(\frac{x^2}{2} + \frac{1}{2x^2}\right)^2$$ A perfect square — the "$-$" became "$+$".`,
        r`**Take the square root:** $$\sqrt{1 + [f']^2} = \frac{x^2}{2} + \frac{1}{2x^2}$$`,
        r`**Integrate:** $$L = \int_1^2\left(\frac{x^2}{2} + \frac{1}{2}x^{-2}\right)dx = \left[\frac{x^3}{6} - \frac{1}{2x}\right]_1^2$$`,
        r`**Evaluate:** at $2$: $\frac86 - \frac14 = \frac{13}{12}$; at $1$: $\frac16 - \frac12 = -\frac13$. $$L = \frac{13}{12} + \frac{4}{12} = \frac{17}{12}$$`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.5'],
  }),

  // ─────────────────────────── 6.7 ───────────────────────────
  lesson(BLOCK1, {
    section: '6.7',
    title: "Physical Applications (Mass, Work, Hooke's Law)",
    formula: r`$$\begin{gathered}m = \int_a^b \rho(x)\,dx \\ W = \int_a^b F(x)\,dx \\ \text{Hooke's law: } F(x) = kx\end{gathered}$$`,
    takeaway: r`**Work = force × distance**; when the force changes, integrate. For springs, $x$ is the stretch **beyond natural length** (in meters — convert cm!). Find $k$ first from the given data, then integrate $kx$ between the two stretch values. For lifting cables or pumping liquids, slice into thin pieces: each piece's work = (weight of the piece) × (distance **that piece** moves), then integrate.`,
    sample: {
      question: r`A force of $10$ N holds a spring stretched $0.2$ m beyond its natural length. How much work is needed to stretch it from its natural length to $0.5$ m beyond natural length?`,
      steps: [
        r`**Find the spring constant** using Hooke's law $F = kx$ with the given data: $$10 = k(0.2) \Rightarrow k = \frac{10}{0.2} = 50 \text{ N/m}$$`,
        r`**Write the force** at stretch $x$: $F(x) = 50x$.`,
        r`**Set the limits.** Natural length means stretch $x = 0$; the end is $x = 0.5$.`,
        r`**Integrate:** $$W = \int_0^{0.5} 50x\,dx = \left[25x^2\right]_0^{0.5}$$`,
        r`**Evaluate:** $25(0.5)^2 = 25(0.25) = 6.25$ J (joules = N·m).`,
        r`**Why not just $F \times d$?** The force grows from $0$ to $25$ N as the spring stretches, so a single force value doesn't work. (The average force is $12.5$ N, and $12.5 \times 0.5 = 6.25$ ✓.)`,
      ],
    },
    questions: BLOCK1_QUESTIONS['6.7'],
  }),
];

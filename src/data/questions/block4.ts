import { mc, r } from '../build';
import type { PracticeQuestion } from '../types';

// Practice questions for Block 4, keyed by textbook section.
export const BLOCK4_QUESTIONS: Record<string, PracticeQuestion[]> = {
  // ─────────────── 10.1 Parametric curves ───────────────
  '10.1': [
    mc({
      id: 'q10_1_01',
      question: r`Eliminate the parameter: $x = 2t - 1$, $y = t + 3$.`,
      answer: r`$y = \frac{x + 7}{2}$`,
      wrong: [r`$y = 2x + 7$`, r`$y = \frac{x - 1}{2} + 3$`, r`$y = \frac{x + 1}{2}$`],
      hint: r`Solve the first equation for $t$.`,
      solution: [
        r`$x = 2t - 1 \Rightarrow t = \frac{x + 1}{2}$.`,
        r`$y = \frac{x + 1}{2} + 3 = \frac{x + 1 + 6}{2} = \frac{x + 7}{2}$.`,
        r`A straight line with slope $\frac12$.`,
      ],
    }),
    mc({
      id: 'q10_1_02',
      question: r`Eliminate the parameter: $x = \sqrt t$, $y = t$ $(t \ge 0)$.`,
      answer: r`$y = x^2$ with $x \ge 0$`,
      wrong: [r`$y = x^2$ for all $x$`, r`$y = \sqrt x$`, r`$y = x$`],
      hint: r`Square $x$. What values can $\sqrt t$ take?`,
      solution: [
        r`$x^2 = t = y$, so $y = x^2$.`,
        r`But $x = \sqrt t \ge 0$: only the right half of the parabola is traced.`,
      ],
    }),
    mc({
      id: 'q10_1_03',
      question: r`Describe $x = 3\cos t$, $y = 3\sin t$, $0 \le t \le 2\pi$.`,
      answer: r`Circle of radius $3$, traced once counterclockwise from $(3, 0)$`,
      wrong: [r`Circle of radius $9$, traced once counterclockwise`, r`Circle of radius $3$, traced twice`, r`Circle of radius $3$, traced clockwise from $(0, 3)$`],
      hint: r`$x^2 + y^2 = 9(\cos^2t + \sin^2t)$.`,
      solution: [
        r`$x^2 + y^2 = 9$: radius $3$.`,
        r`$t = 0$: $(3, 0)$; $t = \frac\pi2$: $(0, 3)$ — counterclockwise.`,
        r`$t$ covers $2\pi$ once, so the circle is traced once.`,
      ],
    }),
    mc({
      id: 'q10_1_04',
      question: r`Describe $x = \sin t$, $y = \cos t$, $0 \le t \le 2\pi$.`,
      answer: r`Unit circle, traced once **clockwise** starting at $(0, 1)$`,
      wrong: [r`Unit circle, counterclockwise starting at $(1, 0)$`, r`Unit circle, counterclockwise starting at $(0, 1)$`, r`Upper half of the unit circle`],
      hint: r`Check $t = 0$ and $t = \frac\pi2$.`,
      solution: [
        r`$x^2 + y^2 = 1$: unit circle.`,
        r`$t = 0$: $(0, 1)$. $t = \frac\pi2$: $(1, 0)$. Moving from the top to the right is **clockwise**.`,
        r`Swapping sin and cos reverses the usual orientation.`,
      ],
    }),
    mc({
      id: 'q10_1_05',
      question: r`Eliminate the parameter: $x = 1 + 2\cos t$, $y = -2 + 2\sin t$.`,
      answer: r`$(x - 1)^2 + (y + 2)^2 = 4$`,
      wrong: [r`$(x + 1)^2 + (y - 2)^2 = 4$`, r`$(x - 1)^2 + (y + 2)^2 = 2$`, r`$x^2 + y^2 = 4$`],
      hint: r`Isolate $\cos t$ and $\sin t$, then use $\cos^2 + \sin^2 = 1$.`,
      solution: [
        r`$\cos t = \frac{x - 1}{2}$, $\sin t = \frac{y + 2}{2}$.`,
        r`$\frac{(x - 1)^2}{4} + \frac{(y + 2)^2}{4} = 1 \Rightarrow (x - 1)^2 + (y + 2)^2 = 4$.`,
        r`Circle: center $(1, -2)$, radius $2$.`,
      ],
    }),
    mc({
      id: 'q10_1_06',
      question: r`Eliminate the parameter: $x = t^2$, $y = t^3$.`,
      answer: r`$y^2 = x^3$`,
      wrong: [r`$y = x^{2/3}$`, r`$y^3 = x^2$`, r`$y = x^3$`],
      hint: r`Cube $x$ and square $y$.`,
      solution: [
        r`$x^3 = t^6$ and $y^2 = t^6$.`,
        r`So $y^2 = x^3$ (a cusp at the origin; $y = \pm x^{3/2}$).`,
      ],
    }),
    mc({
      id: 'q10_1_07',
      question: r`Eliminate the parameter: $x = \cos t$, $y = \cos2t$.`,
      answer: r`$y = 2x^2 - 1$, with $-1 \le x \le 1$`,
      wrong: [r`$y = 2x^2 - 1$ for all $x$`, r`$y = 1 - 2x^2$`, r`$y = x^2$`],
      hint: r`$\cos2t = 2\cos^2t - 1$.`,
      solution: [
        r`Double angle: $\cos2t = 2\cos^2t - 1 = 2x^2 - 1$.`,
        r`Since $x = \cos t$, only $-1 \le x \le 1$ is traced.`,
      ],
    }),
    mc({
      id: 'q10_1_08',
      question: r`Which parametrization traces $x^2 + y^2 = 16$ once counterclockwise, starting at $(4, 0)$?`,
      answer: r`$x = 4\cos t,\ y = 4\sin t,\ 0 \le t \le 2\pi$`,
      wrong: [r`$x = 16\cos t,\ y = 16\sin t,\ 0 \le t \le 2\pi$`, r`$x = 4\sin t,\ y = 4\cos t,\ 0 \le t \le 2\pi$`, r`$x = 4\cos t,\ y = 4\sin t,\ 0 \le t \le \pi$`],
      hint: r`Radius is $\sqrt{16}$.`,
      solution: [
        r`Radius $4$; standard counterclockwise form is $(4\cos t, 4\sin t)$, starting at $t = 0$: $(4, 0)$ ✓`,
        r`$0 \le t \le 2\pi$ traces it exactly once. ($[0, \pi]$ gives only the top half.)`,
      ],
    }),
    mc({
      id: 'q10_1_09',
      question: r`Where is the point $x = 2\cos t$, $y = 2\sin t$ at $t = \frac\pi3$?`,
      answer: r`$\left(1, \sqrt3\right)$`,
      wrong: [r`$\left(\sqrt3, 1\right)$`, r`$\left(1, -\sqrt3\right)$`, r`$\left(2, \frac\pi3\right)$`],
      hint: r`$\cos\frac\pi3 = \frac12$, $\sin\frac\pi3 = \frac{\sqrt3}{2}$.`,
      solution: [
        r`$x = 2\cdot\frac12 = 1$, $y = 2\cdot\frac{\sqrt3}{2} = \sqrt3$.`,
      ],
    }),
    mc({
      id: 'q10_1_10',
      question: r`Which curve is traced by $x = \frac1t$, $y = t$ for $t > 0$?`,
      answer: r`$y = \frac1x$ with $x > 0$`,
      wrong: [r`$y = \frac1x$ for all $x \ne 0$`, r`$y = x$`, r`$xy = -1$`],
      hint: r`Multiply $x$ and $y$.`,
      solution: [
        r`$xy = \frac1t\cdot t = 1 \Rightarrow y = \frac1x$.`,
        r`$t > 0 \Rightarrow x > 0$: only the first-quadrant branch of the hyperbola.`,
      ],
    }),
  ],

  // ─────────────── 10.2 Calculus with parametric curves ───────────────
  '10.2': [
    mc({
      id: 'q10_2_01',
      question: r`For $x = t^3$, $y = t^2 + 1$, find $\frac{dy}{dx}$ at $t = 1$.`,
      answer: r`$\frac23$`,
      wrong: [r`$\frac32$`, r`$2$`, r`$\frac13$`],
      hint: r`$\frac{dy}{dx} = \frac{2t}{3t^2}$.`,
      solution: [
        r`$\frac{dx}{dt} = 3t^2$, $\frac{dy}{dt} = 2t$.`,
        r`$\frac{dy}{dx} = \frac{2t}{3t^2} = \frac{2}{3t}$; at $t = 1$: $\frac23$.`,
      ],
    }),
    mc({
      id: 'q10_2_02',
      question: r`For $x = e^t$, $y = e^{-t}$, find $\frac{dy}{dx}$ at $t = 0$.`,
      answer: r`$-1$`,
      wrong: [r`$1$`, r`$0$`, r`$-2$`],
      hint: r`$\frac{dy}{dx} = \frac{-e^{-t}}{e^t}$.`,
      solution: [
        r`$\frac{dy}{dx} = \frac{-e^{-t}}{e^t} = -e^{-2t}$.`,
        r`At $t = 0$: $-1$. (The curve is $y = \frac1x$, whose slope at $x = 1$ is $-1$ ✓)`,
      ],
    }),
    mc({
      id: 'q10_2_03',
      question: r`Find the tangent line to $x = t^2$, $y = 2t$ at $t = 1$.`,
      answer: r`$y = x + 1$`,
      wrong: [r`$y = x - 1$`, r`$y = 2x$`, r`$y = -x + 3$`],
      hint: r`Point at $t = 1$, slope $\frac{2}{2t}$.`,
      solution: [
        r`Point: $(1, 2)$.`,
        r`Slope: $\frac{dy}{dx} = \frac{2}{2t} = 1$ at $t = 1$.`,
        r`$y - 2 = 1(x - 1) \Rightarrow y = x + 1$.`,
      ],
    }),
    mc({
      id: 'q10_2_04',
      question: r`For $x = \cos t$, $y = \sin2t$, $0 \le t \le \pi$, where are the horizontal tangents?`,
      answer: r`$\left(\frac{\sqrt2}{2}, 1\right)$ and $\left(-\frac{\sqrt2}{2}, -1\right)$`,
      wrong: [r`$(1, 0)$ and $(-1, 0)$`, r`$\left(\frac{\sqrt2}{2}, -1\right)$ and $\left(-\frac{\sqrt2}{2}, 1\right)$`, r`$(0, 0)$ only`],
      hint: r`$\frac{dy}{dt} = 2\cos2t = 0$ at $t = \frac\pi4, \frac{3\pi}{4}$.`,
      solution: [
        r`$\frac{dy}{dt} = 2\cos2t = 0 \Rightarrow 2t = \frac\pi2, \frac{3\pi}{2} \Rightarrow t = \frac\pi4, \frac{3\pi}{4}$.`,
        r`$\frac{dx}{dt} = -\sin t \ne 0$ at both ✓`,
        r`$t = \frac\pi4$: $\left(\frac{\sqrt2}{2}, \sin\frac\pi2\right) = \left(\frac{\sqrt2}{2}, 1\right)$. $t = \frac{3\pi}{4}$: $\left(-\frac{\sqrt2}{2}, \sin\frac{3\pi}{2}\right) = \left(-\frac{\sqrt2}{2}, -1\right)$.`,
      ],
    }),
    mc({
      id: 'q10_2_05',
      question: r`Where does $x = t^2 - 2t$, $y = t^3$ have a **vertical** tangent?`,
      answer: r`$(-1, 1)$`,
      wrong: [r`$(0, 0)$`, r`$(1, -1)$`, r`$(0, 8)$`],
      hint: r`Set $\frac{dx}{dt} = 0$.`,
      solution: [
        r`$\frac{dx}{dt} = 2t - 2 = 0 \Rightarrow t = 1$; there $\frac{dy}{dt} = 3 \ne 0$ ✓`,
        r`Point: $x = 1 - 2 = -1$, $y = 1$ ⟹ $(-1, 1)$.`,
      ],
    }),
    mc({
      id: 'q10_2_06',
      question: r`For $x = t^2$, $y = t^3 - 3t$, find $\frac{d^2y}{dx^2}$ at $t = 1$.`,
      answer: r`$\frac32$`,
      wrong: [r`$3$`, r`$0$`, r`$\frac34$`],
      hint: r`$\frac{dy}{dx} = \frac{3t}{2} - \frac{3}{2t}$. Differentiate in $t$, then divide by $2t$.`,
      solution: [
        r`$\frac{dy}{dx} = \frac{3t^2 - 3}{2t} = \frac{3t}{2} - \frac{3}{2t}$.`,
        r`$\frac{d}{dt}\left(\frac{dy}{dx}\right) = \frac32 + \frac{3}{2t^2}$; at $t = 1$: $3$.`,
        r`Divide by $\frac{dx}{dt} = 2t = 2$: $\frac{d^2y}{dx^2} = \frac32$. (Positive ⟹ concave up there.)`,
      ],
    }),
    mc({
      id: 'q10_2_07',
      question: r`Find the arc length of $x = e^t\cos t$, $y = e^t\sin t$ for $0 \le t \le 1$.`,
      answer: r`$\sqrt2(e - 1)$`,
      wrong: [r`$e - 1$`, r`$\sqrt2\,e$`, r`$2(e - 1)$`],
      hint: r`$(x')^2 + (y')^2$ simplifies to $2e^{2t}$.`,
      solution: [
        r`$x' = e^t(\cos t - \sin t)$, $y' = e^t(\sin t + \cos t)$.`,
        r`$(x')^2 + (y')^2 = e^{2t}\big[(\cos t - \sin t)^2 + (\sin t + \cos t)^2\big] = e^{2t}\cdot2$.`,
        r`Speed $= \sqrt2e^t$, so $L = \sqrt2\int_0^1e^t\,dt = \sqrt2(e - 1) \approx 2.43$.`,
      ],
    }),
    mc({
      id: 'q10_2_08',
      question: r`Find the arc length of $x = t^3$, $y = \frac32t^2$ for $0 \le t \le 1$.`,
      answer: r`$2\sqrt2 - 1$`,
      wrong: [r`$\frac23\left(2\sqrt2 - 1\right)$`, r`$3\left(2\sqrt2 - 1\right)$`, r`$2\sqrt2$`],
      hint: r`Speed $= \sqrt{9t^4 + 9t^2} = 3t\sqrt{t^2 + 1}$.`,
      solution: [
        r`$x' = 3t^2$, $y' = 3t$. Speed $= \sqrt{9t^4 + 9t^2} = 3t\sqrt{t^2 + 1}$.`,
        r`$L = \int_0^1 3t\sqrt{t^2 + 1}\,dt$. Let $u = t^2 + 1$: $\frac32\int_1^2u^{1/2}du = \left[u^{3/2}\right]_1^2$.`,
        r`$L = 2\sqrt2 - 1 \approx 1.83$.`,
      ],
    }),
    mc({
      id: 'q10_2_09',
      question: r`A particle moves on $x = \cos2t$, $y = \sin2t$ for $0 \le t \le \pi$. How far does it travel?`,
      answer: r`$2\pi$`,
      wrong: [r`$\pi$`, r`$4\pi$`, r`$1$`],
      hint: r`Speed is constant. Also: how many times does it go around?`,
      solution: [
        r`$x' = -2\sin2t$, $y' = 2\cos2t$; speed $= 2$.`,
        r`Distance $= \int_0^\pi2\,dt = 2\pi$.`,
        r`Geometrically: the unit circle (circumference $2\pi$) traced once, since $2t$ runs from $0$ to $2\pi$.`,
      ],
    }),
    mc({
      id: 'q10_2_10',
      question: r`For $x = t + \frac1t$, $y = t - \frac1t$, find $\frac{dy}{dx}$ at $t = 2$.`,
      answer: r`$\frac53$`,
      wrong: [r`$\frac35$`, r`$1$`, r`$\frac54$`],
      hint: r`$\frac{dx}{dt} = 1 - \frac{1}{t^2}$, $\frac{dy}{dt} = 1 + \frac{1}{t^2}$.`,
      solution: [
        r`At $t = 2$: $\frac{dx}{dt} = 1 - \frac14 = \frac34$, $\frac{dy}{dt} = 1 + \frac14 = \frac54$.`,
        r`$\frac{dy}{dx} = \frac{5/4}{3/4} = \frac53$.`,
      ],
    }),
  ],

  // ─────────────── 10.3 Polar coordinates ───────────────
  '10.3': [
    mc({
      id: 'q10_3_01',
      question: r`Which polar point is the same as $\left(-2, \frac\pi4\right)$?`,
      answer: r`$\left(2, \frac{5\pi}{4}\right)$`,
      wrong: [r`$\left(2, \frac\pi4\right)$`, r`$\left(2, -\frac\pi4\right)$`, r`$\left(-2, \frac{5\pi}{4}\right)$`],
      hint: r`$(-r, \theta) = (r, \theta + \pi)$.`,
      solution: [
        r`A negative radius points the opposite way: $(-2, \frac\pi4) = (2, \frac\pi4 + \pi) = (2, \frac{5\pi}{4})$.`,
        r`Check in Cartesian: both give $(-\sqrt2, -\sqrt2)$.`,
      ],
    }),
    mc({
      id: 'q10_3_02',
      question: r`Convert the polar point $\left(4, \frac{5\pi}{6}\right)$ to Cartesian coordinates.`,
      answer: r`$\left(-2\sqrt3, 2\right)$`,
      wrong: [r`$\left(2\sqrt3, 2\right)$`, r`$\left(-2, 2\sqrt3\right)$`, r`$\left(-2\sqrt3, -2\right)$`],
      hint: r`$\cos\frac{5\pi}{6} = -\frac{\sqrt3}{2}$, $\sin\frac{5\pi}{6} = \frac12$.`,
      solution: [
        r`$x = 4\cos\frac{5\pi}{6} = 4\left(-\frac{\sqrt3}{2}\right) = -2\sqrt3$.`,
        r`$y = 4\sin\frac{5\pi}{6} = 4\cdot\frac12 = 2$.`,
      ],
    }),
    mc({
      id: 'q10_3_03',
      question: r`Convert $(x, y) = (0, -5)$ to polar coordinates with $r > 0$ and $0 \le \theta < 2\pi$.`,
      answer: r`$\left(5, \frac{3\pi}{2}\right)$`,
      wrong: [r`$\left(5, \frac\pi2\right)$`, r`$\left(-5, \frac\pi2\right)$`, r`$\left(5, -\frac\pi2\right)$`],
      hint: r`The point is straight down from the origin.`,
      solution: [
        r`$r = 5$. Straight down is $\theta = \frac{3\pi}{2}$ (in $[0, 2\pi)$).`,
        r`($\left(-5, \frac\pi2\right)$ is the same point but has $r < 0$; $-\frac\pi2$ is outside the range.)`,
      ],
    }),
    mc({
      id: 'q10_3_04',
      question: r`Convert $(x, y) = \left(\sqrt3, 1\right)$ to polar coordinates ($r > 0$, $0 \le \theta < 2\pi$).`,
      answer: r`$\left(2, \frac\pi6\right)$`,
      wrong: [r`$\left(2, \frac\pi3\right)$`, r`$\left(4, \frac\pi6\right)$`, r`$\left(\sqrt3, \frac\pi6\right)$`],
      hint: r`$r = \sqrt{3 + 1}$; $\tan\theta = \frac{1}{\sqrt3}$ in quadrant I.`,
      solution: [
        r`$r = \sqrt{(\sqrt3)^2 + 1^2} = 2$.`,
        r`$\tan\theta = \frac{1}{\sqrt3}$, quadrant I ⟹ $\theta = \frac\pi6$.`,
      ],
    }),
    mc({
      id: 'q10_3_05',
      question: r`What is the Cartesian equation of $r = 3$?`,
      answer: r`$x^2 + y^2 = 9$`,
      wrong: [r`$x^2 + y^2 = 3$`, r`$x = 3$`, r`$y = 3$`],
      hint: r`$r^2 = x^2 + y^2$.`,
      solution: [
        r`$r = 3 \Rightarrow r^2 = 9 \Rightarrow x^2 + y^2 = 9$: a circle of radius $3$.`,
      ],
    }),
    mc({
      id: 'q10_3_06',
      question: r`What is the Cartesian equation of $\theta = \frac\pi4$?`,
      answer: r`$y = x$`,
      wrong: [r`$y = \frac\pi4x$`, r`$x^2 + y^2 = \frac\pi4$`, r`$y = -x$`],
      hint: r`$\tan\theta = \frac yx$.`,
      solution: [
        r`$\tan\frac\pi4 = 1 = \frac yx \Rightarrow y = x$.`,
        r`(With negative $r$ allowed, it's the whole line through the origin.)`,
      ],
    }),
    mc({
      id: 'q10_3_07',
      question: r`What is the Cartesian equation of $r = 2\sec\theta$?`,
      answer: r`$x = 2$`,
      wrong: [r`$y = 2$`, r`$x^2 + y^2 = 4$`, r`$x = \frac12$`],
      hint: r`$\sec\theta = \frac{1}{\cos\theta}$; multiply both sides by $\cos\theta$.`,
      solution: [
        r`$r = \frac{2}{\cos\theta} \Rightarrow r\cos\theta = 2$.`,
        r`$r\cos\theta = x$, so $x = 2$: a vertical line.`,
      ],
    }),
    mc({
      id: 'q10_3_08',
      question: r`Write $y = x^2$ in polar form.`,
      answer: r`$r = \tan\theta\sec\theta$`,
      wrong: [r`$r = \sin\theta\cos^2\theta$`, r`$r = \cot\theta\csc\theta$`, r`$r^2 = \tan\theta$`],
      hint: r`Substitute $x = r\cos\theta$, $y = r\sin\theta$ and solve for $r$.`,
      solution: [
        r`$r\sin\theta = r^2\cos^2\theta$.`,
        r`Divide by $r\cos^2\theta$: $r = \frac{\sin\theta}{\cos^2\theta} = \tan\theta\sec\theta$.`,
      ],
    }),
    mc({
      id: 'q10_3_09',
      question: r`How many petals does the rose $r = 5\cos3\theta$ have?`,
      answer: r`$3$`,
      wrong: [r`$6$`, r`$5$`, r`$15$`],
      hint: r`Odd $n$: $n$ petals. Even $n$: $2n$ petals.`,
      solution: [
        r`$n = 3$ is odd ⟹ $3$ petals.`,
        r`The $5$ is the petal length, not the count.`,
      ],
    }),
    mc({
      id: 'q10_3_10',
      question: r`What type of curve is $r = 1 + 2\sin\theta$?`,
      answer: r`Limaçon with an inner loop`,
      wrong: [r`Cardioid`, r`Circle`, r`Rose with 2 petals`],
      hint: r`Compare the constant $1$ with the coefficient $2$.`,
      solution: [
        r`Form $r = b + a\sin\theta$ with $b = 1 < a = 2$.`,
        r`$b < a$ ⟹ $r$ becomes negative for some $\theta$, creating an **inner loop**.`,
        r`($b = a$ would be a cardioid.)`,
      ],
    }),
  ],

  // ─────────────── 10.4 Polar area & length ───────────────
  '10.4': [
    mc({
      id: 'q10_4_01',
      question: r`Find the area of the region $r \le 3$, $0 \le \theta \le \frac\pi3$ (a sector).`,
      answer: r`$\frac{3\pi}{2}$`,
      wrong: [r`$3\pi$`, r`$\pi$`, r`$\frac{9\pi}{2}$`],
      hint: r`$A = \frac12\int_0^{\pi/3}9\,d\theta$.`,
      solution: [
        r`$A = \frac12\int_0^{\pi/3}3^2\,d\theta = \frac92\cdot\frac\pi3 = \frac{3\pi}{2}$.`,
        r`Check: $\frac{\pi/3}{2\pi} = \frac16$ of a disk with area $9\pi$ ✓`,
      ],
    }),
    mc({
      id: 'q10_4_02',
      question: r`Find the area inside $r = 2\cos\theta$.`,
      answer: r`$\pi$`,
      wrong: [r`$2\pi$`, r`$4\pi$`, r`$\frac\pi2$`],
      hint: r`Traced once for $-\frac\pi2 \le \theta \le \frac\pi2$.`,
      solution: [
        r`$A = \frac12\int_{-\pi/2}^{\pi/2}4\cos^2\theta\,d\theta = 2\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = 2\cdot\frac\pi2 = \pi$.`,
        r`Check: it's a circle of radius $1$ ✓ (Using $0$ to $2\pi$ traces it twice: $2\pi$.)`,
      ],
    }),
    mc({
      id: 'q10_4_03',
      question: r`Find the area of one petal of $r = 2\sin2\theta$.`,
      answer: r`$\frac\pi2$`,
      wrong: [r`$\pi$`, r`$\frac\pi4$`, r`$2\pi$`],
      hint: r`One petal: $0 \le \theta \le \frac\pi2$.`,
      solution: [
        r`$\sin2\theta = 0$ at $\theta = 0$ and $\frac\pi2$: one petal.`,
        r`$A = \frac12\int_0^{\pi/2}4\sin^22\theta\,d\theta = 2\int_0^{\pi/2}\frac{1 - \cos4\theta}{2}d\theta = \int_0^{\pi/2}(1 - \cos4\theta)\,d\theta$.`,
        r`$= \frac\pi2 - 0 = \frac\pi2$.`,
      ],
    }),
    mc({
      id: 'q10_4_04',
      question: r`Find the total area enclosed by all petals of $r = \cos2\theta$.`,
      answer: r`$\frac\pi2$`,
      wrong: [r`$\frac\pi8$`, r`$\frac\pi4$`, r`$\pi$`],
      hint: r`$4$ petals, each of area $\frac\pi8$.`,
      solution: [
        r`$n = 2$ (even) ⟹ $4$ petals. One petal ($-\frac\pi4 \le \theta \le \frac\pi4$) has area $\frac\pi8$.`,
        r`Total $= 4\cdot\frac\pi8 = \frac\pi2$.`,
        r`Equivalently $\frac12\int_0^{2\pi}\cos^22\theta\,d\theta = \frac12\cdot\pi = \frac\pi2$.`,
      ],
    }),
    mc({
      id: 'q10_4_05',
      question: r`Find the area inside $r = 2 + \cos\theta$.`,
      answer: r`$\frac{9\pi}{2}$`,
      wrong: [r`$9\pi$`, r`$4\pi$`, r`$\frac{5\pi}{2}$`],
      hint: r`$(2 + \cos\theta)^2 = 4 + 4\cos\theta + \cos^2\theta$ over $[0, 2\pi]$.`,
      solution: [
        r`$A = \frac12\int_0^{2\pi}(4 + 4\cos\theta + \cos^2\theta)\,d\theta$.`,
        r`$\int_0^{2\pi}4 = 8\pi$, $\int_0^{2\pi}4\cos\theta = 0$, $\int_0^{2\pi}\cos^2\theta = \pi$.`,
        r`$A = \frac12(9\pi) = \frac{9\pi}{2}$.`,
      ],
    }),
    mc({
      id: 'q10_4_06',
      question: r`Find the area swept out by the spiral $r = \theta$ for $0 \le \theta \le 2\pi$.`,
      answer: r`$\frac{4\pi^3}{3}$`,
      wrong: [r`$\frac{8\pi^3}{3}$`, r`$2\pi^2$`, r`$\frac{\pi^3}{3}$`],
      hint: r`$\frac12\int_0^{2\pi}\theta^2\,d\theta$.`,
      solution: [
        r`$A = \frac12\int_0^{2\pi}\theta^2\,d\theta = \frac12\cdot\frac{(2\pi)^3}{3} = \frac12\cdot\frac{8\pi^3}{3}$.`,
        r`$A = \frac{4\pi^3}{3}$. (Forgetting the $\frac12$ gives $\frac{8\pi^3}{3}$.)`,
      ],
    }),
    mc({
      id: 'q10_4_07',
      question: r`Find the area inside $r = 3\sin\theta$ and outside $r = 1 + \sin\theta$.`,
      answer: r`$\pi$`,
      wrong: [r`$2\pi$`, r`$\frac\pi2$`, r`$\pi + \sqrt3$`],
      hint: r`They meet where $\sin\theta = \frac12$: $\theta = \frac\pi6, \frac{5\pi}{6}$.`,
      solution: [
        r`$3\sin\theta = 1 + \sin\theta \Rightarrow \sin\theta = \frac12 \Rightarrow \theta = \frac\pi6, \frac{5\pi}{6}$.`,
        r`$A = \frac12\int_{\pi/6}^{5\pi/6}\big[9\sin^2\theta - (1 + \sin\theta)^2\big]d\theta = \frac12\int_{\pi/6}^{5\pi/6}(8\sin^2\theta - 1 - 2\sin\theta)\,d\theta$.`,
        r`Using $8\sin^2\theta = 4 - 4\cos2\theta$, the integrand is $3 - 4\cos2\theta - 2\sin\theta$.`,
        r`$\int = \left[3\theta - 2\sin2\theta + 2\cos\theta\right]_{\pi/6}^{5\pi/6} = 2\pi + 2\sqrt3 - 2\sqrt3 = 2\pi$.`,
        r`$A = \frac12\cdot2\pi = \pi$.`,
      ],
    }),
    mc({
      id: 'q10_4_08',
      question: r`Find the total length of the cardioid $r = 1 + \cos\theta$.`,
      answer: r`$8$`,
      wrong: [r`$4$`, r`$2\pi$`, r`$4\pi$`],
      hint: r`$r^2 + (r')^2 = 2 + 2\cos\theta = 4\cos^2\frac\theta2$.`,
      solution: [
        r`$r' = -\sin\theta$: $r^2 + (r')^2 = 1 + 2\cos\theta + \cos^2\theta + \sin^2\theta = 2 + 2\cos\theta$.`,
        r`$2 + 2\cos\theta = 4\cos^2\frac\theta2$, so the integrand is $2\left|\cos\frac\theta2\right|$.`,
        r`By symmetry, $L = 2\int_0^\pi2\cos\frac\theta2\,d\theta = 4\left[2\sin\frac\theta2\right]_0^\pi = 8$.`,
      ],
    }),
    mc({
      id: 'q10_4_09',
      question: r`Find the length of $r = e^\theta$ for $0 \le \theta \le 2$.`,
      answer: r`$\sqrt2\left(e^2 - 1\right)$`,
      wrong: [r`$e^2 - 1$`, r`$\sqrt2\,e^2$`, r`$2\left(e^2 - 1\right)$`],
      hint: r`$r^2 + (r')^2 = 2e^{2\theta}$.`,
      solution: [
        r`$r' = e^\theta$, so $r^2 + (r')^2 = 2e^{2\theta}$ and the integrand is $\sqrt2e^\theta$.`,
        r`$L = \sqrt2\int_0^2e^\theta\,d\theta = \sqrt2(e^2 - 1) \approx 9.04$.`,
      ],
    }),
    mc({
      id: 'q10_4_10',
      question: r`Which integral gives the area of the **inner loop** of $r = 1 + 2\cos\theta$?`,
      answer: r`$\frac12\int_{2\pi/3}^{4\pi/3}(1 + 2\cos\theta)^2\,d\theta$`,
      wrong: [r`$\frac12\int_0^{2\pi}(1 + 2\cos\theta)^2\,d\theta$`, r`$\frac12\int_{-2\pi/3}^{2\pi/3}(1 + 2\cos\theta)^2\,d\theta$`, r`$\int_{2\pi/3}^{4\pi/3}(1 + 2\cos\theta)\,d\theta$`],
      hint: r`The inner loop is traced while $r \le 0$: solve $1 + 2\cos\theta = 0$.`,
      solution: [
        r`$r = 0$ when $\cos\theta = -\frac12$: $\theta = \frac{2\pi}{3}$ and $\frac{4\pi}{3}$.`,
        r`Between those angles $r < 0$, which traces the inner loop.`,
        r`Area: $\frac12\int_{2\pi/3}^{4\pi/3}(1 + 2\cos\theta)^2\,d\theta = \pi - \frac{3\sqrt3}{2} \approx 0.54$.`,
        r`($-\frac{2\pi}{3}$ to $\frac{2\pi}{3}$ gives the large outer loop.)`,
      ],
    }),
  ],
};

---
title: B - Intersection over Union
date: 2023-12-10
---

# B - Intersection over Union

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2023 ICPC Asia Nanjing Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>0/342 (0.0%)</td>
</tr>
</table>

## Tutorial

Symmetry can greatly simplify the problem. Only aspect ratio and orientation of the given OBB matter. The answer is unchanged after many transformations applied to the given OBB, such as translation, reflection and isotropy scaling. 

First, we shift the given OBB so that its center is at the origin. Then we can apply some reflection transforms to the given OBB, so that it be parameterized with long side $a$, short side $b$ and orientation $\theta$ ($a \ge b \gt 0 $, $ 0 \le \theta \le \frac{\pi}{4}$). Four points of the OBB can be presented in the following order:

$$
\begin{pmatrix} x_1 & y_1 \\ x_2 & y_2 \\ x_3 & y_3 \\ x_4 & y_4  \end {pmatrix} = \frac{1}{2} \begin{pmatrix}
+ a \cos \theta + b \sin \theta & + a \sin \theta - b \cos \theta \\
+ a \cos \theta - b \sin \theta & + a \sin \theta + b \cos \theta \\
- a \cos \theta - b \sin \theta & - a \sin \theta + b \cos \theta \\
- a \cos \theta + b \sin \theta & - a \sin \theta - b \cos \theta
\end {pmatrix}
$$

The target AABB can be parameterized with 4 variables $x$, $y$, $w$, $h$. Its center is at $(x, y)$. And the left, right, up and down boundary should be $x - \frac{w}{2}$, $x + \frac{w}{2}$, $y + \frac{h}{2}$ and $y - \frac{h}{2}$. We want to maximize $IOU(x, y, w, h)$, where $I_{w, h}(x, y)$ is area of the intersection of OBB and AABB ($w > 0, h > 0$).

$$
IOU(x, y, w, h) = \frac{I_{w, h}(x, y)}{a b + w h - I_{w,h}(x, y)}
$$

For central symmetry, $I_{w,h}(x, y)$ is an even function: $I_{w, h}(x, y) = I_{w, h}(-x, -y)$. And $I_{w, h}(x, y)$ is also a convex function, so $I_{w, h}(0, 0) = I_{w, h}(\frac{x - x}{2}, \frac{y - y}{2}) \ge \frac{I_{w, h}(x, y)+ I_{w, h}(-x, -y)}{2} = I_{w, h}(x, y)$.

$I_{w, h}(0, 0) \ge I_{w, h}(x, y) \rightarrow IOU(0, 0, w, h) \ge IOU(x, y, w, h)$, so the center of target AABB can be placed at the origin. Then the task becomes to maximize $g(w, h)$, where

$$
g(w, h) := IOU(0, 0, w, h)
$$

Generally $g(w, h)$ can be addressed as a function of $h$ for fixed $w$:

$$g(w, h) = \frac{union + intersection}{union} - 1 = \frac{a b + w h}{a b + \int_0^h{u(t) dt}} - 1$$

where $u(h)$ is the derivative by $h$ of the union area, we have $0 \le u(h) \le w$ and $u(h)$ is a non-decreasing monotonic function.

$$\frac{\partial g}{\partial h}
= \frac{w \left(a b + \int_0^h{u(t) dt}\right) - (a b + w h) u(h)}{\left(a b + \int_0^h{u(t) dt}\right)^2}
= \frac{a b (w - u(h)) + w \int_0^h{\left(u(t) - u(h)\right)dt} }{\left(a b + \int_0^h{u(t) dt}\right)^2}$$

The numerator is monotonic non-increasing, then $g(w, h)$ is a single-peaked function of $h$. Symmetrically, it is also a single-peaked function of $w$. Since $g(w, h)$ is a single-peaked function, there is no local maximium problem. Many search algorithm will coverages to global maximium, such as ternary search, gradients descent, hill climbing and simulated annealing, should work for this function.

Case by case, $g(w, h)$ can be described in a table:

$$
\begin{array} {|c|c|c|c|c|c|}
\hline
 case & condition & g(w, h) & opt. & gradient & comment\\
\hline 
 0) & \theta = 0 & \frac{\min(a, w) \times \min(b, h)} {\max(a,w) \times \max(b, h)} & Yes & (w, h) = (a, b) & trival  \\
\hline
 1) & w \ge a \cos \theta + b \sin \theta \land h \ge a \sin \theta + b \cos \theta & \frac{ab}{wh}& No & \frac{\partial g}{\partial w} < 0, \frac{\partial g}{\partial h} < 0& OBB \subseteq AABB \\
\hline 
 2) & w \ge a \cos \theta + b \sin \theta & \frac{I(h)}{ab + wh - I(h)}& No & \frac{\partial g}{\partial w} < 0 & \\
\hline
 3) & h \ge a \sin \theta + b \cos \theta & \frac{I(w)}{ab + wh - I(w)}& No & \frac{\partial g}{\partial h} < 0 & \\
\hline 
 4) &  w \cos \theta + h \sin \theta \le a \land w \sin \theta + h \cos \theta \le b & \frac{wh}{ab} & No & \frac{\partial g}{\partial w} > 0, \frac{\partial g}{\partial h} > 0 & AABB \subseteq OBB \\
\hline 
 5) &  w \cos \theta + h \sin \theta \le a \land h \cos \theta - w \sin \theta \gt b & \frac{I(w)}{a b + w h - I(w)} & No & \frac{\partial g}{\partial h} \lt 0 & parallelogram \\
\hline
 6) & w \cos \theta + h \sin \theta \le a \land w \sin \theta + h \cos \theta \ge b & \frac{wh - q^2 / 2 \sin {2 \theta}}{ab + q^2 / 2 \sin {2 \theta}}, q = w \sin \theta + h \cos \theta - b & Yes & & hexagon\\
\hline
 7) & w \cos \theta + h \sin \theta \le a \land w \sin \theta - h \cos \theta \gt b & \frac{I(h)}{a b + w h - I(h)} & No & \frac{\partial g}{\partial w} < 0 & parallelogram \\
\hline 
 8) & w \cos \theta + h \sin \theta \ge a \land w \sin \theta + h \cos \theta \ge b & \frac{wh - (p^2 + q^2) / 2 \sin {2 \theta}}{ab + (p^2 + q^2) / 2 \sin {2 \theta}} & Yes & & octagon \\
\hline
 9) & w \cos \theta + h \sin \theta \ge a \land w \sin \theta + h \cos \theta \le b & \frac{w h -  p ^2 / 2 \sin {2 \theta}}{ab +  p^2 / 2 \sin {2 \theta}}, p=w \cos \theta + h \sin \theta - a & Yes & & hexagon \\
\hline
 10) & w \cos \theta - h \sin \theta \gt a \land w \sin \theta + h \cos \theta \le b & \frac{I(h)}{a b + w h - I(h)} & No & \frac{\partial g}{\partial w} < 0 & parallelogram \\
\hline
\end{array}
$$

Maximum can happen in case 0), case 6), case 8) and case 9). case 0) is trival to solve. case 9) is symmetrical with case 6). 

For case 6), let $f(w, h) := \log(1 + g(w, h)) = \log(a b + w h) - \log(a b + \frac{q^2}{2\sin{2\theta}})$, maximizing $f$ instead of $g$. 

$$
\nabla f(w, h) = \begin{bmatrix} \frac{\partial f}{\partial w} \\ \frac{\partial f}{\partial h} \end{bmatrix}
= \begin{bmatrix}
\frac{h}{a b + w h} - \frac{2 q \sin{\theta}} {2a b \sin{2\theta} + q^2} \\
\frac{w}{a b + w h} - \frac{2 q \cos{\theta}} {2a b \sin{2\theta} + q^2}
\end {bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}
\\ \Rightarrow \frac{h}{\sin{\theta}} = \frac{w}{\cos{\theta}}
= \frac{2 q (a b + w h)} {2 a b \sin{2\theta} + q^2}
= \frac {q (1 + g(w, h))} {\sin{2 \theta}}
$$

Substitute $(w, h) := (z \cos{\theta}, z \sin{\theta})$, and $q = z \sin{2\theta} - b$

$$
z = \frac{(z\sin{2\theta} - b)(2 a b + z^2 \sin{2\theta})}{2 a b \sin{2\theta} + (z \sin{2\theta}- b)^2}
\Rightarrow
z^2 \sin{2\theta} - b z - 2 a b = 0
$$

Since $z > 0$, we have $z_m = \frac{b + \sqrt{b^2 + 8 a b \sin{2\theta}}} {2 \sin{2\theta}}$. And $z_m$ must be both $z_m \le a$ and $z_m \sin{2\theta} \ge b$. So when $a \sin{2\theta} \ge 3 b$

$$
\max{g(w, h)} = \frac{z_m \sin{2\theta}} {z_m \sin{2\theta}- b} - 1 = \frac{2}{\sqrt{1 + 8\frac{a}{b} \sin{2\theta} } - 1}
$$

For case 9), symmetrically, when $(w, h) = (a + \sqrt{a^2 + 8 a b \sin{2\theta}}) \times (\frac{1}{2\cos{\theta}}, \frac{1}{2 \sin{\theta}})$

$$
\max{g(w, h)} = \frac{2}{\sqrt{1 + 8 \frac{b}{a} \sin{2\theta} } - 1} \ge 1
$$

It conflicts with $w \sin{\theta} + h \cos{\theta} \le b $, and cannot be the global maximium, skipped.

For case 8), let $f(w, h) := \log(1 + g(w, h)) = \log(a b + w h) - \log(a b + \frac{p^2 + q^2}{2\sin{2\theta}})$. Maximize $f$ instead of $g$:

$$
\nabla f(w, h) = \begin{bmatrix} \frac{\partial f}{\partial w} \\ \frac{\partial f}{\partial h} \end{bmatrix}
= \begin{bmatrix}
\frac{h}{a b + w h} - \frac{2 p \cos{\theta} + 2 q \sin{\theta}} {2a b \sin{2\theta} + p^2 + q^2} \\
\frac{w}{a b + w h} - \frac{2 p \sin{\theta} + 2 q \cos{\theta}} {2a b \sin{2\theta} + p^2 + q^2}
\end{bmatrix} =\begin{bmatrix} 0 \\ 0 \end{bmatrix}
\\
\Rightarrow
\frac{p \cos{\theta} + q \sin{\theta}}{h} = \frac{p \sin{\theta} + q \cos{\theta}}{w}
= \frac{2 a b \sin{2\theta} + p^2 + q^2}{2(a b + w h)} = \frac{\sin{2\theta}}{1 + g(w, h)}
\\
\frac{p \cos{\theta} + q \sin{\theta}}{h} = \frac{p \sin{\theta} + q \cos{\theta}}{w}
\Rightarrow \frac{a \cos{\theta} + b \sin{\theta} - w}{h} = \frac{a \sin{\theta} + b \cos{\theta} - h}{w} = k
$$

Then substitute $w$ and $h$

$$
\begin{bmatrix} w \\ h \end{bmatrix}
= \begin{bmatrix} 1 & k \\ k & 1 \end{bmatrix} ^ {-1}
\begin{bmatrix} \cos{\theta} & \sin{\theta} \\ \sin{\theta} & \cos{\theta} \end{bmatrix} \begin{bmatrix} a \\ b \end{bmatrix} 
= \frac{1}{1-k^2} \begin{bmatrix} 1 & -k \\ -k & 1 \end{bmatrix}
\begin{bmatrix} \cos{\theta} & \sin{\theta} \\ \sin{\theta} & \cos{\theta} \end{bmatrix} \begin{bmatrix} a \\ b \end{bmatrix} 
\\
\begin{bmatrix} p \\ q \end{bmatrix} = \begin{bmatrix} \cos{\theta} & \sin{\theta} \\ \sin{\theta} & \cos{\theta} \end{bmatrix} \begin{bmatrix} w \\ h \end{bmatrix} - \begin{bmatrix} a \\ b \end{bmatrix} 
= \frac{\sin{2\theta} - k}{1-k^2} \begin{bmatrix} -k & 1 \\ 1 & -k \end{bmatrix}\begin{bmatrix} a \\ b \end{bmatrix} 
$$

$k$ should holds $0 < k < \sin{2\theta}$.

$$
\sin{2\theta} - k = \frac{2 a b \sin{2\theta} + p^2 + q^2}{2(a b + w h)} = \frac{p^2 + q^2 + 2 a b k}{2 w h}
=\frac{(\sin{2\theta} - k)^2\left[(k^2+1)(a^2+b^2) - 4 a b k\right] + 2 a b k (1-k^2)^2}
{(a^2+b^2)\left[(k^2 + 1)\sin{2\theta} - 2 k\right] + 2 a b (k^2 - 2 k \sin{2\theta} + 1)} 
$$

let $\lambda := \frac{a^2+b^2}{2 a b}$, substitude above

$$
\sin{2\theta} - k = \frac{(\sin{2\theta} - k)^2\left[(k^2+1)\lambda - 2 k\right] + k (1-k^2)^2}
{\lambda \left[(k^2 + 1)\sin{2\theta} - 2 k\right] + (k^2 - 2 k \sin{2\theta} + 1)}
\\ \Rightarrow (k^2 - 1)(k^3 + \lambda k^2 - (2 + \lambda \sin{2\theta}) k + \sin{2\theta}) = 0
\\ \Rightarrow k^3 + \lambda k^2 - (2 + \lambda \sin{2\theta}) k + \sin{2\theta} = 0
$$

The cubic equation has 3 real roots $k_0$, $k_1$ and $k_2$. $k_1 < 0 < k_2 < \frac{\sin{2\theta}}{2} < \sin{2\theta} < k_0 \le 1$. We need the root $0 < k_2 < \frac{\sin{2\theta}}{2}$.

$$ k_n = -\frac{\lambda}{3} + \frac{2}{3}\sqrt{\lambda^2 + 3\lambda\sin{2\theta}+6}\cos{\left(\frac{1}{3}\arccos{\left(-\frac{2\lambda^3+9(\lambda^2+3)\sin{2\theta} + 18\lambda}{2\left(\sqrt{\lambda^2 + 3\lambda\sin{2\theta}+6}\right)^3}\right)} + \frac{2 n \pi}{3}\right)}$$

$$ \max{g(w, h)} = \frac{k_2}{\sin{2\theta} - k_2}$$

Merge case 0), case 6) and case 8),

$$ \max {g(w, h)} = \begin {cases}
 \ 1, &\text{if } \theta = 0 \\
 \frac{2}{\sqrt{1 + 8 \frac{a}{b} \sin{2\theta}} - 1}, & \text{if } \frac{a \sin{2\theta}}{b} \ge 3 \\
 \frac{k_2}{\sin{2\theta} - k_2}, & \text{otherwise}
\end{cases}$$

## Solution

```python linenums="1"
import decimal

Dec = decimal.Decimal

compute_prec = 64
decimal.getcontext().prec = compute_prec
print_eps = Dec('0.1') ** compute_prec - 8

def solve(lx: int, ly: int, wx: int, wy: int):
    if lx == 0 or ly == 0:
        return 1
    lx, ly, wx, wy = abs(lx), abs(ly), abs(wx), abs(wy)
    l2, w2, lw = lx * lx + ly * ly, wx * wx + wy * wy, lx * wy + ly * wx
    if l2 < w2:
        l2, w2, lx, ly, wx, wy = w2, l2, wx, wy, lx, ly
    if lx < ly:
        lx, ly, wx, wy = ly, lx, wy, wx

    l2sin2a = lx * ly << 1
    res = 1
    if l2sin2a >= lw * 3: # l/w * sin_2a >= 3
        # hexagon case, x cos_a + y sin_a <= l, x sin_a + y cos_a >= w
        # t = (x sin_a + y cos_a - w)² / (2 sin_2a),
        # iou = (xy - t) / (lw + t)
        # [x, y] = [z cos_a, z sin_a]
        # sin_2a z² - w z - 2 lw = 0
        # z = (w + √Δ) / 2 sin_2a, iou = 2 / (√Δ / w - 1) = 2 / (√(1 + 8 sin_2a l / w) - 1)
        res = 2 / ((1 + Dec(l2sin2a * 8) / lw).sqrt() - 1)
    else:
        # octagon case, x cos_a + y sin_a >= l, x sin_a + y cos_a >= w
        # t = ((x sin_a + y cos_a - w)² + (x cos_a + y sin_a - l)²) / (2 sin_2a),
        # iou = (xy - t) / (lw + t)
        # x, y = 1 / (1-k²) [xm - k * ym, ym - k * xm]
        # k³ + (l² + w²) / 2lw * k²  - (2 + sin_2a (l² + w²) / 2lw) * k + sin_2a = 0
        # 0 < k < sin_2a / 2 iou = 1 / (sin_2a / k - 1)
        xm, ym, k = lx + wx, ly + wy, 0
        b = Dec(l2 + w2) / (lw << 1)  # (l² + w²) / 2lw
        d = Dec(l2sin2a) / l2 # sin_2a
        # f(k) = k³ + b k²  - (2 + b d) k + d = 0
        if xm == ym:
            # symmetry, it holds d == 1 or b == 1, and k = 1 is a root
            # k³ + b k²  - (2 + b d) k + d = (k - 1) * (k² + (b + 1) k - b d + b - 1) + (b - 1) * (1 - d)
            # k² + (b + 1) k - b d + b - 1 == 0
            B = (b + 1) / 2
            k = (B * B + b * (d - 1) + 1).sqrt() - B
        else:
            c = - b * d - 2
            # f'(k) = 3k² + 2b k + c
            # f(0) >= 0, f(d/2) < 0, f(1) >= 0
            # k <- k - f(k) / f'(k), k <= 2/3 k - b/9 + ((2b² - 6c)k + bc - 9d) / 9f'(k)
            k, last_k, best = d / 4, 0, Dec('Inf')
            t0, t1 =  b * c - 9 * d, 2 * b * b - 6 * c
            while True:
                last_k = k
                df_dk = (3 * k + 2 * b) * k + c
                k = (k * 6 - b + (t1 * k + t0) / df_dk) / 9
                err =  abs(((k + b) * k + c) * k + d)
                if err >= best:
                    k = last_k
                    break
                best = err
        res = 1 / (d / k - 1)

    return str(res.quantize(print_eps)).rstrip('0')

for _ in range(int(input())):
    c = list(map(int, input().split()))
    print(solve(c[2] - c[0], c[3] - c[1], c[6] - c[0], c[7] - c[1]))
```

---
title: A - Sequence and Sequence
date: 2023-03-15
---

# A - Sequence and Sequence

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>0/373 (0.0%)</td>
</tr>
</table>

## Tutorial

Because $n$ is large, we need to first try to reduce the range of $n$. Note that there are only $\mathcal{O}(\sqrt{n})$ different values of $P(i)$, and only $\mathcal{O}(\sqrt{n})$ values of $i$ satisfy $P_i - P_{i - 1} \ne 0$. If we can express $Q(n)$ in the form of $(Q(P(i)) - Q(P(i - 1)))$, we can reduce the range of $n$ to $\mathcal{O}(\sqrt{n})$.

For convenience, we define $Q(0) = P(0) = 0$.

First, according to the definition of $Q$, it is easy to find that

$$
Q(n) = \sum\limits_{i = 1}^n Q(P(i))
$$

To get the form of $(Q(P(i)) - Q(P(i - 1)))$, we use a technique called [summation by parts](https://en.wikipedia.org/wiki/Summation_by_parts) (also known as the Abel transformation). Let's introduce a constant polynomial $f^{(0)}(x) = 1$, then

$$
Q(n) = \sum\limits_{i = 1}^n f^{(0)}(i) \times Q(P(i))
$$

Let $F^{(0)}(x) = \sum\limits_{i = 1}^x f^{(0)}(i)$, then

$$
Q(n) = \sum\limits_{i = 1}^n (F^{(0)}(i) - F^{(0)}(i - 1)) \times Q(P(i))
$$

Using the summation by parts, we can extract the terms with the same $F^{(0)}(i)$, then we get

$$
Q(n) = F^{(0)}(n) \times Q(P(n)) - \sum\limits_{i = 1}^n F^{(0)}(i - 1) \times (Q(P(i)) - Q(P(i - 1)))
$$

The desired $(Q(P(i)) - Q(P(i - 1)))$ appears! Based on the value of $P(i)$, most of the terms can be eliminated, and we have

$$
\begin{matrix}
& \sum\limits_{i = 1}^n F^{(0)}(i - 1) \times (Q(P(i)) - Q(P(i - 1))) \\
 = & \sum\limits_{i = 1}^{P(n)} F^{(0)}(\frac{i(i + 1)}{2} - 1) \times (Q(i) - Q(i - 1)) \\
 = & \sum\limits_{i = 1}^{P(n)} F^{(0)}(\frac{i(i + 1)}{2} - 1) \times Q(P(i))
\end{matrix}
$$

Let the polynomial $f^{(1)}(x) = F^{(0)}(\frac{x(x + 1)}{2} - 1)$, and let the function $g(d, n) = \sum\limits_{i = 1}^n f^{(d)}(i) \times Q(P(i))$, then

$$
Q(n) = g(0, n) = F^{(0)}(n) \times g(0, P(n)) - g(1, P(n))
$$

We can see that we have transformed the problem $g(0, n)$ into two smaller problems, $g(0, P(n))$ and $g(1, P(n))$, each of which has a size of $\mathcal{O}(\sqrt{n})$. Let $f^{(d)}(x) = F^{(d-1)}(\frac{x(x+1)}{2}-1)$ and $F^{(d)}(x) = \sum\limits_{i = 1}^x f^{(d)}(i)$, then we can easily obtain the formula:

$$
g(d, n) = F^{(d)}(n) \times g(0, P(n)) - g(d + 1, P(n))
$$

When the problem size becomes small enough (in the data range of this problem, when $d=4$ we have $n \leq 605$, which is small enough), we can directly compute the answer.

The value of the polynomial can be evaluated by [Lagrange interpolation](https://oi-wiki.org/math/poly/lagrange/). Note that every time we recurse, the degree of the polynomial will increase by $1$ and then multiply by $2$. Taking the deepest recursion level to be $D=4$, the degree of the polynomial will be $K=30$, and the maximum value of $n$ will be $N=605$. By appropriate pre-processing (see solution below), the pre-processing time complexity can be reduced to $\mathcal{O}(K^2+DK+DN)$, and the time complexity of a single case can be reduced to $\mathcal{O}(2^{D+1}K)$ (assuming the time complexity of high-precision arithmetic is a constant).

## Solution

```python linenums="1"
from math import isqrt

# ======== Pre-process: the point-value representation of polynomial f and F ========

# the maximum degree of polynomial
MAX_K = 30

# prod[i][j] = product(i - k), 0 <= k <= j, k != i
prod = []
for i in range(MAX_K + 1):
    prod.append([])
    p = 1
    for j in range(MAX_K + 1):
        if i != j:
            p *= i - j
        prod[-1].append(p)

# given the point-value representation (0, y[0]), (1, y[1]), ..., (k, y[k])
# of a polynomial of degree k
# use Lagrange interpolation to calculate its value when the independent variable equals x
def evalPoly(x, y):
    if x >= 0 and x < len(y):
        return y[x]

    p = 1
    for i in range(len(y)):
        p *= x - i

    nume, deno = 0, 1
    for i in range(len(y)):
        a = y[i] * (p // (x - i))
        b = prod[i][len(y) - 1]
        nume = nume * b + deno * a
        deno *= b
    return nume // deno

# maximum recurse level
MAX_DEP = 4

# polys[i] is the point-value representation of f^{(i)}(x)
polys = []
polys.append([1])
# smPolys[i] is the point-value representation of F^{(i)}(x)
smPolys = []

for _ in range(MAX_DEP):
    prevLen = len(polys[-1])

    # F^{(i)}(x) is the prefix sum of f^{(i)}(x)
    sm = [0]
    for y in polys[-1][1:]:
        sm.append(sm[-1] + y)
    sm.append(sm[-1] + evalPoly(prevLen, polys[-1]))
    smPolys.append(sm)

    # f^{(i + 1)}(x) = F^{(i)}(x * (x + 1) // 2 - 1)
    sq = []
    for x in range(0, prevLen * 2 + 1):
        sq.append(evalPoly(x * (x + 1) // 2 - 1, sm))
    polys.append(sq)

# ======== Pre-process: the first few values of P and Q ========

# at the maximum recurse level, n < MAX_LEN
MAX_LEN = 610

P = [0]
t = 1
while len(P) <= MAX_LEN:
    for _ in range(t + 1):
        P.append(t)
    t += 1

Q = [0, 1]
for i in range(2, MAX_LEN):
    Q.append(Q[-1] + Q[P[i]])

# ======== Pre-process: the value of g(d, n) where d <= MAX_DEP and n < MAX_LEN ========

# S[d][n] = g(d, n)
S = []
for i in range(MAX_DEP + 1):
    S.append([0])
    for j in range(1, MAX_LEN):
        S[-1].append(S[-1][-1] + evalPoly(j, polys[i]) * Q[P[j]])

# ======== Test cases starts from here ========

# if P(n) = p, then (p + 3) * p // 2 >= n and p is as small as possible
# we calculate the value of p by solving the quadratic equation
# because we use integer sqrt and division, we need to check a few larger values
def calcP(n):
    p = (isqrt(8 * n + 9) - 3) // 2
    while p * (p + 3) // 2 < n:
        p += 1
    return p

def g(d, n):
    if n < MAX_LEN:
        return S[d][n]
    return evalPoly(n, smPolys[d]) * g(0, calcP(n)) - g(d + 1, calcP(n))

tcase = int(input())
for _ in range(tcase):
    n = int(input())
    print(g(0, n))
```

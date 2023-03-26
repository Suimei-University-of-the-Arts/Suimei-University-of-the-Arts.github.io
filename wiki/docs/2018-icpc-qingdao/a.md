---
title: A - Sequence and Sequence
date: 2023-03-15
---

# A - Sequence and Sequence

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/373 (0.0%)</td>
</tr>
</table>

## 题解

由于 $n$ 很大，我们需要首先尝试减小 $n$ 的范围。注意到 $P(i)$ 只有 $\mathcal{O}(\sqrt{n})$ 个不同的值，且只有 $\mathcal{O}(\sqrt{n})$ 个 $i$ 满足 $P_i - P_{i - 1} \ne 0$。如果我们能用 $(Q(P(i)) - Q(P(i - 1)))$ 的形式表示 $Q(n)$，就能把 $n$ 的范围降到 $\mathcal{O}(\sqrt{n})$。

方便起见，我们定义 $Q(0) = P(0) = 0$。

首先，根据 $Q$ 的定义容易发现

$$
Q(n) = \sum\limits_{i = 1}^n Q(P(i))
$$

为了弄出 $(Q(P(i)) - Q(P(i - 1)))$ 的形式，我们使用一种称为 [分部求和法](https://en.wikipedia.org/wiki/Summation_by_parts) 的技巧（也称阿贝尔变换）。引入一个常数多项式 $f^{(0)}(x) = 1$，则

$$
Q(n) = \sum\limits_{i = 1}^n f^{(0)}(i) \times Q(P(i))
$$

令 $F^{(0)}(x) = \sum\limits_{i = 1}^x f^{(0)}(i)$，则

$$
Q(n) = \sum\limits_{i = 1}^n (F^{(0)}(i) - F^{(0)}(i - 1)) \times Q(P(i))
$$

利用分部求和法，把 $F^{(0)}(i)$ 相同的项提出来，得到

$$
Q(n) = F^{(0)}(n) \times Q(P(n)) - \sum\limits_{i = 1}^n F^{(0)}(i - 1) \times (Q(P(i)) - Q(P(i - 1)))
$$

我们想要的 $(Q(P(i)) - Q(P(i - 1)))$ 出现了！根据 $P(i)$ 的取值，大部分项都可以消去，有

$$
\begin{matrix}
& \sum\limits_{i = 1}^n F^{(0)}(i - 1) \times (Q(P(i)) - Q(P(i - 1))) \\
 = & \sum\limits_{i = 1}^{P(n)} F^{(0)}(\frac{i(i + 1)}{2} - 1) \times (Q(i) - Q(i - 1)) \\
 = & \sum\limits_{i = 1}^{P(n)} F^{(0)}(\frac{i(i + 1)}{2} - 1) \times Q(P(i))
\end{matrix}
$$

令多项式 $f^{(1)}(x) = F^{(0)}(\frac{x(x + 1)}{2} - 1)$，令函数 $g(d, n) = \sum\limits_{i = 1}^n f^{(d)}(i) \times Q(P(i))$，则

$$
Q(n) = g(0, n) = F^{(0)}(n) \times g(0, P(n)) - g(1, P(n))
$$

可以看到，我们把问题 $g(0, n)$ 变成了两个更小的问题 $g(0, P(n))$ 和 $g(1, P(n))$，每个小问题都是 $\mathcal{O}(\sqrt{n})$ 规模的。令 $f^{(d)}(x) = F^{(d - 1)}(\frac{x(x + 1)}{2} - 1)$，$F^{(d)}(x) = \sum\limits_{i = 1}^x f^{(d)}(i)$，不难得到通项公式

$$
g(d, n) = F^{(d)}(n) \times g(0, P(n)) - g(d + 1, P(n))
$$

当问题规模变得足够小时（本题的数据范围中，$d = 4$ 时，$n \le 605$，已经很小了），我们就可以直接算出答案。

多项式的值可以通过 [拉格朗日插值法](https://oi-wiki.org/math/poly/lagrange/) 求出。注意到每递归一层，多项式的次数将会加 $1$ 再乘 $2$。取最深递归层数 $D = 4$，则多项式次数将为 $K = 30$，$n$ 的最大值将为 $N = 605$。通过适当的预处理（见参考代码），可以将预处理的时间复杂度做到 $\mathcal{O}(K^2 + DK + DN)$，单个 case 的时间复杂度做到 $\mathcal{O}(2^{D + 1} K)$（高精度运算视为常数）。

## 参考代码

```python linenums="1"
from math import isqrt

# ======== 预处理：多项式 f 和 F 的点值表示 ========

# 多项式最大次数
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

# 给 k 次多项式的点值表示 (0, y[0]), (1, y[1]), ..., (k, y[k])
# 利用拉格朗日插值法，求自变量为 x 时多项式的值
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

# 最大递归深度
MAX_DEP = 4

# polys[i] 是 f^{(i)}(x) 的点值表示
polys = []
polys.append([1])
# smPolys[i] 是 F^{(i)}(x) 的点值表示
smPolys = []

for _ in range(MAX_DEP):
    prevLen = len(polys[-1])

    # F^{(i)}(x) 是 f^{(i)}(x) 的前缀和
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

# ======== 预处理：P 和 Q 小范围的值 ========

# 最大递归深度时，n < MAX_LEN
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

# ======== 预处理：g(d, n) 在 d <= MAX_DEP，n < MAX_LEN 时的值 ========

# S[d][n] = g(d, n)
S = []
for i in range(MAX_DEP + 1):
    S.append([0])
    for j in range(1, MAX_LEN):
        S[-1].append(S[-1][-1] + evalPoly(j, polys[i]) * Q[P[j]])

# ======== 正式计算 ========

# 若 P(n) = p，则 (p + 3) * p // 2 >= n 且 p 最小
# 通过解二次方程算出来，因为开根号和除法都下取整了，要往后检查几个数
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

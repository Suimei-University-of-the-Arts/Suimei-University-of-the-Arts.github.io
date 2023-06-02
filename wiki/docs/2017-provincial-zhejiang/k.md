---
title: K - Final Defense Line
date: 2023-05-28
---

# K - Final Defense Line

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2017 浙江省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/295 (0.0%)</td>
</tr>
</table>

## 题解

本题题意可以转化如下：给定三个圆 $C_0(x_0, y_0, r_0)$，$C_1(x_1, y_1, r_1)$，$C_2(x_2, y_2, r_2)$，求有几个圆与它们同时相切，并求答案圆的最小半径。$r_i > 0$ 表示要求答案圆与 $C_i$ 内切，且答案圆半径更大；$r_i < 0$ 表示要求答案圆与 $C_i$ 外切。

这就是著名的 [阿波罗尼奥斯问题](https://en.wikipedia.org/wiki/Problem_of_Apollonius)。这里介绍一种代数解法。

设答案圆为 $C(x, y, r)$，限制 $r \ge \max(r_0, r_1, r_2)$，我们要求的就是以下三元二次方程组的解。

$$
(x - x_0)^2 + (y - y_0)^2 - (r - r_0)^2 = 0
$$

$$
(x - x_1)^2 + (y - y_1)^2 - (r - r_1)^2 = 0
$$

$$
(x - x_2)^2 + (y - y_2)^2 - (r - r_2)^2 = 0
$$

用 $A$ 表示 $(x_0, y_0)$，$B$ 表示 $(x_1, y_1)$。不失一般性地，我们把坐标轴原点移动到 $(x_0, y_0)$ 处，然后把 $x$ 轴正方向旋转到向量 $\overrightarrow{AB}$ 的方向，答案的半径不会改变。这样，方程组简化为：


$$
x^2 + y^2 - (r - r_0)^2 = 0 \tag{1}
$$

$$
(x - x_1)^2 + y^2 - (r - r_1)^2 = 0 \tag{2}
$$

$$
(x - x_2)^2 + (y - y_2)^2 - (r - r_2)^2 = 0 \tag{3}
$$

$(2) - (1)$ 得

$$
-2x_1 \cdot x + 2(r_1 - r_0) \cdot r + (x_1^2 - r_1^2 + r_0^2) = 0 \tag{4}
$$

$(3) - (1)$ 得

$$
-2x_2 \cdot x - 2y_2 \cdot y + 2(r_2 - r_0) \cdot r + (x_2^2 + y_2^2 - r_2^2 + r_0^2) = 0 \tag{5}
$$

把 $(4)$ 看作 $a_1 \cdot x + c_1 \cdot r + d_1 = 0$，把 $(5)$ 看作 $a_2 \cdot x + b_2 \cdot y + c_2 \cdot r + d_2 = 0$，得

$$
x = \frac{-d_1 - c_1 \cdot r}{a_1} \tag{6}
$$

这一步要求 $a_1 \ne 0$。因为题目保证三个圆心不在同一位置，因此 $a_1 = -2x_1 \ne 0$ 是肯定的。

$$
y = \frac{a_2d_1 - a_1d_2 + (a_2c_1 - a_1c_2) \cdot r}{a_1b_2} \tag{7}
$$

这一步要求 $a_1 \ne 0$ 且 $b_2 \ne 0$。但 $b_2 = -2y_2 = 0$ 题目没有任何限制，完全是有可能的，因此需要分类讨论。

### 三个圆心共线的情况

若 $y_2 = 0$（即三个圆心共线），方程 $(5)$ 中唯一与未知数 $y$ 有关的项 $-2y_2 \cdot y$ 被直接消去。此时方程 $(4)$ 和 $(5)$ 形成了关于 $x$ 和 $r$ 的二元一次方程组。简化后得到关于 $r$ 的一次方程：

$$
\left(\frac{2(r_1 - r_0)}{x_1} - \frac{2(r_2 - r_0)}{x_2}\right) \cdot r + \left( \frac{x_1^2 - r_1^2 + r_0^2}{x_1} - \frac{x_2^2 - r_2^2 + r_0^2}{x_2} \right) = 0
$$

解出该一次方程即可，注意首先特判一次项系数是否为 $0$ 来判断方程是否无解，以及是否有无数组解。解出 $r$ 后，根据式 $(6)$ 就能算出唯一对应的 $x$。

由式 $(1)$ 得 $y^2 = (r - r_0)^2 - x^2$，因此还需要判断等号右边是正是负还是零，来判断 $y$ 有几个解。

### 三个圆心不共线的情况

若 $y_2 \ne 0$（即三个圆心不共线），此时式 $(6)$ 和 $(7)$ 才有意义。将式 $(6)$ 看作 $x = p_1 + q_1 \cdot r$，将式 $(7)$ 看作 $y = p_2 + q_2 \cdot r$，将它们代回式 $(1)$，得到关于 $r$ 的二次方程：

$$
(q_1^2 + q_2^2 - 1) \cdot r^2 + 2(p_1q_1 + p_2q_2 + r_0) \cdot r + (p_1^2 + p_2^2 - r_0^2) = 0
$$

解出该二次方程即可，注意特判是否所有系数均为 $0$ 看它是否有无数组解，以及二次项系数是否为 $0$ 看它是否实际上是一个一次方程。每个 $r$ 根据式 $(6)$ 和 $(7)$ 都能算出唯一对应的 $x$ 和 $y$。

单组数据复杂度 $\mathcal{O}(1)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define EPS (1e-9)
using namespace std;
typedef long double ldb;

int X[3], Y[3], R[3];

int sgn(long double x) {
    if (x < -EPS) return -1;
    else if (x > EPS) return 1;
    else return 0;
}

// 将 x 轴旋转到向量 (xb, yb) 上，求出 (x, y) 旋转后对应的坐标
void rotate(ldb xb, ldb yb, ldb &x, ldb &y) {
    ldb d = sqrt(xb * xb + yb * yb);
    ldb xx = xb / d * x + yb / d * y;
    ldb yy = xb / d * y - yb / d * x;
    x = xx; y = yy;
}

void solve() {
    for (int i = 0; i < 3; i++) scanf("%d%d%d", &X[i], &Y[i], &R[i]);
    // 将 (x0, y0) 移到坐标原点
    ldb x1 = X[1] - X[0], y1 = Y[1] - Y[0];
    ldb x2 = X[2] - X[0], y2 = Y[2] - Y[0];
    ldb r0 = R[0], r1 = R[1], r2 = R[2];
    // 限制 r >= max(r0, r1, r2)
    ldb lim = max({(ldb) 0, r0, r1, r2});

    // 将 x 轴旋转到向量 (x1, y1) 上
    rotate(x1, y1, x2, y2);
    rotate(x1, y1, x1, y1);
    assert(sgn(y1) == 0);

    if (sgn(y2) == 0) {
        // 三个圆心共线
        ldb a = 2 * (r1 - r0) / x1 - 2 * (r2 - r0) / x2;
        ldb b = x1 + (r0 * r0 - r1 * r1) / x1 - x2 - (r0 * r0 - r2 * r2) / x2;
        if (sgn(a) == 0) {
            // 一次方程的一次项为 0，特判无解以及无数组解
            if (sgn(b) == 0) printf("-1\n");
            else printf("0\n");
        } else {
            // 一次方程的一次项不为 0，正常解方程
            ldb rs = -b / a;
            if (sgn(rs - lim) < 0) printf("0\n");
            else {
                // 计算 y^2 的值
                ldb xs = 2 * (r1 - r0) * rs + x1 * x1 - r1 * r1 + r0 * r0;
                xs /= 2 * x1;
                ldb ys2 = (rs - r0) * (rs - r0) - xs * xs;
                if (sgn(ys2) < 0) printf("0\n");
                else if (sgn(ys2) == 0) printf("1 %.12Lf\n", rs);
                else printf("2 %.12Lf\n", rs);
            }
        }
    } else {
        // 三个圆心不共线
        ldb a1 = -2 * x1;
        ldb c1 = 2 * (r1 - r0);
        ldb d1 = x1 * x1 - r1 * r1 + r0 * r0;
        ldb a2 = -2 * x2;
        ldb b2 = -2 * y2;
        ldb c2 = 2 * (r2 - r0);
        ldb d2 = x2 * x2 + y2 * y2 - r2 * r2 + r0 * r0;
        
        ldb p1 = -d1 / a1;
        ldb q1 = -c1 / a1;
        ldb p2 = (a2 * d1 - a1 * d2) / (a1 * b2);
        ldb q2 = (a2 * c1 - a1 * c2) / (a1 * b2);

        ldb a = q1 * q1 + q2 * q2 - 1;
        ldb b = (p1 * q1 + p2 * q2 + r0) * 2;
        ldb c = p1 * p1 + p2 * p2 - r0 * r0;

        // 二次方程所有系数都是 0，无数组解
        if (sgn(a) == 0 && sgn(b) == 0 && sgn(c) == 0) printf("-1\n");
        else if (sgn(a) == 0) {
            // 二次项为 0，实际上是一次方程
            if (sgn(b) == 0) printf("0\n");
            else {
                ldb rs = -c / b;
                if (sgn(rs - lim) < 0) printf("0\n");
                else printf("1 %.12Lf\n", rs);
            }
        } else {
            // 判别式法，解普通的二次方程
            ldb delta = b * b - 4 * a * c;
            if (sgn(delta) < 0) printf("0\n");
            else if (sgn(delta) == 0) {
                ldb rs = -b / (2 * a);
                if (sgn(rs - lim) < 0) printf("0\n");
                else printf("1 %.12Lf\n", rs);
            } else {
                ldb rs1 = (-b - sqrt(delta)) / (2 * a);
                ldb rs2 = (-b + sqrt(delta)) / (2 * a);
                if (rs1 > rs2) swap(rs1, rs2);
                if (sgn(rs1 - rs2) == 0) rs1 = -1;
                if (sgn(rs2 - lim) < 0) printf("0\n");
                else if (sgn(rs1 - lim) < 0) printf("1 %.12Lf\n", rs2);
                else printf("2 %.12Lf\n", rs1);
            }
        }
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

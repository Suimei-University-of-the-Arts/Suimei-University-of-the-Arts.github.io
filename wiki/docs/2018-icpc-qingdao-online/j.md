---
title: J - Press the Button
date: 2023-09-01
---

# J - Press the Button

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2018 ICPC 亚洲区域赛青岛站网络赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>576/1550 (37.2%)</td>
</tr>
</table>

## 题解

设 $l = \text{lcm}(a, c)$，显然每 $l$ 秒的按键情况都是一样的。$l$ 秒内 BaoBao 将会按键 $\frac{c}{\text{gcd}(a, c)}$ 次（每次按 $b$ 下），DreamGrid 将会按键 $\frac{a}{\text{gcd}(a, c)}$ 次（每次按 $d$ 下），因此直接模拟的复杂度是 $\mathcal{O}(a + c)$。

* 若 $t < l$，直接模拟每次按键。
* 若 $t \ge l$，通过直接模拟，计算 $[0, l - 1]$ 这个时间段计数器增加的数值 $x$，以及第 $l$ 秒开始时 LED 是否还亮着（如果亮着，记 $w = 1$，否则记 $w = 0$）。之后再通过直接模拟，算出最后 $(t \bmod l)$ 秒计数器增加的数值 $y$，则答案为 $(x + w) \times \lfloor \frac{t}{l} \rfloor + y$。

复杂度仍然为 $\mathcal{O}(a + c)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;
typedef pair<long long, bool> plb;

int a, b, c, d;
long long v, t;

// 直接模拟按键情况，
// 返回 [0, t] 这个时间段计数器增加的数值，
// 以及第 (t + 1) 秒开始时 LED 是否亮着
plb gao(long long t) {
    // cnt：计数器的值
    // tim：LED 最后亮到哪一秒
    long long cnt = 0, tim = -1;
    // now：现在的时间
    // x：BaoBao 下一次按键的时间
    // y：DreamGrid 下一次按键的时间
    long long now = 0, x = 0, y = 0;
    while (now <= t) {
        // BaoBao 按键
        if (now == x) {
            cnt += b - (now > tim ? 1 : 0);
            tim = now + v;
            x += a;
        }
        // DreamGrid 按键
        if (now == y) {
            cnt += d - (now > tim ? 1 : 0);
            tim = now + v;
            y += c;
        }
        // 前进到下一个按键的时刻
        now = min(x, y);
    }
    return plb(cnt, tim > t);
}

void solve() {
    scanf("%d%d%d%d%lld%lld", &a, &b, &c, &d, &v, &t);
    long long l = 1LL * a / gcd(a, c) * c;
    if (t < l) printf("%lld\n", gao(t).first);
    else {
        plb p1 = gao(l - 1);
        plb p2 = gao(t % l);
        printf("%lld\n", (p1.first + (p1.second ? 1 : 0)) * (t / l) + p2.first);
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

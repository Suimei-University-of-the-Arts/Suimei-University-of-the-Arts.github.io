---
title: J - X 等于 Y
date: 2023-05-14
---

# J - X 等于 Y

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 广东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>9/295 (3.1%)</td>
</tr>
</table>

## 题解

当序列长度为 $1$ 时，要求 $x = y$，此时 $a = b = 2$ 即可。

当序列长度为 $2$ 时，设最高位为 $t$，有 $t \le \sqrt{x}$ 且 $t \le \sqrt{y}$（否则如果 $t > \sqrt{x}$，因为 $t < a$，$x \ge ta > x$ 矛盾）。有以下式子：

* $1 \le t < a$，$1 \le t < b$：高位不能超过进制基数。
* $0 \le x - ta < a$，$0 \le y - tb < b$：低位不能超过进制基数。
* $x - ta = y - tb$：低位也要一样。
* $2 \le a \le A$，$2 \le b \le B$：题目要求。

利用第三条等式，把所有 $b$ 代换成 $b = \frac{y - x}{t} + a$，就能得到 $a$ 的范围。因为 $b$ 也要是整数，所以 $(y - x) \bmod t = 0$ 的 $t$ 才能检测。这种情况的复杂度为 $\mathcal{O}(\sqrt{x})$。

当序列长度大于等于 $3$ 时，$a \le \sqrt{x}$，$b \le \sqrt{y}$，计算每种 $a$ 和每种 $b$ 的答案，看是否有一样的即可。可以用哈希表记录，但是常数比较大，也可以用双指针的方式判断。这种情况的复杂度为 $\mathcal{O}(\sqrt{x} \times \log x)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
using namespace std;

long long x, y, A, B;

long long ceil(long long a, long long b) {
    return (a + b - 1) / b;
}

// 把 x 的 a 进制表示当成一个 b 进制数
long long gao(long long a, long long b) {
    long long ret = 0;
    for (long long t = x, p = 1; t; t /= a, p *= b) {
        // 注意！t % a >= b 是有可能的，在调用函数的地方检查
        ret += p * (t % a);
        // 超过 y 就退出，防止溢出
        if (ret > y) break;
    }
    return ret;
}

// 检查 x 的 a 进制和 y 的 b 进制表示是否相等
bool check(long long a, long long b) {
    long long xx = x, yy = y;
    while (xx && yy) {
        if (xx % a != yy % b) return false;
        xx /= a; yy /= b;
    }
    return xx == yy;
}

void solve() {
    scanf("%lld%lld%lld%lld", &x, &y, &A, &B);
    
    // 序列长度为 1 的情况
    if (x == y) { printf("YES\n2 2\n"); return; }

    // 序列长度为 2 的情况
    for (long long t = 1; t * t <= max(x, y); t++) if ((y - x) % t == 0) {
        long long L = 2, R = A;
        L = max(L, ceil(2 * t + x - y, t));
        L = max(L, x / (t + 1) + 1);
        L = max(L, t + 1);
        L = max(L, ((t + 1) * x - y) / (t * (t + 1)) + 1);
        L = max(L, (t * t + x - y) / t + 1);
        R = min(R, (t * B + x - y) / t);
        R = min(R, x / t);
        if (L <= R) { printf("YES\n%lld %lld\n", L, (t * L - x + y) / t); return; }
    }

    // 序列长度为 3 的情况，用双指针判断
    for (long long a = 2, b = 2; a * a <= x && a <= A; a++) {
        // 把 x 的 a 进制表示当成一个 b 进制数，如果这个数不够 y 说明 b 进制不够大
        while (gao(a, b) < y && b * b <= y && b <= B) b++;
        if (b * b > y || b > B) break;
        // 必须检查两种表示是否真的相等，因为 gao 函数中，x 的 a 进制表示里的某一位可能大于等于 b
        if (gao(a, b) == y && check(a, b)) { printf("YES\n%lld %lld\n", a, b); return; }
    }

    printf("NO\n");
}
```

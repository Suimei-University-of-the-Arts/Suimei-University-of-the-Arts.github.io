---
title: B - Flipping Game
date: 2023-07-14
---

# B - Flipping Game

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2019 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>34/307 (11.1%)</td>
</tr>
</table>

## 题解

不失一般性地，假设每一盏灯的目标状态都是熄灭（如果 $t$ 不是全 $0$ 字符串，则将 $s$ 和 $t$ 分别异或原来的 $t$ 即可）。

维护 $f(i, j)$ 表示进行 $i$ 轮操作后，还有 $j$ 盏灯是亮的方案数。我们枚举接下来熄灭 $x$ 盏灯（也就是说还要点亮 $(m - x)$ 盏灯），则转移方程为

$$
f(i + 1, j - x + (m - x)) \stackrel{+}{\longleftarrow} f(i, j) \times \binom{j}{x} \times \binom{n - j}{m - x}
$$

其中 $\binom{a}{b}$ 是 $a$ 盏灯里选 $b$ 盏的方案数，也就是组合数。初值就是 $f(0, c) = 1$，其中 $c$ 是一开始有几盏灯亮着，也就是 $s$ 和 $t$ 里有几个字符不同。答案就是 $f(k, 0)$。

复杂度 $\mathcal{O}(kn^2)$。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 100
#define MAXK 100
#define MOD 998244353
using namespace std;
typedef pair<int, int> pii;

int n, K, m;
char s[MAXN + 10], t[MAXN + 10];

long long f[MAXK + 10][MAXN + 10], C[MAXN + 10][MAXN + 10];

void addMod(long long &x, long long y) { x = (x + y) % MOD; }

void solve() {
    scanf("%d%d%d%s%s", &n, &K, &m, s + 1, t + 1);
    // 计算 s 和 t 有几个字符不同
    int cnt = 0;
    for (int i = 1; i <= n; i++) if (s[i] != t[i]) cnt++;

    // dp
    for (int i = 0; i <= K; i++) for (int j = 0; j <= n; j++) f[i][j] = 0;
    f[0][cnt] = 1;
    for (int i = 0; i < K; i++) for (int j = 0; j <= n; j++) {
        int jj = n - j;
        for (int x = 0; x <= j && x <= m; x++) {
            int y = m - x;
            if (jj < y) continue;
            addMod(f[i + 1][j - x + y], f[i][j] * C[j][x] % MOD * C[jj][y] % MOD);
        }
    }
    printf("%lld\n", f[K][0]);
}

int main() {
    // 预处理组合数
    for (int i = 0; i <= MAXN; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }

    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

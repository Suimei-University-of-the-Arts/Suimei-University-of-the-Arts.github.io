---
title: I - Perfect Palindrome
date: 2022-12-16
---

# I - Perfect Palindrome

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2022 ICPC 亚洲区域赛南京站</td>
</tr>
<tr>
<td><b>在线练习</b></td><td>暂无</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>464/465 (99.8%)</td>
</tr>
<tr>
<td><b>提交通过率</b></td><td>464/576 (80.6%)</td>
</tr>
</table>

## 题解

$f(A, d)$ 是回文串，说明 $a_d = a_{(d + n - 1) \bmod n}$。因此若 $A$ 是完美回文，说明 $a_0 = a_1 = \cdots = a_{n - 1}$。

因此枚举最终将 $A$ 统一成哪个字符 $c$，我们需要将所有非 $c$ 的字符都变成 $c$。答案就是 $\min(n - cnt_c)$，其中 $cnt_c$ 是字符 $c$ 在 $A$ 中出现的次数。

复杂度 $\mathcal{O}(n + |\Sigma|)$，其中 $|\Sigma|$ 是字符集大小。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
using namespace std;

int n, ans;
char s[MAXN + 10];

int cnt[26];

void solve() {
    scanf("%s", s + 1); n = strlen(s + 1);
    memset(cnt, 0, sizeof(cnt));
    for (int i = 1; i <= n; i++) cnt[s[i] - 'a']++;

    ans = n;
    for (int i = 0; i < 26; i++) ans = min(ans, n - cnt[i]);
    printf("%d\n", ans);
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

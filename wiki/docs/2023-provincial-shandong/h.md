---
title: H - 请小心 2
date: 2023-07-01
---

# H - 请小心 2

## 基本信息

<table>
<tr>
<td><b>题目出处</b></td><td>2023 山东省大学生程序设计竞赛</td>
</tr>
<tr>
<td><b>队伍通过率</b></td><td>0/276 (0.0%)</td>
</tr>
</table>

## 题解

（请先参考 [简要题解](tutorial-sketch-zh.pdf)）

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 5000
#define MOD 998244353
#define MAXINV 30
#define MAXPOW 5
using namespace std;
typedef long long ll;
typedef pair<ll, ll> pll;

int n;
ll W, H;
pll P[MAXN + 10];

ll inv[MAXINV + 10];

void power(ll a, ll *res) {
    res[0] = 1; res[1] = a;
    for (int i = 2; i <= MAXPOW; i++) res[i] = res[i - 1] * a % MOD;
}

ll sum2(ll *n) { return (inv[3] * n[3] + inv[2] * n[2] + inv[6] * n[1]) % MOD; }
ll sum3(ll *n) { return (inv[4] * n[4] + inv[2] * n[3] + inv[4] * n[2]) % MOD; }
ll sum4(ll *n) { return ((inv[5] * n[5] + inv[2] * n[4] + inv[3] * n[3] - inv[30] * n[1]) % MOD + MOD) % MOD; }

ll calc(ll l, ll r, ll *kx, ll *ky) {
    l--; l = max(0LL, l);
    ll pl[MAXPOW + 1]; power(l, pl);
    ll pr[MAXPOW + 1]; power(r, pr);

    ll coef2 = kx[0] * ky[0] % MOD, coef3 = (kx[0] * ky[1] + kx[1] * ky[0]) % MOD, coef4 = kx[1] * ky[1] % MOD;
    return ((
        (sum2(pr) - sum2(pl)) * coef2 +
        (sum3(pr) - sum3(pl)) * coef3 +
        (sum4(pr) - sum4(pl)) * coef4
    ) % MOD + MOD) % MOD;
}

void coef(ll len, ll l, ll r, ll mx, ll *k) {
    if (len <= r && len <= mx - l) k[0] = l - r + 1, k[1] = 1;
    else if (len > r && len > mx - l) k[0] = mx + 1, k[1] = -1;
    else if (len > r) k[0] = l + 1, k[1] = 0;
    else k[0] = mx - r + 1, k[1] = 0;
}

ll gao(ll xl, ll xr, ll yl, ll yr) {
    assert(xl <= xr);
    if (yl > yr) swap(yl, yr);
    xl--; xr++; yl--; yr++;
    if (xl < 0 || xr > W || yl < 0 || yr > H) return 0;

    ll mn = max(xr - xl, yr - yl);
    ll mx = min(W, H);
    if (mn > mx) return 0;
    vector<ll> vec = {
        mn, mx + 1,
        xr + 1, W - xl + 1,
        yr + 1, H - yl + 1,
    };
    sort(vec.begin(), vec.end());

    ll ret = 0;
    for (int i = 0; i + 1 < vec.size(); i++) {
        if (vec[i] < mn) continue;
        if (vec[i] > mx) break;
        if (vec[i] == vec[i + 1]) continue;
        ll kx[2], ky[2];
        coef(vec[i], xl, xr, W, kx);
        coef(vec[i], yl, yr, H, ky);
        ret = (ret + calc(vec[i], vec[i + 1] - 1, kx, ky)) % MOD;
    }
    return ret;
}

int main() {
    inv[1] = 1;
    for (int i = 2; i <= MAXINV; i++) inv[i] = (MOD - MOD / i) * inv[MOD % i] % MOD;

    scanf("%lld%lld%d", &W, &H, &n);
    for (int i = 1; i <= n; i++) scanf("%lld%lld", &P[i].first, &P[i].second);
    sort(P + 1, P + n + 1);

    ll kx[2] = { W + 1, -1 }, ky[2] = { H + 1, -1 };
    ll ans = calc(1, min(W, H), kx, ky);

    for (int i = 1; i <= n; i++) {
        ans = (ans - gao(P[i].first, P[i].first, P[i].second, P[i].second) + MOD) % MOD;
        ll U = 1e18, D = -1e18;
        for (int j = i + 1; j <= n; j++) {
            if (P[j].second >= U || P[j].second <= D) continue;
            ans = ((ans
                + gao(P[i].first, P[j].first, P[i].second, P[j].second)
                - gao(P[i].first, P[j].first, min(P[i].second, P[j].second), U)
                - gao(P[i].first, P[j].first, D, max(P[i].second, P[j].second))
                + gao(P[i].first, P[j].first, D, U)
            ) % MOD + MOD) % MOD;
            if (P[j].second >= P[i].second) U = P[j].second;
            if (P[j].second <= P[i].second) D = P[j].second;
        }
    }
    printf("%lld\n", ans);
    return 0;
}
```

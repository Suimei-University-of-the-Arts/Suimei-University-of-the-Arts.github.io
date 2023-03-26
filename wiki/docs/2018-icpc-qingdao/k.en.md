---
title: K - Airdrop
date: 2023-02-05
---

# K - Airdrop

## Basic Information

<table>
<tr>
<td><b>Contest</b></td><td>The 2018 ICPC Asia Qingdao Regional Contest</td>
</tr>
<tr>
<td><b>Team AC Ratio</b></td><td>10/373 (2.7%)</td>
</tr>
</table>

## Tutorial

Let's build a new coordinate system, where the original point is on the position of the airdrop. We now study which players may collide with each other.

* Because all players move at the same time, only the players whose distance to the original point are the same may collide with each other.
* Because all players will first move vertically then horizontally, only the players on the same side of the $y$-axis may collide with each other.
* According to the problem statement, players on the $y$-axis will never collide.

We now consider when the original point moves gradually to the right, what changes will happen to the number of colliding players. According to the second point stated above, we can consider the players on different sides of the $y$-axis separately. We now only consider the players on the left side of the $y$-axis.

* If no player falls from the $y$-axis to the left, because the distances of all players to the original point will be increased by the same value, the number of colliding players will not change.
* If there are some players falling from the $y$-axis to the left, let's look at all players whose distance to the original point equals $d$.
    - There are at most $2$ players falling from the $y$-axis, their $y$-coordinates are $d$ and $-d$.
    - Because all colliding players will be eliminated, there will be at most $1$ surviving player who is already on the left of $y$-axis.
    - To produce a surviving player with distance $d$, the total number of these two types of players must be exactly $1$.

From the above statements we can see that, we are only interested in the $x$ values of the players and the $x$ values that differ by exactly $1$ from them. Only these $x$ values will change the number of colliding players. Thus we need to calculate at most $3n$ times.

Implement the procedure above, we can calculate $L(x)$ and $R(x)$, indicating that when the $x$-coordinate of the airdrop is $x$, how many players on its left (or right) will survive. The total number of surviving players is $L(x) + R(x)$, plus the number of players whose $x$-coordinate equals $x$.

The time completixy is $\mathcal{O}(n\log n)$, because we need to sort and deduplicate the coordinates. The core algorithm runs in $\mathcal{O}(n)$.

## Solution

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN ((int) 1e5)
#define MAXX ((int) 1e5)
using namespace std;

int n, X[MAXN + 10], Y[MAXN + 10];

// mp[x][y]: the number of players (at most 2) whose x-coordinate equals x and y-coordinate equals y
unordered_map<int, int> mp[MAXX + 10];
int L[MAXN * 3 + 10], R[MAXN * 3 + 10];

void gao(vector<int> &keys, int *f) {
    // which distances have surviving players
    unordered_set<int> live;
    int BIAS = 0;

    f[keys[0]] = 0;
    for (int i = 1; i < keys.size(); i++) {
        int x = keys[i], last = keys[i - 1];
        if (mp[last].size() > 0) {
            // there are players coming to the left of airdrop
            for (auto &p : mp[last]) {
                int y = p.first, cnt = p.second;
                // to produce a surviving player with this distance,
                // the total number of players of the two types must be 1,
                // otherwise all players will be eliminated
                if (live.count(y - BIAS) + cnt == 1) live.insert(y - BIAS);
                else live.erase(y - BIAS);
            }
        }
        // distances of all players to the original point are increased by the same value
        BIAS += abs(x - last);
        // record the number of surviving players when the x-coordinate of airdrop is x
        f[x] = live.size();
    }
}

void solve() {
    // adjust the coordinate system, so the airdrop will lie on the x-axis
    int Y0; scanf("%d%d", &n, &Y0);
    for (int i = 1; i <= n; i++) {
        scanf("%d%d", &X[i], &Y[i]);
        Y[i] -= Y0;
    }

    // extract the x values we are interested in
    vector<int> keys;
    for (int i = 1; i <= n; i++) {
        mp[X[i]][abs(Y[i])]++;
        for (int j = -1; j <= 1; j++) keys.push_back(X[i] + j);
    }

    // calculate the number of surviving players on the left of airdrop
    sort(keys.begin(), keys.end());
    keys.resize(unique(keys.begin(), keys.end()) - keys.begin());
    gao(keys, L);
    
    // calculate the number of surviving players on the right of airdrop
    reverse(keys.begin(), keys.end());
    gao(keys, R);
    
    // calculate the final answer
    int mn = n + 1, mx = 0;
    for (int x : keys) {
        // surviving players from the left and right
        int t = L[x] + R[x];
        // plus the number of players whose x-coordinate is the same with airdrop
        if (mp[x].size() > 0) for (auto &p : mp[x]) t += p.second;
        mn = min(mn, t);
        mx = max(mx, t);
    }
    printf("%d %d\n", mn, mx);

    // multiple test cases, clean up global variables
    for (int x : keys) mp[x].clear(), L[x] = R[x] = 0;
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

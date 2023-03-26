---
title: H - Mirror
date: 2023-03-24
---

# H - Mirror

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

我们首先处理一些特殊情况。

* 若起点和终点的连线没有任何障碍，则答案就是 $(2m - 1) \times l$，其中 $l$ 是起点和终点连线的距离。
* 否则，若 $m = 1$，则只需要考虑从起点出发，绕过障碍物和镜子到达终点的最短路，无需考虑路线是否能看到起点或终点。因此，只需考虑由起点、终点、障碍物顶点、镜子端点这七个点构成的图，计算从起点到终点的最短路即可。
* 否则 $m > 1$。这要求存在一条从起点到终点的路线，使得路线上任何一点都能看见起点和终点。若起点或终点中，任意一点位于镜子左侧。不妨假设是终点位于镜子左侧，那么将无法从终点看到起点，因为此时起点和终点的连线存在障碍，且终点无法看到镜面。因此该情况无解。

排除上述特殊情况后，剩下的情况为：$m > 1$，起点和终点的连线存在障碍，且两点都位于镜子右侧。

此时，最优答案将分为三个部分：

* 一开始，将第一块石头从起点搬到终点，路径上只要能随时看到起点即可。
* 中途，路径上需要随时能看到起点和终点，这条路径将重复走 $(2m - 3)$ 次。
* 最后，将最后一块石头从起点搬到终点，路径上只要能随时看到终点即可。

因此，我们需要考虑，穿过哪些直线，起点和终点的可见性可能发生改变。以这些直线的交点为关键点建图，计算任意两点之间连线的长度，是否存在障碍物，以及连线上每个点是否能看见起点和终点。最后计算在特定可见性要求的情况下，从起点到终点的最短路。

导致可见性发生改变的直线有：

1. 起点 / 终点和障碍物顶点的连线。
2. 起点 / 终点和镜面端点的连线。
3. 起点 / 终点的镜像和镜面端点的连线。
4. 起点 / 终点的镜像和障碍物顶点的连线。
5. 起点 / 终点的镜像和障碍物顶点镜像的连线。

![h-editorial.png](h-editorial.png)

您可能认为，障碍物的边界以及镜面也会让可见性发生改变，为什么不考虑它们？因为一条合法的路径不能穿过障碍物的边界或镜面，因此没有考虑的必要。

计算两点之间连线上每个点是否总能看到起点和终点时，由于连线可能穿过多条改变可见性的直线，因此需要求出连线与每条直线的交点，并检查相邻交点的中点的可见性。因为可见性直线围起来的区域是凸的，这样做是正确的。

本题还有一个优化常数的技巧：事实上，最优路线总是位于镜面右侧，因此可以把镜面直线上，以及镜面左侧的所有点都排除，只考虑镜面右侧的点。我们简单计算一下点的数量，注意到第 $1$ 类直线和第 $5$ 类直线对称，第 $2$ 类直线和第 $3$ 类直线对称。因此，这几类直线在镜面右侧的交点有 $5 \times (15 + 10 + 5) \div 2 = 75$ 个。就算第 $4$ 类直线和其它直线的交点都在镜面右侧，那么需要考虑的点最多也只有 $75 + 3 \times 18 + 3 \times 10 = 159$ 个，再加上起点和终点就是 $161$ 个。

因此总体时间复杂度 $\mathcal{O}(n^2t + n^2\log n)$，其中 $n = 161$ 是要考虑的点的数量，$t = 26$ 是导致可见性发生改变的直线数量。

## 参考代码

```c++ linenums="1"
#include <bits/stdc++.h>
#define MAXN 200
using namespace std;
typedef long double db;

const db eps = 1e-12;
const db inf = 1.0 / 0.0;

int sgn(db x) {
    if (x > eps) return 1;
    else if (x < -eps) return -1;
    else return 0;
}

struct Point {
    db x, y;

    Point() {}
    Point(db x, db y): x(x), y(y) {}

    db len() const {
        return sqrt(x * x + y * y);
    }

    Point operator +(const Point &p) const {
        return Point(x + p.x, y + p.y);
    }

    Point operator -(const Point &p) const {
        return Point(x - p.x, y - p.y);
    }

    Point operator *(db k) const {
        return Point(x * k, y * k);
    }

    Point operator /(db k) const {
        return Point(x / k, y / k);
    }

    db operator *(const Point &p) const {
        return x * p.y - p.x * y;
    }

    db operator ^(const Point &p) const {
        return x * p.x + y * p.y;
    }

    bool operator <(const Point &p) const {
        return sgn(x - p.x) < 0 || (sgn(x - p.x) == 0 && sgn(y - p.y) < 0);
    }

    bool operator ==(const Point &p) const {
        return sgn(x - p.x) == 0 && sgn(y - p.y) == 0;
    }
};

struct Line {
    Point s, t;

    Line() {}
    Line(Point s, Point t): s(s), t(t) {}

    db intersectRatio(const Line &l) const {
        if (sgn((t - s) * (l.t - l.s)) == 0) return inf;
        db u = (l.s - s) * (l.t - l.s), v = (t - s) * (l.t - l.s);
        return u / v;
    }

    vector<Point> operator &(const Line &l) const {
        db r = intersectRatio(l);
        if (r == inf) return {};
        return {s + (t - s) * r};
    }

    Point reflect(const Point &p) const {
        db u = ((p - s) ^ (t - s)), v = (t - s).len();
        return (s + (t - s) * (u / v / v)) * 2 - p;
    }

    db len() const {
        return sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y));
    }
};

int X;
// s, t：起点和终点
// m1, m2：镜子的端点
// a[i]：障碍物的顶点
Point s, t, m1, m2, a[3];
// poly[i]：障碍物构成的多边形的一条边
Line poly[3];

// ms, mt：起点和终点的镜像
// ma[i]：障碍物的顶点的镜像
Point ms, mt, ma[3];
// mr：镜子
// mpoly[i]：障碍物构成的多边形的一条边的镜像
Line mr, mpoly[3];

// 求线段 l1 和 l2 是否相交
// strict 表示是否严格相交（strict == true 则在端点相交不算相交）
bool segmentIntersect(Line &l1, Line &l2, bool strict) {
    db r1 = l1.intersectRatio(l2), r2 = l2.intersectRatio(l1);
    if (strict) return sgn(r1) > 0 && sgn(r1 - 1) < 0 && sgn(r2) > 0 && sgn(r2 - 1) < 0;
    else return sgn(r1) >= 0 && sgn(r1 - 1) <= 0 && sgn(r2) >= 0 && sgn(r2 - 1) <= 0;
}

// 检查线段 l 是否与障碍物或镜子严格相交
bool check(Line &l) {
    for (int i = 0; i < 3; i++) if (segmentIntersect(l, poly[i], true)) return false;
    if (segmentIntersect(l, mr, true)) return false;
    return true;
}

int n;
vector<int> e[MAXN], msk[MAXN];
vector<db> v[MAXN];
db dis[MAXN];

db dijkstra(int MSK) {
    for (int i = 0; i < n; i++) dis[i] = inf;
    typedef pair<db, int> pdi;
    priority_queue<pdi> pq;
    pq.push(pdi(0, 0));
    while (!pq.empty()) {
        pdi p = pq.top(); pq.pop();
        int sn = p.second;
        if (dis[sn] < inf) continue;
        dis[sn] = -p.first;
        for (int i = 0; i < e[sn].size(); i++) {
            int fn = e[sn][i];
            if ((MSK & msk[sn][i]) == MSK)
                pq.push(pdi(-dis[sn] - v[sn][i], fn));
        }
    }
    return dis[1];
}

// 特殊情况 2 的构图
// 只要考虑起点终点，障碍物顶点和镜子端点之间的最短路即可，无需考虑可见性
void build1() {
    vector<Point> keys;
    keys.push_back(s); keys.push_back(t);
    keys.push_back(m1); keys.push_back(m2);
    for (int i = 0; i < 3; i++) keys.push_back(a[i]);

    n = keys.size();
    for (int i = 0; i < n; i++) e[i].clear(), v[i].clear(), msk[i].clear();
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) {
        Line l(keys[i], keys[j]);
        if (!check(l)) continue;
        e[i].push_back(j); v[i].push_back(l.len()); msk[i].push_back(0);
        e[j].push_back(i); v[j].push_back(l.len()); msk[j].push_back(0);
    }
}

// 点 p 是否能直接看到，或通过镜子看到点 goal
bool visible(Point &p, Point &goal) {
    // 直接看到
    Line l = Line(p, goal);
    if (check(l)) return true;
    // 通过镜子看到
    l = Line(p, mr.reflect(goal));
    // 如果要通过镜子看到，那么 p 与 goal 镜像的连线不能与障碍物，或障碍物的镜像相交
    if (!segmentIntersect(l, mr, false)) return false;
    for (int i = 0; i < 3; i++) {
        if (segmentIntersect(l, poly[i], true)) return false;
        if (segmentIntersect(l, mpoly[i], true)) return false;
    }
    return true;
}

// 线段 l 上的每个点是否都能看见点 goal
// border：导致可见性发生改变的直线
int visible(Line &l, Point &goal, vector<Line> &border) {
    typedef pair<db, Point> pdp;
    vector<pdp> vec;
    vec.push_back(pdp(0, l.s));
    vec.push_back(pdp(1, l.t));
    // 求线段 l 与 border 的交点
    for (Line &b : border) {
        db r = l.intersectRatio(b);
        if (sgn(r) > 0 && sgn(r - 1) < 0) vec.push_back(pdp(r, l.s + (l.t - l.s) * r));
    }
    sort(vec.begin(), vec.end());

    // 检查经过的每个区域的可见性
    // 由于每个区域都是凸的，因此只要看相邻交点的中点的可见性即可
    for (int i = 1; i < vec.size(); i++) {
        Point p = (vec[i - 1].second + vec[i].second) / 2;
        if (!visible(p, goal)) return 0;
    }
    return 1;
}

// 一般情况的构图
// 考虑导致可见性改变的直线的交点，以它们为节点构图
void build2() {
    // 求出可能改变可见性的直线
    vector<Line> border;

    border.push_back(Line(s, m1)); border.push_back(Line(s, m2));
    border.push_back(Line(t, m1)); border.push_back(Line(t, m2));
    for (int i = 0; i < 3; i++) {
        border.push_back(Line(s, a[i]));
        border.push_back(Line(t, a[i]));
    }

    border.push_back(Line(ms, m1)); border.push_back(Line(ms, m2));
    border.push_back(Line(mt, m1)); border.push_back(Line(mt, m2));
    for (int i = 0; i < 3; i++) {
        border.push_back(Line(ms, a[i])); border.push_back(Line(ms, ma[i]));
        border.push_back(Line(mt, a[i])); border.push_back(Line(mt, ma[i]));
    }

    // 计算 border 的交点，只留下镜子右边的点
    vector<Point> keys;
    keys.push_back(s); keys.push_back(t);
    for (Line &l1 : border) for (Line &l2 : border) for (Point &p : l1 &l2)
        if (sgn((m2 - m1) * (p - m1)) < 0 && find(keys.begin(), keys.end(), p) == keys.end())
            keys.push_back(p);
    
    n = keys.size();
    for (int i = 0; i < n; i++) e[i].clear(), v[i].clear(), msk[i].clear();
    // 判断顶点之间连线的可行性以及可见性
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) {
        Line l = Line(keys[i], keys[j]);
        // 连线与障碍物相撞，则无法直接从 keys[i] 走到 keys[j]
        if (!check(l)) continue;
        // 求连线上每个点是否能看到起点以及终点
        int tmp = visible(l, s, border) + visible(l, t, border) * 2;
        e[i].push_back(j); v[i].push_back(l.len()); msk[i].push_back(tmp);
        e[j].push_back(i); v[j].push_back(l.len()); msk[j].push_back(tmp);
    }
}

void solve() {
    scanf("%d", &X);
    scanf("%Lf%Lf%Lf%Lf", &s.x, &s.y, &t.x, &t.y);
    scanf("%Lf%Lf%Lf%Lf", &m1.x, &m1.y, &m2.x, &m2.y);
    for (int i = 0; i < 3; i++) scanf("%Lf%Lf", &a[i].x, &a[i].y);

    mr = Line(m1, m2);
    ms = mr.reflect(s); mt = mr.reflect(t);
    for (int i = 0; i < 3; i++) ma[i] = mr.reflect(a[i]);
    for (int i = 0; i < 3; i++) {
        poly[i] = Line(a[i], a[(i + 1) % 3]);
        mpoly[i] = Line(ma[i], ma[(i + 1) % 3]);
    }

    Line st(s, t);
    if (check(st)) {
        // 特殊情况 1：s 和 t 的连线没有障碍
        printf("%.12Lf\n", st.len() * (2 * X - 1));
    } else if (X == 1) {
        // 特殊情况 2：只有一个石头
        build1();
        db ans = dijkstra(0);
        if (ans < inf) printf("%.12Lf\n", ans);
        else printf("-1\n");
    } else if (sgn((m2 - m1) * (s - m1)) < 0 && sgn((m2 - m1) * (t - m1)) < 0) {
        // 一般情况：石头多于一个，s 和 t 的连线有障碍，起点终点都在镜子右边
        build2();
        db ans = dijkstra(1) + dijkstra(3) * (2 * X - 3) + dijkstra(2);
        if (ans < inf) printf("%.12Lf\n", ans);
        else printf("-1\n");
    } else {
        // 特殊情况 3：石头多于一个，s 和 t 的连线有障碍，起点终点至少一个在镜子左边
        printf("-1\n");
    }
}

int main() {
    int tcase; scanf("%d", &tcase);
    while (tcase--) solve();
    return 0;
}
```

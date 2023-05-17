---
title: 2018 ICPC 亚洲区域赛青岛站
date: 2023-03-25
---

# 2018 ICPC 亚洲区域赛青岛站

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2018/11/04</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a></td>
</tr>

<tr>
<td><b>竞赛榜单</b></td><td><a href="https://web.archive.org/web/20181205151843/http://acm.upc.edu.cn/rank/">Web Archive</a> | <a href="https://codeforces.com/gym/104270/standings">Codeforces Gym</a>（含 UCUP 参赛者）</td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://codeforces.com/gym/104270">Codeforces Gym</a> | <a href="https://qoj.ac/contest/1187">QOJ</a></td>
</tr>
</table>

## 统计数据

```vegalite
{
  "title": {
    "text": "题目通过数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"id": "A", "ac": 0, "type": "正式赛队"},
      {"id": "A", "ac": 0, "type": "非正式赛队"},
      {"id": "B", "ac": 0, "type": "正式赛队"},
      {"id": "B", "ac": 2, "type": "非正式赛队"},
      {"id": "C", "ac": 333, "type": "正式赛队"},
      {"id": "C", "ac": 18, "type": "非正式赛队"},
      {"id": "D", "ac": 88, "type": "正式赛队"},
      {"id": "D", "ac": 11, "type": "非正式赛队"},
      {"id": "E", "ac": 109, "type": "正式赛队"},
      {"id": "E", "ac": 12, "type": "非正式赛队"},
      {"id": "F", "ac": 105, "type": "正式赛队"},
      {"id": "F", "ac": 9, "type": "非正式赛队"},
      {"id": "G", "ac": 5, "type": "正式赛队"},
      {"id": "G", "ac": 3, "type": "非正式赛队"},
      {"id": "H", "ac": 0, "type": "正式赛队"},
      {"id": "H", "ac": 0, "type": "非正式赛队"},
      {"id": "I", "ac": 2, "type": "正式赛队"},
      {"id": "I", "ac": 4, "type": "非正式赛队"},
      {"id": "J", "ac": 332, "type": "正式赛队"},
      {"id": "J", "ac": 18, "type": "非正式赛队"},
      {"id": "K", "ac": 7, "type": "正式赛队"},
      {"id": "K", "ac": 3, "type": "非正式赛队"},
      {"id": "L", "ac": 17, "type": "正式赛队"},
      {"id": "L", "ac": 6, "type": "非正式赛队"},
      {"id": "M", "ac": 353, "type": "正式赛队"},
      {"id": "M", "ac": 19, "type": "非正式赛队"}
    ]
  },
  "transform": [{
    "calculate": "if(datum.type === 'off', 0, 1)",
    "as": "typeOrder"
  }],
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "题目编号", "titleFontSize": 14},
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "通过数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "队伍类型"
          },
          {
            "field": "ac",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "通过数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

```vegalite
{
  "title": {
    "text": "队伍过题数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"ac": 0, "cnt": 1, "type": "正式赛队"},
      {"ac": 0, "cnt": 0, "type": "非正式赛队"},
      {"ac": 1, "cnt": 9, "type": "正式赛队"},
      {"ac": 1, "cnt": 1, "type": "非正式赛队"},
      {"ac": 2, "cnt": 23, "type": "正式赛队"},
      {"ac": 2, "cnt": 0, "type": "非正式赛队"},
      {"ac": 3, "cnt": 146, "type": "正式赛队"},
      {"ac": 3, "cnt": 5, "type": "非正式赛队"},
      {"ac": 4, "cnt": 83, "type": "正式赛队"},
      {"ac": 4, "cnt": 2, "type": "非正式赛队"},
      {"ac": 5, "cnt": 50, "type": "正式赛队"},
      {"ac": 5, "cnt": 2, "type": "非正式赛队"},
      {"ac": 6, "cnt": 28, "type": "正式赛队"},
      {"ac": 6, "cnt": 4, "type": "非正式赛队"},
      {"ac": 7, "cnt": 7, "type": "正式赛队"},
      {"ac": 7, "cnt": 0, "type": "非正式赛队"},
      {"ac": 8, "cnt": 4, "type": "正式赛队"},
      {"ac": 8, "cnt": 2, "type": "非正式赛队"},
      {"ac": 9, "cnt": 3, "type": "正式赛队"},
      {"ac": 9, "cnt": 1, "type": "非正式赛队"},
      {"ac": 10, "cnt": 0, "type": "正式赛队"},
      {"ac": 10, "cnt": 0, "type": "非正式赛队"},
      {"ac": 11, "cnt": 0, "type": "正式赛队"},
      {"ac": 11, "cnt": 2, "type": "非正式赛队"},
      {"ac": 12, "cnt": 0, "type": "正式赛队"},
      {"ac": 12, "cnt": 0, "type": "非正式赛队"},
      {"ac": 13, "cnt": 0, "type": "正式赛队"},
      {"ac": 13, "cnt": 0, "type": "非正式赛队"}
    ]
  },
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "过题数", "titleFontSize": 14}
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "队伍数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "类型"
          },
          {
            "field": "cnt",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "队伍数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal"
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

## 题解列表

* [A - Sequence and Sequence](a.md)
* [B - Kawa Exam](b.md)
* [C - Flippy Sequence](c.md)
* [D - Magic Multiplication](d.md)
* [E - Plants vs. Zombies](e.md)
* [F - Tournament](f.md)
* [G - Repair the Artwork](g.md)
* [H - Mirror](h.md)
* [I - Soldier Game](i.md)
* [J - Books](j.md)
* [K - Airdrop](k.md)
* [L - Sub-cycle Graph](l.md)
* [M - Function and Function](m.md)

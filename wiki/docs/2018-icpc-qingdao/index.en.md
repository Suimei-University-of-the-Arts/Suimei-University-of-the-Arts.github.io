---
title: Contest Info
date: 2023-03-25
---

# The 2018 ICPC Asia Qingdao Regional Contest

## Basic Information

<table>
<tr>
<td><b>Contest Date</b></td><td>2018/11/04</td>
</tr>
<tr>
<td><b>Problemset</b></td><td><a href="contest-en.pdf">English</a></td>
</tr>
<tr>
<td><b>Ranklist</b></td><td><a href="https://web.archive.org/web/20181205151843/http://acm.upc.edu.cn/rank/">Web Archive</a> | <a href="https://codeforces.com/gym/104270/standings">Codeforces Gym</a> (including UCUP participants)</td>
</tr>
<tr>
<td><b>Online Practice</b></td><td><a href="https://codeforces.com/gym/104270">Codeforces Gym</a> | <a href="https://qoj.ac/contest/1187">QOJ</a></td>
</tr>
</table>

## Statistics

```vegalite
{
  "title": {
    "text": "Number of Accepted Teams Per Problem",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"id": "A", "ac": 0, "type": "Official"},
      {"id": "A", "ac": 0, "type": "Unofficial"},
      {"id": "B", "ac": 0, "type": "Official"},
      {"id": "B", "ac": 2, "type": "Unofficial"},
      {"id": "C", "ac": 333, "type": "Official"},
      {"id": "C", "ac": 18, "type": "Unofficial"},
      {"id": "D", "ac": 88, "type": "Official"},
      {"id": "D", "ac": 11, "type": "Unofficial"},
      {"id": "E", "ac": 109, "type": "Official"},
      {"id": "E", "ac": 12, "type": "Unofficial"},
      {"id": "F", "ac": 105, "type": "Official"},
      {"id": "F", "ac": 9, "type": "Unofficial"},
      {"id": "G", "ac": 5, "type": "Official"},
      {"id": "G", "ac": 3, "type": "Unofficial"},
      {"id": "H", "ac": 0, "type": "Official"},
      {"id": "H", "ac": 0, "type": "Unofficial"},
      {"id": "I", "ac": 2, "type": "Official"},
      {"id": "I", "ac": 4, "type": "Unofficial"},
      {"id": "J", "ac": 332, "type": "Official"},
      {"id": "J", "ac": 18, "type": "Unofficial"},
      {"id": "K", "ac": 7, "type": "Official"},
      {"id": "K", "ac": 3, "type": "Unofficial"},
      {"id": "L", "ac": 17, "type": "Official"},
      {"id": "L", "ac": 6, "type": "Unofficial"},
      {"id": "M", "ac": 353, "type": "Official"},
      {"id": "M", "ac": 19, "type": "Unofficial"}
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
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "Problem", "titleFontSize": 14},
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "# of Accepted Teams", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "Team Type"
          },
          {
            "field": "ac",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "# of Accepted Teams"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["Official", "Unofficial"],
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
    "text": "Number of Accepted Problems Per Team",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"ac": 0, "cnt": 1, "type": "Official"},
      {"ac": 0, "cnt": 0, "type": "Unofficial"},
      {"ac": 1, "cnt": 9, "type": "Official"},
      {"ac": 1, "cnt": 1, "type": "Unofficial"},
      {"ac": 2, "cnt": 23, "type": "Official"},
      {"ac": 2, "cnt": 0, "type": "Unofficial"},
      {"ac": 3, "cnt": 146, "type": "Official"},
      {"ac": 3, "cnt": 5, "type": "Unofficial"},
      {"ac": 4, "cnt": 83, "type": "Official"},
      {"ac": 4, "cnt": 2, "type": "Unofficial"},
      {"ac": 5, "cnt": 50, "type": "Official"},
      {"ac": 5, "cnt": 2, "type": "Unofficial"},
      {"ac": 6, "cnt": 28, "type": "Official"},
      {"ac": 6, "cnt": 4, "type": "Unofficial"},
      {"ac": 7, "cnt": 7, "type": "Official"},
      {"ac": 7, "cnt": 0, "type": "Unofficial"},
      {"ac": 8, "cnt": 4, "type": "Official"},
      {"ac": 8, "cnt": 2, "type": "Unofficial"},
      {"ac": 9, "cnt": 3, "type": "Official"},
      {"ac": 9, "cnt": 1, "type": "Unofficial"},
      {"ac": 10, "cnt": 0, "type": "Official"},
      {"ac": 10, "cnt": 0, "type": "Unofficial"},
      {"ac": 11, "cnt": 0, "type": "Official"},
      {"ac": 11, "cnt": 2, "type": "Unofficial"},
      {"ac": 12, "cnt": 0, "type": "Official"},
      {"ac": 12, "cnt": 0, "type": "Unofficial"},
      {"ac": 13, "cnt": 0, "type": "Official"},
      {"ac": 13, "cnt": 0, "type": "Unofficial"}
    ]
  },
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "# of Accepted Problems", "titleFontSize": 14}
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "# of Teams", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "Team Type"
          },
          {
            "field": "cnt",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "# of Teams"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["Official", "Unofficial"],
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

## Tutorials

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

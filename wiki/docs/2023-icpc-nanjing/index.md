---
title: 2023 ICPC 亚洲区域赛南京站
date: 2023-11-07
---

# 2023 ICPC 亚洲区域赛南京站

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2023/11/05</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a> | <a href="contest-zh.pdf">中文</a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td><a href="board">SUA Board</a> | <a href="https://board.xcpcio.com/icpc/48th/nanjing">XCPC Board</a></td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://codeforces.com/gym/104821">Codeforces Gym</a> | <a href="https://qoj.ac/contest/1435">QOJ</a></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/627281278">zhihu</a></td>
</tr>
<tr>
<td><b>现场直播</b></td><td><a href="https://www.bilibili.com/video/BV1VQ4y1n7vC/">bilibili</a></td>
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
      {"id": "A", "ac": 142, "type": "正式赛队"},
      {"id": "A", "ac": 10, "type": "非正式赛队"},
      {"id": "B", "ac": 0, "type": "正式赛队"},
      {"id": "B", "ac": 0, "type": "非正式赛队"},
      {"id": "C", "ac": 234, "type": "正式赛队"},
      {"id": "C", "ac": 11, "type": "非正式赛队"},
      {"id": "D", "ac": 14, "type": "正式赛队"},
      {"id": "D", "ac": 5, "type": "非正式赛队"},
      {"id": "E", "ac": 4, "type": "正式赛队"},
      {"id": "E", "ac": 1, "type": "非正式赛队"},
      {"id": "F", "ac": 243, "type": "正式赛队"},
      {"id": "F", "ac": 10, "type": "非正式赛队"},
      {"id": "G", "ac": 186, "type": "正式赛队"},
      {"id": "G", "ac": 9, "type": "非正式赛队"},
      {"id": "H", "ac": 0, "type": "正式赛队"},
      {"id": "H", "ac": 1, "type": "非正式赛队"},
      {"id": "I", "ac": 331, "type": "正式赛队"},
      {"id": "I", "ac": 11, "type": "非正式赛队"},
      {"id": "J", "ac": 0, "type": "正式赛队"},
      {"id": "J", "ac": 0, "type": "非正式赛队"},
      {"id": "K", "ac": 6, "type": "正式赛队"},
      {"id": "K", "ac": 3, "type": "非正式赛队"},
      {"id": "L", "ac": 116, "type": "正式赛队"},
      {"id": "L", "ac": 9, "type": "非正式赛队"},
      {"id": "M", "ac": 61, "type": "正式赛队"},
      {"id": "M", "ac": 8, "type": "非正式赛队"}
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
      {"ac": 0, "cnt": 0, "type": "正式赛队"},
      {"ac": 0, "cnt": 0, "type": "非正式赛队"},
      {"ac": 1, "cnt": 53, "type": "正式赛队"},
      {"ac": 1, "cnt": 0, "type": "非正式赛队"},
      {"ac": 2, "cnt": 40, "type": "正式赛队"},
      {"ac": 2, "cnt": 1, "type": "非正式赛队"},
      {"ac": 3, "cnt": 54, "type": "正式赛队"},
      {"ac": 3, "cnt": 0, "type": "非正式赛队"},
      {"ac": 4, "cnt": 49, "type": "正式赛队"},
      {"ac": 4, "cnt": 1, "type": "非正式赛队"},
      {"ac": 5, "cnt": 37, "type": "正式赛队"},
      {"ac": 5, "cnt": 0, "type": "非正式赛队"},
      {"ac": 6, "cnt": 49, "type": "正式赛队"},
      {"ac": 6, "cnt": 1, "type": "非正式赛队"},
      {"ac": 7, "cnt": 32, "type": "正式赛队"},
      {"ac": 7, "cnt": 2, "type": "非正式赛队"},
      {"ac": 8, "cnt": 12, "type": "正式赛队"},
      {"ac": 8, "cnt": 3, "type": "非正式赛队"},
      {"ac": 9, "cnt": 3, "type": "正式赛队"},
      {"ac": 9, "cnt": 2, "type": "非正式赛队"},
      {"ac": 10, "cnt": 2, "type": "正式赛队"},
      {"ac": 10, "cnt": 1, "type": "非正式赛队"},
      {"ac": 11, "cnt": 0, "type": "正式赛队"},
      {"ac": 11, "cnt": 0, "type": "非正式赛队"},
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

### 简要题解

* [pdf](tutorial-sketch-zh.pdf)

### 详细题解

<!--
* [A - 停停，昨日请不要再重现](a.md)
* [B - 索道](b.md)
* [C - 智巧灵蕈大竞逐](c.md)
* [D - 聊天程序](d.md)
* [E - 树的染色](e.md)
* [F - 三角形](f.md)
* [G - 邪恶铭刻](g.md)
* [H - 工厂重现](h.md)
* [I - 完美回文](i.md)
* [J - 完美匹配](j.md)
* [K - 堆里的 NaN](k.md)
* [L - 命题作文](l.md)
* [M - 清空水箱](m.md)
-->

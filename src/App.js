import "./App.scss";

import { ResponsiveRadar } from "@nivo/radar";
import { useState } from "react";
let requestFlag = true;
let lastword = "";

const MyResponsiveRadar = ({ data /* see data tab */ }) => (
  <ResponsiveRadar
    data={data}
    keys={["score"]}
    indexBy="dimention"
    maxValue="auto"
    margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
    curve="catmullRomClosed"
    borderWidth={2}
    borderColor={{ from: "color", modifiers: [] }}
    gridLevels={3}
    gridShape="circular"
    gridLabelOffset={36}
    enableDots={true}
    dotSize={11}
    dotColor={{ from: "color", modifiers: [] }}
    dotBorderWidth={0}
    dotBorderColor={{ theme: "background" }}
    enableDotLabel={true}
    dotLabelYOffset={-12}
    colors={"#FFF"}
    fillOpacity={0.3}
    blendMode="normal"
    animate={true}
    motionConfig="wobbly"
    isInteractive={true}
    theme={{
      axis: {
        ticks: {
          text: {
            fill: "#DDD"
          }
        }
      },
      grid: {
        line: {
          stroke: "#AAA",
          strokeWidth: 2,
          strokeDasharray: "4 4"
        }
      },
      dots: {
        text: {
          fill: "#AAA"
        }
      }
    }}
  />
);

function App() {
  const initScore = [
    {
      dimention: "technology",
      score: 0
    },
    {
      dimention: "aesthetics",
      score: 0
    },
    {
      dimention: "experience",
      score: 0
    },
    {
      dimention: "future",
      score: 0
    },
    {
      dimention: "industry",
      score: 0
    },
    {
      dimention: "livelihood",
      score: 0
    }
  ];
  const [score, setScore] = useState(initScore);
  const handleKeyUp = e => {
    // console.log("🚀 ~ file: App.js ~ line 106 ~ App ~ e ", e);
    if (
      requestFlag &
      ((e.key === " ") |
        (e.key === "Enter") |
        (e.key === ".") |
        (e.key === ",") |
        (e.key === "?") |
        ((e.key === "Backspace") & (lastword === " ")))
    ) {
      fetch("https://39517605-1521484829896861.test.functioncompute.com/test2", {
        body: text,
        method: "POST",
        mode: "cors"
      })
        .then(data => {
          if (data.status === 200) {
            return data.json();
          }
          throw Error;
        })
        .then(data => {
          // document.write(JSON.stringify(data));
          console.log(data);
          const tmp = data.mean;
          const chartData = [
            {
              dimention: "technology",
              score: tmp.technology.toFixed(2)
            },
            {
              dimention: "aesthetics",
              score: tmp.aesthetics.toFixed(2)
            },
            {
              dimention: "experience",
              score: tmp.experience.toFixed(2)
            },
            {
              dimention: "future",
              score: tmp.future.toFixed(2)
            },
            {
              dimention: "industry",
              score: tmp.industry.toFixed(2)
            },
            {
              dimention: "livelihood",
              score: tmp.livelihood.toFixed(2)
            }
          ];
          setScore(chartData);
          requestFlag = false;
        });
    }
  };
  const [text, setText] = useState("");
  const handleTextChange = event => {
    if (event.target.value.length !== text.length) {
      lastword = text.substr(text.length - 1, 1);
      setText(
        event.target.value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g, "")
      );
      if (text.length < 15) {
        setScore(initScore);
        requestFlag = false;
      } else {
        requestFlag = true;
      }
    }
  };

  return (
    <div className="App container">
      <div className="data-canvas">
        <MyResponsiveRadar data={score}></MyResponsiveRadar>
      </div>
      <div className="input">
        <div className="input-box-bg">
          <textarea
            type="text"
            id="main-input-box"
            cols="25"
            rows="6"
            placeholder="Type your Description here"
            spellCheck="false"
            onChange={handleTextChange}
            value={text}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

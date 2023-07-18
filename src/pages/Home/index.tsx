import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterImg from "../../assets/img/04.png";
import { useNavigate } from "react-router-dom";
function color16() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color;
}
function formattingData(arr: any, group_key: any) {
  let map: any = {};
  let res: any = [];

  for (let i = 0; i < arr.length; i++) {
    let ai = arr[i];
    if (!map[ai[group_key]]) {
      map[ai[group_key]] = [ai];
    } else {
      map[ai[group_key]].push(ai);
    }
  }
  Object.keys(map).forEach((key) => {
    res.push({
      [group_key]: key,
      list: map[key],
    });
  });

  return res;
}
function Home() {
  let userInfo = sessionStorage.getItem("userInfo");
  userInfo = userInfo ? JSON.parse(userInfo) : userInfo;
  console.log(userInfo, "userInfo");
  const [dataInfo, setDataInfo]: any = useState({});
  const [stage, setstage]: any = useState([]);
  const navigate = useNavigate();
  function setInfo(res: any) {
    setDataInfo(res.data);
    console.log(dataInfo, "dddd");
    const data = formattingData(res.data.data, "next_stage");
    setstage(data);
  }
  const url = "https://origins-files-staging.s3.us-east-2.amazonaws.com/files/";
  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "https://topaz.kinfolk.vc/api/v1/admin/company/fetch",
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlOWUyMTc4LTk0MDAtNDBhMC05YjM4LWY3NTI4MDNlOWI5NiIsImZpcnN0X25hbWUiOiJKYXkiLCJsYXN0X25hbWUiOiJGcmVlbWFuIiwiZW1haWwiOiJqYXlAa2luZm9say52YyIsIm5pY2tuYW1lIjoiSmF5IiwiaXNfc3VwZXJfYWRtaW4iOmZhbHNlLCJpYXQiOjE2ODk1MjEwMzAsImV4cCI6MTY4OTY5MzgzMH0.00b8HfW8VtRGNQATOuZ4DJMGNYMB6nslRGggg5ZzTRI",
          },
        }
      );
      setInfo(res);
    })();
  },);
  const list = [
    {
      text: "Approved Deals",
      num: "42",
    },
    {
      text: " Processing Deals",
      num: "50",
    },
    {
      text: " Rejected Deals",
      num: "3",
    },
  ];
  const handleClick = (value: any) => {
    console.log(value, "跳转页面");
    navigate("/detail", {
      state: { id: value.id },
    });
  };
  return (
    <div className="home-pages">
      <div className="home-top flex justify-between mt-16 items-center ">
        <div className="home-right">
          <h1>Dealflow</h1>
        </div>
        <div className="home-left  mr-8 hover:cursor-pointer">
          <img src={FilterImg} alt="" />
        </div>
      </div>
      <div className="home-middle">
        <div className="bar-wrap">
          <ul className="flex text-base ">
            {list.map((item, index) => {
              return (
                <li
                  key={item.text}
                  className={
                    index === 0
                      ? "text-lime-400 mr-4"
                      : index === 1
                      ? "text-yellow-400 mr-4"
                      : "text-rose-400 mr-4"
                  }
                >
                  <span>{item.text}</span>
                  <span
                    className={
                      index === 0
                        ? "bg-lime-100 "
                        : index === 1
                        ? "bg-yellow-100"
                        : "bg-rose-100  "
                    }
                  >
                    <span className="p-1">{item.num}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="list-box-wrap flex mt-4">
          {stage &&
            stage.map((item: any, index: any) => {
              return (
                <div
                  className="list-box mr-4 bg-zinc-100 p-4"
                  key={item.next_stage}
                >
                  <h2>{item.next_stage}</h2>
                  {item.list &&
                    item.list.map((child: any, index: number): any => {
                      return (
                        <div
                          className="curr-box hover:cursor-pointer shadow-md bg-white mb-4 relative"
                          key={child.id}
                          onClick={() => handleClick(child)}
                        >
                          <div
                            className="icon absolute right-0 text-sm"
                            style={{
                              background: color16(),
                              color: "white",
                              paddingLeft: "1em",
                              borderBottomLeftRadius: "24px",
                              width: "90px",
                              height: "20px",
                            }}
                          >
                            {child.stage_status}
                          </div>
                          <div className="bar-color flex pt-8 pl-2">
                            <img src={url + child.logo} alt="" />
                            <div className="flex flex-col text-xs pl-2">
                              <span>{child.company_name}</span>
                              <span className="text-gray-400">
                                Submitted {child.year_founded}
                              </span>
                            </div>
                          </div>
                          <div className="box-num mt-22 mt-4">
                            <div className="flex pb-3">
                              <div className="box-num-left bg-slate-100 ml-2 p-2 text-gray-300">
                                {child.business_model}
                              </div>
                              <div className="box-num-right bg-slate-100 ml-3 p-2  text-gray-300">
                                ${child.min_amount}to${child.max_amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Home;

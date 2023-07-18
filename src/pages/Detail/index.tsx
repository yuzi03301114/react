import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Addtolist from "../../assets//img/Addtolist.png";
import Add from "../../assets//img/Add.png";
import "./index.css";
function Detail() {
  const location = useLocation();
  console.log(location, "location");
  let userInfo: any = sessionStorage.getItem("userInfo");
  userInfo = userInfo ? JSON.parse(userInfo) : userInfo;
  const [company, setcompaney]: any = useState({});
  function setCompanyData(data: any) {
    setcompaney(data.data);
  }
  useEffect(() => {
    (async function () {
      const res: any = await axios.get(
        `https://topaz.kinfolk.vc/api/v1/admin/company/fetch/${location.state.id}`,
        {
          headers: {
            token: userInfo.data.token,
          },
        }
      );
      setCompanyData(res.data);
      console.log(res.data, "res");
    })();
  }, []);
  const url = "https://origins-files-staging.s3.us-east-2.amazonaws.com/files/";
  return (
    <div className="detail-pages">
      <div className="detail-top flex justify-between mt-16 items-center ">
        <div className="detail-right">
          <h1>Dealflow</h1>
        </div>
        <div className="detail-left  mr-8 hover:cursor-pointer flex">
          <img src={Addtolist} alt="" className="mr-2" />
          <img src={Add} alt="" />
        </div>
      </div>
      <div className="detail-top flex justify-between  items-center ">
        <div className="detail-right text-xs">
          <span className="text-xs text-slate-300">Dealflow </span>
          <span>{company.company_name}</span>
        </div>
      </div>
      <div className="detail-top flex justify-between  items-center mt-6">
        <div className="detail-right text-ms">
          <span className=" border-b-2 border-black mr-2 pb-2">
            General Info{" "}
          </span>
          <span className="text-slate-300">Risk Scorecard</span>
        </div>
      </div>
      <div className="detail-content flex  mt-8 flex-row">
        <div className="content-left flex flex-col justify-center self-start items-center ">
          <img src={url + company.logo} alt="" />
          <span className="mt-4">Risk Scorecard</span>
        </div>
        <div className="content-right ml-16  flex-wrap ">
          <div className="content-summary bg-zinc-200 p-4 text-xs">
            {company.company_summary}{" "}
          </div>
          <span className="flex ">
            <div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Founding Amount</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  ${company.min_amount} to ${company.max_amount}
                </div>
              </div>
              <div className="flex flex-col text-xs   mt-8">
                <span className="text-xs text-zinc-300">Industry</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.industry_type}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Business Model</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.business_model}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Year Founded</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.year_founded}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Funding Type</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.funding_type}
                </div>
              </div>
            </div>
            <div className="ml-20">
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">
                  Current Pipeline Stage
                </span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.stage_status}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">
                  Expected Date of Close
                </span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.year_founded}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Funding Round</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.funding_round}
                </div>
              </div>
              <div className="flex flex-col text-xs  mt-8">
                <span className="text-xs text-zinc-300">Location</span>
                <div className="description bg-zinc-200 leading-10 pl-4">
                  {company.address && company.address.city},
                  {company.address && company.address.country}
                </div>
              </div>
            </div>
          </span>

          <div className="flex flex-col text-xs mt-8">
            <span className="text-xs text-zinc-300">Website</span>
            <div className="description bg-zinc-200 leading-10 pl-4">
              {company.website}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;

import React, { useEffect, memo, Fragment, useState } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import SubHeader from "../../components/partials/dashboard/HeaderStyle/sub-header.js";
import { StatisticModel } from "../../models/dashboard.js";
import { currencyFormatter } from "../../helper.js";
import { Loading } from "../../components/common/loading.js";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);
  const [response, setResponse] = useState({});
  const [total, setTotal] = useState({});
  const [totalOrderChart, setTotalOrderChart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const { data: revenue, pagination } = response;
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("2023");
  const [perPage, setPerpage] = useState(10);
  const totalPage = Math.ceil(total / perPage); // dư 1 sp vân là 1 page
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    StatisticModel.getTotal()
      .then(({ data: { data: total } }) => {
        setTotal(total);
      })
      .finally(() => setIsLoading(false));
  }, []);
  const fetchList = (page, perPage, search = undefined) => {
    // lấy từ API
    // console.log("aaaa", customer);
    setIsLoading(true);
    StatisticModel.getRevenue({
      page, // Offset
      perPage, // limit,
      search,
    })
      .then(({ data }) => {
        if (!data) {
          return;
        }
        setResponse(data); // set data cho state respone
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    fetchList(page, perPage, searchText);
  }, [page]);
  useEffect(() => {
    //chạy khi page change khi set page/ text change/ filter
    setPage(1);
    fetchList(1, perPage, searchText);
  }, [searchText]);

  useEffect(() => {
    setIsLoadingChart(true);
    StatisticModel.getRevenueByYear(year)
      .then(({ data }) => {
        const totalOrderChart = data
          .map((item) => item.data.dataToMonth.totalOrder)
          .reduce((sum, item) => {
            return sum + item;
          }, 0);
        setTotalOrderChart(totalOrderChart);
        const categories = data.map((item) => "Tháng " + item.data.month);
        const series = [
          {
            name: "totalOff",
            data: data.map((item) => item.data.dataToMonth.totalOff),
          },
          {
            name: "totalWeb",
            data: data.map((item) => item.data.dataToMonth.totalWeb),
          },
          {
            name: "totalSendo",
            data: data.map((item) => item.data.dataToMonth.totalSendo),
          },
        ];

        const templateData = {
          options: {
            chart: {
              fontFamily:
                '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              toolbar: {
                show: false,
              },
              sparkline: {
                enabled: false,
              },
            },
            colors: colors,
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              show: true,
              labels: {
                show: true,
                minWidth: 19,
                maxWidth: 19,
                style: {
                  colors: "#8A92A6",
                },
                offsetX: -5,
              },
            },
            legend: {
              show: false,
            },
            xaxis: {
              labels: {
                minHeight: 22,
                maxHeight: 22,
                show: true,
                style: {
                  colors: "#8A92A6",
                },
              },
              lines: {
                show: false, //or just here to disable only x axis grids
              },
              categories,
            },
            grid: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 50, 80],
                colors: colors,
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          series,
        };

        setChartData(templateData);
      })
      .finally(() => {
        setIsLoadingChart(false);
      });
  }, [year]);
  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    const color5 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}danger`
    );
    const color6 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}success`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
      danger: color5.trim(),
      success: color6.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [
    variableColors.primary,
    variableColors.info,
    variableColors.danger,
  ];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });
  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: colors,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "total",
        data: [94, 80, 94, 80, 94, 80, 94],
      },
      {
        name: "pipline",
        data: [72, 60, 84, 60, 74, 60, 78],
      },
    ],
  };

  //chart2
  const chart2 = {
    options: {
      colors: colors,
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Apples", "Oranges"],
    },
    series: [55, 75],
  };
  const chart3 = {
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
        labels: {
          minHeight: 20,
          maxHeight: 20,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
    series: [
      {
        name: "Successful deals",
        data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
      },
      {
        name: "Failed deals",
        data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
      },
    ],
  };
  const {
    totalCancel,
    totalSuccess,
    totalOrder,
    totalOff,
    totalWeb,
    totalSendo,
  } = total;
  return (
    <Fragment>
      <div className="position-relative">
        <SubHeader />
      </div>
      <div className="conatiner-fluid content-inner mt-n5">
        <Row class="py-0">
          <Col md="12" lg="12">
            <Row className="row-cols-1">
              <div
                className="overflow-hidden d-slider1 "
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <Swiper
                  className="p-0 m-0 mb-2 list-inline "
                  slidesPerView={5}
                  spaceBetween={32}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                    1400: { slidesPerView: 3 },
                    1500: { slidesPerView: 4 },
                    1920: { slidesPerView: 4 },
                    2040: { slidesPerView: 7 },
                    2440: { slidesPerView: 8 },
                  }}
                >
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.success}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={50}
                          id="circle-progress-05"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.success}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Success Orders</p>
                          <h4 className="counter">
                            <CountUp
                              start={0}
                              end={totalSuccess}
                              duration={3}
                            />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.danger}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          Linecap="rounded"
                          strokewidth="4px"
                          value={(totalCancel / totalOrder) * 100}
                          style={{ width: 60, height: 60 }}
                          id="circle-progress-06"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.danger}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Cancel Order</p>
                          <h4 className="counter">
                            <CountUp start={0} end={totalCancel} duration={3} />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.primary}
                          width="60px"
                          height="60px"
                          Linecap="rounded"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          style={{ width: 60, height: 60 }}
                          value={100}
                          id="circle-progress-01"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.primary}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Total Orders</p>
                          <h4 className="counter">
                            <CountUp start={0} end={totalOrder} duration={3} />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.info}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={(totalOff / totalOrder) * 100}
                          id="circle-progress-02"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.info}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Offline Orders</p>
                          <h4 className="counter">
                            <CountUp start={0} end={totalOff} duration={3} />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.primary_light}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={(totalWeb / totalOrder) * 100}
                          id="circle-progress-03"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.primary_light}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Website Orders</p>
                          <h4 className="counter">
                            <CountUp start={0} end={totalWeb} duration={3} />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className=" card card-slide">
                    <div className="card-body">
                      <div className="progress-widget">
                        <Circularprogressbar
                          stroke={variableColors.warning}
                          width="60px"
                          height="60px"
                          trailstroke="#ddd"
                          strokewidth="4px"
                          Linecap="rounded"
                          style={{ width: 60, height: 60 }}
                          value={(totalSendo / totalOrder) * 100}
                          id="circle-progress-04"
                        >
                          <svg
                            class="icon-32"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill={variableColors.warning}
                            ></path>{" "}
                          </svg>
                        </Circularprogressbar>
                        <div className="progress-detail">
                          <p className="mb-2">Sendo Orders</p>
                          <h4 className="counter">
                            <CountUp start={0} end={totalSendo} duration={3} />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <div className="swiper-button swiper-button-next"></div>
                  <div className="swiper-button swiper-button-prev"></div>
                </Swiper>
              </div>
            </Row>
          </Col>
          <Col md="12">
            <Row>
              <Col md="12">
                <div className="card" data-aos="fade-up" data-aos-delay="800">
                  <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">
                        {isLoadingChart ? <Loading /> : totalOrderChart}
                      </h4>
                      <p className="mb-0">Đơn hàng</p>
                    </div>
                    <div className="d-flex align-items-center align-self-center">
                      <div className="d-flex align-items-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-gray">Đơn hàng trực tiếp</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center ms-3 text-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-gray">
                            Đơn hàng tại Website
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ms-3 text-danger">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="currentColor"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-2">
                          <span className="text-gray">Đơn hàng tại Sendo</span>
                        </div>
                      </div>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={Button}
                        variant="text-gray"
                        type="button"
                        id="dropdownMenuButtonSM"
                      >
                        {year}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setYear(2022)}>
                          2022
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setYear(2023)}>
                          2023
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="card-body">
                    {chartData && !isLoadingChart ? (
                      <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="area"
                        height="245"
                      />
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="12" lg="12">
            <div
              className="overflow-hidden card"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex-wrap card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="mb-2 card-title">Danh thu theo đơn hàng</h4>
                </div>
              </div>
              <div className="p-0 card-body">
                <div className="mt-4 table-responsive">
                  <table
                    id="basic-table"
                    className="table mb-0 table-striped"
                    role="grid"
                  >
                    <thead>
                      <tr>
                        <th>Mã đơn hàng</th>
                        <th>Thành tiền</th>
                        <th>Giảm giá</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenue?.map((item) => {
                        const { orderItems, voucher } = item;
                        const subTotal = orderItems
                          ?.map(
                            (orderItem) =>
                              orderItem.quantity *
                              orderItem.productPrice.exportPrice
                          )
                          .reduce((total, price) => total + price, 0);
                        const discount = voucher
                          ? voucher?.discount +
                            (voucher?.percent * subTotal) / 100
                          : 0;
                        const total = !discount
                          ? subTotal
                          : subTotal - discount;
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{currencyFormatter.format(subTotal)}</td>
                            <td>{currencyFormatter.format(discount)}</td>
                            <td>{currencyFormatter.format(total)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
});

export default Index;

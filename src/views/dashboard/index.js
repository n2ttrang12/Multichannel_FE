import React, {
  useEffect,
  memo,
  Fragment,
  useState,
  useReducer,
  useContext,
} from "react";
import {
  Row,
  Col,
  Dropdown,
  Button,
  Form,
  Popover,
  OverlayTrigger,
  Table,
  Card,
} from "react-bootstrap";
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
import welcom from "../../assets/images/dashboard/welcom.png";
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
import { createArrayFrom1ToN, currencyFormatter } from "../../helper.js";
import { Loading } from "../../components/common/loading.js";
import DateTimePicker from "react-datetime-picker";
import UserContext from "../../contexts/userContext.js";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);
  const [response, setResponse] = useState({});
  const { isStore } = useContext(UserContext);
  const [total, setTotal] = useState({});
  const [totalOrderChart, setTotalOrderChart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCircleChart, setIsLoadingCircleChart] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const { data: revenue, pagination } = response;
  const { revenue: totalAllOrder } = response;
  const totalCount = pagination?.total ?? 0;
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState();
  const [perPage, setPerpage] = useState(5);
  const totalPage = Math.ceil(totalCount / perPage); // dư 1 sp vân là 1 page
  const [chartData, setChartData] = useState(null);
  const [chartDataCircleStatus, setChartDataCircleStatus] = useState(null);
  const [chartDataCircleType, setChartDataCircleType] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    StatisticModel.getTotal()
      .then(({ data: { data: total } }) => {
        setTotal(total);
      })
      .finally(() => setIsLoading(false));
  }, []);
  const [filter, dispatchFilter] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_FROM_DATE":
          return {
            ...state,
            dateFrom: action.payload,
          };
        case "SET_TO_DATE":
          return {
            ...state,
            dateTo: action.payload,
          };
        case "RESET":
          return {
            dateFrom: "",
            dateTo: "",
          };
      }
    },
    {
      dateFrom: "",
      dateTo: "",
    }
  );
  const [revenueFilter, dispatchRevenueFilter] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_STATUS":
          return {
            ...state,
            status: action.payload,
          };
        case "SET_STATUS_PAYMENT":
          return {
            ...state,
            statusPayment: action.payload,
          };
        case "SET_TYPE":
          return {
            ...state,
            type: action.payload,
          };
        case "SET_FROM_DATE":
          return {
            ...state,
            dateFrom: action.payload,
          };
        case "SET_TO_DATE":
          return {
            ...state,
            dateTo: action.payload,
          };
        case "RESET":
          return {
            status: "",
            statusPayment: "",
            type: "",
            dateFrom: "",
            dateTo: "",
          };
      }
    },
    {
      status: "",
      statusPayment: "",
      type: "",
      dateFrom: "",
      dateTo: "",
    }
  );

  const fetchList = (page, perPage, search = undefined) => {
    setIsLoading(true);
    StatisticModel.getRevenue({
      page, // Offset
      perPage,
      revenueFilter,
    })
      .then(({ data }) => {
        if (!data) {
          return;
        }
        setResponse(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchList(page, perPage, searchText);
  }, [page]);
  useEffect(() => {
    setPage(1);
    fetchList(1, perPage, searchText);
  }, [revenueFilter]);

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

  useEffect(() => {
    setIsLoadingCircleChart(true);
    StatisticModel.getByFilter(filter)
      .then(({ data: { data } }) => {
        const colors = [variableColors.success, variableColors.danger];
        const templateDataStatus = {
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
                  name: {
                    show: true,
                  },

                  total: {
                    formatter: function () {
                      return data.totalOrder;
                    },
                    show: true,
                    label: "Tổng đơn",
                  },
                },
              },
            },
            labels: ["Thành công", "Thất bại"],
          },
          series: [
            parseInt((data.totalSuccess / data.totalOrder) * 100),
            parseInt((data.totalCancel / data.totalOrder) * 100),
          ],
          seriesData: [data.totalSuccess, data.totalCancel],
        };
        const color2 = [
          variableColors.info,
          variableColors.primary_light,
          variableColors.warning,
        ];
        const templateDataType = {
          colors: color2,
          options: {
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
                  name: {
                    show: true,
                  },

                  total: {
                    formatter: function () {
                      return data.totalOrder;
                    },
                    show: true,
                    label: "Tổng đơn",
                  },
                },
              },
            },
            labels: ["Sendo", "Website", "Cửa hàng"],
          },
          series: [
            parseInt((data.totalSendo / data.totalOrder) * 100),
            parseInt((data.totalWeb / data.totalOrder) * 100),
            parseInt((data.totalOff / data.totalOrder) * 100),
          ],
          seriesData: [data.totalSendo, data.totalWeb, data.totalOff],
        };
        setChartDataCircleStatus(templateDataStatus);
        setChartDataCircleType(templateDataType);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingCircleChart(false);
      });
  }, [filter]);
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
    series: [55, 75, 90],
  };
  const popover = (
    <Popover width={"500px"} id="popover-basic">
      <Popover.Header as="h3">Bộ lọc</Popover.Header>
      <Popover.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="validationDefault02">
            Kênh bán hàng
            <span className="text-danger"> {" *"}</span>
          </Form.Label>
          <Form.Select
            value={revenueFilter.type}
            onChange={(e) => {
              dispatchRevenueFilter({
                type: "SET_TYPE",
                payload: e.target.value,
              });
            }}
            id="validationDefault04"
            required
          >
            <option value={""}>Chọn kênh bán hàng</option>
            {["WEBSITE", "SENDO", "OFFLINE"].map((type) => {
              return <option value={type}>{type}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="validationDefault02">
            Trạng thái thanh toán
            <span className="text-danger"> {" *"}</span>
          </Form.Label>
          <Form.Select
            value={revenueFilter.statusPayment}
            onChange={(e) => {
              dispatchRevenueFilter({
                type: "SET_STATUS_PAYMENT",
                payload: e.target.value,
              });
            }}
            id="validationDefault04"
            required
          >
            <option value={""}>Chọn trạng thái</option>
            {[
              { statusPayment: "COMPLETED", name: "Đã nhận tiền" },
              { statusPayment: "PAID", name: "Đã thanh toán" },
            ].map(({ statusPayment, name }) => {
              return <option value={statusPayment}>{name}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Row>
          <Col md="6">
            <Form.Group controlId="startDate">
              <Form.Label>Bắt đầu </Form.Label>
              <DateTimePicker
                disableClock
                format="dd/MM/y"
                value={revenueFilter?.dateFrom}
                onChange={(date) => {
                  dispatchRevenueFilter({
                    type: "SET_FROM_DATE",
                    payload: date?.toISOString() ?? "",
                  });
                }}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="endDate">
              <Form.Label>Kết thúc </Form.Label>
              <DateTimePicker
                disableClock
                format="dd/MM/y"
                value={revenueFilter.dateTo}
                onChange={(date) => {
                  dispatchRevenueFilter({
                    type: "SET_TO_DATE",
                    payload: date?.toISOString() ?? "",
                  });
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="gray"
          onClick={() => dispatchRevenueFilter({ type: "RESET" })}
        >
          Thiết lập lại
        </Button>
      </Popover.Body>
    </Popover>
  );
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
      {isStore ? (
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
                            <p className="mb-2">ĐH thành công</p>
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
                            <p className="mb-2">ĐH thất bại</p>
                            <h4 className="counter">
                              <CountUp
                                start={0}
                                end={totalCancel}
                                duration={3}
                              />
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
                            <p className="mb-2">Tổng đơn hàng</p>
                            <h4 className="counter">
                              <CountUp
                                start={0}
                                end={totalOrder}
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
                            <p className="mb-2">Bán tại cửa hàng</p>
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
                            <p className="mb-2">Bán tại Website</p>
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
                            <p className="mb-2">Bán tại Sendo</p>
                            <h4 className="counter">
                              <CountUp
                                start={0}
                                end={totalSendo}
                                duration={3}
                              />
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
                        <h4 className="card-title mb-3">Thống kê theo năm</h4>

                        <h5>
                          {isLoadingChart ? <Loading /> : totalOrderChart}{" "}
                        </h5>
                        <span className="mb-0">Đơn hàng / năm</span>
                      </div>
                      <div className="d-flex align-items-center align-self-center mt-3">
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
                            <span className="text-gray">Tại cửa hàng</span>
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
                            <span className="text-gray">Tại Website</span>
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
                            <span className="text-gray">Tại Sendo</span>
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

            <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="900">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Thống kê chi tiết</h4>
                  </div>
                  <div>
                    {/* <Form.Group controlId="startDate"> */}
                    {/* <Form.Label>Bắt đầu </Form.Label> */}
                    <DateTimePicker
                      disableClock
                      format="dd/MM/y"
                      value={filter.dateFrom}
                      onChange={(date) => {
                        dispatchFilter({
                          type: "SET_FROM_DATE",
                          payload: date?.toISOString() ?? "",
                        });
                      }}
                    />
                    {/* </Form.Group> */}
                    <span> - </span>
                    {/* <Form.Group controlId="endDate"> */}
                    {/* <Form.Label>Kết thúc </Form.Label> */}
                    <DateTimePicker
                      disableClock
                      format="dd/MM/y"
                      value={filter.dateTo}
                      onChange={(date) => {
                        dispatchFilter({
                          type: "SET_TO_DATE",
                          payload: date?.toISOString() ?? "",
                        });
                      }}
                    />
                    {/* </Form.Group> */}
                  </div>
                </div>
                <Row>
                  <Col md="6">
                    <div className="card-body">
                      <div className="flex-wrap d-flex align-items-center justify-content-between">
                        {isLoadingCircleChart || !chartDataCircleStatus ? (
                          <Loading />
                        ) : (
                          <Chart
                            className="col-md-8 col-lg-8"
                            options={chartDataCircleStatus?.options}
                            series={chartDataCircleStatus?.series}
                            type="radialBar"
                            height="250"
                          />
                        )}

                        <div className="d-grid gap col-md-4 col-lg-4">
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill={variableColors.success}
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill={variableColors.success}
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Thành công</span>
                              <h6>
                                {isLoadingCircleChart
                                  ? ""
                                  : chartDataCircleStatus?.seriesData[0]}
                              </h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill={variableColors.danger}
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill={variableColors.danger}
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Thất bại</span>
                              <h6>
                                {isLoadingCircleChart
                                  ? ""
                                  : chartDataCircleStatus?.seriesData[1]}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="card-body">
                      <div className="flex-wrap d-flex align-items-center justify-content-between">
                        {isLoadingCircleChart || !chartDataCircleType ? (
                          <Loading />
                        ) : (
                          <Chart
                            className="col-md-8 col-lg-8"
                            options={chartDataCircleType?.options}
                            series={chartDataCircleType?.series}
                            type="radialBar"
                            height="250"
                          />
                        )}
                        <div className="d-grid gap col-md-4 col-lg-4">
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill={variableColors.info}
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill={variableColors.info}
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Cửa hàng</span>
                              <h6>{chartDataCircleType?.seriesData[2]}</h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill={variableColors.warning}
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill={variableColors.warning}
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Sendo</span>
                              <h6>{chartDataCircleType?.seriesData[0]}</h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-start">
                            <svg
                              className="mt-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              viewBox="0 0 24 24"
                              fill={variableColors.primary_light}
                            >
                              <g>
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="8"
                                  fill={variableColors.primary_light}
                                ></circle>
                              </g>
                            </svg>
                            <div className="ms-3">
                              <span className="text-gray">Website</span>
                              <h6>{chartDataCircleType?.seriesData[1]}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Doanh thu theo đơn hàng</h4>
                  </div>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <Button variant="outline-gray">Bộ lọc</Button>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  {isLoading ? (
                    <Loading></Loading>
                  ) : (
                    <div className="border-bottom my-3">
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Col md="3">
                          <Row>
                            <Col
                              md="6"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p style={{ fontWeight: "500" }}>Doanh thu </p>
                            </Col>
                            <Col>
                              <p style={{ fontWeight: "700" }}>
                                {" "}
                                {": " + currencyFormatter.format(totalAllOrder)}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Table
                        responsive
                        striped
                        id="datatable"
                        className=""
                        data-toggle="data-table"
                      >
                        <thead>
                          <tr>
                            <th>Mã đơn hàng</th>
                            <th>Kênh</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Thành tiền</th>
                            <th>Giảm giá</th>
                            <th>Tổng tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {revenue?.map((item) => {
                            const { orderItems, voucher } = item;
                            const subTotalAllOrder = orderItems
                              ?.map((orderItem) => orderItem.subTotal)
                              .reduce((total, price) => total + price, 0);
                            const discountAllOrder = voucher
                              ? voucher?.discount +
                                (voucher?.percent * subTotalAllOrder) / 100
                              : 0;
                            const totalAllOrder = !discountAllOrder
                              ? subTotalAllOrder
                              : subTotalAllOrder - discountAllOrder;
                            return (
                              <tr>
                                <td>{item.id}</td>
                                <td>{item.type}</td>
                                <td>{item.paymentStatus}</td>
                                <td>
                                  {currencyFormatter.format(item.subTotal)}
                                </td>
                                <td>
                                  {item.voucher
                                    ? item.voucher?.discount
                                      ? currencyFormatter.format(
                                          item.voucher?.discount
                                        )
                                      : currencyFormatter.format(
                                          (item.voucher?.percent *
                                            item.subTotal) /
                                            100
                                        )
                                    : currencyFormatter.format(0)}
                                </td>
                                <td>
                                  {item.voucher
                                    ? item.voucher?.discount
                                      ? currencyFormatter.format(
                                          item.subTotal - item.voucher?.discount
                                        )
                                      : currencyFormatter.format(
                                          item.subTotal -
                                            (item.voucher?.percent *
                                              item.subTotal) /
                                              100
                                        )
                                    : currencyFormatter.format(
                                        item.subTotal - 0
                                      )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      <Row className="align-items-center">
                        <Col md="6">
                          <div
                            className="dataTables_info"
                            id="datatable_info"
                            role="status"
                            aria-live="polite"
                          >
                            {totalCount !== 0
                              ? `Showing ${(page - 1) * perPage + 1} to ${
                                  page * perPage <= totalCount
                                    ? page * perPage
                                    : totalCount
                                } of ${pagination?.total ?? 0} entries`
                              : null}
                          </div>
                        </Col>
                        <Col md="6" style={{ paddingTop: 16 }}>
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="datatable_paginate"
                          >
                            <ul
                              style={{ justifyContent: "end" }}
                              className="pagination"
                            >
                              {createArrayFrom1ToN(totalPage).map(
                                (pageIndex) => {
                                  return (
                                    <li
                                      className={
                                        "paginate_button page-item " +
                                        (page === pageIndex ? "active" : "")
                                      }
                                      id={pageIndex}
                                      onClick={() => setPage(pageIndex)}
                                    >
                                      <Link
                                        to="#"
                                        aria-controls="datatable"
                                        aria-disabled="true"
                                        data-dt-idx="previous"
                                        tabIndex="0"
                                        className="page-link"
                                      >
                                        {pageIndex}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="conatiner-fluid content-inner">
          <Row class="py-0">
            <img
              src={welcom}
              // style={{ height: "640px" }}
              className="img-fluid rounded mb-2"
              alt=""
            />
          </Row>
        </div>
      )}
    </Fragment>
  );
});

export default Index;

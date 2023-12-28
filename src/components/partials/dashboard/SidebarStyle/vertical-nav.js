import React, { useState, useContext, memo, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import UserContext from "../../../../contexts/userContext";
// import Sizings from "../../../../views/uikit/sizing";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = memo((props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const { isStore } = useContext(UserContext);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();
  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Home</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>
        <li
          className={`${
            location.pathname === "/dashboard" ? "active" : ""
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === "/dashboard" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard"
            onClick={() => {}}
          >
            <i className="icon">
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Dashboard
            </span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="order-management-event"
          bsPrefix={`nav-item ${active === "ordermanagement" ? "active" : ""} `}
          onClick={() => setActive("ordermanagement")}
        >
          <CustomToggle
            eventKey="order-management-event"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                class="icon-32"
                width="1.25rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.92574 16.39H14.3119C14.7178 16.39 15.0545 16.05 15.0545 15.64C15.0545 15.23 14.7178 14.9 14.3119 14.9H8.92574C8.5198 14.9 8.18317 15.23 8.18317 15.64C8.18317 16.05 8.5198 16.39 8.92574 16.39ZM12.2723 9.9H8.92574C8.5198 9.9 8.18317 10.24 8.18317 10.65C8.18317 11.06 8.5198 11.39 8.92574 11.39H12.2723C12.6782 11.39 13.0149 11.06 13.0149 10.65C13.0149 10.24 12.6782 9.9 12.2723 9.9ZM19.3381 9.02561C19.5708 9.02292 19.8242 9.02 20.0545 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0545 22H8.17327C5.59901 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5099 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4381 9.02 17.8112 9.02316 18.1377 9.02593C18.3917 9.02809 18.6175 9.03 18.8168 9.03C18.9578 9.03 19.1405 9.02789 19.3381 9.02561ZM19.6111 7.566C18.7972 7.569 17.8378 7.566 17.1477 7.559C16.0527 7.559 15.1507 6.648 15.1507 5.542V2.906C15.1507 2.475 15.6685 2.261 15.9646 2.572C16.5004 3.13476 17.2368 3.90834 17.9699 4.67837C18.7009 5.44632 19.4286 6.21074 19.9507 6.759C20.2398 7.062 20.0279 7.565 19.6111 7.566Z"
                  fill="currentColor"
                ></path>{" "}
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý đơn hàng
            </span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="order-management-event">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/order-management/list"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/order-management/list"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> H </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Danh sách đơn hàng
                  </span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/order-management/bills"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/order-management/bills"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> D </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Hóa đơn
                  </span>
                </Link>
              </li> */}
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        <li className="nav-item">
          <Link
            className={`${
              location.pathname === "/dashboard/customer-list/" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard/customer-list/"
            onClick={() => {}}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25em"
                width="1.25rem"
                viewBox="0 0 640 512"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý khách hàng
            </span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="sidebar-special"
          bsPrefix={`nav-item ${active === "special" ? "active" : ""} `}
          onClick={() => setActive("special")}
        >
          <CustomToggle
            eventKey="sidebar-special"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25em"
                width="1.25rem"
                fill="none"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý sản phẩm
            </span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-special">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname ===
                    "/dashboard/product-management/category-management"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/product-management/category-management"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Loại sản phẩm
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname ===
                    "/dashboard/product-management/product-list"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/product-management/product-list"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> C </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Danh sách sản phẩm
                  </span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        <li className="nav-item">
          <Link
            className={`${
              location.pathname === "/dashboard/supplier-list/" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard/supplier-list/"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25rem"
                width="1.25rem"
                viewBox="0 0 640 512"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M256 48c0-26.5 21.5-48 48-48H592c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H381.3c1.8-5 2.7-10.4 2.7-16V253.3c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H256V48zM571.3 347.3c6.2-6.2 6.2-16.4 0-22.6l-64-64c-6.2-6.2-16.4-6.2-22.6 0l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 310.6V432c0 8.8 7.2 16 16 16s16-7.2 16-16V310.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0zM0 176c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V176zm352 80V480c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V256H352zM144 320c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H144z"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý NCC
            </span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`${
              location.pathname === "/dashboard/voucher-list/" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard/voucher-list/"
            onClick={() => {}}
          >
            <i className="icon">
              <svg
                class="icon-32"
                width="1.25rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.761 12.001C19.761 12.8145 20.429 13.4764 21.25 13.4764C21.664 13.4764 22 13.8093 22 14.2195V16.8958C22 19.159 20.142 21 17.858 21H6.143C3.859 21 2 19.159 2 16.8958V14.2195C2 13.8093 2.336 13.4764 2.75 13.4764C3.572 13.4764 4.24 12.8145 4.24 12.001C4.24 11.2083 3.599 10.6118 2.75 10.6118C2.551 10.6118 2.361 10.5335 2.22 10.3938C2.079 10.2541 2 10.0648 2 9.86866L2.002 7.10514C2.002 4.84201 3.86 3 6.144 3H17.856C20.14 3 21.999 4.84201 21.999 7.10514L22 9.78245C22 9.97864 21.921 10.1689 21.781 10.3076C21.64 10.4473 21.45 10.5256 21.25 10.5256C20.429 10.5256 19.761 11.1875 19.761 12.001ZM14.252 12.648L15.431 11.5105C15.636 11.3143 15.707 11.025 15.618 10.7575C15.53 10.4899 15.3 10.2997 15.022 10.261L13.393 10.0252L12.664 8.5627C12.539 8.31102 12.285 8.15446 12.002 8.15347H12C11.718 8.15347 11.464 8.31003 11.337 8.56171L10.608 10.0252L8.982 10.26C8.701 10.2997 8.471 10.4899 8.382 10.7575C8.294 11.025 8.365 11.3143 8.569 11.5105L9.748 12.648L9.47 14.2562C9.422 14.5336 9.535 14.8091 9.765 14.9746C9.895 15.0667 10.046 15.1143 10.199 15.1143C10.316 15.1143 10.434 15.0855 10.542 15.0291L12 14.2701L13.455 15.0271C13.707 15.1608 14.006 15.14 14.235 14.9736C14.466 14.8091 14.579 14.5336 14.531 14.2562L14.252 12.648Z"
                  fill="currentColor"
                ></path>{" "}
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý Voucher
            </span>
          </Link>
        </li>
        {isStore ? (
          <li className="nav-item">
            <Link
              className={`${
                location.pathname === "/dashboard/story-list" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboard/story-list"
              onClick={() => {}}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  width="1.25rem"
                  viewBox="0 0 576 512"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"
                  />
                </svg>
              </i>
              <span className="item-name" style={{ fontSize: 14 }}>
                Quản lý cửa hàng
              </span>
            </Link>
          </li>
        ) : (
          ""
        )}
        {isStore ? (
          <li className="nav-item">
            <Link
              className={`${
                location.pathname === "/dashboard/my-store" ? "active" : ""
              } nav-link `}
              aria-current="page"
              to="/dashboard/my-store"
              onClick={() => {}}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  width="1.25rem"
                  viewBox="0 0 576 512"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"
                  />
                </svg>
              </i>
              <span className="item-name" style={{ fontSize: 14 }}>
                Thông tin cửa hàng
              </span>
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="nav-item">
          <Link
            className={`${
              location.pathname === "/dashboard/unit-management" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="/dashboard/unit-management"
            onClick={() => {}}
          >
            <i className="icon">
              <svg
                class="icon-32"
                width="1.25rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.81 2H16.191C19.28 2 21 3.78 21 6.83V17.16C21 20.26 19.28 22 16.191 22H7.81C4.77 22 3 20.26 3 17.16V6.83C3 3.78 4.77 2 7.81 2ZM8.08 6.66V6.65H11.069C11.5 6.65 11.85 7 11.85 7.429C11.85 7.87 11.5 8.22 11.069 8.22H8.08C7.649 8.22 7.3 7.87 7.3 7.44C7.3 7.01 7.649 6.66 8.08 6.66ZM8.08 12.74H15.92C16.35 12.74 16.7 12.39 16.7 11.96C16.7 11.53 16.35 11.179 15.92 11.179H8.08C7.649 11.179 7.3 11.53 7.3 11.96C7.3 12.39 7.649 12.74 8.08 12.74ZM8.08 17.31H15.92C16.319 17.27 16.62 16.929 16.62 16.53C16.62 16.12 16.319 15.78 15.92 15.74H8.08C7.78 15.71 7.49 15.85 7.33 16.11C7.17 16.36 7.17 16.69 7.33 16.95C7.49 17.2 7.78 17.35 8.08 17.31Z"
                  fill="currentColor"
                ></path>{" "}
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý đơn vị
            </span>
          </Link>
        </li>

        <Accordion.Item
          as="li"
          eventKey="sidebar-user"
          bsPrefix={`nav-item ${active === "user" ? "active" : ""} `}
          onClick={() => setActive("user")}
        >
          <CustomToggle
            eventKey="sidebar-user"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25em"
                width="1.25rem"
                viewBox="0 0 640 512"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý kho
            </span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="sidebar-user">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/warehouse/list-products"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/warehouse/list-products"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> U </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Danh sách kho
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/warehouse/import-goods"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/warehouse/import-goods"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> U </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Nhập hàng
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/warehouse/check-goods"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/warehouse/check-goods"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <i className="sidenav-mini-icon"> U </i>
                  <span style={{ fontSize: 14 }} className="item-name">
                    Kiểm kho
                  </span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
        {/* <Accordion.Item
          as="li"
          eventKey="utilities-error"
          bsPrefix={`nav-item ${active === "error" ? "active" : ""} `}
          onClick={() => setActive("error")}
        >
          <CustomToggle
            eventKey="utilities-error"
            active={activeMenu === "utilities-error" ? true : false}
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25em"
                width="1.25rem"
                viewBox="0 0 384 512"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"
                />
              </svg>
            </i>
            <span className="item-name" style={{ fontSize: 14 }}>
              Quản lý công nợ
            </span>
            <i className="right-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="utilities-error">
            <ul className="sub-nav">
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/debt-management/receipt"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/debt-management/receipt"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <span className="item-name">Phiếu thu</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${
                    location.pathname === "/dashboard/debt-management/payment"
                      ? "active"
                      : ""
                  } nav-link`}
                  to="/dashboard/debt-management/payment"
                >
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
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
                  </i>
                  <span className="item-name">Phiếu chi</span>
                </Link>
              </li>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item> */}
      </Accordion>
    </Fragment>
  );
});

export default VerticalNav;

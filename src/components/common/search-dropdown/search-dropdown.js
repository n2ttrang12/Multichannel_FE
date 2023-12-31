import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Col, Row } from "react-bootstrap";

const SearchableDropdown = ({
  options,
  label,
  id,
  handleChange,
  searchLabel = null,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[id]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;

    return "";
  };

  const filter = (options) => {
    return options.filter((option) => {
      if (searchLabel) {
        if (
          option[searchLabel].toLowerCase().indexOf(query.toLowerCase()) > -1
        ) {
          return true;
        }
      }

      return option[label].toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
            placeholder="Tìm kiếm và chọn sản phẩm"
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option`}
              key={`${id}-${index}`}
            >
              <Row>
                <Col>{option[label]}</Col>
                {/* <Col>Barcode: {searchLabel && option[searchLabel]}</Col> */}
              </Row>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;

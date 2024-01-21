import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookingDetails } from "../../redux/slices/bookingSlice";
import { useSelector } from "react-redux";
import { selectBookingDetails } from "../../redux/slices/bookingSlice";
import { BookingState } from "../../redux/slices/bookingSlice";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const dispatch = useDispatch();
  const bookingDetails = useSelector(selectBookingDetails);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name: keyof typeof options, operation: "i" | "d") => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const updatedBookingDetails: Partial<
      BookingState & { roomDetails: { hotelId: string } }
    > = {
      checkInDate: new Date(date[0].startDate),
      checkOutDate: new Date(date[0].endDate),
      adultCount: options.adult,
      childrenCount: options.children,
      roomCount: 1,
      nightCount: 1,
      guestName: "",
      email: "",
      phone: "",
      specialRequests: "",
      maxPeople: 0,
      total: 0,
      discountPrice: 0,
      roomDetails: {
        id: "",
        roomType: "",
        hotelName: "",
        hotelId: "",
        amenities: [],
        rentAmount: 0,
        discountPrice: 0,
        roomsCount: 0,
        maxPeople: 0,
        description: "",
        images: [],
      },
    };

    dispatch(setBookingDetails(updatedBookingDetails));
  };

  const handleDateChange = (item: {
    selection?: { startDate: Date | undefined; endDate: Date | undefined };
  }) => {
    if (item.selection && item.selection.startDate && item.selection.endDate) {
      setDate([
        {
          startDate: item.selection.startDate,
          endDate: item.selection.endDate,
          key: "selection",
        },
      ]);
    }
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText"
          >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
              minDate={new Date()}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
          >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

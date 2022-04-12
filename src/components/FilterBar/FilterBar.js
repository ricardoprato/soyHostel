import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterContext from '../../context/FilterContext';
import HotelIcon from '@mui/icons-material/Hotel';
import './FilterBar.css';

const Filters = () => {
  const [filter, setFilter] = useContext(FilterContext);

  const handleFilters = (event) => {
    let { name, value } = event.target;
    if (name === 'checkIn' || name === 'checkOut') {
      value = moment(value);
    }
    const newData = { ...filter, [name]: value };
    setFilter(newData);
  };

  const handleReset = (event) => {
    setFilter({
      checkIn: {},
      checkOut: {},
      roomTypes: 'All rooms',
      bedsAvailable: 'All beds',
      price: 'All Prices',
      Baths: 'All Baths',
    });
  };

  return (
    <Navbar>
      <Filter>
        <CalendarMonthIcon color="#a3a2a2" />
        <input
          type="date"
          name="checkIn"
          onChange={handleFilters}
          value={
            Object.keys(filter.checkIn).length === 0
              ? {}
              : moment(filter.checkIn).format('YYYY[-]MM[-]DD')
          }
        />
      </Filter>

      <Filter>
        <CalendarMonthIcon color="#a3a2a2" />
        <input
          type="date"
          name="checkOut"
          onChange={handleFilters}
          value={
            Object.keys(filter.checkOut).length === 0
              ? {}
              : moment(filter.checkOut).format('YYYY[-]MM[-]DD')
          }
        />
      </Filter>

      <Filter>
        <BathtubIcon color="#a3a2a2" />
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round">Bath</span>
        </label>
      </Filter>

      <Filter>
        <AttachMoneyIcon color="#a3a2a2" />
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round">Bath</span>
        </label>
      </Filter>

      <Filter>
        <HotelIcon color="#a3a2a2" />
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round">Bath</span>
        </label>
      </Filter>

      <Button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </Button>
    </Navbar>
  );
};

export default Filters;

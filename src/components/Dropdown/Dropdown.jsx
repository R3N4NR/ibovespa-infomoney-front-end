import Dropdown from 'react-bootstrap/Dropdown';
import { useTableDropdownStore } from '../../store/useTableDropdownStore';
import './Dropdown.css';

const CustomSelect = () => {
  const selectedOption = useTableDropdownStore((state) => state.selectedOption);
  const setSelectedOption = useTableDropdownStore((state) => state.setSelectedOption);

  return (
    <Dropdown 
    onSelect={(eventKey) => setSelectedOption(eventKey)}
    >
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Altas">Altas</Dropdown.Item>
        <Dropdown.Item eventKey="Baixas">Baixas</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomSelect;

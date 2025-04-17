import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={{ ...style, maxHeight: '200px', overflowY: 'auto' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Buscar ativo..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled mb-0">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().includes(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);

const DropdownSearch = ({ data, onSelectAtivo, selectedAtivo }) => {
  return (
    <Dropdown onSelect={(eventKey) => onSelectAtivo(eventKey)}>
      <Dropdown.Toggle id="dropdown-custom-ativos" variant="secondary">
        {selectedAtivo || "Ativo"}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {data.map((item, idx) => (
          <Dropdown.Item eventKey={item.ativo} key={idx}>
            {item.ativo}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownSearch;

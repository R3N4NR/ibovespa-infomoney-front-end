import Button from 'react-bootstrap/Button';
import './Button.css'
const CustomButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      className='custom-button'
    >
      {children}
    </Button>
  );
};

export default CustomButton;
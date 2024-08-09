interface ButtonProps {
  onClick?: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='w-full px-4 py-4 bg-jacaranda text-white rounded-2xl hover:bg-primary transition-colors ease-linear'>
      {text}
    </button>
  );
};

export default Button;

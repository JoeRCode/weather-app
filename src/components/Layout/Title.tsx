interface TitleProps {
  text: string;
  className?: string;
}

const Title = ({ text, className = "" }: TitleProps) => {
  return (
    <h1
      className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 ${className}`}
    >
      {text}
    </h1>
  );
};

export default Title;

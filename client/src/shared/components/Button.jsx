const Button = ({
    children,
    type = "button",
    className = "",
    disabled = false,
    ...props
}) => {

    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full font-semibold px-10 py-3 rounded-full text-white shadow-md hover:opacity-90 transition-opacity cursor-pointer ${className}
             disabled:bg-blue-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
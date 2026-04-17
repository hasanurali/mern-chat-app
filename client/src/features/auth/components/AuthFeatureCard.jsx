const AuthFeatureCard = ({
    icon,
    title,
    bg = "bg-[#F1EFFF]",
    circleColor = "bg-[#E7DEF4]",
    circlePosition = "-bottom-6 -right-6",
    className = "",
}) => {
    return (
        <div className={`w-1/2 h-32 rounded-4xl p-5 flex flex-col justify-between text-[#282B51] font-semibold relative overflow-hidden ${bg} ${className}`}>
            <div className={`absolute ${circlePosition} w-18 h-18 rounded-full opacity-60 ${circleColor}`} />
            {icon}
            <p className="z-1">{title}</p>
        </div>
    );
};

export default AuthFeatureCard;
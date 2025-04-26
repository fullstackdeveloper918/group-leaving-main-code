interface BirthdayCardProps {
    title: string;
    imageSrc: string;
    isNew?: boolean;
    personalized?: boolean;
  }
  
  const BirthdayCard: React.FC<BirthdayCardProps> = ({ title, imageSrc, isNew, personalized }) => {
    return (
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md border hover:shadow-lg transition-shadow duration-300">
        {isNew && <span className="absolute top-2 right-2 bg-yellow-300 text-xs px-2 py-1 rounded-md">New</span>}
        {personalized && <span className="absolute top-2 left-2 bg-pink-500 text-xs px-2 py-1 rounded-md text-white">Personalise</span>}
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <h3 className="p-4 text-lg font-bold">{title}</h3>
      </div>
    );
  };
  
  export default BirthdayCard;
  
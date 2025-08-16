import type { vehicle } from "src/types/transport";

interface VehicleCardProps {
  vehicle: vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const statusColors = {
    standard: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800",
    vip: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{vehicle.name}</h3>
          <p className="text-white/90">{vehicle.price}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {vehicle.status.map((status) => (
            <span
              key={status}
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              {status}
            </span>
          ))}
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Réserver
        </button>
      </div>
    </div>
  );
};

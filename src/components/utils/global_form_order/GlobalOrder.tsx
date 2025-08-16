import type { GlobalFormProps } from "@/types/global_command_form_types/global_form.type";

const GlobalForm = ({
  serviceType,
  setServiceType,
  lieu,
  setLieu,
  destination,
  setDestination,
}: GlobalFormProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Choisissez un type de service ici
      </h2>
      <select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        className="w-full mb-4 p-2 border"
      >
        <option value="" hidden>
          Type de service
        </option>
        <option value="aller-simple">Aller-simple</option>
        <option value="aller-retour">Aller-retour</option>
        <option value="course">Course</option>
        <option value="urgence">Urgence</option>
      </select>

      <h2 className="text-base font-semibold mb-4">
        Lieu de prise en charge; si aucun lieu ne vous correspond juste en bas
        vous pouvez entrer votre propre adress
      </h2>
      <select
        value={lieu}
        onChange={(e) => setLieu(e.target.value)}
        className="w-full mb-4 p-2 border"
      >
        <option value="" hidden>
          Lieu de prise en charge
        </option>
        <option value="hopital">Quartier nord</option>
        <option value="marche-sud">Marché sud</option>
        <option value="maison">À la maison</option>
      </select>

      <h2 className="text-xl font-semibold mb-4">Destination</h2>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full mb-4 p-2 border"
      >
        <option value="" hidden>
          Destination
        </option>
        <option value="universite">Université</option>
        <option value="hopital">Université nord</option>
      </select>
    </div>
  );
};

export default GlobalForm;

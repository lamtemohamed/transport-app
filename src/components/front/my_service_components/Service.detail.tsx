// pages/ServiceDetail.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import GlobalForm from "@/components/utils/global_form_order/GlobalOrder";
import PaiementForm from "@/components/utils/paiment_form/PaiementForm";
import { Adress } from "@/components/utils/adress/adress";

const services = {
  "aller-simple": {
    title: "Aller Simple",
    description: "Description détaillée du service Aller Simple...",
  },
  "aller-retour": {
    title: "Aller-Retour",
    description: "Description détaillée du service Aller-Retour...",
  },
  course: {
    title: "Course",
    description: "Description détaillée du service Course...",
  },
  urgence: {
    title: "Urgence",
    description: "Description détaillée du service Urgence...",
  },
  "voyage-de-nuit": {
    title: "Voyage de nuit",
    description: "Description détaillée du service Voyage de nuit...",
  },
  "retour-des-conges": {
    title: "Retour des congés",
    description: "Description détaillée du service Retour des congés...",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [paiement, setPaiement] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [lieu, setLieu] = useState<string>("");
  const [adress, setAdress] = useState<string>("");

  /**
   * ici je dis a typescript que slug est une clé et type de l'objet service
   *
   */
  const service = services[slug as keyof typeof services];
  //si le service n'existe retourne ce message
  if (!service) return <p>Service non trouvé</p>;

  //soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paiement || !serviceType || !lieu || (!destination && !adress)) {
      alert(
        "Veuillez remplir tous les champs\nDestination ou Adress un champ doit être rempli"
      );
    }
    alert("Votre demande a été pris en compte\nmerci de nous faire confiance");
    console.log("Service :", serviceType);
    console.log("Lieu :", lieu);
    console.log("Destination :", destination);
    console.log("Paiement :", paiement);

    setServiceType("");
    setLieu("");
    setAdress("");
    setPaiement("");
    setDestination("");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <p className="mb-4">{service.description}</p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Commander directement
      </button>

      <form onSubmit={handleSubmit}>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center  z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
              <GlobalForm
                serviceType={serviceType}
                setServiceType={setServiceType}
                lieu={lieu}
                setLieu={setLieu}
                destination={destination}
                setDestination={setDestination}
              />
              <Adress adress={adress} setAdress={setAdress} />

              {/**paiment ici */}
              <PaiementForm paiement={paiement} setPaiement={setPaiement} />

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Fermer
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

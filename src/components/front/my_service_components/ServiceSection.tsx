// components/ServicesSection.tsx

import { Adress } from "@/components/utils/adress/adress";
import GlobalForm from "@/components/utils/global_form_order/GlobalOrder";
import PaiementForm from "@/components/utils/paiment_form/PaiementForm";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import type { Service } from "src/types/service_type/service.type";

const services: Service[] = [
  {
    title: "Aller Simple",
    slug: "aller-simple",
    description: "De l’université vers la ville ou vice versa en un seul sens.",
    price: "Dès 300F",
    link: "En savoir plus",
    bgColor: "bg-blue-100",
  },
  {
    title: "Aller-Retour",
    slug: "aller-retour",
    description: "De l’université à la ville et retour sur le même jour.",
    price: "À partir de 400F",
    link: "En savoir plus",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  {
    title: "Course",
    slug: "course",
    description: "Vos déplacements ponctuels en ville ou à l’université.",
    price: "Dès 1500F",
    link: "En savoir plus",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Urgence",
    slug: "urgence",
    description: "Service disponible 24/7 pour des situations urgentes.",
    price: "1000F",
    link: "En savoir plus",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  {
    title: "Voyage de nuit",
    slug: "voyage-de-nuit",
    description: "Trajets sécurisés pendant la nuit pour plus de tranquillité.",
    price: "500F",
    link: "En savoir plus",
    bgColor: "bg-purple-100",
  },
  {
    title: "Retour des congés",
    slug: "retour-des-conges",
    description: "Service spécial pour votre retour après les congés.",
    price: "500F",
    link: "En savoir plus",
    bgColor: "bg-indigo-100",
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [paiement, setPaiement] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [lieu, setLieu] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCommander = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paiement || !serviceType || !lieu || (!destination && !adress)) {
      alert(
        "Veuillez remplir tous les champs\nDestination ou Adress un champ doit être rempli"
      );
      return;
    }
    alert("Votre demande a été pris en compte\nmerci de nous faire confiance");
    console.log("Service :", serviceType);
    console.log("Lieu :", lieu);
    console.log("Destination :", destination);
    console.log("Adress :", adress);
    console.log("Paiement :", paiement);

    setServiceType("");
    setLieu("");
    setPaiement("");
    setDestination("");
    setAdress("");
  };

  const handleDescription = () => {
    if (selectedService?.slug) {
      navigate(`/services/${selectedService.slug}`);
    }
  };

  return (
    <section className="px-4 py-12 bg-white">
      <h2 className="text-2xl font-bold text-center mb-10">Nos Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-sm ${service.bgColor}`}
          >
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{service.description}</p>
            <div
              className={`font-bold ${
                service.textColor ?? "text-blue-700"
              } mb-2`}
            >
              {service.price}
            </div>
            <button
              onClick={() => handleClick(service)}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              {service.link}
            </button>
          </div>
        ))}
      </div>

      {/* Modal principal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="text-red-500"
            >
              <FaDeleteLeft />
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedService.title}</h3>
            <GlobalForm
              serviceType={serviceType}
              setServiceType={setServiceType}
              lieu={lieu}
              setLieu={setLieu}
              destination={destination}
              setDestination={setDestination}
            />
            <Adress adress={adress} setAdress={setAdress} />

            <PaiementForm paiement={paiement} setPaiement={setPaiement} />

            <div className="flex justify-between">
              <button
                onClick={handleCommander}
                className="bg-green-500 text-white px-4 py-2 rounded relative top-4"
              >
                Commander
              </button>
              <button
                onClick={handleDescription}
                className="bg-blue-500 text-white px-4 py-2 rounded relative top-4"
              >
                Voir la description
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;

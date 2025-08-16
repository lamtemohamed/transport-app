import React, { useState } from "react";
//j'import le type Tarif ici
import type { Tarif } from "src/types/tarif_type/tarif.type";
//j'importe le component formulaireCommand ici
import FormulaireCommande from "../order_form_component/order_form";

//Une liste de donnée, Tarif est type typescript cree
const studentTarifs: Tarif[] = [
  {
    service: "Aller Simple",
    description: "Trajet dans un seul sens (université ↔ ville)",
    price: 300,
  },
  {
    service: "Aller-Retour",
    description: "Trajet aller et retour le même jour",
    price: 400,
  },
  {
    service: "Urgence",
    description: "Service disponible 24h/24 pour situations urgentes",
    price: 1000,
  },
  {
    service: "Course",
    description: "Déplacement ponctuel en ville",
    price: 1500,
  },
  {
    service: "Voyage de nuit",
    description: "Trajet entre 22h et 6h du matin",
    price: 500,
  },
  {
    service: "Retour des congés",
    description: "Service spécial après période de vacances",
    price: 500,
  },
];

const staffTarifs: Tarif[] = [
  {
    service: "Aller Simple",
    description: "Trajet dans un seul sens (université ↔ ville)",
    price: 500,
  },
  {
    service: "Aller-Retour",
    description: "Trajet aller et retour le même jour",
    price: 800,
  },
  {
    service: "Urgence",
    description: "Service disponible 24h/24 pour situations urgentes",
    price: 1500,
  },
  {
    service: "Course",
    description: "Déplacement ponctuel en ville",
    price: 2000,
  },
  {
    service: "Voyage de nuit",
    description: "Trajet entre 22h et 6h du matin",
    price: 700,
  },
  {
    service: "Retour des congés",
    description: "Service spécial après période de vacances",
    price: 800,
  },
];

const TarifsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"student" | "staff">("student");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Tarif | null>(null);
  //je cree un formData pour inclu les donnée du formulaire
  const [formData, setFormData] = useState({
    nomComplet: "",
    telephone: "",
    location: "",
  });

  //condition qui verifi si activeTab est true return studentTarifs sinon staffTarifs
  const tarifs = activeTab === "student" ? studentTarifs : staffTarifs;

  //fonction pour ouvrir le modal lors du clique
  const handleOpenModal = (tarif: Tarif) => {
    //si le service est selectionné
    setSelectedService(tarif);
    //j'ouvre le modal
    setShowModal(true);
  };

  //fermetur du modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
    setFormData({
      nomComplet: "",
      telephone: "",
      location: "",
    });
  };

  //soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomComplet || !formData.telephone || !formData.location) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    console.log("Commande envoyée:", {
      service: selectedService,
      ...formData,
    });

    alert("Commande envoyée avec succès!");
    handleCloseModal();
  };

  return (
    <section className="px-4 py-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Nos Tarifs</h2>

      {/* Onglets */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("student")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "student"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Étudiants
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "staff"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Personnel administratif
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-3 border-b">Service</th>
              <th className="px-4 py-3 border-b">Description</th>
              <th className="px-4 py-3 border-b">Prix (FCFA)</th>
              <th className="px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {tarifs.map((tarif, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b font-medium">
                  {tarif.service}
                </td>
                <td className="px-4 py-2 border-b">{tarif.description}</td>
                <td className="px-4 py-2 border-b font-semibold">
                  {tarif.price}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleOpenModal(tarif)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Commander
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 w-full  shadow-lg max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Commander - {selectedService.service}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <FormulaireCommande
                  service={{
                    service: selectedService.service,
                    price: selectedService.price.toString(),
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition-colors duration-200"
              >
                Valider la commande
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TarifsSection;

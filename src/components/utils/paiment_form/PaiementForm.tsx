interface PaiementFormProps {
  paiement: string;
  setPaiement: (value: string) => void;
}

export default function PaiementForm({
  paiement,
  setPaiement,
}: PaiementFormProps) {
  return (
    <div>
      {/* Sélecteur de mode de paiement */}
      <select
        className="w-full mb-4 p-2 border"
        value={paiement}
        onChange={(e) => setPaiement(e.target.value)}
      >
        <option value="" hidden>
          Mode de paiement
        </option>
        <option value="espace">Espèce</option>
        <option value="carte">Carte bancaire</option>
      </select>

      {/* 👉 Affiche le formulaire uniquement si le mode est "carte" */}
      {paiement === "carte" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom sur la carte"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Numéro de carte"
            className="w-full border rounded px-4 py-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/AA"
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

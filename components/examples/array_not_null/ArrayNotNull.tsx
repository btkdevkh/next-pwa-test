"use client";

import useGetSocietes from "@/hooks/useGetSocietes";

const ArrayNotNull = () => {
  const { loading, societes: societeData } = useGetSocietes();

  const societes = societeData ?? null;
  console.log("societes :", societes);

  if (societes && societes.length === 0) {
    return (
      <div className="text-white">
        <p>Aucune donnée</p>
      </div>
    );
  }

  return (
    <div>
      {loading && <p className="text-center">Loading...</p>}

      <div className="flex flex-col gap-1">
        {societes &&
          societes.length > 0 &&
          societes.map((societe) => (
            <div key={societe.uid_firestore} className="bg-purple-700 p-5">
              <p>{societe.nom}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArrayNotNull;

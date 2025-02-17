import { useCallback, useEffect, useState } from "react";

const useGetSocietes = () => {
  const [loading, setLoading] = useState(true);
  const [societes, setSocietes] = useState<Societe[] | null>(null);

  const formatSocietes = useCallback(() => {
    // SOLUTION 1 (Not great, long, bugs issues)
    // Without the filter method, bugs will be presents
    // Prefer the SOLUTION 2
    return societeSQL
      .map((socSQL) => {
        let obj: Societe | null = null;

        societeFB.forEach((socFb) => {
          if (socSQL.uid_firestore === socFb.uid_firestore) {
            obj = {
              ...socFb,
            };
          }
        });

        return obj;
      })
      .filter((f) => f != null);

    // SOLUTION 2 (Great, short, no bugs)
    return societeFB.filter((socFb) => {
      return societeSQL.some(
        (socSQL) => socFb.uid_firestore === socSQL.uid_firestore
      );
    });
  }, []);

  useEffect(() => {
    const fetchSocietes = async () => {
      setLoading(false);

      if (formatSocietes().length > 0) {
        setSocietes(formatSocietes());
      }
    };

    fetchSocietes();
  }, []);

  return { loading, societes };
};

export default useGetSocietes;

const societeFB: Societe[] = [
  {
    uid_firestore: "446655440000",
    id_postgre: 1,
    nom: "Societe One",
    isActive: true,
    banner: "https://example.com/banner1.jpg",
  },
  {
    uid_firestore: "446655440001",
    id_postgre: 2,
    nom: "Societe Two",
    isActive: false,
    banner: "https://example.com/banner2.jpg",
  },
  {
    uid_firestore: "446655440002",
    id_postgre: 3,
    nom: "Societe Three",
    isActive: true,
    banner: "https://example.com/banner3.jpg",
  },
  {
    uid_firestore: "446655440003",
    id_postgre: 4,
    nom: "Societe Four",
    isActive: false,
    banner: "https://example.com/banner4.jpg",
  },
  {
    uid_firestore: "446655440004",
    id_postgre: 5,
    nom: "Societe Five",
    isActive: true,
    banner: "https://example.com/banner5.jpg",
  },
];

const societeSQL: Societes[] = [
  {
    id: 1,
    uid_firestore: "446655440000",
    nom: "Societe One",
    isActive: true,
    banner: "https://example.com/banner1.jpg",
  },
  {
    id: 2,
    uid_firestore: "446655440001",
    nom: "Societe Two",
    isActive: false,
    banner: "https://example.com/banner2.jpg",
  },
  {
    id: 3,
    uid_firestore: "446655440002",
    nom: "Societe Three",
    isActive: true,
    banner: "https://example.com/banner3.jpg",
  },
  {
    id: 4,
    uid_firestore: "446655440003",
    nom: "Societe Four",
    isActive: false,
    banner: "https://example.com/banner4.jpg",
  },
  {
    id: 5,
    uid_firestore: "446655440004",
    nom: "Societe Five",
    isActive: true,
    banner: "https://example.com/banner5.jpg",
  },
  {
    id: 6,
    uid_firestore: "446655440005",
    nom: "Societe Six",
    isActive: false,
    banner: "",
  },
  {
    id: 17,
    uid_firestore: "446655440006",
    nom: "Societe Six",
    isActive: false,
    banner: "",
  },
];

// Types
type Societe = {
  uid_firestore: string;
  id_postgre: number;
  nom: string;
  isActive: boolean;
  banner: string;
};

type Societes = {
  id: number;
  uid_firestore: string;
  nom: string;
  isActive: boolean;
  banner: string;
};

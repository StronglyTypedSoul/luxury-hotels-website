import { createContext, useContext, useEffect, useState } from "react";
import { getAllPastes } from "../api/endpoints";

interface PastesContextState {
	pastes: any[];
}

const PastesContext = createContext<PastesContextState | undefined>(undefined);

export const usePastes = () => {
	const context = useContext(PastesContext);
	if (context) {
		return context;
	} else {
		throw new Error("usePastes must be within PastesProvider");
	}
};

const PastesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [pastes, setPastes] = useState<any[]>([]);

	useEffect(() => {
		getAllPastes().then((pastes) => {
			setPastes(pastes);
		});
	}, []);

	return <PastesContext.Provider value={{ pastes }}>{children}</PastesContext.Provider>;
};

export default PastesProvider;

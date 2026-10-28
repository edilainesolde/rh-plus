import React, { createContext, useState, useContext } from 'react';
import { initialColaboradores, initialFerias, initialAtestados, initialLicencasRegistradas } from '../data/initialData';
import { sanitizeNIF } from '../utils/dateUtils';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [colaboradores, setColaboradores] = useState(initialColaboradores);
  const [ferias, setFerias] = useState(initialFerias);
  const [atestados, setAtestados] = useState(initialAtestados);
  const [licencas, setLicencas] = useState(initialLicencasRegistradas);
  const [interactionCount, setInteractionCount] = useState(0);

  const incrementCount = () => setInteractionCount(prev => prev + 1);

  const addColaborador = (novo) => {
    const sanitizedInputNIF = sanitizeNIF(novo.nif);
    if (!novo.nome.trim()) return { sucesso: false, mensagem: 'Nome é obrigatório.' };
    if (!novo.dataNascimento) return { sucesso: false, mensagem: 'Data de nascimento é obrigatória.' };
    if (!sanitizedInputNIF) return { sucesso: false, mensagem: 'NIF é obrigatório.' };

    const nifExiste = colaboradores.some(c => sanitizeNIF(c.nif) === sanitizedInputNIF);
    if (nifExiste) return { sucesso: false, mensagem: 'NIF já cadastrado.' };

    setColaboradores(prev => [...prev, { ...novo, id: Date.now().toString(), nif: novo.nif.trim().toUpperCase() }]);
    return { sucesso: true, mensagem: 'Colaborador cadastrado com sucesso!' };
  };

  const addFerias = (registro) => {
    setFerias(prev => [...prev, { ...registro, id: `F-${Date.now()}` }]);
    return { sucesso: true, mensagem: 'Registro salvo com sucesso.' };
  };

  const updateAtestadoStatus = (id, novaSituacao) => {
    setAtestados(prev => prev.map(a => a.id === id ? { ...a, situacao: novaSituacao } : a));
  };

  const addAtestado = (novo) => {
    setAtestados(prev => [...prev, { ...novo, id: `AT-${Date.now()}` }]);
    return { sucesso: true, mensagem: 'Atestado registrado.' };
  };

  const addLicenca = (nova) => {
    setLicencas(prev => [...prev, { ...nova, id: `LIC-${Date.now()}` }]);
    return { sucesso: true, mensagem: 'Licença registrada.' };
  };

  return (
    <AppContext.Provider value={{
      colaboradores, ferias, atestados, licencas, interactionCount,
      incrementCount, addColaborador, addFerias, addAtestado, updateAtestadoStatus, addLicenca
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
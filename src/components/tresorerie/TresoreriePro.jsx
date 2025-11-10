import React, { useState, useMemo } from 'react';
import { COLORS, SEUILS_ALERTE, TIMING_OPTIONS } from '../../constants/tresorerie';
import { genererAlertes, genererTimelineData, genererCategorieData, exporterCSV } from '../../utils/tresorerie';
import { useTransactions } from '../../hooks/useTransactions';
import { useFiltres } from '../../hooks/useFiltres';
import { useTotaux } from '../../hooks/useTotaux';
import { useTri } from '../../hooks/useTri';
import { Alertes } from './Alertes';
import { CarteTotal } from './CarteTotal';
import { SelecteurVue } from './SelecteurVue';
import { BarreActions } from './BarreActions';
import { FormulaireTransaction } from './FormulaireTransaction';
import { Filtres } from './Filtres';
import { TableauTransactions } from './TableauTransactions';
import { GraphiqueTimeline, GraphiqueRepartition } from './Graphiques';

/**
 * Composant principal de gestion de trésorerie
 */
export default function TresoreriePro() {
  // Hooks personnalisés
  const {
    transactions,
    ajouterTransaction,
    modifierTransaction,
    supprimerTransaction,
    dupliquerTransaction,
    reinitialiser,
    erreur,
    effacerErreur
  } = useTransactions();

  const {
    filtres,
    changerFiltre,
    reinitialiserFiltres,
    changerVue,
    transactionsFiltrees
  } = useFiltres(transactions);

  const { totaux, totalActuelle, totalEstimation } = useTotaux(transactionsFiltrees);

  const { tri, changerTri, transactionsTriees } = useTri(transactionsFiltrees);

  // État local
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  // Données pour les graphiques
  const timelineData = useMemo(
    () => genererTimelineData(transactionsFiltrees, TIMING_OPTIONS),
    [transactionsFiltrees]
  );

  const categorieData = useMemo(
    () => genererCategorieData(transactionsFiltrees),
    [transactionsFiltrees]
  );

  // Alertes
  const alertes = useMemo(
    () => genererAlertes(totalActuelle, totalEstimation, SEUILS_ALERTE),
    [totalActuelle, totalEstimation]
  );

  // Handlers
  const handleAjouterTransaction = (nouvelleTransaction) => {
    const success = ajouterTransaction(nouvelleTransaction);
    if (success) {
      setAfficherFormulaire(false);
    }
    return success;
  };

  const handleExporterCSV = () => {
    exporterCSV(transactionsFiltrees);
  };

  const handleReinitialiser = () => {
    if (reinitialiser()) {
      effacerErreur();
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        backgroundColor: COLORS.bg.main,
        minHeight: '100vh'
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: '20px' }}>
        <h1
          style={{
            color: COLORS.text.primary,
            margin: '0 0 5px 0',
            fontSize: '28px',
            fontWeight: '700'
          }}
        >
          💰 TRÉSORERIE PRO
        </h1>
        <p
          style={{
            color: COLORS.text.secondary,
            margin: '0',
            fontSize: '14px'
          }}
        >
          Gestion complète des flux de trésorerie - KAMEHAPOKE
        </p>
      </header>

      {/* ALERTES */}
      <Alertes alertes={alertes} />

      {/* SÉLECTEUR DE VUE */}
      <div style={{ marginBottom: '20px' }}>
        <SelecteurVue vueActive={filtres.vue} onChangerVue={changerVue} />
      </div>

      {/* BARRE D'ACTIONS */}
      <BarreActions
        onAjouter={() => {
          setAfficherFormulaire(!afficherFormulaire);
          effacerErreur();
        }}
        onExporter={handleExporterCSV}
        onReinitialiser={handleReinitialiser}
        afficherAjouter={afficherFormulaire}
      />

      {/* FORMULAIRE D'AJOUT */}
      {afficherFormulaire && (
        <FormulaireTransaction
          onAjouter={handleAjouterTransaction}
          onAnnuler={() => {
            setAfficherFormulaire(false);
            effacerErreur();
          }}
          erreur={erreur}
        />
      )}

      {/* FILTRES */}
      <Filtres
        filtres={filtres}
        changerFiltre={changerFiltre}
        reinitialiser={reinitialiserFiltres}
      />

      {/* CARTES TOTAUX PRINCIPALES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}
      >
        <CarteTotal
          titre="ENTRÉES"
          montant={totaux.entrees}
          type="entree"
        />
        <CarteTotal
          titre="SORTIES"
          montant={totaux.sorties}
          type="sortie"
        />
        <CarteTotal
          titre="SOLDE"
          montant={totaux.solde}
          type="solde"
        />
      </div>

      {/* RÉSUMÉ PAR VUE */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.bg.light,
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${COLORS.border.lighter}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 5px 0',
              fontSize: '11px',
              fontWeight: 'bold',
              color: COLORS.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            📍 SITUATION ACTUELLE
          </p>
          <p
            style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: 'bold',
              color: totalActuelle.solde >= 0 ? COLORS.success : COLORS.danger
            }}
          >
            {totalActuelle.solde >= 0 ? '+' : ''}
            {totalActuelle.solde.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: COLORS.text.secondary }}>
            {totalActuelle.entrees.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} entrées
            {' • '}
            {totalActuelle.sorties.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} sorties
          </p>
        </div>

        <div
          style={{
            backgroundColor: COLORS.bg.light,
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${COLORS.border.lighter}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 5px 0',
              fontSize: '11px',
              fontWeight: 'bold',
              color: COLORS.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            📈 ESTIMATION MENSUELLE
          </p>
          <p
            style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: 'bold',
              color: totalEstimation.solde >= 0 ? COLORS.success : COLORS.danger
            }}
          >
            {totalEstimation.solde >= 0 ? '+' : ''}
            {totalEstimation.solde.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: COLORS.text.secondary }}>
            {totalEstimation.entrees.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} entrées
            {' • '}
            {totalEstimation.sorties.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} sorties
          </p>
        </div>
      </div>

      {/* GRAPHIQUES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}
      >
        <GraphiqueTimeline data={timelineData} />
        {categorieData.length > 0 && <GraphiqueRepartition data={categorieData} />}
      </div>

      {/* TABLEAU DES TRANSACTIONS */}
      <TableauTransactions
        transactions={transactionsTriees}
        onModifier={modifierTransaction}
        onSupprimer={supprimerTransaction}
        onDupliquer={dupliquerTransaction}
        tri={tri}
        onChangerTri={changerTri}
      />

      {/* LÉGENDE */}
      <div
        style={{
          backgroundColor: COLORS.bg.light,
          padding: '12px',
          borderRadius: '8px',
          marginTop: '20px',
          fontSize: '12px',
          color: COLORS.text.secondary,
          border: `1px solid ${COLORS.border.lighter}`
        }}
      >
        <strong style={{ color: COLORS.text.primary }}>📌 Légende des timings:</strong>
        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.values(TIMING_OPTIONS).map(option => (
            <span key={option.value} style={{ fontSize: '11px' }}>
              {option.label}: {option.description}
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: `1px solid ${COLORS.border.lighter}`,
          textAlign: 'center',
          fontSize: '11px',
          color: COLORS.text.secondary
        }}
      >
        <p style={{ margin: '0' }}>
          💾 Sauvegarde automatique dans le navigateur
          {' • '}
          Données stockées localement
        </p>
      </div>
    </div>
  );
}
